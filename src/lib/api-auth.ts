import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type ApiSession = {
  user: { id: string; role: Role; email: string; name: string };
};

export type ApiGuardResult<T extends ApiSession = ApiSession> =
  | { ok: true; session: T }
  | { ok: false; response: NextResponse };

export async function requireSession(): Promise<ApiGuardResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { ok: true, session: session as ApiSession };
}

export async function requireRole(roles: Role | Role[]): Promise<ApiGuardResult> {
  const guard = await requireSession();
  if (!guard.ok) return guard;
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(guard.session.user.role)) {
    return { ok: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return guard;
}

export async function getCallerAgencyIds(userId: string): Promise<string[]> {
  const [owned, member] = await Promise.all([
    prisma.agency.findMany({ where: { ownerId: userId }, select: { id: true } }),
    prisma.agencyMember.findMany({ where: { userId }, select: { agencyId: true } })
  ]);
  return Array.from(new Set([...owned.map((a) => a.id), ...member.map((m) => m.agencyId)]));
}

export async function requireAgencyMember(agencyId: string): Promise<ApiGuardResult> {
  const guard = await requireSession();
  if (!guard.ok) return guard;
  if (guard.session.user.role === Role.SUPER_ADMIN) return guard;
  const ids = await getCallerAgencyIds(guard.session.user.id);
  if (!ids.includes(agencyId)) {
    return { ok: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return guard;
}

export async function requireAgencyRole(agencyId: string, roles: Role | Role[]): Promise<ApiGuardResult> {
  const guard = await requireRole(roles);
  if (!guard.ok) return guard;
  if (guard.session.user.role === Role.SUPER_ADMIN) return guard;
  const ids = await getCallerAgencyIds(guard.session.user.id);
  if (!ids.includes(agencyId)) {
    return { ok: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return guard;
}
