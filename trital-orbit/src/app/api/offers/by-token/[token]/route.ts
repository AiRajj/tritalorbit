import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    const offer = await prisma.offer.findUnique({
      where: { token },
      include: {
        perks: {
          where: { isEnabled: true },
        },
      },
    });

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    // Log view activity
    if (offer.status === "SENT" && !offer.viewedAt) {
      await prisma.offer.update({
        where: { id: offer.id },
        data: {
          status: "VIEWED",
          viewedAt: new Date(),
        },
      });

      await prisma.activityLog.create({
        data: {
          offerId: offer.id,
          type: "OFFER_VIEWED",
          description: `Candidate viewed offer for ${offer.facilityName}`,
        },
      });
    }

    return NextResponse.json(offer);
  } catch (error) {
    console.error("[OFFER_BY_TOKEN]", error);
    return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 });
  }
}
