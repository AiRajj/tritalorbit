import { NextResponse } from "next/server";

import { prisma, safeDb } from "@/lib/db";

export async function POST(_request: Request, { params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params;
  const candidatePortalUrl = `/candidate/offer/${offerId === "orbit-demo-offer" ? "demo-token" : offerId}`;

  await safeDb(
    async () => {
      await prisma.offer.update({
        where: { id: offerId },
        data: {
          status: "SENT",
          sentAt: new Date(),
          activityLogs: {
            create: {
              type: "OFFER_SENT",
              message: "Offer sent to candidate and candidate portal URL generated.",
              metadata: { candidatePortalUrl }
            }
          }
        }
      });
      await prisma.notification.create({
        data: {
          title: "Offer sent to candidate",
          body: "Candidate portal link is active and tracking engagement.",
          href: `/agency/offers/${offerId}/preview`
        }
      });
    },
    null
  );

  return NextResponse.json({ ok: true, status: "SENT", candidatePortalUrl });
}
