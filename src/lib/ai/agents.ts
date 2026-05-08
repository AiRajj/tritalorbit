import { openaiChat, isAIConfigured } from "./openai";

export type OfferBoostInput = {
  candidateName: string;
  role?: string;
  specialty?: string;
  facilityName: string;
  city: string;
  state: string;
  weeklyPay?: number | null;
  durationWeeks?: number | null;
  startDate?: string | null;
  perks: string[];
};

export type OfferBoostOutput = {
  enhancedSummary: string;
  candidateValueStmt: string;
  recruiterTalkingPoints: string[];
  smsPitch: string;
  emailPitch: string;
  closeStrategy: string;
  confidenceScore: number;
};

export async function offerBoostAgent(
  input: OfferBoostInput,
): Promise<OfferBoostOutput> {
  const perks = input.perks.length ? input.perks : ["full mobility support"];
  const pay = input.weeklyPay ? `$${Math.round(input.weeklyPay).toLocaleString()}/wk` : "competitive weekly compensation";
  const duration = input.durationWeeks ? `${input.durationWeeks}-week` : "multi-week";
  const facility = input.facilityName || "the facility";
  const role = input.role || input.specialty || "clinician";

  // AI path
  if (isAIConfigured()) {
    const system =
      "You are TRITAL Orbit's Offer Boost Agent. You write tight, premium, recruiter-grade copy for healthcare staffing offers. Output JSON with keys: enhancedSummary, candidateValueStmt, recruiterTalkingPoints (array of 5 strings), smsPitch (under 280 chars), emailPitch, closeStrategy, confidenceScore (0-100 integer).";
    const user = `Build the enhanced offer for: ${JSON.stringify(input)}.`;
    const out = await openaiChat([
      { role: "system", content: system },
      { role: "user", content: user },
    ], { jsonMode: true });
    if (out) {
      try {
        const parsed = JSON.parse(out) as OfferBoostOutput;
        if (parsed && parsed.enhancedSummary) return parsed;
      } catch {
        /* fall through to mock */
      }
    }
  }

  return {
    enhancedSummary: `${duration} ${role} engagement at ${facility} in ${input.city}, ${input.state} at ${pay}. The package is wrapped in TRITAL Orbit mobility support — ${perks.slice(0, 3).join(", ")} — so the assignment is ready before week one.`,
    candidateValueStmt: `${input.candidateName.split(" ")[0] || "Hi there"}, this is more than a paycheck — it's a turn-key move. We've handled ${perks.slice(0, 2).join(" and ")} so you can focus on patient care, not logistics. ${pay} with the support that makes ${input.city} feel like home from day one.`,
    recruiterTalkingPoints: [
      `Lead with mobility: ${perks[0]} is locked in before signature.`,
      `Anchor on lifestyle, not just pay rate — ${input.city} relocation is handled.`,
      `Quantify the win: ${pay} on a ${duration} contract with stipends optimized.`,
      `Reduce friction: candidate keeps every Orbit perk if assignment renews.`,
      `Close with timeline: housing and travel are pre-confirmed once accepted.`,
    ],
    smsPitch: `Hey ${input.candidateName.split(" ")[0] || "there"} — locked in ${pay} at ${facility} in ${input.city}, plus ${perks[0]?.toLowerCase()}. Want me to send the breakdown? — TRITAL Orbit`,
    emailPitch: `Subject: Your ${role} assignment in ${input.city} — locked, loaded, and Orbit-supported\n\nHi ${input.candidateName.split(" ")[0] || "there"},\n\nI built this one with you in mind. ${pay} at ${facility} for ${duration}. We've already mapped the mobility layer — ${perks.join(", ")} — so day one feels routine, not chaotic.\n\nWant the full package? I can have the offer in your inbox in 60 seconds.\n\nBest,\nYour TRITAL Orbit recruiter`,
    closeStrategy: `Frame this as a lifestyle decision. Open with the readiness package, then anchor pay against the all-in package value. If they hesitate, surface ${perks.slice(-1)[0]?.toLowerCase()} as a tie-breaker. Aim to confirm verbally within 24h, paper within 48h.`,
    confidenceScore: 78 + Math.min(perks.length * 3, 18),
  };
}

