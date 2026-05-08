import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { runAiAgent } from "@/lib/services/ai";
import { setHighRiskAlert } from "@/lib/services/automation";
import { computeRiskScore } from "@/lib/services/risk";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    candidateId?: string;
    offerId?: string;
    assignmentId?: string;
    viewedOffer: boolean;
    hoursSinceSent: number;
    housingRequested: boolean;
    travelRequested: boolean;
    daysToStart: number;
    payPackage: number;
    locationDifficulty: number;
    engagementScore: number;
    unansweredMessages: number;
    offerStatus: string;
  };

  const risk = computeRiskScore(body);
  const ai = await runAiAgent(
    "Retention Risk AI Agent",
    `Provide intervention summary for risk ${risk.score} and label ${risk.label}`
  );

  if (body.candidateId) {
    await prisma.retentionRiskScore.create({
      data: {
        candidateId: body.candidateId,
        assignmentId: body.assignmentId,
        offerId: body.offerId,
        score: risk.score,
        label: risk.label,
        reasoning: risk.reasoning,
        suggestedAction: risk.suggestedAction,
        suggestedSms: risk.suggestedSms,
        suggestedCallScript: risk.suggestedCallScript
      }
    });
  }

  if (body.offerId) {
    await prisma.aIInsight.create({
      data: {
        type: "RISK_SCORE",
        candidateId: body.candidateId,
        assignmentId: body.assignmentId,
        offerId: body.offerId,
        title: `Retention risk: ${risk.label}`,
        content: `${risk.reasoning}\n${ai.summary}\n${ai.bullets.join("\n")}`,
        model: ai.mock ? "fallback-mock" : "openai"
      }
    });

    const offer = await prisma.offer.findUnique({
      where: { id: body.offerId },
      select: { recruiterId: true }
    });

    if (offer) {
      await setHighRiskAlert({ offerId: body.offerId, recruiterId: offer.recruiterId, score: risk.score });
    }
  }

  return NextResponse.json({ ...risk, aiSummary: ai.summary, aiBullets: ai.bullets, mocked: ai.mock });
}
