import { MobilityRequestStatus, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";
import { travelBidRequestSchema } from "@/lib/validators/mobility";

const creatorRoles = [Role.CANDIDATE, Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER];
const mobilityStatuses: MobilityRequestStatus[] = ["OPEN", "BID_ACTIVE", "EXPIRED", "BOOKED", "CANCELLED"];

function parseStatusFilter(rawStatus: string | null) {
  if (!rawStatus) return undefined;
  return mobilityStatuses.includes(rawStatus as MobilityRequestStatus)
    ? (rawStatus as MobilityRequestStatus)
    : undefined;
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const statusFilter = parseStatusFilter(url.searchParams.get("status"));

  try {
    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate) {
        return NextResponse.json({ requests: [] });
      }

      const requests = await prisma.travelBidRequest.findMany({
        where: {
          candidateId: candidate.id,
          status: statusFilter
        },
        include: {
          assignment: true,
          bids: {
            include: { vendor: true },
            orderBy: [{ totalPrice: "asc" }]
          },
          selectedBid: { include: { vendor: true } }
        },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({ requests });
    }

    if (session.user.role === Role.VENDOR_LANDLORD) {
      const vendor = await prisma.vendor.findFirst({
        where: { ownerId: session.user.id },
        select: { id: true }
      });

      if (!vendor) {
        return NextResponse.json({ requests: [] });
      }

      const requests = await prisma.travelBidRequest.findMany({
        where: {
          status: statusFilter
        },
        include: {
          candidate: true,
          assignment: true,
          bids: {
            where: { vendorId: vendor.id },
            orderBy: [{ createdAt: "desc" }]
          }
        },
        orderBy: { bidExpiresAt: "asc" }
      });

      return NextResponse.json({ requests });
    }

    if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) {
        return NextResponse.json({ requests: [] });
      }

      const requests = await prisma.travelBidRequest.findMany({
        where: {
          agencyId,
          status: statusFilter
        },
        include: {
          candidate: true,
          assignment: true,
          bids: {
            include: { vendor: true },
            orderBy: [{ totalPrice: "asc" }]
          },
          selectedBid: { include: { vendor: true } }
        },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({ requests });
    }

    if (session.user.role === Role.SUPER_ADMIN) {
      const requests = await prisma.travelBidRequest.findMany({
        where: {
          status: statusFilter
        },
        include: {
          candidate: true,
          assignment: true,
          bids: {
            include: { vendor: true },
            orderBy: [{ totalPrice: "asc" }]
          }
        },
        orderBy: { createdAt: "desc" },
        take: 100
      });
      return NextResponse.json({ requests });
    }

    return NextResponse.json({ error: "Role not authorized for this endpoint" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Unable to load mobility exchange requests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.user.role, creatorRoles)) {
    return NextResponse.json({ error: "Role not authorized to create travel bid request" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = travelBidRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid mobility request payload" }, { status: 400 });
    }

    const assignment = await prisma.assignment.findUnique({
      where: { id: parsed.data.assignmentId },
      select: {
        id: true,
        agencyId: true,
        candidateId: true
      }
    });

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate || candidate.id !== assignment.candidateId) {
        return NextResponse.json({ error: "Candidate does not have access to this assignment" }, { status: 403 });
      }
    } else {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId || agencyId !== assignment.agencyId) {
        return NextResponse.json({ error: "Agency context does not match assignment" }, { status: 403 });
      }
    }

    const expiresAt = parsed.data.bidExpiresAt
      ? new Date(parsed.data.bidExpiresAt)
      : new Date(Date.now() + 1000 * 60 * 60 * 24);

    const created = await prisma.travelBidRequest.create({
      data: {
        agencyId: assignment.agencyId,
        candidateId: assignment.candidateId,
        assignmentId: assignment.id,
        offerId: parsed.data.offerId,
        createdById: session.user.id,
        status: "BID_ACTIVE",
        originAirport: parsed.data.originAirport,
        preferredAirport: parsed.data.preferredAirport,
        departureDate: new Date(parsed.data.departureDate),
        returnDate: parsed.data.returnDate ? new Date(parsed.data.returnDate) : null,
        needCar: parsed.data.needCar,
        needHotel: parsed.data.needHotel,
        baggageCount: parsed.data.baggageCount,
        carType: parsed.data.carType,
        hotelNights: parsed.data.hotelNights,
        specialRequirements: parsed.data.specialRequirements,
        agencyTravelCredit: parsed.data.agencyTravelCredit,
        bidExpiresAt: expiresAt
      }
    });

    await prisma.activityLog.create({
      data: {
        agencyId: assignment.agencyId,
        actorId: session.user.id,
        candidateId: assignment.candidateId,
        assignmentId: assignment.id,
        offerId: parsed.data.offerId,
        action: "mobility.request.created",
        metadata: {
          travelBidRequestId: created.id,
          preferredAirport: parsed.data.preferredAirport,
          bidExpiresAt: expiresAt
        }
      }
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create mobility request" }, { status: 500 });
  }
}
