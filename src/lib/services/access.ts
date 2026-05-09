import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getAgencyIdForUser(userId: string) {
  const [membership, ownership] = await Promise.all([
    prisma.agencyMember.findFirst({ where: { userId }, select: { agencyId: true } }),
    prisma.agency.findFirst({ where: { ownerId: userId }, select: { id: true } })
  ]);

  return membership?.agencyId ?? ownership?.id ?? null;
}

export async function getCandidateForUser(userId: string) {
  return prisma.candidate.findUnique({
    where: { userId },
    select: {
      id: true,
      agencyId: true
    }
  });
}

export async function getVendorForUser(userId: string) {
  return prisma.vendor.findFirst({
    where: { ownerId: userId },
    select: { id: true }
  });
}

export function hasAnyRole(userRole: Role, allowedRoles: Role[]) {
  return allowedRoles.includes(userRole);
}
