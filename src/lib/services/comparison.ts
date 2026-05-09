import { ComparisonSourceType, Prisma } from "@prisma/client";
import { runAiAgent } from "@/lib/services/ai";

type CandidateInput = {
  label: string;
  sourceType: ComparisonSourceType;
  weeklyPay: number;
  stipend: number;
  durationWeeks: number;
  city: string;
  state: string;
  travelSupportScore: number;
  housingSupportScore: number;
  readinessSupportScore: number;
  costOfLivingIndex: number;
  notes?: string;
  internalOfferId?: string;
  externalOfferId?: string;
};

export function calculateComparisonScores(item: CandidateInput) {
  const grossContract = (item.weeklyPay + item.stipend) * item.durationWeeks;
  const supportComposite =
    (item.travelSupportScore + item.housingSupportScore + item.readinessSupportScore) / 3;
  const adjustedValue = grossContract / Math.max(0.5, item.costOfLivingIndex);
  const valueScore = Number(Math.min(100, adjustedValue / 450).toFixed(2));
  const lifestyleScore = Number(
    Math.min(100, supportComposite * 0.8 + (item.costOfLivingIndex <= 1.2 ? 20 : 10)).toFixed(2)
  );

  return {
    totalValueScore: valueScore,
    lifestyleScore
  };
}

export function deriveBestOverallLabel(items: Array<CandidateInput & { totalValueScore: number; lifestyleScore: number }>) {
  if (items.length === 0) return "No comparison data";

  const ranked = [...items].sort((a, b) => {
    const scoreA = a.totalValueScore * 0.6 + a.lifestyleScore * 0.4;
    const scoreB = b.totalValueScore * 0.6 + b.lifestyleScore * 0.4;
    return scoreB - scoreA;
  });

  return ranked[0].label;
}

export async function generateComparisonNarrative(
  entries: Array<CandidateInput & { totalValueScore: number; lifestyleScore: number }>
) {
  if (entries.length === 0) {
    return {
      title: "No comparison data available",
      summary: "Add at least two offers to run a meaningful comparison.",
      insights: []
    };
  }

  const prompt = `Compare these healthcare assignment offers and return summary guidance.\n${entries
    .map(
      (entry) =>
        `${entry.label}: weeklyPay=${entry.weeklyPay}, stipend=${entry.stipend}, duration=${entry.durationWeeks}, city=${entry.city}, state=${entry.state}, travelSupport=${entry.travelSupportScore}, housingSupport=${entry.housingSupportScore}, readiness=${entry.readinessSupportScore}, costOfLiving=${entry.costOfLivingIndex}, valueScore=${entry.totalValueScore}, lifestyleScore=${entry.lifestyleScore}`
    )
    .join("\n")}`;

  const ai = await runAiAgent("Multi-Offer Comparison AI", prompt);
  const title = "Best Overall Assignment Experience";
  return {
    title,
    summary: ai.summary,
    insights: ai.bullets
  };
}

export function toDecimal(value: number) {
  return new Prisma.Decimal(value);
}
