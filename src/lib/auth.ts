import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import db from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            email: true,
            name: true,
            hashedPassword: true,
            role: true,
            avatar: true,
            agencyMembers: {
              select: { agencyId: true },
              take: 1,
            },
          },
        })

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid email or password")
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        )

        if (!isValid) {
          throw new Error("Invalid email or password")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatar,
          organizationId: user.agencyMembers[0]?.agencyId ?? null,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as unknown as Record<string, unknown>).role as string
        token.organizationId = (user as unknown as Record<string, unknown>).organizationId as string | null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as unknown as Record<string, unknown>).role = token.role as string
        ;(session.user as unknown as Record<string, unknown>).organizationId = token.organizationId as string | null
      }
      return session
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      const isOnLogin = nextUrl.pathname === "/login"
      const isOnRegister = nextUrl.pathname === "/register"

      if (isOnDashboard || isOnAdmin) {
        if (!isLoggedIn) return false

        if (isOnAdmin) {
          const role = (auth.user as Record<string, unknown>).role as string
          if (role !== "ADMIN" && role !== "MSP_ADMIN") {
            return Response.redirect(new URL("/dashboard", nextUrl))
          }
        }
        return true
      }

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
  },
})

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
