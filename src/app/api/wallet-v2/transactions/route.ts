import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const transactions = await prisma.walletTransaction.findMany({
    include: { wallet: true, walletCredit: true },
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  return NextResponse.json({ transactions });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await request.json()) as {
    walletId?: string;
    walletCreditId?: string;
    type?: 'CREDIT_ADDED' | 'CREDIT_USED' | 'REFUND' | 'VENDOR_PAYOUT' | 'PLATFORM_FEE' | 'ADJUSTMENT';
    amount?: number;
    description?: string;
  };

  if (!body.walletId || !body.type || !body.amount || !body.description) {
    return NextResponse.json({ error: 'Missing transaction fields' }, { status: 400 });
  }

  const tx = await prisma.walletTransaction.create({
    data: {
      walletId: body.walletId,
      walletCreditId: body.walletCreditId,
      type: body.type,
      amount: body.amount,
      description: body.description
    }
  });

  return NextResponse.json({ transaction: tx }, { status: 201 });
}
