import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(_: Request, { params }: { params: Promise<{ vendorId: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { vendorId } = await params;

  const vendor = await prisma.vendor.update({
    where: { id: vendorId },
    data: { verificationStatus: "VERIFIED" }
  });

  await prisma.auditLog.create({
    data: {
      actorId: session.user.id,
      action: "vendor.approved",
      targetType: "Vendor",
      targetId: vendor.id,
      metadata: { verificationStatus: vendor.verificationStatus }
    }
  });

  return NextResponse.json({ id: vendor.id, verificationStatus: vendor.verificationStatus });
}
