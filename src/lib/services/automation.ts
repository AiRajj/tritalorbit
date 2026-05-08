import { BookingStatus, OfferStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

async function createActivityLog(data: Prisma.ActivityLogCreateInput) {
  await prisma.activityLog.create({ data });
}

export async function logOfferViewed({ offerId, candidateId, agencyId }: { offerId: string; candidateId: string; agencyId: string }) {
  await createActivityLog({
    action: "candidate.offer.viewed",
    agency: { connect: { id: agencyId } },
    candidate: { connect: { id: candidateId } },
    offer: { connect: { id: offerId } },
    metadata: { source: "candidate-hub" }
  });

  await prisma.offer.update({
    where: { id: offerId },
    data: { status: OfferStatus.VIEWED, viewedAt: new Date() }
  });
}

export async function createRecruiterAlertIfNotViewed({ offerId, recruiterId }: { offerId: string; recruiterId: string }) {
  await prisma.notification.create({
    data: {
      userId: recruiterId,
      type: "WARNING",
      title: "Offer not viewed within 2 hours",
      message: `Offer ${offerId} has not been viewed by the candidate yet.`
    }
  });
}

export async function createConciergeTaskForBooking({ bookingRequestId, agencyId, title }: { bookingRequestId: string; agencyId: string; title: string }) {
  await prisma.conciergeTask.create({
    data: {
      bookingRequestId,
      agencyId,
      title,
      status: "NEW"
    }
  });
}

export async function setHighRiskAlert({ offerId, recruiterId, score }: { offerId: string; recruiterId: string; score: number }) {
  if (score < 75) return;
  await prisma.offer.update({ where: { id: offerId }, data: { status: OfferStatus.BACKOUT_RISK } });
  await prisma.notification.create({
    data: {
      userId: recruiterId,
      type: "ACTION_REQUIRED",
      title: "Urgent candidate risk escalation",
      message: `Offer ${offerId} risk score reached ${score}. Immediate follow-up required.`
    }
  });
}

export async function markBookingCompleted(bookingRequestId: string) {
  await prisma.bookingRequest.update({
    where: { id: bookingRequestId },
    data: { status: BookingStatus.COMPLETED }
  });
}
