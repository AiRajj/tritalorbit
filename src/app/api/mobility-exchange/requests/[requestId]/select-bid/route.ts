import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";
import { grantCandidateCredit } from "@/lib/services/wallet";
import { selectTravelBidSchema } from "@/lib/validators/mobility";

export async function POST(request: Request, { params }: { params: Promise<{ requestId: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER, Role.CANDIDATE])) {
    return NextResponse.json({ error: "Role not authorized to select travel bid" }, { status: 403 });
  }

  const { requestId } = await params;

  try {
    const body = await request.json();
    const parsed = selectTravelBidSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid bid selection payload" }, { status: 400 });
    }

    const requestRecord = await prisma.travelBidRequest.findUnique({
      where: { id: requestId },
      include: {
        candidate: {
          select: { id: true, userId: true }
        }
      }
    });

    if (!requestRecord) {
      return NextResponse.json({ error: "Travel request not found" }, { status: 404 });
    }

    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate || candidate.id !== requestRecord.candidateId) {
        return NextResponse.json({ error: "Candidate does not have access to this request" }, { status: 403 });
      }
    } else {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId || agencyId !== requestRecord.agencyId) {
        return NextResponse.json({ error: "Agency does not have access to this request" }, { status: 403 });
      }
    }

    const bid = await prisma.travelBid.findUnique({
      where: { id: parsed.data.bidId }
    });

    if (!bid || bid.requestId !== requestRecord.id) {
      return NextResponse.json({ error: "Bid not found for this request" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.travelBid.updateMany({
        where: { requestId: requestRecord.id, status: "ACTIVE" },
        data: { status: "REJECTED" }
      });

      await tx.travelBid.update({
        where: { id: bid.id },
        data: {
          status: "SELECTED",
          selectedAt: new Date()
        }
      });

      await tx.travelBidRequest.update({
        where: { id: requestRecord.id },
        data: {
          selectedBidId: bid.id,
          status: "BOOKED"
        }
      });

      await tx.activityLog.create({
        data: {
          agencyId: requestRecord.agencyId,
          actorId: session.user.id,
          candidateId: requestRecord.candidateId,
          assignmentId: requestRecord.assignmentId,
          offerId: requestRecord.offerId,
          action: "mobility.bid.selected",
          metadata: {
            travelBidRequestId: requestRecord.id,
            selectedBidId: bid.id,
            selectedPrice: bid.totalPrice
          }
        }
      });
    });

    if (requestRecord.candidate.userId) {
      await prisma.notification.create({
        data: {
          userId: requestRecord.candidate.userId,
          type: "INFO",
          title: "Travel package selected",
          message: "Your agency selected a travel package. You can proceed in your wallet to redeem travel credits."
        }
      });
    }

    if (requestRecord.agencyTravelCredit.gt(0)) {
      try {
        await grantCandidateCredit({
          agencyId: requestRecord.agencyId,
          candidateId: requestRecord.candidateId,
          amount: Number(requestRecord.agencyTravelCredit),
          description: "Agency-sponsored travel credit",
          travelRequestId: requestRecord.id,
          createdById: session.user.id
        });
      } catch {
        // Gracefully continue if agency wallet is not funded yet.
      }
    }

    return NextResponse.json({ success: true, selectedBidId: bid.id });
  } catch {
    return NextResponse.json({ error: "Unable to select travel bid" }, { status: 500 });
  }
}
