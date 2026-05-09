import { prisma } from '@/lib/prisma';

export async function detectUrgentReadinessRisk() {
  const assignments = await prisma.assignment.findMany({ take: 20, orderBy: { startDate: 'asc' } });

  return assignments
    .filter((assignment) => assignment.housingStatus !== 'READY' || assignment.travelStatus !== 'READY')
    .map((assignment) => ({
      assignmentId: assignment.id,
      highRisk: assignment.housingStatus !== 'READY' && assignment.travelStatus !== 'READY',
      reason: 'Start date approaching with unresolved housing/travel prerequisites.'
    }));
}