// ---------------------------------------------------------------------
// Retention Risk Agent
// ---------------------------------------------------------------------

export type RiskInput = {
  candidateName: string;
  hoursSinceOfferSent?: number;
  hasViewed?: boolean;
  housingRequested?: boolean;
  travelRequested?: boolean;
  daysToStart?: number;
  weeklyPay?: number | null;
  locationDifficulty?: "low" | "medium" | "high";
  engagementScore?: number;
  unansweredMessages?: number;
  status?: string;
};

export type RiskOutput = {
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  reasoning: string;
  suggestedAction: string;
  suggestedSms: string;
  suggestedCallScript: string;
};

export async function retentionRiskAgent(input: RiskInput): Promise<RiskOutput> {
  // Deterministic scoring (used as fallback and as a sanity check)
  let score = 20;
  if (input.hasViewed === false && (input.hoursSinceOfferSent ?? 0) > 2) score += 15;
  if ((input.hoursSinceOfferSent ?? 0) > 24) score += 10;
  if (!input.housingRequested && (input.daysToStart ?? 99) <= 14) score += 18;
  if (!input.travelRequested && (input.daysToStart ?? 99) <= 14) score += 8;
  if ((input.daysToStart ?? 99) <= 7 && !input.housingRequested) score += 20;
  if ((input.engagementScore ?? 60) < 40) score += 12;
  if ((input.unansweredMessages ?? 0) >= 2) score += 8;
  if (input.locationDifficulty === "high") score += 10;
  if (input.status === "DECLINED" || input.status === "WITHDRAWN") score = 95;
  score = Math.max(5, Math.min(99, score));

  let level: RiskOutput["level"] = "LOW";
  if (score >= 75) level = "CRITICAL";
  else if (score >= 55) level = "HIGH";
  else if (score >= 35) level = "MEDIUM";

  const first = input.candidateName.split(" ")[0] || "candidate";

  const reasoning =
    level === "CRITICAL"
      ? `${first} has signals consistent with a likely backout: ${
          !input.hasViewed ? "offer unviewed; " : ""
        }${
          !input.housingRequested ? "no housing requested; " : ""
        }${
          (input.daysToStart ?? 99) <= 7 ? "start date is imminent; " : ""
        }${
          (input.engagementScore ?? 60) < 40 ? "engagement is low; " : ""
        }require recruiter intervention now.`
      : level === "HIGH"
      ? `${first} is at elevated risk. Mobility support has not been activated and the start date is approaching. Stabilize with a concrete next step.`
      : level === "MEDIUM"
      ? `${first} is showing mixed signals. Engagement is moderate but mobility friction remains. Reduce friction proactively.`
      : `${first} is tracking well. Maintain cadence and confirm readiness milestones.`;

  const suggestedAction =
    level === "CRITICAL"
      ? `Call ${first} within the next 60 minutes. Lead with a personalized housing solution and confirm a specific move-in date.`
      : level === "HIGH"
      ? `Send a personalized SMS within 4 hours, then schedule a 15-min call to lock in mobility logistics.`
      : level === "MEDIUM"
      ? `Trigger Orbit Concierge to surface 2 housing options near the facility and follow up tomorrow.`
      : `Continue weekly cadence and confirm Day-1 logistics 7 days before start.`;

  const suggestedSms = `Hi ${first}, your assignment is on my radar — I want to make sure housing & travel are zero-stress before start day. Can I lock in your preferred move-in date today?`;

  const suggestedCallScript = `Open: "Hi ${first}, I'm calling personally because I want this assignment to feel like the right move." Confirm: housing preference, travel mode, must-haves for day one. Pivot: surface our Orbit mobility layer — ${
    input.housingRequested ? "tighten the housing match" : "get housing locked"
  }. Close: agree on a single concrete next step with a date.`;

  // If AI configured, ask it to optionally enhance; otherwise return deterministic.
  if (isAIConfigured()) {
    const out = await openaiChat(
      [
        {
          role: "system",
          content:
            "You are TRITAL Orbit's Retention Risk Agent. Return JSON: {score:int 0-100, level: LOW|MEDIUM|HIGH|CRITICAL, reasoning, suggestedAction, suggestedSms, suggestedCallScript}.",
        },
        { role: "user", content: JSON.stringify(input) },
      ],
      { jsonMode: true, temperature: 0.2 },
    );
    if (out) {
      try {
        const parsed = JSON.parse(out) as RiskOutput;
        if (parsed && typeof parsed.score === "number" && parsed.level) {
          return {
            ...parsed,
            score: Math.max(0, Math.min(99, Math.round(parsed.score))),
          };
        }
      } catch { /* fallback */ }
    }
  }

  return { score, level, reasoning, suggestedAction, suggestedSms, suggestedCallScript };
}

