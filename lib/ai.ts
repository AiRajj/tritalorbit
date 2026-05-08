import OpenAI from "openai";

import type { OfferBoostResult, RiskScoreResult } from "@/lib/types";
import { riskScoreSchema } from "@/lib/validations";

const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

function getClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export const mockOfferBoost: OfferBoostResult = {
  enhancedSummary:
    "This assignment combines a strong ICU weekly package with practical mobility support: furnished housing guidance, travel coordination, car rental help, first-week readiness, and emergency lodging coverage if plans shift.",
  valueStatement:
    "You are not just choosing a weekly number. You are choosing a start that already has the hardest parts mapped out, with a recruiter and concierge team ready to help you land smoothly.",
  recruiterTalkingPoints: [
    "Lead with the life logistics: housing, travel, transportation, and support are already included.",
    "Position the assignment as lower-friction than competing offers in the same pay band.",
    "Ask which part of the move feels least certain and route it to concierge immediately."
  ],
  smsPitch:
    "Maya, I packaged this Phoenix ICU offer with housing, travel, car, and first-week support so the move feels clear, not chaotic. Want me to send the assignment hub?",
  emailPitch:
    "Hi Maya,\n\nI built a full assignment plan for Phoenix that includes the weekly package plus mobility support around housing, travel, transportation, and first-week readiness. You can review the offer, see support options, and ask for help from one mobile hub.\n\nBest,\nTRITAL Orbit",
  pdfReadyOffer:
    "TRITAL Orbit Enhanced Offer: ICU assignment, Phoenix AZ, $2,680 weekly pay, 13 weeks, nights, with housing assistance, flight support, car rental coordination, relocation concierge, first-week readiness, and loyalty rewards.",
  closeStrategy:
    "Anchor on certainty: confirm housing timing, remove travel ambiguity, and invite the candidate to accept after reviewing the mobile hub.",
  confidenceScore: 86
};

export function calculateRetentionRisk(input: unknown): RiskScoreResult {
  const data = riskScoreSchema.parse(input);
  let score = 18;

  if (!data.viewedOffer && data.hoursSinceSent >= 2) score += 18;
  if (data.viewedOffer) score -= 6;
  if (!data.housingRequested && data.daysUntilStart <= 7) score += 22;
  if (!data.travelRequested && data.daysUntilStart <= 5) score += 12;
  score += Math.round(data.locationDifficulty * 0.18);
  score += Math.max(0, 70 - data.engagementScore) * 0.35;
  score += data.unansweredMessages * 7;
  if (data.weeklyPay < 2200) score += 10;
  if (["BACKOUT_RISK", "VIEWED"].includes(data.offerStatus)) score += data.offerStatus === "BACKOUT_RISK" ? 20 : 4;
  score = Math.max(0, Math.min(100, Math.round(score)));

  const label = score >= 85 ? "Critical" : score >= 65 ? "High" : score >= 40 ? "Medium" : "Low";
  return {
    score,
    label,
    reasoning:
      label === "Critical"
        ? "Multiple backout indicators are converging: start-date proximity, unresolved mobility support, and low engagement."
        : label === "High"
          ? "The candidate shows meaningful friction around readiness or engagement that should be handled before another offer competes."
          : label === "Medium"
            ? "There are some logistics or engagement signals to resolve, but the assignment is still recoverable with a targeted follow-up."
            : "Engagement and readiness signals are healthy. Keep reinforcing support and next steps.",
    suggestedRecruiterAction:
      score >= 65
        ? "Call the candidate, confirm the biggest mobility concern, and create a concierge task during the conversation."
        : "Send a concise reassurance message with the candidate hub link and one clear next step.",
    suggestedSms:
      "I want to make the move side easy, not just talk about pay. Which part should we lock down first: housing, travel, or first-week logistics?",
    suggestedCallScript:
      "Open with certainty: 'I saw where the assignment logistics may still feel unresolved. Let's solve the move plan first, then decide if this assignment is still the right fit.'"
  };
}

async function callJsonAgent<T>(system: string, payload: unknown, fallback: T): Promise<T> {
  const client = getClient();
  if (!client) return fallback;

  try {
    const completion = await client.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify(payload) }
      ],
      temperature: 0.35
    });
    const content = completion.choices[0]?.message.content;
    if (!content) return fallback;
    return JSON.parse(content) as T;
  } catch (error) {
    console.error("AI agent failed; returning professional mock response.", error);
    return fallback;
  }
}

export async function runOfferBoostAgent(payload: unknown) {
  return callJsonAgent<OfferBoostResult>(
    "You are the Offer Boost AI Agent for TRITAL Orbit. Return JSON with enhancedSummary, valueStatement, recruiterTalkingPoints array, smsPitch, emailPitch, pdfReadyOffer, closeStrategy, confidenceScore.",
    payload,
    mockOfferBoost
  );
}

export async function runRiskScoreAgent(payload: unknown) {
  const fallback = calculateRetentionRisk(payload);
  return callJsonAgent<RiskScoreResult>(
    "You are the Retention Risk AI Agent for healthcare staffing offers. Return JSON with score, label, reasoning, suggestedRecruiterAction, suggestedSms, suggestedCallScript.",
    payload,
    fallback
  );
}

export async function runReadinessAgent(payload: unknown) {
  return callJsonAgent(
    "You are the Assignment Readiness AI Agent. Return JSON with readinessScore, gaps array, nextBestActions array, executiveSummary.",
    payload,
    {
      readinessScore: 78,
      gaps: ["Housing selection not confirmed", "License document expires before assignment end"],
      nextBestActions: ["Confirm housing by text today", "Request updated license upload"],
      executiveSummary:
        "The assignment is on track if housing is confirmed in the next 24 hours and the license update is collected before travel."
    }
  );
}

export async function runConciergeAgent(payload: unknown) {
  return callJsonAgent(
    "You are the Concierge AI Agent. Return JSON with requestSummary, suggestedTasks array, candidateUpdateDraft, vendorRecommendations array.",
    payload,
    {
      requestSummary: "Candidate needs furnished housing near the facility and flight support before the move date.",
      suggestedTasks: ["Send two verified housing options", "Confirm move budget", "Prepare travel reimbursement note"],
      candidateUpdateDraft:
        "We are narrowing housing options near your facility and will send verified choices with distance, cost, and availability.",
      vendorRecommendations: ["Arcadia Furnished Clinical Suite", "Desert Ridge Extended Stay"]
    }
  );
}

export async function runMspReportAgent(payload: unknown) {
  return callJsonAgent(
    "You are the MSP Reporting AI Agent. Return JSON with executiveSummary, acceptanceRateNarrative, backoutReductionNarrative, supplierPerformance, recommendedActions array.",
    payload,
    {
      executiveSummary:
        "Mobility support is improving acceptance and readiness while reducing preventable backouts in markets with housing pressure.",
      acceptanceRateNarrative: "Acceptance increased where offers included candidate-facing mobility perks.",
      backoutReductionNarrative: "Backouts declined when housing was resolved before the final verbal commitment.",
      supplierPerformance: "Top suppliers are using concierge tasks earlier in the offer cycle.",
      recommendedActions: ["Expand verified housing coverage", "Require launch readiness review seven days before start"]
    }
  );
}
