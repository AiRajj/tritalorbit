import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { requireApiRole } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireApiRole([
    Role.SUPER_ADMIN,
    Role.AGENCY_OWNER,
    Role.RECRUITER,
    Role.CONCIERGE_MANAGER,
    Role.MSP_VIEWER,
    Role.CANDIDATE,
    Role.VENDOR_LANDLORD,
  ]);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: auth.session.user.id },
    orderBy: { createdAt: "desc" },
    take: 15,
  });

  return NextResponse.json({ notifications });
}
