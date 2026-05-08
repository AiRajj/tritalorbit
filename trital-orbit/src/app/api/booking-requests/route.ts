import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { generateConciergeInsights } from "@/lib/ai";

const schema = z.object({
  offerId: z.string().optional(),
  candidateId: z.string().optional(),
  agencyId: z.string().optional(),
  needsFlight: z.boolean().default(false),
  needsHousing: z.boolean().default(false),
  needsCar: z.boolean().default(false),
  moveDate: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredLocation: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  try {
    const where: Record<string, unknown> = {};
    if (user.agencyId) where.agencyId = user.agencyId;
    if (status) where.status = status;

    const requests = await prisma.bookingRequest.findMany({
      where,
      include: {
        offer: true,
        candidate: true,
        conciergeTask: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("[BOOKING_REQUESTS_GET]", error);
    return NextResponse.json({ error: "Failed to fetch booking requests" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Get offer info for concierge task
    let offerInfo: { candidateName: string; facilityCity: string; facilityState: string; startDate: Date | null } | null = null;
    if (data.offerId) {
      const offer = await prisma.offer.findUnique({
        where: { id: data.offerId },
      });
      if (offer) {
        offerInfo = {
          candidateName: offer.candidateName,
          facilityCity: offer.facilityCity,
          facilityState: offer.facilityState,
          startDate: offer.startDate,
        };
      }
    }

    const bookingRequest = await prisma.bookingRequest.create({
      data: {
        offerId: data.offerId,
        candidateId: data.candidateId,
        agencyId: data.agencyId,
        needsFlight: data.needsFlight,
        needsHousing: data.needsHousing,
        needsCar: data.needsCar,
        moveDate: data.moveDate ? new Date(data.moveDate) : undefined,
        budgetRange: data.budgetRange,
        preferredLocation: data.preferredLocation,
        notes: data.notes,
        status: "NEW",
      },
    });

    // Auto-create concierge task
    if (offerInfo) {
      const insights = await generateConciergeInsights({
        candidateName: offerInfo.candidateName,
        assignmentCity: offerInfo.facilityCity,
        assignmentState: offerInfo.facilityState,
        startDate: offerInfo.startDate?.toISOString(),
        needsHousing: data.needsHousing,
        needsFlight: data.needsFlight,
        needsCar: data.needsCar,
        notes: data.notes,
      });

      await prisma.conciergeTask.create({
        data: {
          bookingRequestId: bookingRequest.id,
          title: `${[data.needsHousing && "Housing", data.needsFlight && "Flight", data.needsCar && "Car"].filter(Boolean).join(" + ")} for ${offerInfo.candidateName}`,
          description: insights.summary,
          candidateName: offerInfo.candidateName,
          assignmentCity: offerInfo.facilityCity,
          assignmentState: offerInfo.facilityState,
          taskType: [data.needsHousing && "HOUSING", data.needsFlight && "FLIGHT", data.needsCar && "CAR"].filter(Boolean).join(","),
          status: "NEW",
          priority: "NORMAL",
        },
      });
    }

    // Log offer activity
    if (data.offerId) {
      const needsTypes = [
        data.needsHousing && "HOUSING_REQUESTED",
        data.needsFlight && "TRAVEL_REQUESTED",
        data.needsCar && "CAR_REQUESTED",
      ].filter(Boolean);

      for (const type of needsTypes) {
        if (!type) continue;
        await prisma.activityLog.create({
          data: {
            offerId: data.offerId,
            candidateId: data.candidateId,
            type: type as any,
            description: `Candidate requested ${type.replace("_REQUESTED", "").toLowerCase()} support`,
          },
        });
      }
    }

    return NextResponse.json(bookingRequest, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 });
    }
    console.error("[BOOKING_REQUESTS_POST]", error);
    return NextResponse.json({ error: "Failed to create booking request" }, { status: 500 });
  }
}
