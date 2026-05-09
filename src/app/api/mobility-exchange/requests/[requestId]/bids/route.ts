import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, getVendorForUser, hasAnyRole } from "@/lib/services/access";
import { travelBidCreateSchema } from "@/lib/validators/mobility";

export async function GET(_: Request, { params }: { params: Promise<{ requestId: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { requestId } = await params;

  try {
    const requestRecord = await prisma.travelBidRequest.findUnique({
      where: { id: requestId },
      include: {
        bids: {
          include: {
            vendor: true
          },
          orderBy: [{ totalPrice: "asc" }]
        },
        candidate: {
          select: { id: true, userId: true }
        }
      }
    });

    if (!requestRecord) {
      return NextResponse.json({ error: "Travel request not found" }, { status: 404 });
    }

    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate || candidate.id !== requestRecord.candidateId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId || agencyId !== requestRecord.agencyId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (session.user.role === Role.VENDOR_LANDLORD) {
      const vendor = await getVendorForUser(session.user.id);
      if (!vendor) {
        return NextResponse.json({ bids: [] });
      }
      return NextResponse.json({
        bids: requestRecord.bids.filter((bid) => bid.vendorId === vendor.id)
      });
    } else if (session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ bids: requestRecord.bids });
  } catch {
    return NextResponse.json({ error: "Unable to fetch travel bids" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ requestId: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.user.role, [Role.VENDOR_LANDLORD])) {
    return NextResponse.json({ error: "Only vendors can submit travel bids" }, { status: 403 });
  }

  const { requestId } = await params;

  try {
    const body = await request.json();
    const parsed = travelBidCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid travel bid payload" }, { status: 400 });
    }

    if (parsed.data.requestId !== requestId) {
      return NextResponse.json({ error: "Request mismatch" }, { status: 400 });
    }

    const requestRecord = await prisma.travelBidRequest.findUnique({
      where: { id: requestId },
      select: {
        id: true,
        agencyId: true,
        candidateId: true,
        bidExpiresAt: true,
        status: true
      }
    });

    if (!requestRecord) {
      return NextResponse.json({ error: "Travel request not found" }, { status: 404 });
    }

    if (["BOOKED", "CANCELLED", "EXPIRED"].includes(requestRecord.status)) {
      return NextResponse.json({ error: "Travel request is closed for bidding" }, { status: 409 });
    }

    if (requestRecord.bidExpiresAt.getTime() < Date.now()) {
      await prisma.travelBidRequest.update({
        where: { id: requestId },
        data: { status: "EXPIRED" }
      });
      return NextResponse.json({ error: "Bid window has expired" }, { status: 409 });
    }

    const vendor = await getVendorForUser(session.user.id);
    if (!vendor) {
      return NextResponse.json({ error: "Vendor profile required to submit bids" }, { status: 403 });
    }

    const createdBid = await prisma.travelBid.create({
      data: {
        requestId,
        vendorId: vendor.id,
        submittedById: session.user.id,
        packageType: parsed.data.packageType,
        airline: parsed.data.airline,
        flightType: parsed.data.flightType,
        stops: parsed.data.stops,
        totalPrice: parsed.data.totalPrice,
        includesCar: parsed.data.includesCar,
        includesHotel: parsed.data.includesHotel,
        carProvider: parsed.data.carProvider,
        hotelName: parsed.data.hotelName,
        notes: parsed.data.notes,
        expiresAt: new Date(parsed.data.expiresAt)
      }
    });

    if (requestRecord.status === "OPEN") {
      await prisma.travelBidRequest.update({
        where: { id: requestId },
        data: { status: "BID_ACTIVE" }
      });
    }

    await prisma.activityLog.create({
      data: {
        agencyId: requestRecord.agencyId,
        actorId: session.user.id,
        candidateId: requestRecord.candidateId,
        assignmentId: null,
        action: "mobility.bid.submitted",
        metadata: {
          travelBidRequestId: requestId,
          travelBidId: createdBid.id,
          totalPrice: createdBid.totalPrice
        }
      }
    });

    return NextResponse.json({ id: createdBid.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to submit travel bid" }, { status: 500 });
  }
}
