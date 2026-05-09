import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const credits = await prisma.walletCredit.findMany({
    include: { wallet: true },
    orderBy: { createdAt: 'desc' },
    take: 80
  });

  return NextResponse.json({ credits });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await request.json()) as {
    walletId?: string;
    agencyId?: string;
    candidateId?: string;
    assignmentId?: string;
    creditType?: 'FLIGHT' | 'HOUSING' | 'HOTEL' | 'CAR_RENTAL' | 'RELOCATION' | 'EMERGENCY' | 'GENERAL';
    amount?: number;
  };

  if (!body.walletId || !body.agencyId || !body.candidateId || !body.creditType || !body.amount) {
    return NextResponse.json({ error: 'Missing credit payload fields' }, { status: 400 });
  }

  const credit = await prisma.walletCredit.create({
    data: {
      walletId: body.walletId,
      agencyId: body.agencyId,
      candidateId: body.candidateId,
      assignmentId: body.assignmentId,
      creditType: body.creditType,
      amount: body.amount,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  });

  return NextResponse.json({ credit }, { status: 201 });
}
