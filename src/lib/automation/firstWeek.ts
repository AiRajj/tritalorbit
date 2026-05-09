import { prisma } from '@/lib/prisma';
import { sendSmsNotification } from '@/lib/integrations/notifications/twilio';

export async function remindIncompleteFirstWeekChecklist(guideId: string) {
  const guide = await prisma.firstWeekGuide.findUnique({
    where: { id: guideId },
    include: { checklistItems: true, candidate: true }
  });

  if (!guide) return { reminded: false };
  const incomplete = guide.checklistItems.filter((item) => !item.completed);
  if (!incomplete.length) return { reminded: false };

  await sendSmsNotification({
    to: guide.candidate.phone ?? guide.candidate.email,
    message: `You have ${incomplete.length} first-week checklist items pending before assignment start.`
  });

  return { reminded: true, pendingItems: incomplete.length };
}
