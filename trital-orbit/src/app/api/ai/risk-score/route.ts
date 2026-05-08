import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { calculateRetentionRisk } from "@/lib/ai";
import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({
  candidateId: z.string(),
  offerId: z.string().optional(),
  candidateName: z.string(),
  hasViewedOffer: z.boolean(),
  hoursSinceOfferSent: z.number(),
  housingRequested: z.boolean(),
  travelRequested: z.boolean(),
  daysToStartDate: z.number().nullable(),
  weeklyPay: z.number().nullable(),
  locationDifficulty: z.number().default(5),
  engagementScore: z.number().default(50),
  unansweredMessages: z.number().default(0),
  offerStatus: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const result = await calculateRetentionRisk(data);

    // Save risk score to database
    await prisma.retentionRiskScore.create({
      data: {
        candidateId: data.candidateId,
        offerId: data.offerId,
        score: result.score,
        riskLevel: result.riskLevel,
        reasoning: result.reasoning,
        suggestedAction: result.suggestedAction,
        suggestedSMS: result.suggestedSMS,
        suggestedCallScript: result.suggestedCallScript,
        hasViewedOffer: data.hasViewedOffer,
        hoursSinceOfferSent: data.hoursSinceOfferSent,
        housingRequested: data.housingRequested,
        travelRequested: data.travelRequested,
        daysToStartDate: data.daysToStartDate,
        weeklyPay: data.weeklyPay,
        locationDifficulty: data.locationDifficulty,
        engagementScore: data.engagementScore,
        unansweredMessages: data.unansweredMessages,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 });
    }
    console.error("[AI_RISK_SCORE]", error);
    return NextResponse.json({ error: "Risk calculation failed" }, { status: 500 });
  }
}
