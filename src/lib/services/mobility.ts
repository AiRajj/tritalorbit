import {
  MobilityBidStatus,
  MobilityBookingStatus,
  MobilityRequestStatus,
  MobilityRequestType,
  Prisma
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { withDbFallback } from "@/lib/services/db-fallback";
import { generateCarQuotes, generateFlightQuotes, generateHotelQuotes, generateHousingQuotes } from "@/lib/integrations";

export type MobilityRequestSummary = {
  id: string;
  candidateName: string;
  destinationCity: string;
  destinationState: string;
  facilityName: string | null;
  requestType: MobilityRequestType;
  status: MobilityRequestStatus;
  bidCount: number;
  moveDate: Date | null;
  budgetMax: number | null;
  urgencyLevel: string;
  createdAt: Date;
};

const DEMO_CANDIDATE_NAME = "Taylor Morgan";

const fallbackRequests: MobilityRequestSummary[] = [
  {
    id: "demo-req-1",
    candidateName: DEMO_CANDIDATE_NAME,
    destinationCity: "Dallas",
    destinationState: "TX",
    facilityName: "Baylor Regional Medical Center",
    requestType: MobilityRequestType.FULL_RELOCATION_PACKAGE,
    status: MobilityRequestStatus.OPEN_FOR_BIDS,
    bidCount: 3,
    moveDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    budgetMax: 2400,
    urgencyLevel: "HIGH",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18)
  },
  {
    id: "demo-req-2",
    candidateName: "Riley Carter",
    destinationCity: "Austin",
    destinationState: "TX",
    facilityName: "Mercy General",
    requestType: MobilityRequestType.HOUSING,
    status: MobilityRequestStatus.REVIEWING,
    bidCount: 5,
    moveDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21),
    budgetMax: 1900,
    urgencyLevel: "MEDIUM",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36)
  }
];

