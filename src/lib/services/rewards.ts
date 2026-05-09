import { Prisma, PrismaClient, RewardEventType, RewardsTier } from "@prisma/client";

export function getTierFromPoints(points: number): RewardsTier {
  if (points >= 10000) return "ORBIT_ELITE";
  if (points >= 5000) return "PLATINUM";
  if (points >= 2500) return "GOLD";
  if (points >= 1000) return "SILVER";
  return "BRONZE";
}

export async function getOrCreateRewardsAccount(prisma: PrismaClient, candidateId: string) {
  const existing = await prisma.rewardsAccount.findUnique({
    where: { candidateId }
  });
  if (existing) return existing;

  return prisma.rewardsAccount.create({
    data: {
      candidateId,
      tier: "BRONZE",
      pointsBalance: 0,
      lifetimePoints: 0
    }
  });
}

export async function awardRewardPoints({
  prisma,
  candidateId,
  agencyId,
  type,
  points,
  description,
  metadata,
  awardedById
}: {
  prisma: PrismaClient;
  candidateId: string;
  agencyId: string;
  type: RewardEventType;
  points: number;
  description: string;
  metadata?: Prisma.InputJsonValue;
  awardedById?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const account = await tx.rewardsAccount.upsert({
      where: { candidateId },
      create: {
        candidateId,
        tier: "BRONZE",
        pointsBalance: points,
        lifetimePoints: points
      },
      update: {
        pointsBalance: { increment: points },
        lifetimePoints: { increment: points }
      }
    });

    const event = await tx.rewardEvent.create({
      data: {
        rewardsAccountId: account.id,
        candidateId,
        agencyId,
        type,
        points,
        description,
        metadata,
        awardedById
      }
    });

    const updatedAccount = await tx.rewardsAccount.update({
      where: { id: account.id },
      data: {
        tier: getTierFromPoints(account.lifetimePoints + points)
      }
    });

    return { updatedAccount, event };
  });
}
