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
      estimatedSavings: 184200,
      timeToReadyDays: 6.2,
      mobilityUtilizationRate: 0.81
    },
    supplierRankings: [
      { supplier: "Northstar Staffing", readinessScore: 92, backoutRate: 0.06, savings: 54200 },
      { supplier: "Summit Clinical Group", readinessScore: 88, backoutRate: 0.09, savings: 43100 },
      { supplier: "PrimeShift Talent", readinessScore: 83, backoutRate: 0.12, savings: 36700 },
      { supplier: "BlueArc Staffing", readinessScore: 78, backoutRate: 0.14, savings: 29400 }
    ],
    readinessByWeek: [
      { week: "W1", readiness: 71, showUp: 82 },
      { week: "W2", readiness: 75, showUp: 85 },
      { week: "W3", readiness: 79, showUp: 88 },
      { week: "W4", readiness: 83, showUp: 90 },
      { week: "W5", readiness: 86, showUp: 91 }
    ],
    activeRisks: [
      "7 assignments start within 5 days with travel not confirmed",
      "3 suppliers above baseline housing friction threshold",
      "2 markets showing elevated first-week checklist incompletion"
    ],
    aiSummary: ai
  });
}
