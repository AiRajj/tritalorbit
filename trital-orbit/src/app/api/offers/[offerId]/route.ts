import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ offerId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { offerId } = await params;

  try {
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        perks: true,
        retentionRisks: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        bookingRequests: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json(offer);
  } catch (error) {
    console.error("[OFFER_GET]", error);
    return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 });
  }
}

const updateOfferSchema = z.object({
  status: z.string().optional(),
  aiEnhancedSummary: z.string().optional(),
  aiValueStatement: z.string().optional(),
  aiRecruiterTalkingPoints: z.string().optional(),
  aiSMSPitch: z.string().optional(),
  aiEmailPitch: z.string().optional(),
  aiCloseStrategy: z.string().optional(),
  candidateConfidenceScore: z.number().optional(),
  sentAt: z.string().optional(),
  viewedAt: z.string().optional(),
  acceptedAt: z.string().optional(),
  declinedAt: z.string().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ offerId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { offerId } = await params;

  try {
    const body = await req.json();
    const data = updateOfferSchema.parse(body);

    const updateData: Record<string, unknown> = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.aiEnhancedSummary !== undefined) updateData.aiEnhancedSummary = data.aiEnhancedSummary;
    if (data.aiValueStatement !== undefined) updateData.aiValueStatement = data.aiValueStatement;
    if (data.aiRecruiterTalkingPoints !== undefined) updateData.aiRecruiterTalkingPoints = data.aiRecruiterTalkingPoints;
    if (data.aiSMSPitch !== undefined) updateData.aiSMSPitch = data.aiSMSPitch;
    if (data.aiEmailPitch !== undefined) updateData.aiEmailPitch = data.aiEmailPitch;
    if (data.aiCloseStrategy !== undefined) updateData.aiCloseStrategy = data.aiCloseStrategy;
    if (data.candidateConfidenceScore !== undefined) updateData.candidateConfidenceScore = data.candidateConfidenceScore;
    if (data.sentAt !== undefined) updateData.sentAt = new Date(data.sentAt);

    const offer = await prisma.offer.update({
      where: { id: offerId },
      data: updateData,
      include: { perks: true },
    });

    return NextResponse.json(offer);
  } catch (error) {
    console.error("[OFFER_PATCH]", error);
    return NextResponse.json({ error: "Failed to update offer" }, { status: 500 });
  }
}
