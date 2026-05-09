import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";

const redemptionStatuses = ["REQUESTED", "APPROVED", "FULFILLED", "REJECTED", "CANCELLED"] as const;

function parseStatus(raw: string | null) {
  if (!raw) return undefined;
  return redemptionStatuses.includes(raw as (typeof redemptionStatuses)[number])
    ? (raw as (typeof redemptionStatuses)[number])
    : undefined;
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const status = parseStatus(url.searchParams.get("status"));

  try {
    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate) return NextResponse.json({ redemptions: [] });

      const redemptions = await prisma.rewardRedemption.findMany({
        where: {
          candidateId: candidate.id,
          ...(status ? { status } : {})
        },
        orderBy: { requestedAt: "desc" },
        take: 40
      });

      return NextResponse.json({ redemptions });
    }

    if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) return NextResponse.json({ redemptions: [] });

      const redemptions = await prisma.rewardRedemption.findMany({
        where: {
          agencyId,
          ...(status ? { status } : {})
        },
        include: {
          candidate: { select: { id: true, name: true } }
        },
        orderBy: { requestedAt: "desc" },
        take: 100
      });

      return NextResponse.json({ redemptions });
    }

    if (session.user.role === Role.SUPER_ADMIN) {
      const redemptions = await prisma.rewardRedemption.findMany({
        where: status ? { status } : undefined,
        orderBy: { requestedAt: "desc" },
        take: 200
      });
      return NextResponse.json({ redemptions });
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Unable to load redemptions" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER, Role.SUPER_ADMIN])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      redemptionId?: string;
      status?: "APPROVED" | "FULFILLED" | "REJECTED" | "CANCELLED";
    };

    if (!body.redemptionId || !body.status) {
      return NextResponse.json({ error: "redemptionId and status are required" }, { status: 400 });
    }

    const redemption = await prisma.rewardRedemption.findUnique({
      where: { id: body.redemptionId },
      select: { id: true, agencyId: true, candidateId: true, status: true }
    });
    if (!redemption) {
      return NextResponse.json({ error: "Redemption not found" }, { status: 404 });
    }

    if (session.user.role !== Role.SUPER_ADMIN) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId || agencyId !== redemption.agencyId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const updated = await prisma.rewardRedemption.update({
      where: { id: redemption.id },
      data: {
        status: body.status,
        fulfilledAt: body.status === "FULFILLED" ? new Date() : null
      }
    });

    return NextResponse.json({ id: updated.id, status: updated.status });
  } catch {
    return NextResponse.json({ error: "Unable to update redemption status" }, { status: 500 });
  }
}