// ---------------------------------------------------------------------
// Assignment Readiness Agent
// ---------------------------------------------------------------------

export type ReadinessInput = {
  housing: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "BLOCKED";
  travel: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "BLOCKED";
  documents: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "BLOCKED";
  firstWeek: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "BLOCKED";
  daysToStart?: number;
};

export type ReadinessOutput = {
  readinessScore: number;
  gaps: string[];
  recommendedActions: string[];
  summary: string;
};

const READINESS_WEIGHTS: Record<string, Record<string, number>> = {
  NOT_STARTED: { housing: 0, travel: 0, documents: 0, firstWeek: 0 },
  IN_PROGRESS: { housing: 18, travel: 12, documents: 12, firstWeek: 8 },
  COMPLETE: { housing: 35, travel: 25, documents: 25, firstWeek: 15 },
  BLOCKED: { housing: 5, travel: 3, documents: 3, firstWeek: 2 },
};

export function readinessAgent(input: ReadinessInput): ReadinessOutput {
  const score = Math.min(
    100,
    READINESS_WEIGHTS[input.housing].housing +
      READINESS_WEIGHTS[input.travel].travel +
      READINESS_WEIGHTS[input.documents].documents +
      READINESS_WEIGHTS[input.firstWeek].firstWeek,
  );
  const gaps: string[] = [];
  if (input.housing !== "COMPLETE") gaps.push("Housing not finalized");
  if (input.travel !== "COMPLETE") gaps.push("Travel not booked");
  if (input.documents !== "COMPLETE") gaps.push("Documents incomplete");
  if (input.firstWeek !== "COMPLETE") gaps.push("First-week readiness pending");
  const recommendedActions: string[] = [];
  if (input.housing !== "COMPLETE") recommendedActions.push("Trigger Orbit Concierge to confirm 2 housing options.");
  if (input.travel !== "COMPLETE") recommendedActions.push("Generate a flight + ground transport plan.");
  if (input.documents !== "COMPLETE") recommendedActions.push("Send the document checklist with deadlines.");
  if (input.firstWeek !== "COMPLETE") recommendedActions.push("Schedule the Day-1 readiness call 72h before start.");
  if ((input.daysToStart ?? 99) <= 7 && score < 75) {
    recommendedActions.unshift("Escalate: start date within 7 days and readiness below 75%.");
  }
  const summary =
    score >= 90
      ? "Assignment is launch-ready."
      : score >= 70
      ? "Assignment is on track. Close the remaining gaps to lock readiness."
      : score >= 40
      ? "Assignment is mid-flight. Mobility intervention will materially raise readiness."
      : "Assignment is at risk of a late or missed start. Activate concierge now.";
  return { readinessScore: score, gaps, recommendedActions, summary };
}

