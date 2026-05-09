import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getCandidateForUser } from "@/lib/services/access";
import { redeemCandidateCredit } from "@/lib/services/wallet";
import { walletRedemptionSchema } from "@/lib/validators/mobility";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== Role.CANDIDATE) {
    return NextResponse.json({ error: "Only candidates can redeem credits" }, { status: 403 });
  }

  try {
    const parsed = walletRedemptionSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid redemption payload" }, { status: 400 });
    }

    const candidate = await getCandidateForUser(session.user.id);
    if (!candidate) {
      return NextResponse.json({ error: "Candidate profile not found" }, { status: 404 });
    }

    await redeemCandidateCredit({
      candidateId: candidate.id,
      amount: parsed.data.amount,
      description: parsed.data.description,
      travelRequestId: parsed.data.travelRequestId,
      travelBidId: parsed.data.travelBidId,
      createdById: session.user.id
    });

    await prisma.activityLog.create({
      data: {
        agencyId: candidate.agencyId,
        actorId: session.user.id,
        candidateId: candidate.id,
        action: "wallet.credit_redeemed",
        metadata: {
          amount: parsed.data.amount,
          travelRequestId: parsed.data.travelRequestId,
          travelBidId: parsed.data.travelBidId
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to redeem wallet credit" },
      { status: 500 }
    );
  }
}
