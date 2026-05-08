import { prisma } from './db';
import type { Prisma } from '@prisma/client';

export async function logActivity(params: {
  userId?: string;
  offerId?: string;
  candidateId?: string;
  action: string;
  details?: string;
  metadata?: Prisma.InputJsonValue;
}) {
  return prisma.activityLog.create({
    data: {
      action: params.action,
      details: params.details,
      metadata: params.metadata,
      ...(params.userId && { user: { connect: { id: params.userId } } }),
      ...(params.offerId && { offer: { connect: { id: params.offerId } } }),
      ...(params.candidateId && { candidate: { connect: { id: params.candidateId } } }),
    },
  });
}

export async function createNotification(params: {
  userId: string;
  title: string;
  message: string;
  type: string;
  link?: string;
}) {
  return prisma.notification.create({ data: { ...params, read: false } });
}

export async function checkOfferViewTimeout(offerId: string) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: { candidate: true, assignment: { include: { agency: true } } },
  });
  if (!offer || offer.viewedAt) return;

  const hoursSinceSent = offer.sentAt
    ? (Date.now() - new Date(offer.sentAt).getTime()) / 3600000
    : 0;

  if (hoursSinceSent > 2) {
    const agencyMembers = await prisma.agencyMember.findMany({
      where: { agencyId: offer.assignment?.agencyId || '' },
    });
    for (const member of agencyMembers) {
      await createNotification({
        userId: member.userId,
        title: 'Offer Not Viewed',
        message: `${offer.candidate?.firstName} ${offer.candidate?.lastName} hasn't viewed their offer after ${Math.round(hoursSinceSent)} hours`,
        type: 'WARNING',
        link: `/agency/offers/${offer.id}/preview`,
      });
    }
  }
}

export async function onOfferAccepted(offerId: string) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: { candidate: true, assignment: true },
  });
  if (!offer) return;

  await logActivity({
    offerId,
    candidateId: offer.candidateId,
    action: 'OFFER_ACCEPTED',
    details: 'Candidate accepted the offer',
  });

  const tasks = [
    'Verify housing arrangement',
    'Confirm travel plans',
    'Check document compliance',
    'Verify start date readiness',
    'First week orientation prep',
  ];

  for (const task of tasks) {
    await prisma.conciergeTask.create({
      data: {
        bookingRequestId: '',
        title: task,
        description: `Readiness task for ${offer.candidate?.firstName} ${offer.candidate?.lastName}`,
        priority: 'MEDIUM',
        status: 'NEW',
      },
    });
  }
}

export async function checkHighRiskAlerts() {
  const risks = await prisma.retentionRiskScore.findMany({
    where: { score: { gte: 75 } },
    include: {
      candidate: true,
      offer: { include: { assignment: true } },
    },
  });

  for (const risk of risks) {
    if (risk.offer?.assignment?.agencyId) {
      const members = await prisma.agencyMember.findMany({
        where: { agencyId: risk.offer.assignment.agencyId },
      });
      for (const member of members) {
        await createNotification({
          userId: member.userId,
          title: 'High Risk Alert',
          message: `${risk.candidate?.firstName} ${risk.candidate?.lastName} has a risk score of ${risk.score}`,
          type: 'URGENT',
          link: `/agency/offers/${risk.offerId}/preview`,
        });
      }
    }
  }
}

export async function onBookingRequest(bookingRequestId: string) {
  const request = await prisma.bookingRequest.findUnique({
    where: { id: bookingRequestId },
    include: { candidate: true, offer: true },
  });
  if (!request) return;

  await prisma.conciergeTask.create({
    data: {
      bookingRequestId,
      title: `New booking request from ${request.candidate?.firstName} ${request.candidate?.lastName}`,
      description: `Flight: ${request.needFlight}, Housing: ${request.needHousing}, Car: ${request.needCar}`,
      priority: 'HIGH',
      status: 'NEW',
    },
  });

  await logActivity({
    candidateId: request.candidateId,
    offerId: request.offerId,
    action: 'BOOKING_REQUESTED',
    details: 'New booking request created',
  });
}

export async function checkStartDateReadiness() {
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const assignments = await prisma.assignment.findMany({
    where: { startDate: { lte: sevenDaysFromNow }, status: 'ACTIVE' },
    include: {
      candidate: true,
      agency: true,
      offers: { include: { bookingRequests: true } },
    },
  });

  for (const assignment of assignments) {
    const hasHousing = assignment.offers.some((o) =>
      o.bookingRequests.some(
        (br) => br.needHousing && br.status === 'COMPLETED'
      )
    );

    if (!hasHousing) {
      const members = await prisma.agencyMember.findMany({
        where: { agencyId: assignment.agencyId },
      });
      for (const member of members) {
        await createNotification({
          userId: member.userId,
          title: 'Missing Housing Alert',
          message: `${assignment.candidate?.firstName} starts in less than 7 days with no housing confirmed`,
          type: 'URGENT',
          link: `/agency/assignment-launch`,
        });
      }
    }
  }
}
