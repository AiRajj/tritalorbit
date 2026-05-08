import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const demoUsers: Record<string, { id: string; name: string; email: string; password: string; role: string }> = {
  "admin@tritalorbit.com": { id: "demo-admin", name: "System Admin", email: "admin@tritalorbit.com", password: "password123", role: "SUPER_ADMIN" },
  "agency@tritalorbit.com": { id: "demo-agency", name: "Sarah Mitchell", email: "agency@tritalorbit.com", password: "password123", role: "AGENCY_OWNER" },
  "recruiter@tritalorbit.com": { id: "demo-recruiter", name: "Marcus Johnson", email: "recruiter@tritalorbit.com", password: "password123", role: "RECRUITER" },
  "candidate@tritalorbit.com": { id: "demo-candidate", name: "Emily Chen", email: "candidate@tritalorbit.com", password: "password123", role: "CANDIDATE" },
  "concierge@tritalorbit.com": { id: "demo-concierge", name: "Lisa Park", email: "concierge@tritalorbit.com", password: "password123", role: "CONCIERGE_MANAGER" },
  "vendor@tritalorbit.com": { id: "demo-vendor", name: "David Martinez", email: "vendor@tritalorbit.com", password: "password123", role: "VENDOR" },
  "msp@tritalorbit.com": { id: "demo-msp", name: "Robert Kim", email: "msp@tritalorbit.com", password: "password123", role: "MSP_VIEWER" },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
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

        const email = (credentials.email as string).toLowerCase()
        const password = credentials.password as string

        const demoUser = demoUsers[email]
        if (demoUser) {
          if (password === demoUser.password) {
            return {
              id: demoUser.id,
              email: demoUser.email,
              name: demoUser.name,
              role: demoUser.role,
            }
          }
          throw new Error("Invalid password")
        }

        try {
          const { default: db } = await import("./db")
          const user = await db.user.findUnique({
            where: { email },
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

          const isValid = await bcrypt.compare(password, user.hashedPassword)
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
        } catch (e) {
          if (e instanceof Error && e.message.includes("Invalid")) throw e
          throw new Error("Invalid email or password")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as Record<string, unknown>).role as string
        token.organizationId = (user as Record<string, unknown>).organizationId as string | null
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
  },
})

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
