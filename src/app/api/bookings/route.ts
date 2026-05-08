import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  offerId: z.string(),
  candidateId: z.string(),
  agencyId: z.string(),
  needFlight: z.boolean().optional(),
  needHousing: z.boolean().optional(),
  needCar: z.boolean().optional(),
  moveDate: z.string().optional().nullable(),
  budgetMin: z.number().optional().nullable(),
  budgetMax: z.number().optional().nullable(),
  preferredLocation: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  const booking = await prisma.bookingRequest.create({
    data: {
      offerId: data.offerId,
      candidateId: data.candidateId,
      agencyId: data.agencyId,
      needFlight: !!data.needFlight,
      needHousing: !!data.needHousing,
      needCar: !!data.needCar,
      moveDate: data.moveDate ? new Date(data.moveDate) : null,
      budgetMin: data.budgetMin ?? null,
      budgetMax: data.budgetMax ?? null,
      preferredLocation: data.preferredLocation ?? null,
      notes: data.notes ?? null,
      status: "NEW",
    },
  });

  // Auto-create concierge task
  await prisma.conciergeTask.create({
    data: {
      agencyId: data.agencyId,
      bookingId: booking.id,
      title: `New mobility request${data.needHousing ? " · housing" : ""}${data.needFlight ? " · flight" : ""}${data.needCar ? " · car" : ""}`,
      description: data.notes ?? "Candidate-submitted booking request.",
      status: "NEW",
    },
  });

  await prisma.activityLog.create({
    data: {
      candidateId: data.candidateId,
      offerId: data.offerId,
      action: "candidate.bookingRequested",
      description: `Booking request submitted by candidate.`,
    },
  });

  return NextResponse.json({ ok: true, bookingId: booking.id });
}
