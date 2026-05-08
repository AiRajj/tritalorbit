import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createRecruiterAlertIfNotViewed, setHighRiskAlert } from "@/lib/services/automation";
import { computeRiskScore } from "@/lib/services/risk";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const sentThreshold = new Date(now - 1000 * 60 * 60 * 2);

  const staleOffers = await prisma.offer.findMany({
    where: {
      status: "SENT",
      sentAt: { lte: sentThreshold }
    },
    include: {
      assignment: true,
      candidate: true
    }
  });

  for (const offer of staleOffers) {
    await createRecruiterAlertIfNotViewed({ offerId: offer.id, recruiterId: offer.recruiterId });
  }

  const housingFrictionOffers = await prisma.offer.findMany({
    where: {
      assignment: {
        startDate: { lte: new Date(now + 1000 * 60 * 60 * 24 * 7) },
        housingStatus: "NOT_STARTED"
      },
      status: { in: ["SENT", "VIEWED", "ACCEPTED"] }
    },
    include: { candidate: true, assignment: true }
  });

  for (const offer of housingFrictionOffers) {
    const risk = computeRiskScore({
      viewedOffer: offer.status !== "SENT",
      hoursSinceSent: offer.sentAt ? Math.round((now - offer.sentAt.getTime()) / (1000 * 60 * 60)) : 48,
      housingRequested: false,
      travelRequested: true,
      daysToStart: Math.max(0, Math.round((offer.assignment.startDate.getTime() - now) / (1000 * 60 * 60 * 24))),
      payPackage: Number(offer.weeklyPay),
      locationDifficulty: 7,
      engagementScore: offer.candidate.engagementScore,
      unansweredMessages: offer.candidate.unreadMessageCount,
      offerStatus: offer.status
    });

    await setHighRiskAlert({ offerId: offer.id, recruiterId: offer.recruiterId, score: risk.score });
  }

  const housingViewedNotAccepted = await prisma.activityLog.findMany({
    where: { action: "candidate.clicked_housing" },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  for (const event of housingViewedNotAccepted) {
    if (!event.offerId || !event.candidateId) continue;

    const accepted = await prisma.activityLog.findFirst({
      where: {
        offerId: event.offerId,
        candidateId: event.candidateId,
        action: "candidate.accepted_offer"
      }
    });

    if (!accepted) {
      const offer = await prisma.offer.findUnique({ where: { id: event.offerId } });
      if (!offer) continue;

      await prisma.aIInsight.create({
        data: {
          type: "RISK_SCORE",
          candidateId: event.candidateId,
          assignmentId: event.assignmentId,
          offerId: event.offerId,
          title: "Housing interest without acceptance",
          content:
            "Candidate engaged housing options without accepting. Recommend a concierge-led follow-up with 2 verified housing choices and immediate move timeline support.",
          model: "automation-rule"
        }
      });
    }
  }

  return NextResponse.json({
    staleOfferAlerts: staleOffers.length,
    housingRiskAlerts: housingFrictionOffers.length,
    followupSignals: housingViewedNotAccepted.length
  });
}
