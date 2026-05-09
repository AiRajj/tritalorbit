import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const records = await prisma.vendorVerification.findMany({
    include: { vendor: true },
    orderBy: { createdAt: 'desc' },
    take: 80
  });

  return NextResponse.json({ records });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as { vendorId?: string; documentType?: string; documentUrl?: string };
  if (!payload.vendorId || !payload.documentType) {
    return NextResponse.json({ error: "vendorId and documentType required" }, { status: 400 });
  }

  const verification = await prisma.vendorVerification.create({
    data: {
      vendorId: payload.vendorId,
      documentType: payload.documentType,
      documentUrl: payload.documentUrl
    }
  });

  return NextResponse.json({ verification }, { status: 201 });
}
