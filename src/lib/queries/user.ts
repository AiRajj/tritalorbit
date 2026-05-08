import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

export type SessionUserContext = {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  agencyId: string | null;
  candidateId: string | null;
};

export async function getSessionContext(): Promise<SessionUserContext | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { candidate: true },
  });
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    role: user.role,
    agencyId: user.agencyId ?? null,
    candidateId: user.candidate?.id ?? null,
  };
}

export async function resolveAgencyId(role: UserRole, agencyId: string | null) {
  if (agencyId) return agencyId;
  if (role === "SUPER_ADMIN") {
    const first = await prisma.agency.findFirst({ orderBy: { createdAt: "asc" } });
    return first?.id ?? null;
  }
  return null;
}
