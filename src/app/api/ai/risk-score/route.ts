import { NextResponse } from "next/server";
import { z } from "zod";

import { handleRiskScoreAutomation } from "@/lib/automation";
import { generateAiResponse } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  viewedOffer: z.boolean(),
  hoursSinceOfferSent: z.number(),
  housingRequested: z.boolean(),
  travelRequested: z.boolean(),
  startDateDaysAway: z.number(),
  payPackage: z.number(),
  locationDifficulty: z.number().min(1).max(10),
  engagementScore: z.number().min(0).max(100),
  unansweredMessages: z.number(),
  offerStatus: z.string(),
  offerId: z.string().uuid().optional(),
  candidateId: z.string().uuid().optional(),
  recruiterId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const base =
    (parsed.data.unansweredMessages * 8 +
      (parsed.data.viewedOffer ? 0 : 15) +
      Math.max(0, 72 - parsed.data.hoursSinceOfferSent) / 3 +
      parsed.data.locationDifficulty * 3 +
      (parsed.data.startDateDaysAway < 7 ? 20 : 0) +
      (100 - parsed.data.engagementScore) * 0.35) /
    1.2;
  const score = Math.max(5, Math.min(98, Math.round(base)));

  const label = score > 85 ? "CRITICAL" : score > 70 ? "HIGH" : score > 45 ? "MEDIUM" : "LOW";

  const fallback = `Risk score: ${score}\nLabel: ${label}\nReasoning: Candidate engagement and timeline indicate elevated placement friction.\nSuggested recruiter action: Prioritize housing and travel closure in next touchpoint.\nSuggested SMS: "I want to make your move simple—can we finalize your housing and travel support preferences today?"\nSuggested call script: "Let’s remove any blockers right now so your start is fully supported and stress-free."`;

  const ai = await generateAiResponse({
    prompt: `Given risk score ${score} and label ${label}, provide reasoning, recruiter action, sms, and call script with concise bullet structure.`,
    fallback,
  });

  if (parsed.data.candidateId) {
    await prisma.retentionRiskScore.create({
      data: {
        candidateId: parsed.data.candidateId,
        offerId: parsed.data.offerId,
        score,
        label,
        reasoning: ai.content,
        suggestedAction: "Prioritize concierge-backed close conversation in next 24 hours.",
        suggestedSms:
          "I want to make this assignment transition seamless. Can we quickly align on housing and launch support today?",
        suggestedCallScript:
          "Let’s walk through the move support package so your first day is fully set up and stress-free.",
      },
    });
  }

  if (parsed.data.offerId && parsed.data.candidateId && parsed.data.recruiterId) {
    await handleRiskScoreAutomation({
      offerId: parsed.data.offerId,
      candidateId: parsed.data.candidateId,
      recruiterId: parsed.data.recruiterId,
      score,
    });
  }

  return NextResponse.json({ score, label, ...ai });
}
