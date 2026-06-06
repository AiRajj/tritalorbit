import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAgencyRole } from "@/lib/api-auth";

export async function POST(_: Request, { params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params;

  const offerBefore = await prisma.offer.findUnique({
    where: { id: offerId },
    select: { agencyId: true }
  });
  if (!offerBefore) {
    return NextResponse.json({ error: "Offer not found" }, { status: 404 });
  }

  const guard = await requireAgencyRole(offerBefore.agencyId, [Role.AGENCY_OWNER, Role.RECRUITER]);
  if (!guard.ok) return guard.response;

  try {
    const offer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        status: "SENT",
        sentAt: new Date()
      },
      include: { candidate: true }
    });

    await prisma.activityLog.create({
      data: {
        agencyId: offer.agencyId,
        actorId: guard.session.user.id,
        candidateId: offer.candidateId,
        offerId: offer.id,
        assignmentId: offer.assignmentId,
        action: "offer.sent"
      }
    });

    await prisma.auditLog.create({
      data: {
        agencyId: offer.agencyId,
        actorId: guard.session.user.id,
        action: "offer.sent",
        targetType: "Offer",
        targetId: offer.id
      }
    });

    if (offer.candidate.userId) {
      await prisma.notification.create({
        data: {
          userId: offer.candidate.userId,
          type: "INFO",
          title: "New assignment offer",
          message: "A recruiter shared an enhanced assignment offer with you."
        }
      });
    }

    return NextResponse.json({
      success: true,
      candidateUrl: `/candidate/offer/${offer.token}`
    });
  } catch {
    return NextResponse.json({ error: "Failed to send offer" }, { status: 500 });
  }
}
