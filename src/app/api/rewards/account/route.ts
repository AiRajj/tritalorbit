import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";
import { getOrCreateRewardsAccount } from "@/lib/services/rewards";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const candidateIdParam = url.searchParams.get("candidateId");

  try {
    let candidateId: string | null = null;

    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      candidateId = candidate?.id ?? null;
    } else if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      if (!candidateIdParam) {
        return NextResponse.json({ error: "candidateId query param is required" }, { status: 400 });
      }
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) {
        return NextResponse.json({ error: "Agency context not found" }, { status: 404 });
      }
      const candidate = await prisma.candidate.findUnique({
        where: { id: candidateIdParam },
        select: { id: true, agencyId: true }
      });
      if (!candidate || candidate.agencyId !== agencyId) {
        return NextResponse.json({ error: "Candidate not found in agency" }, { status: 404 });
      }
      candidateId = candidate.id;
    } else if (session.user.role === Role.SUPER_ADMIN) {
      if (!candidateIdParam) {
        return NextResponse.json({ error: "candidateId query param is required" }, { status: 400 });
      }
      candidateId = candidateIdParam;
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!candidateId) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const account = await getOrCreateRewardsAccount(prisma, candidateId);

    const [events, redemptions] = await Promise.all([
      prisma.rewardEvent.findMany({
        where: { candidateId },
        orderBy: { createdAt: "desc" },
        take: 40
      }),
      prisma.rewardRedemption.findMany({
        where: { candidateId },
        orderBy: { requestedAt: "desc" },
        take: 20
      })
    ]);

    return NextResponse.json({ account, events, redemptions });
  } catch {
    return NextResponse.json({ error: "Unable to load rewards account" }, { status: 500 });
  }
}
