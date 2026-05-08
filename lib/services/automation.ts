import { prisma, safeDb } from "@/lib/db";
import { calculateRetentionRisk, runConciergeAgent } from "@/lib/ai";

type AutomationContext = {
  offerId?: string;
  candidateId?: string;
  agencyId?: string;
  userId?: string;
  message?: string;
  metadata?: Record<string, unknown>;
};

export async function logCandidateViewedOffer(context: AutomationContext) {
  await safeDb(
    () =>
      prisma.activityLog.create({
        data: {
          agencyId: context.agencyId,
          candidateId: context.candidateId,
          offerId: context.offerId,
          actorId: context.userId,
          type: "OFFER_VIEWED",
          message: context.message || "Candidate viewed offer hub.",
          metadata: context.metadata as never
        }
      }),
    null
  );
}

export async function alertRecruiterIfOfferUnviewed(context: AutomationContext) {
  return safeDb(
    () =>
      prisma.notification.create({
        data: {
          title: "Offer not viewed after two hours",
          body: "Follow up with the candidate and resend the assignment hub link.",
          href: context.offerId ? `/agency/offers/${context.offerId}/preview` : "/agency"
        }
      }),
    {
      title: "Offer not viewed after two hours",
      body: "Follow up with the candidate and resend the assignment hub link."
    }
  );
}

export async function recommendHousingFollowUp(context: AutomationContext) {
  const risk = calculateRetentionRisk({
    viewedOffer: true,
    housingRequested: false,
    travelRequested: false,
    daysUntilStart: 8,
    locationDifficulty: 72,
    engagementScore: 58,
    unansweredMessages: 1,
    weeklyPay: 2400,
    offerStatus: "VIEWED"
  });

  await safeDb(
    () =>
      prisma.aIInsight.create({
        data: {
          offerId: context.offerId,
          agent: "Retention Risk AI Agent",
          prompt: "Candidate viewed housing but did not accept.",
          response: risk
        }
      }),
    null
  );

  return risk;
}

export async function createConciergeTaskForBookingRequest(bookingRequestId: string) {
  const ai = await runConciergeAgent({ bookingRequestId });
  return safeDb(
    () =>
      prisma.conciergeTask.create({
        data: {
          bookingRequestId,
          title: "Resolve candidate mobility request",
          description: JSON.stringify(ai),
          priority: "High"
        }
      }),
    {
      id: "fallback-task",
      title: "Resolve candidate mobility request",
      status: "NEW"
    }
  );
}

export async function createHighRiskHousingAlert(context: AutomationContext) {
  const risk = calculateRetentionRisk({
    viewedOffer: true,
    housingRequested: false,
    travelRequested: true,
    daysUntilStart: 6,
    locationDifficulty: 84,
    engagementScore: 51,
    unansweredMessages: 2,
    weeklyPay: 2300,
    offerStatus: "BACKOUT_RISK"
  });

  await safeDb(
    () =>
      prisma.notification.create({
        data: {
          title: "High-risk start: housing missing",
          body: risk.suggestedRecruiterAction,
          href: context.offerId ? `/agency/offers/${context.offerId}/preview` : "/agency/assignment-launch"
        }
      }),
    null
  );

  return risk;
}

export async function createReadinessChecklistOnAcceptance(context: AutomationContext) {
  await safeDb(
    () =>
      prisma.activityLog.create({
        data: {
          agencyId: context.agencyId,
          candidateId: context.candidateId,
          offerId: context.offerId,
          type: "READINESS_CHECKLIST_CREATED",
          message: "Offer accepted. Assignment readiness checklist created.",
          metadata: {
            checklist: ["Housing", "Travel", "Documents", "First-week arrival", "Recruiter check-in"]
          }
        }
      }),
    null
  );
}

export async function notifyUrgentRisk(context: AutomationContext) {
  return safeDb(
    () =>
      prisma.notification.create({
        data: {
          title: "Urgent retention risk",
          body: context.message || "Risk score is above 75. Recruiter action is required.",
          href: context.offerId ? `/agency/offers/${context.offerId}/preview` : "/agency"
        }
      }),
    null
  );
}

export async function generateCandidateUpdateOnTaskComplete(context: AutomationContext) {
  const ai = await runConciergeAgent(context);
  await safeDb(
    () =>
      prisma.activityLog.create({
        data: {
          agencyId: context.agencyId,
          candidateId: context.candidateId,
          offerId: context.offerId,
          type: "CONCIERGE_TASK_COMPLETED",
          message: "Concierge task completed and candidate update generated.",
          metadata: ai as never
        }
      }),
    null
  );
  return ai;
}
