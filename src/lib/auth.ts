import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth-options";
import { ROLE_HOME, type AppRole } from "@/lib/rbac";

export async function getCurrentSession() {
  return getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function requireRole(roles: Role[]) {
  const session = await requireAuth();
  const currentRole = session.user.role;
  if (!roles.includes(currentRole)) {
    redirect(ROLE_HOME[currentRole as AppRole] ?? "/");
  }
  return session;
}
