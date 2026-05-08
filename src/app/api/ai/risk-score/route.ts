import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { retentionRiskAgent } from "@/lib/ai/agents";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  candidateName: z.string().min(1),
  hoursSinceOfferSent: z.number().optional(),
  hasViewed: z.boolean().optional(),
  housingRequested: z.boolean().optional(),
  travelRequested: z.boolean().optional(),
  daysToStart: z.number().optional(),
  weeklyPay: z.number().nullable().optional(),
  locationDifficulty: z.enum(["low", "medium", "high"]).optional(),
  engagementScore: z.number().optional(),
  unansweredMessages: z.number().optional(),
  status: z.string().optional(),
  candidateId: z.string().optional(),
  offerId: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }
  const out = await retentionRiskAgent(parsed.data);
  if (parsed.data.candidateId) {
    try {
      await prisma.retentionRiskScore.create({
        data: {
          candidateId: parsed.data.candidateId,
          offerId: parsed.data.offerId ?? null,
          score: out.score,
          level: out.level,
          reasoning: out.reasoning,
          suggestedAction: out.suggestedAction,
          suggestedSms: out.suggestedSms,
          suggestedCallScript: out.suggestedCallScript,
        },
      });
    } catch {
      /* non-fatal */
    }
  }
  return NextResponse.json({ ok: true, result: out });
}
