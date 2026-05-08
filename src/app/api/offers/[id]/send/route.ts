import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const offer = await prisma.offer.findUnique({ where: { id }, include: { candidate: true } });
  if (!offer) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  await prisma.offer.update({
    where: { id },
    data: { status: "SENT", sentAt: new Date() },
  });

  await prisma.activityLog.create({
    data: {
      actorId: session.user.id,
      candidateId: offer.candidateId,
      offerId: offer.id,
      action: "offer.sent",
      description: `Offer sent to ${offer.candidate.firstName} ${offer.candidate.lastName}.`,
    },
  });

  // Notification to recruiter
  await prisma.notification.create({
    data: {
      userId: session.user.id,
      type: "OFFER",
      title: "Offer sent",
      message: `Offer for ${offer.facilityName} sent to ${offer.candidate.firstName}.`,
      link: `/agency/offers/${offer.id}/preview`,
    },
  });

  const portalUrl = `/candidate/offer/${offer.publicToken}`;
  return NextResponse.json({ ok: true, portalUrl });
}
