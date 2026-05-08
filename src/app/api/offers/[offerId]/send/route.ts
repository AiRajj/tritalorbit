import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: Promise<{ offerId: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { offerId } = await params;

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
        actorId: session.user.id,
        candidateId: offer.candidateId,
        offerId: offer.id,
        assignmentId: offer.assignmentId,
        action: "offer.sent"
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
