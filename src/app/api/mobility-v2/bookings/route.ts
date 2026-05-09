import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const bookings = await prisma.mobilityBooking.findMany({
    include: { mobilityRequest: true, acceptedBid: true, vendor: true },
    orderBy: { createdAt: 'desc' },
    take: 40
  });

  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await request.json()) as {
    mobilityRequestId?: string;
    acceptedBidId?: string;
    candidateId?: string;
    agencyId?: string;
    vendorId?: string;
    assignmentId?: string;
    amount?: number;
  };

  if (!body.mobilityRequestId || !body.acceptedBidId || !body.candidateId || !body.agencyId || !body.vendorId || !body.assignmentId || !body.amount) {
    return NextResponse.json({ error: 'Missing booking payload fields' }, { status: 400 });
  }

  const booking = await prisma.mobilityBooking.create({
    data: {
      mobilityRequestId: body.mobilityRequestId,
      acceptedBidId: body.acceptedBidId,
      candidateId: body.candidateId,
      agencyId: body.agencyId,
      vendorId: body.vendorId,
      assignmentId: body.assignmentId,
      createdByUserId: session.user.id,
      bookingReference: `ORB-${Date.now().toString().slice(-8)}`,
      paymentResponsibility: 'AGENCY',
      amount: body.amount,
      platformFee: Number((body.amount * 0.04).toFixed(2)),
      vendorPayout: Number((body.amount * 0.96).toFixed(2))
    }
  });

  return NextResponse.json({ booking }, { status: 201 });
}
