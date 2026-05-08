import { subDays } from "date-fns";

import { prisma } from "@/lib/prisma";

export async function getAgencyDashboardData(userId: string) {
  try {
    const member = await prisma.agencyMember.findFirst({ where: { userId } });
    if (!member) {
      return null;
    }

    const [offers, risks, requests, activities] = await Promise.all([
      prisma.offer.findMany({
        where: { agencyId: member.agencyId },
        include: { candidate: true, assignment: true, perks: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.retentionRiskScore.findMany({
        include: { candidate: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.bookingRequest.findMany({
        where: { agencyId: member.agencyId },
        include: { candidate: true, assignment: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.activityLog.findMany({
        where: { createdAt: { gte: subDays(new Date(), 7) } },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    const sent = offers.filter((o) => ["SENT", "VIEWED", "ACCEPTED"].includes(o.status)).length;
    const accepted = offers.filter((o) => o.status === "ACCEPTED").length;
    const pending = offers.filter((o) => ["DRAFT", "SENT", "VIEWED"].includes(o.status)).length;
    const backoutRisk = risks.length
      ? Math.round(risks.reduce((sum, item) => sum + item.score, 0) / risks.length)
      : 32;

    const assignmentReady = offers.length
      ? Math.round(
          (offers.filter((offer) => offer.assignment.firstWeekReadiness >= 75).length / offers.length) * 100,
        )
      : 48;

    return {
      offers,
      risks,
      requests,
      activities,
      kpis: {
        sent,
        accepted,
        pending,
        backoutRisk,
        bookingRequests: requests.length,
        assignmentReady,
      },
    };
  } catch {
    return {
      offers: [],
      risks: [],
      requests: [],
      activities: [],
      kpis: {
        sent: 0,
        accepted: 0,
        pending: 0,
        backoutRisk: 0,
        bookingRequests: 0,
        assignmentReady: 0,
      },
    };
  }
}

export async function getOfferById(offerId: string) {
  try {
    return await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        candidate: true,
        assignment: true,
        perks: true,
        retentionRiskScores: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
  } catch {
    return null;
  }
}

export async function getOfferByToken(token: string) {
  try {
    return await prisma.offer.findUnique({
      where: { shareableToken: token },
      include: {
        candidate: true,
        assignment: true,
        perks: true,
      },
    });
  } catch {
    return null;
  }
}

export async function getCandidateHousingOptions(city: string, state: string) {
  try {
    return await prisma.housingOption.findMany({
      where: {
        assignmentCity: city,
        assignmentState: state,
        verificationStatus: "VERIFIED",
      },
      orderBy: [{ rating: "desc" }, { monthlyCost: "asc" }],
      take: 12,
    });
  } catch {
    return [];
  }
}

export async function getTravelOptions(candidateId: string) {
  try {
    return await prisma.travelOption.findMany({
      where: { candidateId },
      orderBy: { price: "asc" },
      take: 5,
    });
  } catch {
    return [];
  }
}

export async function getCarOptions(candidateId: string) {
  try {
    return await prisma.carRentalOption.findMany({
      where: { candidateId },
      orderBy: { weeklyCost: "asc" },
      take: 5,
    });
  } catch {
    return [];
  }
}
