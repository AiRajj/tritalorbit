import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";

export async function requireApiRole(roles: Role[]) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 as const };
  }

  if (!roles.includes(session.user.role)) {
    return { error: "Forbidden", status: 403 as const };
  }

  return { session };
}
