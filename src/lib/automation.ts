import { addHours, differenceInDays } from "date-fns";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function logActivity(input: {
  action: string;
  userId?: string;
  candidateId?: string;
  assignmentId?: string;
  offerId?: string;
  metadata?: Prisma.InputJsonValue;
}) {
  await prisma.activityLog.create({
    data: {
      action: input.action,
      userId: input.userId,
      candidateId: input.candidateId,
      assignmentId: input.assignmentId,
      offerId: input.offerId,
      metadata: input.metadata,
    },
  });
}

export async function handleOfferViewAutomation(offerId: string) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: { candidate: true, assignment: true },
  });

  if (!offer) return;

  await logActivity({
    action: "CANDIDATE_VIEWED_OFFER",
    candidateId: offer.candidateId,
    assignmentId: offer.assignmentId,
    offerId: offer.id,
  });

  const startDateGap = differenceInDays(offer.assignment.startDate, new Date());

  if (startDateGap <= 7 && offer.assignment.housingStatus !== "READY") {
    await prisma.notification.create({
      data: {
        userId: offer.recruiterId,
        type: "WARNING",
        title: "Housing risk before start date",
        message:
          "Start date is within seven days and housing is not complete. Candidate could back out without intervention.",
        link: `/agency/offers/${offer.id}/preview`,
      },
    });
  }
}

export async function handleOfferSendAutomation(offerId: string) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
  });

  if (!offer) return;

  await prisma.notification.create({
    data: {
      userId: offer.recruiterId,
      type: "INFO",
      title: "Offer sent",
      message: "Offer has been sent and candidate activity tracking has started.",
      link: `/agency/offers/${offer.id}/preview`,
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "OFFER_SENT",
      offerId,
      candidateId: offer.candidateId,
      assignmentId: offer.assignmentId,
      userId: offer.recruiterId,
      metadata: { followUpDeadline: addHours(new Date(), 2).toISOString() },
    },
  });
}

export async function handleOfferNotViewedInTwoHours(offerId: string) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: { candidate: true },
  });

  if (!offer || offer.viewedAt || !offer.sentAt) return;

  const twoHoursPassed = new Date() >= addHours(offer.sentAt, 2);
  if (!twoHoursPassed) return;

  await prisma.notification.create({
    data: {
      userId: offer.recruiterId,
      type: "ACTION_REQUIRED",
      title: "Candidate has not viewed offer",
      message: `${offer.candidate.fullName} has not viewed the offer in the first two hours.`,
      link: `/agency/offers/${offer.id}/preview`,
    },
  });
}

export async function handleHousingViewedNoAcceptance(offerId: string) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
  });
  if (!offer) return;

  await prisma.aIInsight.create({
    data: {
      offerId: offer.id,
      candidateId: offer.candidateId,
      assignmentId: offer.assignmentId,
      type: "RETENTION_RISK",
      title: "Housing interest without acceptance",
      content:
        "Candidate engaged housing options but has not accepted. Recommend recruiter follow-up focused on move certainty and timeline confidence.",
      model: "rule-engine",
    },
  });
}

export async function handleRiskScoreAutomation(input: {
  offerId: string;
  candidateId: string;
  score: number;
  recruiterId: string;
}) {
  if (input.score < 75) return;

  await prisma.notification.create({
    data: {
      userId: input.recruiterId,
      type: "ACTION_REQUIRED",
      title: "Urgent retention risk alert",
      message: `Risk score is ${input.score}. Immediate candidate intervention is recommended.`,
      link: `/agency/offers/${input.offerId}/preview`,
    },
  });
}

export async function handleConciergeTaskCompleted(taskId: string) {
  const task = await prisma.conciergeTask.findUnique({
    where: { id: taskId },
    include: { bookingRequest: true, candidate: true, owner: true },
  });
  if (!task || task.status !== "COMPLETED") return;

  await prisma.aIInsight.create({
    data: {
      candidateId: task.candidateId,
      assignmentId: task.bookingRequest.assignmentId,
      type: "CONCIERGE",
      title: "Candidate update suggestion",
      content: `Hi ${task.candidate.fullName.split(" ")[0]}, your concierge request \"${task.title}\" has been completed. Review details in your assignment hub and reply if you need adjustments.`,
      model: "rule-engine",
    },
  });
}
