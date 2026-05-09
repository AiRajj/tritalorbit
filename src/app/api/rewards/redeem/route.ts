import { Role } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getCandidateForUser } from "@/lib/services/access";
import { rewardRedemptionSchema } from "@/lib/validators/wave2";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== Role.CANDIDATE) {
    return NextResponse.json({ error: "Only candidates can redeem rewards" }, { status: 403 });
  }

  try {
    const parsed = rewardRedemptionSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid redemption payload" }, { status: 400 });
    }

    const candidate = await getCandidateForUser(session.user.id);
    if (!candidate) {
      return NextResponse.json({ error: "Candidate profile not found" }, { status: 404 });
    }

    const account = await prisma.rewardsAccount.findUnique({
      where: { candidateId: candidate.id }
    });

    if (!account || account.pointsBalance < parsed.data.pointsRedeemed) {
      return NextResponse.json({ error: "Insufficient points balance" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedAccount = await tx.rewardsAccount.update({
        where: { id: account.id },
        data: {
          pointsBalance: { decrement: parsed.data.pointsRedeemed }
        }
      });

      const redemption = await tx.rewardRedemption.create({
        data: {
          rewardsAccountId: account.id,
          candidateId: candidate.id,
          agencyId: candidate.agencyId,
          rewardName: parsed.data.rewardName,
          pointsRedeemed: parsed.data.pointsRedeemed,
          rewardValue: parsed.data.rewardValue,
          status: "REQUESTED",
          metadata: parsed.data.metadata as Prisma.InputJsonValue | undefined,
          requestedById: session.user.id
        }
      });

      await tx.rewardEvent.create({
        data: {
          rewardsAccountId: account.id,
          candidateId: candidate.id,
          agencyId: candidate.agencyId,
          type: "MANUAL_ADJUSTMENT",
          points: -parsed.data.pointsRedeemed,
          description: `Redemption requested: ${parsed.data.rewardName}`,
          metadata: {
            redemptionId: redemption.id,
            rewardValue: parsed.data.rewardValue
          },
          awardedById: session.user.id
        }
      });

      return { updatedAccount, redemption };
    });

    return NextResponse.json({
      redemptionId: result.redemption.id,
      pointsBalance: result.updatedAccount.pointsBalance
    });
  } catch {
    return NextResponse.json({ error: "Unable to redeem rewards" }, { status: 500 });
  }
}
