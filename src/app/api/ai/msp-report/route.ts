import { NextResponse } from "next/server";
import { z } from "zod";

import { generateAiResponse } from "@/lib/ai";

const schema = z.object({
  acceptanceRate: z.number(),
  backoutRate: z.number(),
  readinessRate: z.number(),
  showUpRate: z.number(),
  supportUtilization: z.number(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const fallback = `Executive summary: Mobility-enabled assignments show strong conversion and readiness outcomes.\nAcceptance rate: ${parsed.data.acceptanceRate}%\nBackout rate: ${parsed.data.backoutRate}%\nReadiness rate: ${parsed.data.readinessRate}%\nFirst-day show-up: ${parsed.data.showUpRate}%\nUtilization: ${parsed.data.supportUtilization}%\nRecommendation: Expand mobility perks in hard-to-fill markets and enforce concierge SLAs in first 72 hours.`;

  const ai = await generateAiResponse({
    prompt: `Create MSP executive summary using metrics: acceptance ${parsed.data.acceptanceRate}, backout ${parsed.data.backoutRate}, readiness ${parsed.data.readinessRate}, showUp ${parsed.data.showUpRate}, supportUtilization ${parsed.data.supportUtilization}.`,
    fallback,
  });

  return NextResponse.json(ai);
}