// ---------------------------------------------------------------------
// Concierge Agent
// ---------------------------------------------------------------------

export type ConciergeInput = {
  candidateName: string;
  city: string;
  state: string;
  needs: { flight?: boolean; housing?: boolean; car?: boolean };
  notes?: string;
  budget?: { min?: number; max?: number };
};

export type ConciergeOutput = {
  taskSummary: string;
  nextTasks: string[];
  candidateUpdate: string;
  vendorRecommendations: string[];
};

export async function conciergeAgent(input: ConciergeInput): Promise<ConciergeOutput> {
  const first = input.candidateName.split(" ")[0] || "candidate";
  const needs: string[] = [];
  if (input.needs.flight) needs.push("flight");
  if (input.needs.housing) needs.push("housing");
  if (input.needs.car) needs.push("car rental");
  const needList = needs.join(" + ") || "mobility support";

  return {
    taskSummary: `Booking request from ${first} for ${needList} in ${input.city}, ${input.state}. ${
      input.notes ? "Candidate note: " + input.notes : ""
    }`.trim(),
    nextTasks: [
      input.needs.housing ? "Shortlist 3 verified housing options within 5 miles of facility." : "",
      input.needs.flight ? "Pull 2 flight options with arrival ≤ 24h before start." : "",
      input.needs.car ? "Quote weekly car rental at airport + facility return." : "",
      "Confirm move-in date and notify recruiter.",
    ].filter(Boolean),
    candidateUpdate: `Hi ${first}, your concierge team is on it. We're shortlisting your ${needList} now and will send confirmed options within 1 business day. Anything specific you'd like prioritized?`,
    vendorRecommendations: [
      `Verified Orbit housing partners in ${input.city}, ${input.state}`,
      `Tier-1 travel vendors with healthcare staffing rate cards`,
      `National car rental partners with weekly stipend alignment`,
    ],
  };
}

// ---------------------------------------------------------------------
// MSP Reporting Agent
// ---------------------------------------------------------------------

export type MSPInput = {
  agencyName: string;
  periodLabel: string;
  metrics: {
    offersSent: number;
    accepted: number;
    backouts: number;
    onTimeStarts: number;
    avgReadiness: number;
    highRiskCount: number;
  };
};

export type MSPOutput = {
  executiveSummary: string;
  highlights: string[];
  watchouts: string[];
  recommendation: string;
};

export function mspReportAgent(input: MSPInput): MSPOutput {
  const m = input.metrics;
  const acceptRate = m.offersSent ? Math.round((m.accepted / m.offersSent) * 100) : 0;
  const backoutRate = m.accepted ? Math.round((m.backouts / m.accepted) * 100) : 0;
  return {
    executiveSummary: `In ${input.periodLabel}, ${input.agencyName} sent ${m.offersSent} offers with a ${acceptRate}% acceptance rate. ${m.backouts} backouts (${backoutRate}%) and ${m.onTimeStarts} on-time starts were recorded. Average assignment readiness held at ${m.avgReadiness}%.`,
    highlights: [
      `${acceptRate}% acceptance rate across ${m.offersSent} offers`,
      `${m.onTimeStarts} clinicians started on time`,
      `${m.avgReadiness}% average readiness at start`,
    ],
    watchouts: [
      `${backoutRate}% backout rate vs. accepted offers`,
      `${m.highRiskCount} candidates currently flagged HIGH or CRITICAL`,
      m.avgReadiness < 75 ? `Readiness below 75% threshold` : `Readiness above target`,
    ],
    recommendation:
      backoutRate > 8 || m.avgReadiness < 75
        ? "Activate Orbit Concierge for all CRITICAL-tier candidates and lift mobility coverage on stipend-light offers."
        : "Maintain current cadence and continue Orbit mobility coverage on competitive packages.",
  };
}
