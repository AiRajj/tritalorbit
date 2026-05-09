import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const disputes = await prisma.dispute.findMany({
    include: { booking: true },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return NextResponse.json({ disputes });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as { bookingId?: string; disputeType?: string; description?: string };
  if (!payload.disputeType || !payload.description) {
    return NextResponse.json({ error: "disputeType and description required" }, { status: 400 });
  }

  const dispute = await prisma.dispute.create({
    data: {
      bookingId: payload.bookingId,
      raisedByUserId: session.user.id,
      disputeType: payload.disputeType,
      description: payload.description
    }
  });

  return NextResponse.json({ dispute }, { status: 201 });
}
