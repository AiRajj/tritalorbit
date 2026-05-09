import { prisma } from '@/lib/prisma';
import { sendEmailNotification } from '@/lib/integrations/notifications/resend';

export async function notifyCreditGrant(walletCreditId: string) {
  const credit = await prisma.walletCredit.findUnique({ where: { id: walletCreditId } });
  if (!credit) return { notified: false };

  const candidate = await prisma.candidate.findUnique({ where: { id: credit.candidateId } });
  if (!candidate) return { notified: false };

  await sendEmailNotification({
    to: candidate.email,
    subject: 'New TRITAL Wallet credit available',
    message: `A ${credit.creditType} credit of $${credit.amount.toString()} has been added to your assignment wallet.`
  });

  return { notified: true };
}
