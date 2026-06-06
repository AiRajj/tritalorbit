import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createConciergeTaskForBooking } from "@/lib/services/automation";

const bodySchema = z.object({
  needFlight: z.boolean().default(false),
  needHousing: z.boolean().default(false),
  needCar: z.boolean().default(false),
  moveDate: z.string().optional(),
  budgetRange: z.string().max(120).optional(),
  preferredLocation: z.string().max(240).optional(),
  notes: z.string().max(1000).optional()
});

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    const offer = await prisma.offer.findUnique({ where: { token } });
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    const parsed = bodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid booking request payload" }, { status: 400 });
    }

    const data = parsed.data;
    if (!data.needFlight && !data.needHousing && !data.needCar) {
      return NextResponse.json({ error: "Pick at least one mobility need" }, { status: 400 });
    }

    const booking = await prisma.bookingRequest.create({
      data: {
        offerId: offer.id,
        agencyId: offer.agencyId,
        candidateId: offer.candidateId,
        assignmentId: offer.assignmentId,
        needFlight: data.needFlight,
        needHousing: data.needHousing,
        needCar: data.needCar,
        moveDate: data.moveDate ? new Date(data.moveDate) : null,
        budgetRange: data.budgetRange,
        preferredLocation: data.preferredLocation,
        notes: data.notes
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
        candidateId: offer.candidateId,
        offerId: offer.id,
        assignmentId: offer.assignmentId,
        action: "candidate.booking_request.created"
      }
    });

    return NextResponse.json({ id: booking.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create booking request" }, { status: 500 });
  }
}
