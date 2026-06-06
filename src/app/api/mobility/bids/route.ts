import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { mobilityBidCreateSchema } from "@/lib/validators/mobility";
import { scoreBid } from "@/lib/services/mobility";
import { requireRole } from "@/lib/api-auth";

export async function POST(request: Request) {
  const guard = await requireRole([Role.VENDOR_LANDLORD, Role.SUPER_ADMIN]);
  if (!guard.ok) return guard.response;

  const parsed = mobilityBidCreateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid bid payload" }, { status: 400 });
  }

  const data = parsed.data;
  const user = guard.session.user;

  const vendor = await prisma.vendor.findFirst({
    where:
      user.role === Role.SUPER_ADMIN ? { verificationStatus: "VERIFIED" } : { ownerId: user.id, verificationStatus: "VERIFIED" },
    orderBy: { createdAt: "desc" }
  });

  if (!vendor) {
    return NextResponse.json({ error: "No verified vendor profile" }, { status: 403 });
  }

  const request_ = await prisma.mobilityRequest.findUnique({
    where: { id: data.mobilityRequestId }
  });
  if (!request_) {
    return NextResponse.json({ error: "Mobility request not found" }, { status: 404 });
  }
  if (request_.status !== "OPEN_FOR_BIDS" && request_.status !== "REVIEWING") {
    return NextResponse.json({ error: "Request is not accepting bids" }, { status: 409 });
  }

  const score = scoreBid({
    totalPrice: data.totalPrice,
    budgetMax: request_.budgetMax ? Number(request_.budgetMax) : null,
    distanceToFacility: data.housingDistanceToFacility ?? null,
    refundable: (data.cancellationPolicy ?? "").toLowerCase().includes("refundable") ||
                (data.cancellationPolicy ?? "").toLowerCase().includes("free cancel"),
    vendorRating: vendor.rating
  });

  const bid = await prisma.mobilityBid.create({
    data: {
      mobilityRequestId: data.mobilityRequestId,
      vendorId: vendor.id,
      vendorUserId: user.id,
      bidType: data.bidType,
      packageName: data.packageName,
      vendorName: vendor.name,
      totalPrice: data.totalPrice,
      taxesAndFees: data.taxesAndFees ?? 0,
      airlineName: data.airlineName,
      flightNumber: data.flightNumber,
      departureAirport: data.departureAirport,
      arrivalAirport: data.arrivalAirport,
      departureTime: data.departureTime ? new Date(data.departureTime) : null,
      arrivalTime: data.arrivalTime ? new Date(data.arrivalTime) : null,
      stops: data.stops,
      baggageIncluded: data.baggageIncluded ?? false,
      housingAddress: data.housingAddress,
      housingDistanceToFacility: data.housingDistanceToFacility,
      housingMonthlyCost: data.housingMonthlyCost,
      leaseFlexibility: data.leaseFlexibility,
      carRentalCompany: data.carRentalCompany,
      carClass: data.carClass,
      hotelName: data.hotelName,
      nightlyRate: data.nightlyRate,
      cancellationPolicy: data.cancellationPolicy,
      refundability: data.refundability,
      notes: data.notes,
      bidScore: score,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48)
    }
  });

  await prisma.activityLog.create({
    data: {
      agencyId: request_.agencyId,
      actorId: user.id,
      candidateId: request_.candidateId,
      assignmentId: request_.assignmentId,
      action: "mobility.bid.submitted",
      metadata: { bidId: bid.id, totalPrice: data.totalPrice }
    }
  });

  return NextResponse.json({ id: bid.id, bidScore: score }, { status: 201 });
}
