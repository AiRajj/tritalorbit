import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { offerCreateSchema } from "@/lib/validators";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const parsed = offerCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  let agencyId = session.user.agencyId;
  if (!agencyId) {
    const member = await prisma.agencyMember.findFirst({ where: { userId: session.user.id } });
    agencyId = member?.agencyId ?? null;
    if (!agencyId) {
      const fallback = await prisma.agency.findFirst({ orderBy: { createdAt: "asc" } });
      agencyId = fallback?.id ?? null;
    }
  }
  if (!agencyId) {
    return NextResponse.json({ ok: false, error: "No agency context" }, { status: 400 });
  }

  // Find or create candidate
  let candidate = await prisma.candidate.findFirst({
    where: { agencyId, email: data.candidateEmail.toLowerCase() },
  });
  if (!candidate) {
    candidate = await prisma.candidate.create({
      data: {
        agencyId,
        firstName: data.candidateFirstName,
        lastName: data.candidateLastName,
        email: data.candidateEmail.toLowerCase(),
        phone: data.candidatePhone ?? null,
        role: data.role ?? null,
        specialty: data.specialty ?? null,
        licenseState: data.licenseState ?? null,
        yearsExperience: data.yearsExperience ?? null,
      },
    });
  }

  const weeklyPay = data.weeklyPay ?? null;
  const durationWeeks = data.durationWeeks ?? null;
  const totalContractValue =
    weeklyPay && durationWeeks ? new Prisma.Decimal(weeklyPay).mul(durationWeeks) : null;

  const offer = await prisma.offer.create({
    data: {
      agencyId,
      recruiterId: session.user.id,
      candidateId: candidate.id,
      facilityName: data.facilityName,
      city: data.city,
      state: data.state,
      startDate: data.startDate ? new Date(data.startDate) : null,
      durationWeeks: durationWeeks,
      shift: data.shift ?? null,
      specialty: data.specialty ?? null,
      mspClient: data.mspClient ?? null,
      weeklyPay: weeklyPay !== null ? new Prisma.Decimal(weeklyPay) : null,
      taxableRate: data.taxableRate !== null && data.taxableRate !== undefined ? new Prisma.Decimal(data.taxableRate) : null,
      stipend: data.stipend !== null && data.stipend !== undefined ? new Prisma.Decimal(data.stipend) : null,
      totalContractValue,
      flightSupport: !!data.flightSupport,
      housingAssist: !!data.housingAssist,
      carRental: !!data.carRental,
      relocationConcierge: !!data.relocationConcierge,
      firstWeekReadiness: !!data.firstWeekReadiness,
      emergencyHousing: !!data.emergencyHousing,
      loyaltyRewards: !!data.loyaltyRewards,
      status: "DRAFT",
    },
  });

  await prisma.activityLog.create({
    data: {
      actorId: session.user.id,
      candidateId: candidate.id,
      offerId: offer.id,
      action: "offer.created",
      description: `Created offer for ${data.facilityName} (${data.city}, ${data.state}).`,
    },
  });

  return NextResponse.json({ ok: true, offerId: offer.id, candidateId: candidate.id });
}
