import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { bookingRequestSchema } from "@/lib/validators/offer";
import { createConciergeTaskForBooking } from "@/lib/services/automation";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = bookingRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid booking request payload" }, { status: 400 });
    }

    const offer = await prisma.offer.findUnique({ where: { id: parsed.data.offerId } });
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    const booking = await prisma.bookingRequest.create({
      data: {
        offerId: parsed.data.offerId,
        agencyId: offer.agencyId,
        candidateId: offer.candidateId,
        assignmentId: offer.assignmentId,
        needFlight: parsed.data.needFlight,
        needHousing: parsed.data.needHousing,
        needCar: parsed.data.needCar,
        moveDate: parsed.data.moveDate ? new Date(parsed.data.moveDate) : null,
        budgetRange: parsed.data.budgetRange,
        preferredLocation: parsed.data.preferredLocation,
        notes: parsed.data.notes
      }
    });

    await createConciergeTaskForBooking({
      bookingRequestId: booking.id,
      agencyId: offer.agencyId,
      title: "Review new candidate mobility request"
    });

    await prisma.activityLog.create({
      data: {
        agencyId: offer.agencyId,
        actorId: session.user.id,
        candidateId: offer.candidateId,
        offerId: parsed.data.offerId,
        assignmentId: offer.assignmentId,
        action: "candidate.booking_request.created"
      }
    });

    return NextResponse.json({ id: booking.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create booking request" }, { status: 500 });
  }
}
