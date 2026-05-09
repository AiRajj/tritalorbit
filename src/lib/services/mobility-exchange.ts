import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { withDbFallback } from "@/lib/services/db-fallback";

const travelRequestInclude = {
  candidate: true,
  assignment: true,
  bids: {
    include: {
      vendor: true
    },
    orderBy: [{ totalPrice: "asc" }]
  },
  selectedBid: {
    include: {
      vendor: true
    }
  }
} satisfies Prisma.TravelBidRequestInclude;

export async function getCandidateTravelRequests(candidateId: string) {
  return withDbFallback(
    async () => {
      return prisma.travelBidRequest.findMany({
        where: { candidateId },
        include: travelRequestInclude,
        orderBy: { createdAt: "desc" }
      });
    },
    []
  );
}

export async function getAgencyTravelRequests(agencyId: string) {
  return withDbFallback(
    async () => {
      return prisma.travelBidRequest.findMany({
        where: { agencyId },
        include: travelRequestInclude,
        orderBy: { createdAt: "desc" }
      });
    },
    []
  );
}

export async function getVendorBidRequests(vendorId: string) {
  return withDbFallback(
    async () => {
      const [openRequests, submittedBids] = await Promise.all([
        prisma.travelBidRequest.findMany({
          where: {
            status: { in: ["OPEN", "BID_ACTIVE"] },
            bidExpiresAt: { gte: new Date() }
          },
          include: {
            candidate: true,
            assignment: true,
            bids: {
              where: { vendorId },
              orderBy: { createdAt: "desc" }
            }
          },
          orderBy: { bidExpiresAt: "asc" }
        }),
        prisma.travelBid.findMany({
          where: { vendorId },
          include: {
            request: {
              include: {
                candidate: true,
                assignment: true
              }
            }
          },
          orderBy: { createdAt: "desc" },
          take: 40
        })
      ]);

      return { openRequests, submittedBids };
    },
    {
      openRequests: [],
      submittedBids: []
    }
  );
}
