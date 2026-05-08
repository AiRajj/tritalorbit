import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logOfferViewed } from "@/lib/services/automation";

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    const body = (await request.json()) as { event: string };

    const offer = await prisma.offer.findUnique({ where: { token } });
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    switch (body.event) {
      case "viewed_offer": {
        await logOfferViewed({ offerId: offer.id, candidateId: offer.candidateId, agencyId: offer.agencyId });
        break;
      }
      case "clicked_housing":
      case "clicked_travel":
      case "requested_support": {
        await prisma.activityLog.create({
          data: {
            agencyId: offer.agencyId,
            candidateId: offer.candidateId,
            offerId: offer.id,
            assignmentId: offer.assignmentId,
            action: `candidate.${body.event}`
          }
        });
        break;
      }
      case "accepted_offer": {
        await prisma.offer.update({
          where: { id: offer.id },
          data: { status: "ACCEPTED", acceptedAt: new Date() }
        });

        await prisma.activityLog.create({
          data: {
            agencyId: offer.agencyId,
            candidateId: offer.candidateId,
            offerId: offer.id,
            assignmentId: offer.assignmentId,
            action: "candidate.accepted_offer"
          }
        });

        // readiness checklist bootstrap
        await prisma.documentVault.createMany({
          data: [
            {
              candidateId: offer.candidateId,
              assignmentId: offer.assignmentId,
              documentType: "License Verification",
              fileUrl: "pending://license-verification"
            },
            {
              candidateId: offer.candidateId,
              assignmentId: offer.assignmentId,
              documentType: "Compliance Packet",
              fileUrl: "pending://compliance-packet"
            }
          ]
        });

        break;
      }
      default:
        return NextResponse.json({ error: "Unknown event" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to process event" }, { status: 500 });
  }
}
