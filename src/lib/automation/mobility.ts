import { prisma } from '@/lib/prisma';
import { sendEmailNotification } from '@/lib/integrations/notifications/resend';

export async function notifyVendorsForMobilityRequest(requestId: string) {
  const request = await prisma.mobilityRequest.findUnique({ where: { id: requestId } });
  if (!request) return { delivered: 0 };

  const vendors = await prisma.vendor.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
  await Promise.all(
    vendors.map((vendor) =>
      sendEmailNotification({
        to: vendor.contactEmail,
        subject: 'New mobility request available',
        message: `Request ${request.id} is open for bids in ${request.assignmentCity}, ${request.assignmentState}.`
      })
    )
  );

  return { delivered: vendors.length };
}
