import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    })
  } catch {
    return new Proxy({} as PrismaClient, {
      get: (_target, prop) => {
        if (prop === "$connect" || prop === "$disconnect") {
          return () => Promise.resolve()
        }
        return new Proxy(() => {}, {
          get: () => () => Promise.resolve(null),
          apply: () => Promise.resolve(null),
        })
      },
    })
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

export default db
