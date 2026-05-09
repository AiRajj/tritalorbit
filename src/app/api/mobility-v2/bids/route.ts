import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getVendorForUser } from "@/lib/services/access";

export async function GET() {
  const bids = await prisma.mobilityBid.findMany({
    include: { mobilityRequest: true, vendor: true },
    orderBy: { createdAt: 'desc' },
    take: 80
  });
  return NextResponse.json({ bids });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const vendor = await getVendorForUser(session.user.id);
  if (!vendor) return NextResponse.json({ error: 'Vendor profile not found' }, { status: 400 });

  const body = (await request.json()) as {
    mobilityRequestId?: string;
    bidType?: 'FLIGHT' | 'HOUSING' | 'CAR_RENTAL' | 'HOTEL' | 'FULL_PACKAGE';
    packageName?: string;
    totalPrice?: number;
    vendorName?: string;
  };

  if (!body.mobilityRequestId || !body.bidType || !body.packageName || !body.totalPrice || !body.vendorName) {
    return NextResponse.json({ error: 'Missing bid payload fields' }, { status: 400 });
  }

  const bid = await prisma.mobilityBid.create({
    data: {
      mobilityRequestId: body.mobilityRequestId,
      vendorId: vendor.id,
      vendorUserId: session.user.id,
      bidType: body.bidType,
      packageName: body.packageName,
      vendorName: body.vendorName,
      totalPrice: body.totalPrice,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  });

  return NextResponse.json({ bid }, { status: 201 });
}
