import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { logActivity } from "@/lib/automation";
import { prisma } from "@/lib/prisma";
import { bookingRequestSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const body = await request.json().catch(() => null);
  const parsed = bookingRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const offer = await prisma.offer.findUnique({
    where: { id: parsed.data.offerId },
    include: { assignment: true },
  });

  if (!offer) {
    return NextResponse.json({ error: "Offer not found" }, { status: 404 });
  }

  const bookingRequest = await prisma.bookingRequest.create({
    data: {
      offerId: offer.id,
      assignmentId: offer.assignmentId,
      candidateId: offer.candidateId,
      agencyId: offer.agencyId,
      ownerId: offer.recruiterId,
      needFlight: parsed.data.needFlight,
      needHousing: parsed.data.needHousing,
      needCar: parsed.data.needCar,
      moveDate: parsed.data.moveDate ? new Date(parsed.data.moveDate) : null,
      budgetRange: parsed.data.budgetRange,
      preferredLocation: parsed.data.preferredLocation,
      notes: parsed.data.notes,
      timelineNote: "Submitted by candidate portal",
    },
  });

  await prisma.conciergeTask.create({
    data: {
      bookingRequestId: bookingRequest.id,
      candidateId: offer.candidateId,
      ownerId: offer.recruiterId,
      title: "New mobility booking request",
      details: "Review request details and propose housing/travel options.",
      status: "NEW",
    },
  });

  await logActivity({
    action: "BOOKING_REQUEST_CREATED",
    userId: session?.user.id,
    candidateId: offer.candidateId,
    assignmentId: offer.assignmentId,
    offerId: offer.id,
  });

  return NextResponse.json({ id: bookingRequest.id }, { status: 201 });
}
