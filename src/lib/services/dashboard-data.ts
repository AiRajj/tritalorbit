import { OfferStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { withDbFallback } from "@/lib/services/db-fallback";

export async function getAgencyOverview() {
  return withDbFallback(
    async () => {
      const [offersSent, acceptedOffers, pendingOffers, bookingRequests] = await Promise.all([
        prisma.offer.count({ where: { status: { in: ["SENT", "VIEWED", "ACCEPTED"] } } }),
        prisma.offer.count({ where: { status: "ACCEPTED" } }),
        prisma.offer.count({ where: { status: { in: ["DRAFT", "SENT", "VIEWED"] } } }),
        prisma.bookingRequest.count()
      ]);

      const risk = await prisma.retentionRiskScore.aggregate({ _avg: { score: true } });
      const readiness = await prisma.assignment.aggregate({ _avg: { firstWeekReadiness: true } });

      return {
        offersSent,
        acceptedOffers,
        pendingOffers,
        backoutRisk: Math.round(risk._avg.score ?? 0),
        bookingRequests,
        assignmentReady: Math.round(readiness._avg.firstWeekReadiness ?? 0)
      };
    },
    {
      offersSent: 214,
      acceptedOffers: 176,
      pendingOffers: 38,
      backoutRisk: 42,
      bookingRequests: 27,
      assignmentReady: 81
    }
  );
}

export async function getActiveOffers() {
  return withDbFallback(
    async () => {
      const offers = await prisma.offer.findMany({
        include: { candidate: true, assignment: true, retentionRiskScores: { orderBy: { createdAt: "desc" }, take: 1 } },
        orderBy: { updatedAt: "desc" },
        take: 12
      });

      return offers.map((offer) => ({
        id: offer.id,
        candidate: offer.candidate.name,
        facility: offer.assignment.facilityName,
        city: `${offer.assignment.city}, ${offer.assignment.state}`,
        weeklyPay: Number(offer.weeklyPay),
        status: offer.status,
        risk: offer.retentionRiskScores[0]?.score ?? null
      }));
    },
    [
      {
        id: "demo-offer-1",
        candidate: "Taylor Morgan",
        facility: "Baylor Regional Medical Center",
        city: "Dallas, TX",
        weeklyPay: 2875,
        status: OfferStatus.SENT,
        risk: 68
      },
      {
        id: "demo-offer-2",
        candidate: "Riley Carter",
        facility: "Mercy General",
        city: "Austin, TX",
        weeklyPay: 2650,
        status: OfferStatus.VIEWED,
        risk: 52
      }
    ]
  );
}

export async function getAgencyRecentActivity() {
  return withDbFallback(
    async () => {
      const activities = await prisma.activityLog.findMany({
        include: { actor: true, candidate: true },
        orderBy: { createdAt: "desc" },
        take: 10
      });

      return activities.map((activity) => ({
        id: activity.id,
        action: activity.action,
        actor: activity.actor?.name ?? "System",
        candidate: activity.candidate?.name ?? "-",
        createdAt: activity.createdAt
      }));
    },
    [
      {
        id: "act-1",
        action: "candidate.offer.viewed",
        actor: "Taylor Morgan",
        candidate: "Taylor Morgan",
        createdAt: new Date()
      },
      {
        id: "act-2",
        action: "offer.sent",
        actor: "Maya Thompson",
        candidate: "Riley Carter",
        createdAt: new Date(Date.now() - 1000 * 60 * 25)
      }
    ]
  );
}

export async function getHighRiskCandidates() {
  return withDbFallback(
    async () => {
      const scores = await prisma.retentionRiskScore.findMany({
        include: { candidate: true },
        orderBy: { score: "desc" },
        take: 8
      });

      return scores.map((score) => ({
        id: score.id,
        candidate: score.candidate.name,
        score: score.score,
        label: score.label,
        suggestedAction: score.suggestedAction
      }));
    },
    [
      {
        id: "risk-1",
        candidate: "Taylor Morgan",
        score: 78,
        label: "High",
        suggestedAction: "Housing shortlist review within 4 hours"
      }
    ]
  );
}

export async function getBookingRequests() {
  return withDbFallback(
    async () => {
      const requests = await prisma.bookingRequest.findMany({
        include: { candidate: true, assignment: true, conciergeTasks: true },
        orderBy: { updatedAt: "desc" },
        take: 25
      });

      return requests.map((request) => ({
        id: request.id,
        candidate: request.candidate.name,
        assignment: `${request.assignment.facilityName} (${request.assignment.city}, ${request.assignment.state})`,
        status: request.status,
        conciergeOwner: request.conciergeTasks[0]?.ownerId ?? "Unassigned",
        timeline: request.updatedAt
      }));
    },
    [
      {
        id: "booking-1",
        candidate: "Taylor Morgan",
        assignment: "Baylor Regional Medical Center (Dallas, TX)",
        status: "IN_PROGRESS",
        conciergeOwner: "Jordan Lee",
        timeline: new Date()
      }
    ]
  );
}

export async function getConciergeTaskBoard() {
  return withDbFallback(
    async () => {
      const tasks = await prisma.conciergeTask.findMany({
        include: { candidate: true, assignment: true },
        orderBy: { updatedAt: "desc" },
        take: 50
      });

      const groups = {
        NEW: [] as typeof tasks,
        IN_PROGRESS: [] as typeof tasks,
        WAITING_CANDIDATE: [] as typeof tasks,
        COMPLETED: [] as typeof tasks,
        CANCELLED: [] as typeof tasks
      };

      tasks.forEach((task) => groups[task.status].push(task));

      return groups;
    },
    {
      NEW: [],
      IN_PROGRESS: [
        {
          id: "task-1",
          agencyId: "demo",
          bookingRequestId: "booking-1",
          assignmentId: null,
          candidateId: null,
          ownerId: null,
          title: "Secure housing shortlist",
          description: "Provide 3 verified options",
          status: "IN_PROGRESS",
          priority: "HIGH",
          dueDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          candidate: null,
          assignment: null
        }
      ],
      WAITING_CANDIDATE: [],
      COMPLETED: [],
      CANCELLED: []
    } as unknown as Record<string, Array<Prisma.ConciergeTaskGetPayload<{ include: { candidate: true; assignment: true } }>>>
  );
}

export async function getAssignmentLaunchRows() {
  return withDbFallback(
    async () => {
      const assignments = await prisma.assignment.findMany({
        include: {
          candidate: true,
          retentionRiskScores: { orderBy: { createdAt: "desc" }, take: 1 }
        },
        orderBy: { startDate: "asc" },
        take: 50
      });

      return assignments.map((assignment) => ({
        id: assignment.id,
        candidate: assignment.candidate.name,
        role: assignment.role,
        facility: assignment.facilityName,
        startDate: assignment.startDate,
        housingStatus: assignment.housingStatus,
        travelStatus: assignment.travelStatus,
        documentsStatus: assignment.documentsStatus,
        firstWeekReadiness: assignment.firstWeekReadiness,
        riskScore: assignment.retentionRiskScores[0]?.score ?? 40,
        actionNeeded:
          assignment.housingStatus === "NOT_STARTED" ? "Finalize housing" : assignment.documentsStatus === "IN_PROGRESS" ? "Complete compliance docs" : "Monitor"
      }));
    },
    [
      {
        id: "launch-1",
        candidate: "Taylor Morgan",
        role: "RN ICU",
        facility: "Baylor Regional Medical Center",
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
        housingStatus: "IN_PROGRESS",
        travelStatus: "IN_PROGRESS",
        documentsStatus: "IN_PROGRESS",
        firstWeekReadiness: 62,
        riskScore: 68,
        actionNeeded: "Finalize housing"
      }
    ]
  );
}

export async function getVendorMarketplace() {
  return withDbFallback(
    async () => {
      const vendors = await prisma.vendor.findMany({ orderBy: { updatedAt: "desc" }, take: 30 });
      return vendors;
    },
    [
      {
        id: "vendor-1",
        ownerId: null,
        name: "Mobility Stay",
        category: "Housing",
        city: "Dallas",
        state: "TX",
        verificationStatus: "VERIFIED",
        rating: 4.8,
        contactEmail: "vendor@mobilitystay.com",
        contactPhone: "+1 (555) 010-2345",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  );
}

export async function getHousingOptionsForCandidateCity(city?: string, state?: string) {
  return withDbFallback(
    async () => {
      const options = await prisma.housingOption.findMany({
        where: {
          city: city ? { equals: city, mode: "insensitive" } : undefined,
          state: state ? { equals: state, mode: "insensitive" } : undefined,
          isVerified: true
        },
        orderBy: { updatedAt: "desc" },
        take: 25
      });
      return options;
    },
    [
      {
        id: "house-1",
        assignmentId: "demo",
        vendorId: null,
        landlordId: null,
        title: "Furnished 1BR near Baylor",
        city: city ?? "Dallas",
        state: state ?? "TX",
        distanceMiles: 2.4,
        monthlyCost: 2100 as unknown as Prisma.Decimal,
        availableFrom: new Date(),
        isVerified: true,
        verificationStatus: "VERIFIED",
        rating: 4.9,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  );
}

export async function getMspDashboardData() {
  return withDbFallback(
    async () => {
      const reports = await prisma.mSPReport.findMany({ orderBy: { createdAt: "desc" }, take: 12 });
      const latest = reports[0];

      return {
        latest,
        reports
      };
    },
    {
      latest: {
        id: "msp-1",
        agencyId: "demo",
        generatedById: null,
        periodStart: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        periodEnd: new Date(),
        acceptanceRate: 0.84,
        backoutRate: 0.07,
        timeToReadyDays: 4.2,
        firstDayShowRate: 0.93,
        readinessRate: 0.88,
        supplierPerformance: { supplier: "Northstar", score: 91 },
        aiExecutiveSummary:
          "Mobility-enabled assignments continue outperforming baseline acceptance and readiness metrics.",
        createdAt: new Date()
      },
      reports: []
    }
  );
}

export async function getAdminOverview() {
  return withDbFallback(
    async () => {
      const [agencies, users, candidates, offers, vendors, aiUsage, audits] = await Promise.all([
        prisma.agency.count(),
        prisma.user.count(),
        prisma.candidate.count(),
        prisma.offer.count(),
        prisma.vendor.count(),
        prisma.aIInsight.count(),
        prisma.auditLog.count()
      ]);

      return { agencies, users, candidates, offers, vendors, aiUsage, audits };
    },
    {
      agencies: 11,
      users: 248,
      candidates: 1320,
      offers: 442,
      vendors: 63,
      aiUsage: 1910,
      audits: 5400
    }
  );
}

export async function getOfferPreview(offerId: string) {
  return withDbFallback(
    async () => {
      const offer = await prisma.offer.findUnique({
        where: { id: offerId },
        include: {
          candidate: true,
          perks: true,
          retentionRiskScores: { orderBy: { createdAt: "desc" }, take: 1 },
          assignment: {
            include: {
              housingOptions: true,
              travelOptions: true,
              carRentalOptions: true
            }
          }
        }
      });

      return offer;
    },
    null
  );
}

export async function getCandidateOfferByToken(token: string) {
  return withDbFallback(
    async () => {
      return prisma.offer.findUnique({
        where: { token },
        include: {
          candidate: true,
          assignment: {
            include: {
              housingOptions: true,
              travelOptions: true,
              carRentalOptions: true
            }
          },
          perks: true
        }
      });
    },
    null
  );
}
