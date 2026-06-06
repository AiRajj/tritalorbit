import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/api-auth";

export async function PATCH(_: Request, { params }: { params: Promise<{ vendorId: string }> }) {
  const guard = await requireRole(Role.SUPER_ADMIN);
  if (!guard.ok) return guard.response;

  const { vendorId } = await params;

  const vendor = await prisma.vendor.update({
    where: { id: vendorId },
    data: { verificationStatus: "VERIFIED" }
  });

  await prisma.auditLog.create({
    data: {
      actorId: guard.session.user.id,
      action: "vendor.approved",
      targetType: "Vendor",
      targetId: vendor.id,
      metadata: { verificationStatus: vendor.verificationStatus }
    }
  });

  return NextResponse.json({ id: vendor.id, verificationStatus: vendor.verificationStatus });
}
