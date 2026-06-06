import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { mobilityBidAcceptSchema } from "@/lib/validators/mobility";
import { acceptBid } from "@/lib/services/mobility";
import { getCallerAgencyIds, requireSession } from "@/lib/api-auth";

export async function POST(request: Request, { params }: { params: Promise<{ bidId: string }> }) {
  const guard = await requireSession();
  if (!guard.ok) return guard.response;

  const { bidId } = await params;

  const bid = await prisma.mobilityBid.findUnique({
    where: { id: bidId },
    include: {
      mobilityRequest: { select: { candidateId: true, agencyId: true } }
    }
  });
  if (!bid) {
    return NextResponse.json({ error: "Bid not found" }, { status: 404 });
  }

  const user = guard.session.user;
  let authorized = user.role === Role.SUPER_ADMIN;

  if (!authorized && user.role === Role.CANDIDATE) {
    const candidate = await prisma.candidate.findFirst({
      where: { id: bid.mobilityRequest.candidateId, userId: user.id },
      select: { id: true }
    });
    authorized = !!candidate;
  }

  if (!authorized) {
    const ids = await getCallerAgencyIds(user.id);
    authorized = ids.includes(bid.mobilityRequest.agencyId);
  }

  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = mobilityBidAcceptSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid acceptance payload" }, { status: 400 });
  }

  try {
    const result = await acceptBid({
      bidId,
      actorId: user.id,
      paymentResponsibility: parsed.data.paymentResponsibility
    });
    return NextResponse.json({ bookingId: result.booking.id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to accept bid";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
