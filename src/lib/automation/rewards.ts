import { prisma } from '@/lib/prisma';

export async function awardCompletionRewards(candidateId: string, agencyId: string, points = 250) {
  const account = await prisma.rewardsAccount.upsert({
    where: { candidateId },
    create: { candidateId, pointsBalance: points, lifetimePoints: points },
    update: {
      pointsBalance: { increment: points },
      lifetimePoints: { increment: points }
    }
  });

  await prisma.rewardEvent.create({
    data: {
      rewardsAccountId: account.id,
      candidateId,
      agencyId,
      type: 'ASSIGNMENT_COMPLETED',
      points,
      description: 'Assignment completion reward applied by automation engine.'
    }
  });

  return account;
}
