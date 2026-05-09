import { prisma } from '@/lib/prisma';
import { runIntegrationAiAgent } from '@/lib/integrations/ai/openai';

export async function generateWeeklyMspReport(agencyId: string) {
  const offers = await prisma.offer.findMany({ where: { agencyId }, take: 100 });
  const accepted = offers.filter((offer) => offer.status === 'ACCEPTED').length;
  const acceptanceRate = offers.length ? accepted / offers.length : 0;

  const ai = await runIntegrationAiAgent(
    'MSP ROI AI Agent',
    `Agency ${agencyId} acceptanceRate=${acceptanceRate.toFixed(2)}`
  );

  return prisma.mSPReport.create({
    data: {
      agencyId,
      periodStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      periodEnd: new Date(),
      acceptanceRate,
      backoutRate: 0.12,
      timeToReadyDays: 7.4,
      firstDayShowRate: 0.91,
      readinessRate: 0.86,
      supplierPerformance: { totalOffers: offers.length },
      aiExecutiveSummary: ai.summary
    }
  });
}
