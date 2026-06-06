import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { mobilityRequestCreateSchema } from "@/lib/validators/mobility";
import { seedBidsForRequest } from "@/lib/services/mobility";
import { getCallerAgencyIds, requireSession } from "@/lib/api-auth";

export async function POST(request: Request) {
  const guard = await requireSession();
  if (!guard.ok) return guard.response;

  const parsed = mobilityRequestCreateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid mobility request payload" }, { status: 400 });
  }

  const data = parsed.data;
  const user = guard.session.user;

  if (user.role === Role.CANDIDATE) {
    const candidate = await prisma.candidate.findFirst({
      where: { id: data.candidateId, userId: user.id },
      select: { id: true, agencyId: true }
    });
    if (!candidate || candidate.agencyId !== data.agencyId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } else if (user.role !== Role.SUPER_ADMIN) {
    const ids = await getCallerAgencyIds(user.id);
    if (!ids.includes(data.agencyId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const created = await prisma.mobilityRequest.create({
    data: {
      candidateId: data.candidateId,
      agencyId: data.agencyId,
      assignmentId: data.assignmentId,
      createdById: user.id,
      requestType: data.requestType,
      originCity: data.originCity,
      originState: data.originState,
      originAirport: data.originAirport,
      destinationCity: data.destinationCity,
      destinationState: data.destinationState,
      destinationAirport: data.destinationAirport,
      assignmentCity: data.assignmentCity,
      assignmentState: data.assignmentState,
      facilityName: data.facilityName,
      moveDate: data.moveDate ? new Date(data.moveDate) : null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      budgetMin: data.budgetMin,
      budgetMax: data.budgetMax,
      preferredAirline: data.preferredAirline,
      baggageNeeded: data.baggageNeeded ?? false,
      checkedBags: data.checkedBags ?? 0,
      housingNeeded: data.housingNeeded ?? false,
      carNeeded: data.carNeeded ?? false,
      hotelNeeded: data.hotelNeeded ?? false,
      petFriendly: data.petFriendly ?? false,
      accessibilityNeeds: data.accessibilityNeeds,
      preferredCommuteMinutes: data.preferredCommuteMinutes,
      notes: data.notes,
      urgencyLevel: data.urgencyLevel,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72)
    }
  });

  const seeded = await seedBidsForRequest({
    id: created.id,
    requestType: created.requestType,
    destinationCity: created.destinationCity,
    destinationState: created.destinationState,
    facilityName: created.facilityName,
    moveDate: created.moveDate,
    budgetMax: created.budgetMax ? Number(created.budgetMax) : null,
    petFriendly: created.petFriendly,
    durationWeeks: data.durationWeeks ?? 13
  });

  await prisma.activityLog.create({
    data: {
      agencyId: created.agencyId,
      actorId: user.id,
      candidateId: created.candidateId,
      assignmentId: created.assignmentId,
      action: "mobility.request.created",
      metadata: { mobilityRequestId: created.id, bidsSeeded: seeded }
    }
  });

  return NextResponse.json({ id: created.id, bidsSeeded: seeded }, { status: 201 });
}
