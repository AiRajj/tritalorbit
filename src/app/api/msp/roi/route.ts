import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { runIntegrationAiAgent } from "@/lib/integrations/ai/openai";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [offers, assignments] = await Promise.all([
    prisma.offer.count(),
    prisma.assignment.count()
  ]);

  const ai = await runIntegrationAiAgent(
    'MSP ROI AI Agent',
    `offers=${offers}, assignments=${assignments}, generate board-level summary.`
  );

  return NextResponse.json({
    metrics: {
      offerAcceptanceRate: 0.73,
      backoutRate: 0.12,
      firstDayShowRate: 0.91,
      estimatedSavings: 184200
    },
    aiSummary: ai
  });
}
