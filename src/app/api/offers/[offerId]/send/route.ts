import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { requireApiRole } from "@/lib/api-auth";
import { handleOfferSendAutomation } from "@/lib/automation";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ offerId: string }> },
) {
  const auth = await requireApiRole([Role.AGENCY_OWNER, Role.RECRUITER]);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { offerId } = await params;

  const offer = await prisma.offer.update({
    where: { id: offerId },
    data: {
      status: "SENT",
      sentAt: new Date(),
    },
  });

  await handleOfferSendAutomation(offer.id);

  await prisma.notification.create({
    data: {
      userId: auth.session.user.id,
      type: "SUCCESS",
      title: "Offer delivered",
      message: `Candidate link ready: /candidate/offer/${offer.shareableToken}`,
      link: `/agency/offers/${offer.id}/preview`,
    },
  });

  return NextResponse.json({ ok: true, token: offer.shareableToken });
}
