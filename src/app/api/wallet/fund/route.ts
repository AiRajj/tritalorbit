import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, hasAnyRole } from "@/lib/services/access";
import { fundAgencyWallet } from "@/lib/services/wallet";
import { walletFundingSchema } from "@/lib/validators/mobility";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER])) {
    return NextResponse.json({ error: "Only agency users can fund wallet accounts" }, { status: 403 });
  }

  try {
    const parsed = walletFundingSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid funding payload" }, { status: 400 });
    }

    const agencyId = await getAgencyIdForUser(session.user.id);
    if (!agencyId) {
      return NextResponse.json({ error: "Agency context not found" }, { status: 404 });
    }

    const result = await fundAgencyWallet({
      agencyId,
      amount: parsed.data.amount,
      description: parsed.data.description,
      referenceCode: parsed.data.referenceCode,
      createdById: session.user.id
    });

    await prisma.activityLog.create({
      data: {
        agencyId,
        actorId: session.user.id,
        action: "wallet.funded",
        metadata: {
          amount: parsed.data.amount,
          walletAccountId: result.updatedWallet.id
        }
      }
    });

    return NextResponse.json({
      walletId: result.updatedWallet.id,
      balance: result.updatedWallet.balance
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to fund agency wallet" },
      { status: 500 }
    );
  }
}
