import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma, safeDb } from "@/lib/db";
import { getRoleHome } from "@/lib/rbac";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;
        if (!email || !password) return null;

        const demoUsers = {
          "admin@tritalorbit.com": { role: "SUPER_ADMIN", name: "Serena Admin" },
          "owner@tritalorbit.com": { role: "AGENCY_OWNER", name: "Avery Owner" },
          "recruiter@tritalorbit.com": { role: "RECRUITER", name: "Riley Recruiter" },
          "concierge@tritalorbit.com": { role: "CONCIERGE_MANAGER", name: "Cameron Concierge" },
          "msp@tritalorbit.com": { role: "MSP_VIEWER", name: "Morgan MSP" },
          "candidate@tritalorbit.com": { role: "CANDIDATE", name: "Maya Clinician" },
          "vendor@tritalorbit.com": { role: "VENDOR", name: "Jordan Vendor" }
        } as const;

        const dbUser = await safeDb(
          () => prisma.user.findUnique({ where: { email } }),
          null
        );

        if (dbUser?.passwordHash) {
          const valid = await bcrypt.compare(password, dbUser.passwordHash);
          if (!valid) return null;
          return {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role,
            home: getRoleHome(dbUser.role)
          };
        }

        const demo = demoUsers[email as keyof typeof demoUsers];
        if (demo && password === "OrbitDemo!2026") {
          return {
            id: email,
            email,
            name: demo.name,
            role: demo.role,
            home: getRoleHome(demo.role)
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.home = (user as { home?: string }).home;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.home = token.home as string;
        session.user.id = token.sub || "";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
};