export async function listAgencyMobilityRequests(agencyIds: string[]): Promise<MobilityRequestSummary[]> {
  return withDbFallback(async () => {
    const requests = await prisma.mobilityRequest.findMany({
      where: { agencyId: { in: agencyIds } },
      include: {
        candidate: { select: { name: true } },
        _count: { select: { bids: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 50
    });
    return requests.map(toSummary);
  }, fallbackRequests);
}

export async function listOpenMobilityRequestsForVendor(): Promise<MobilityRequestSummary[]> {
  return withDbFallback(async () => {
    const requests = await prisma.mobilityRequest.findMany({
      where: { status: MobilityRequestStatus.OPEN_FOR_BIDS },
      include: {
        candidate: { select: { name: true } },
        _count: { select: { bids: true } }
      },
      orderBy: [{ urgencyLevel: "desc" }, { createdAt: "desc" }],
      take: 50
    });
    return requests.map(toSummary);
  }, fallbackRequests);
}

export async function listCandidateMobilityRequests(candidateId: string): Promise<MobilityRequestSummary[]> {
  return withDbFallback(async () => {
    const requests = await prisma.mobilityRequest.findMany({
      where: { candidateId },
      include: {
        candidate: { select: { name: true } },
        _count: { select: { bids: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return requests.map(toSummary);
  }, []);
}

function toSummary(req: {
  id: string;
  candidate: { name: string };
  destinationCity: string;
  destinationState: string;
  facilityName: string | null;
  requestType: MobilityRequestType;
  status: MobilityRequestStatus;
  _count: { bids: number };
  moveDate: Date | null;
  budgetMax: Prisma.Decimal | null;
  urgencyLevel: string;
  createdAt: Date;
}): MobilityRequestSummary {
  return {
    id: req.id,
    candidateName: req.candidate.name,
    destinationCity: req.destinationCity,
    destinationState: req.destinationState,
    facilityName: req.facilityName,
    requestType: req.requestType,
    status: req.status,
    bidCount: req._count.bids,
    moveDate: req.moveDate,
    budgetMax: req.budgetMax ? Number(req.budgetMax) : null,
    urgencyLevel: req.urgencyLevel,
    createdAt: req.createdAt
  };
}

export type BidDetail = {
  id: string;
  vendorName: string;
  packageName: string;
  totalPrice: number;
  estimatedSavings: number | null;
  status: MobilityBidStatus;
  bidType: MobilityRequestType;
  conciergeRecommended: boolean;
  bidScore: number | null;
  cancellationPolicy: string | null;
  refundability: string | null;
  housingDistanceToFacility: number | null;
  airlineName: string | null;
  flightNumber: string | null;
  departureTime: Date | null;
  arrivalTime: Date | null;
  stops: number | null;
  hotelName: string | null;
  nightlyRate: number | null;
  carRentalCompany: string | null;
  carClass: string | null;
  housingAddress: string | null;
  monthlyCost: number | null;
  createdAt: Date;
};

export async function getMobilityRequestDetail(requestId: string) {
  return withDbFallback(async () => {
    const req = await prisma.mobilityRequest.findUnique({
      where: { id: requestId },
      include: {
        candidate: true,
        agency: { select: { id: true, name: true } },
        bids: {
          orderBy: [{ conciergeRecommended: "desc" }, { totalPrice: "asc" }],
          include: { vendor: { select: { name: true, rating: true } } }
        }
      }
    });
    return req;
  }, null);
}

export function toBidDetail(bid: {
  id: string;
  vendorName: string;
  packageName: string;
  totalPrice: Prisma.Decimal;
  estimatedSavings: Prisma.Decimal | null;
  status: MobilityBidStatus;
  bidType: MobilityRequestType;
  conciergeRecommended: boolean;
  bidScore: number | null;
  cancellationPolicy: string | null;
  refundability: string | null;
  housingDistanceToFacility: number | null;
  airlineName: string | null;
  flightNumber: string | null;
  departureTime: Date | null;
  arrivalTime: Date | null;
  stops: number | null;
  hotelName: string | null;
  nightlyRate: Prisma.Decimal | null;
  carRentalCompany: string | null;
  carClass: string | null;
  housingAddress: string | null;
  housingMonthlyCost: Prisma.Decimal | null;
  createdAt: Date;
}): BidDetail {
  return {
    id: bid.id,
    vendorName: bid.vendorName,
    packageName: bid.packageName,
    totalPrice: Number(bid.totalPrice),
    estimatedSavings: bid.estimatedSavings ? Number(bid.estimatedSavings) : null,
    status: bid.status,
    bidType: bid.bidType,
    conciergeRecommended: bid.conciergeRecommended,
    bidScore: bid.bidScore,
    cancellationPolicy: bid.cancellationPolicy,
    refundability: bid.refundability,
    housingDistanceToFacility: bid.housingDistanceToFacility,
    airlineName: bid.airlineName,
    flightNumber: bid.flightNumber,
    departureTime: bid.departureTime,
    arrivalTime: bid.arrivalTime,
    stops: bid.stops,
    hotelName: bid.hotelName,
    nightlyRate: bid.nightlyRate ? Number(bid.nightlyRate) : null,
    carRentalCompany: bid.carRentalCompany,
    carClass: bid.carClass,
    housingAddress: bid.housingAddress,
    monthlyCost: bid.housingMonthlyCost ? Number(bid.housingMonthlyCost) : null,
    createdAt: bid.createdAt
  };
}

/**
 * Score a bid 0-100 against the request constraints. Higher is better.
 * Used to seed demo bids and to support the "concierge pick" UI.
 */
export function scoreBid(input: {
  totalPrice: number;
  budgetMax: number | null;
  distanceToFacility: number | null;
  refundable: boolean;
  vendorRating: number | null;
}): number {
  const { totalPrice, budgetMax, distanceToFacility, refundable, vendorRating } = input;
  let score = 60;

  if (budgetMax && budgetMax > 0) {
    const ratio = totalPrice / budgetMax;
    score += ratio <= 0.9 ? 18 : ratio <= 1 ? 10 : ratio <= 1.1 ? -2 : -12;
  }

  if (distanceToFacility !== null) {
    score += distanceToFacility < 1 ? 8 : distanceToFacility < 3 ? 5 : distanceToFacility < 6 ? 0 : -5;
  }

  if (refundable) score += 6;
  if (vendorRating !== null) score += Math.round((vendorRating - 4) * 4);

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate realistic demo bids for a freshly created mobility request using the
 * mock integration layer. Persists bids if Prisma is available; otherwise returns
 * in-memory shapes only.
 */
export async function seedBidsForRequest(req: {
  id: string;
  requestType: MobilityRequestType;
  destinationCity: string;
  destinationState: string;
  facilityName: string | null;
  moveDate: Date | null;
  budgetMax: number | null;
  petFriendly: boolean;
  durationWeeks?: number;
}): Promise<number> {
  const vendors = await withDbFallback(
    () =>
      prisma.vendor.findMany({
        where: { verificationStatus: "VERIFIED" },
        orderBy: { rating: "desc" },
        take: 4
      }),
    []
  );

  if (vendors.length === 0) return 0;

  const drafts: Array<Prisma.MobilityBidUncheckedCreateInput> = [];

  if (req.requestType === MobilityRequestType.FLIGHT || req.requestType === MobilityRequestType.FULL_RELOCATION_PACKAGE) {
    const flightQuotes = await generateFlightQuotes({
      destinationAirport: cityToAirport(req.destinationCity),
      moveDate: req.moveDate
    });
    flightQuotes.forEach((quote, idx) => {
      const vendor = vendors[idx % vendors.length];
      const score = scoreBid({
        totalPrice: quote.totalPrice,
        budgetMax: req.budgetMax,
        distanceToFacility: null,
        refundable: quote.cancellationPolicy.toLowerCase().includes("refundable"),
        vendorRating: vendor.rating
      });
      drafts.push({
        mobilityRequestId: req.id,
        vendorId: vendor.id,
        vendorUserId: vendor.ownerId,
        bidType: MobilityRequestType.FLIGHT,
        packageName: `${quote.airlineName} ${quote.flightNumber}`,
        vendorName: vendor.name,
        totalPrice: quote.totalPrice,
        airlineName: quote.airlineName,
        flightNumber: quote.flightNumber,
        departureAirport: quote.departureAirport,
        arrivalAirport: quote.arrivalAirport,
        departureTime: quote.departureTime,
        arrivalTime: quote.arrivalTime,
        stops: quote.stops,
        baggageIncluded: quote.baggageIncluded,
        cancellationPolicy: quote.cancellationPolicy,
        refundability: quote.cancellationPolicy,
        bidScore: score,
        conciergeRecommended: idx === 0,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48)
      });
    });
  }

  if (req.requestType === MobilityRequestType.HOUSING || req.requestType === MobilityRequestType.FULL_RELOCATION_PACKAGE) {
    const housingQuotes = await generateHousingQuotes({
      destinationCity: req.destinationCity,
      destinationState: req.destinationState,
      facilityName: req.facilityName,
      petFriendly: req.petFriendly,
      budgetMax: req.budgetMax,
      durationWeeks: req.durationWeeks
    });
    housingQuotes.forEach((quote, idx) => {
      const vendor = vendors[(idx + 1) % vendors.length];
      const score = scoreBid({
        totalPrice: quote.totalPrice,
        budgetMax: req.budgetMax,
        distanceToFacility: quote.distanceToFacility,
        refundable: quote.cancellationPolicy.toLowerCase().includes("free cancel"),
        vendorRating: vendor.rating
      });
      drafts.push({
        mobilityRequestId: req.id,
        vendorId: vendor.id,
        vendorUserId: vendor.ownerId,
        bidType: MobilityRequestType.HOUSING,
        packageName: quote.packageName,
        vendorName: vendor.name,
        totalPrice: quote.totalPrice,
        housingAddress: quote.housingAddress,
        housingDistanceToFacility: quote.distanceToFacility,
        housingMonthlyCost: quote.monthlyCost,
        leaseFlexibility: quote.leaseFlexibility,
        cancellationPolicy: quote.cancellationPolicy,
        refundability: quote.cancellationPolicy,
        bidScore: score,
        conciergeRecommended: idx === 0,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72)
      });
    });
  }

  if (req.requestType === MobilityRequestType.CAR_RENTAL || req.requestType === MobilityRequestType.FULL_RELOCATION_PACKAGE) {
    const carQuotes = await generateCarQuotes({
      destinationCity: req.destinationCity,
      destinationState: req.destinationState,
      durationWeeks: req.durationWeeks
    });
    carQuotes.forEach((quote, idx) => {
      const vendor = vendors[(idx + 2) % vendors.length];
      const score = scoreBid({
        totalPrice: quote.totalPrice,
        budgetMax: req.budgetMax,
        distanceToFacility: null,
        refundable: quote.cancellationPolicy.toLowerCase().includes("free cancel"),
        vendorRating: vendor.rating
      });
      drafts.push({
        mobilityRequestId: req.id,
        vendorId: vendor.id,
        vendorUserId: vendor.ownerId,
        bidType: MobilityRequestType.CAR_RENTAL,
        packageName: quote.packageName,
        vendorName: vendor.name,
        totalPrice: quote.totalPrice,
        carRentalCompany: quote.carRentalCompany,
        carClass: quote.carClass,
        cancellationPolicy: quote.cancellationPolicy,
        refundability: quote.cancellationPolicy,
        bidScore: score,
        conciergeRecommended: idx === 0,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72)
      });
    });
  }

  if (req.requestType === MobilityRequestType.HOTEL) {
    const hotelQuotes = await generateHotelQuotes({ destinationCity: req.destinationCity });
    hotelQuotes.forEach((quote, idx) => {
      const vendor = vendors[(idx + 1) % vendors.length];
      drafts.push({
        mobilityRequestId: req.id,
        vendorId: vendor.id,
        vendorUserId: vendor.ownerId,
        bidType: MobilityRequestType.HOTEL,
        packageName: quote.packageName,
        vendorName: vendor.name,
        totalPrice: quote.totalPrice,
        hotelName: quote.hotelName,
        nightlyRate: quote.nightlyRate,
        cancellationPolicy: quote.cancellationPolicy,
        refundability: quote.cancellationPolicy,
        bidScore: scoreBid({
          totalPrice: quote.totalPrice,
          budgetMax: req.budgetMax,
          distanceToFacility: null,
          refundable: quote.cancellationPolicy.toLowerCase().includes("free cancel"),
          vendorRating: vendor.rating
        }),
        conciergeRecommended: idx === 0,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72)
      });
    });
  }

  if (drafts.length === 0) return 0;

  await withDbFallback(async () => {
    await prisma.mobilityBid.createMany({ data: drafts });
  }, undefined);

  return drafts.length;
}

function cityToAirport(city: string): string {
  const map: Record<string, string> = {
    Dallas: "DFW",
    Austin: "AUS",
    Houston: "IAH",
    Phoenix: "PHX",
    Denver: "DEN",
    Nashville: "BNA",
    Atlanta: "ATL",
    Chicago: "ORD",
    Boston: "BOS",
    Seattle: "SEA"
  };
  return map[city] ?? "DFW";
}

/**
 * Accept a bid: transition states + create a booking record. Caller is responsible for auth.
 */
export async function acceptBid(input: {
  bidId: string;
  actorId: string;
  paymentResponsibility?: "AGENCY" | "CANDIDATE" | "SHARED" | "WALLET_CREDIT";
}) {
  return prisma.$transaction(async (tx) => {
    const bid = await tx.mobilityBid.findUnique({
      where: { id: input.bidId },
      include: { mobilityRequest: true }
    });
    if (!bid) throw new Error("Bid not found");
    if (bid.status !== MobilityBidStatus.SUBMITTED && bid.status !== MobilityBidStatus.SHORTLISTED) {
      throw new Error(`Bid cannot be accepted from status ${bid.status}`);
    }

    await tx.mobilityBid.update({
      where: { id: bid.id },
      data: { status: MobilityBidStatus.ACCEPTED }
    });
    await tx.mobilityBid.updateMany({
      where: {
        mobilityRequestId: bid.mobilityRequestId,
        id: { not: bid.id },
        status: { in: [MobilityBidStatus.SUBMITTED, MobilityBidStatus.SHORTLISTED] }
      },
      data: { status: MobilityBidStatus.DECLINED }
    });
    await tx.mobilityRequest.update({
      where: { id: bid.mobilityRequestId },
      data: { status: MobilityRequestStatus.BID_ACCEPTED }
    });

    const booking = await tx.mobilityBooking.create({
      data: {
        mobilityRequestId: bid.mobilityRequestId,
        acceptedBidId: bid.id,
        candidateId: bid.mobilityRequest.candidateId,
        agencyId: bid.mobilityRequest.agencyId,
        vendorId: bid.vendorId,
        assignmentId: bid.mobilityRequest.assignmentId,
        amount: bid.totalPrice,
        platformFee: new Prisma.Decimal(Number(bid.totalPrice) * 0.05).toDecimalPlaces(2),
        vendorPayout: new Prisma.Decimal(Number(bid.totalPrice) * 0.95).toDecimalPlaces(2),
        paymentResponsibility: input.paymentResponsibility ?? "AGENCY",
        bookingStatus: MobilityBookingStatus.CONFIRMED
      }
    });

    await tx.activityLog.create({
      data: {
        agencyId: bid.mobilityRequest.agencyId,
        actorId: input.actorId,
        candidateId: bid.mobilityRequest.candidateId,
        assignmentId: bid.mobilityRequest.assignmentId,
        action: "mobility.bid.accepted",
        metadata: {
          bidId: bid.id,
          bookingId: booking.id,
          amount: Number(bid.totalPrice)
        }
      }
    });

    return { booking, bidId: bid.id };
  });
}
