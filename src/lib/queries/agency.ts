import { prisma } from "@/lib/prisma";

export async function getAgencyKpis(agencyId: string) {
  const [offersSent, accepted, pending, highRisk, bookings, readiness] = await Promise.all([
    prisma.offer.count({ where: { agencyId, status: { in: ["SENT", "VIEWED", "NEGOTIATING", "ACCEPTED"] } } }),
    prisma.offer.count({ where: { agencyId, status: "ACCEPTED" } }),
    prisma.offer.count({ where: { agencyId, status: { in: ["SENT", "VIEWED", "NEGOTIATING"] } } }),
    prisma.retentionRiskScore.count({
      where: { candidate: { agencyId }, level: { in: ["HIGH", "CRITICAL"] } },
    }),
    prisma.bookingRequest.count({ where: { agencyId } }),
    prisma.assignment.aggregate({
      where: { agencyId },
      _avg: { readinessScore: true },
    }),
  ]);
  return {
    offersSent,
    accepted,
    pending,
    highRisk,
    bookings,
    readiness: Math.round(readiness._avg.readinessScore ?? 0),
  };
}

export async function getActiveOffers(agencyId: string, take = 8) {
  return prisma.offer.findMany({
    where: { agencyId, status: { in: ["DRAFT", "SENT", "VIEWED", "NEGOTIATING", "ACCEPTED"] } },
    orderBy: { updatedAt: "desc" },
    include: {
      candidate: true,
      recruiter: { select: { name: true, email: true } },
    },
    take,
  });
}

export async function getHighRiskCandidates(agencyId: string, take = 6) {
  return prisma.retentionRiskScore.findMany({
    where: { candidate: { agencyId }, level: { in: ["HIGH", "CRITICAL"] } },
    orderBy: { createdAt: "desc" },
    include: { candidate: true, offer: true },
    take,
    distinct: ["candidateId"],
  });
}

export async function getRecentActivity(agencyId: string, take = 10) {
  return prisma.activityLog.findMany({
    where: {
      OR: [{ offer: { agencyId } }, { candidate: { agencyId } }],
    },
    orderBy: { createdAt: "desc" },
    include: {
      offer: { select: { id: true, facilityName: true } },
      candidate: { select: { id: true, firstName: true, lastName: true } },
      actor: { select: { id: true, name: true, email: true } },
    },
    take,
  });
}
