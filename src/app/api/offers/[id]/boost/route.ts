import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { offerBoostAgent } from "@/lib/ai/agents";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const offer = await prisma.offer.findUnique({
    where: { id },
    include: { candidate: true },
  });
  if (!offer) return NextResponse.json({ ok: false, error: "Offer not found" }, { status: 404 });

  const perks: string[] = [];
  if (offer.flightSupport) perks.push("Flight support");
  if (offer.housingAssist) perks.push("Housing assistance");
  if (offer.carRental) perks.push("Car rental");
  if (offer.relocationConcierge) perks.push("Relocation concierge");
  if (offer.firstWeekReadiness) perks.push("First-week readiness");
  if (offer.emergencyHousing) perks.push("Emergency housing");
  if (offer.loyaltyRewards) perks.push("Loyalty rewards");

  const result = await offerBoostAgent({
    candidateName: `${offer.candidate.firstName} ${offer.candidate.lastName}`.trim(),
    role: offer.candidate.role ?? offer.specialty ?? undefined,
    specialty: offer.specialty ?? undefined,
    facilityName: offer.facilityName,
    city: offer.city,
    state: offer.state,
    weeklyPay: offer.weeklyPay ? Number(offer.weeklyPay) : null,
    durationWeeks: offer.durationWeeks ?? null,
    startDate: offer.startDate ? offer.startDate.toISOString() : null,
    perks,
  });

  await prisma.offer.update({
    where: { id },
    data: {
      enhancedSummary: result.enhancedSummary,
      candidateValueStmt: result.candidateValueStmt,
      recruiterTalkingPoints: result.recruiterTalkingPoints.join("\n• "),
      smsPitch: result.smsPitch,
      emailPitch: result.emailPitch,
      closeStrategy: result.closeStrategy,
      confidenceScore: result.confidenceScore,
    },
  });

  await prisma.aIInsight.create({
    data: {
      agent: "OFFER_BOOST",
      prompt: JSON.stringify({ offerId: id }),
      output: JSON.stringify(result),
      actorId: session.user.id,
      candidateId: offer.candidateId,
      metadata: { offerId: id },
    },
  });

  await prisma.activityLog.create({
    data: {
      actorId: session.user.id,
      candidateId: offer.candidateId,
      offerId: offer.id,
      action: "offer.boosted",
      description: `AI Offer Boost generated (confidence ${result.confidenceScore}/100).`,
    },
  });

  return NextResponse.json({ ok: true, result });
}
