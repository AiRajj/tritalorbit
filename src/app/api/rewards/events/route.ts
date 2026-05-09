import { Role } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, hasAnyRole } from "@/lib/services/access";
import { awardRewardPoints } from "@/lib/services/rewards";
import { rewardEventSchema } from "@/lib/validators/wave2";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const candidateId = url.searchParams.get("candidateId");

  try {
    if (session.user.role === Role.CANDIDATE) {
      const candidate = await prisma.candidate.findUnique({
        where: { userId: session.user.id },
        select: { id: true }
      });
      if (!candidate) return NextResponse.json({ events: [] });

      const events = await prisma.rewardEvent.findMany({
        where: { candidateId: candidate.id },
        orderBy: { createdAt: "desc" },
        take: 50
      });
      return NextResponse.json({ events });
    }

    if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) return NextResponse.json({ events: [] });

      const events = await prisma.rewardEvent.findMany({
        where: {
          agencyId,
          ...(candidateId ? { candidateId } : {})
        },
        include: {
          candidate: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: "desc" },
        take: 100
      });

      return NextResponse.json({ events });
    }

    if (session.user.role === Role.SUPER_ADMIN) {
      const events = await prisma.rewardEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 200
      });
      return NextResponse.json({ events });
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Unable to load reward events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER, Role.SUPER_ADMIN])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const parsed = rewardEventSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid reward event payload" }, { status: 400 });
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: parsed.data.candidateId },
      select: { id: true, agencyId: true, userId: true }
    });
    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    if (session.user.role !== Role.SUPER_ADMIN) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId || agencyId !== candidate.agencyId) {
        return NextResponse.json({ error: "Candidate not found in your agency" }, { status: 403 });
      }
    }

    const result = await awardRewardPoints({
      prisma,
      candidateId: candidate.id,
      agencyId: candidate.agencyId,
      type: parsed.data.type,
      points: parsed.data.points,
      description: parsed.data.description,
      metadata: parsed.data.metadata as Prisma.InputJsonValue | undefined,
      awardedById: session.user.id
    });

    if (candidate.userId) {
      await prisma.notification.create({
        data: {
          userId: candidate.userId,
          type: "INFO",
          title: "Orbit Rewards points added",
          message: `You received ${parsed.data.points} points for ${parsed.data.description}.`
        }
      });
    }

    return NextResponse.json({
      eventId: result.event.id,
      pointsBalance: result.updatedAccount.pointsBalance,
      tier: result.updatedAccount.tier
    });
  } catch {
    return NextResponse.json({ error: "Unable to award reward points" }, { status: 500 });
  }
}
