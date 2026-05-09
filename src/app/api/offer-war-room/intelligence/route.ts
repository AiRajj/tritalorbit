import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser } from "@/lib/services/access";
import { listOfferWarRoom } from "@/lib/services/phase3";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agencyId = await getAgencyIdForUser(session.user.id);
  if (!agencyId) {
    return NextResponse.json({ items: [] });
  }

  const items = await listOfferWarRoom(agencyId);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agencyId = await getAgencyIdForUser(session.user.id);
  if (!agencyId) {
    return NextResponse.json({ error: "Agency not found" }, { status: 400 });
  }

  const payload = (await request.json()) as { offerId?: string; candidateId?: string; assignmentId?: string };
  if (!payload.offerId || !payload.candidateId || !payload.assignmentId) {
    return NextResponse.json({ error: "offerId, candidateId, assignmentId required" }, { status: 400 });
  }

  const intelligence = await prisma.offerIntelligence.create({
    data: {
      offerId: payload.offerId,
      candidateId: payload.candidateId,
      assignmentId: payload.assignmentId,
      agencyId,
      closeProbability: 0.67,
      engagementScore: 0.71,
      mobilityFrictionScore: 0.39,
      payCompetitivenessScore: 0.65,
      urgencyScore: 0.82,
      recommendedAction: "Offer housing support plus travel credit.",
      recommendedSMS: "We can secure housing + flight credits so your first week is fully covered.",
      recommendedEmail: "Let's lock your assignment with full mobility support details.",
      recommendedCallScript: "Focus on first-week confidence, commute, and housing assurance."
    }
  });

  return NextResponse.json({ intelligence }, { status: 201 });
}
