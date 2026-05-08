export type RiskInput = {
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

export function computeRiskScore(input: RiskInput) {
  let score = 40;

  if (!input.viewedOffer) score += 15;
  if (input.hoursSinceSent > 24) score += 10;
  if (!input.housingRequested && input.daysToStart <= 10) score += 15;
  if (!input.travelRequested && input.daysToStart <= 7) score += 10;
  if (input.locationDifficulty >= 8) score += 10;
  if (input.engagementScore < 50) score += 15;
  if (input.unansweredMessages > 3) score += 10;
  if (["DECLINED", "BACKOUT_RISK", "CANCELLED"].includes(input.offerStatus)) score += 20;
  if (input.payPackage < 1800) score += 6;

  score = Math.max(0, Math.min(100, score));

  const label =
    score >= 85 ? "Critical" : score >= 70 ? "High" : score >= 45 ? "Medium" : "Low";

  const reasoning =
    label === "Critical"
      ? "High friction and low confidence indicators are stacking before start date."
      : label === "High"
        ? "Multiple readiness and engagement gaps suggest elevated backout risk."
        : label === "Medium"
          ? "Risk is manageable but requires proactive mobility support touchpoints."
          : "Candidate trajectory is stable with low immediate friction.";

  return {
    score,
    label,
    reasoning,
    suggestedAction:
      "Schedule a focused recruiter + concierge touchpoint to remove housing/travel blockers in the next 24 hours.",
    suggestedSms:
      "We can simplify your move with verified housing/travel options today. Want us to lock this in together?",
    suggestedCallScript:
      "Open by confirming assignment goals, then close friction points with specific mobility options and timeline certainty."
  };
}
