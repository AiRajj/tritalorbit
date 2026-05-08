import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { requireApiRole } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { offerCreateSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const auth = await requireApiRole([Role.AGENCY_OWNER, Role.RECRUITER]);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json().catch(() => null);
  const parsed = offerCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid offer payload" }, { status: 400 });
  }

  const member = await prisma.agencyMember.findFirst({
    where: { userId: auth.session.user.id },
  });

  if (!member) {
    return NextResponse.json({ error: "User is not attached to an agency" }, { status: 400 });
  }

  const candidate = await prisma.candidate.upsert({
    where: { email: parsed.data.candidate.email.toLowerCase() },
    update: {
      fullName: parsed.data.candidate.fullName,
      phone: parsed.data.candidate.phone,
      roleTitle: parsed.data.candidate.roleTitle,
      specialty: parsed.data.candidate.specialty,
      licenseState: parsed.data.candidate.licenseState,
      yearsExperience: parsed.data.candidate.yearsExperience,
      agencyId: member.agencyId,
    },
    create: {
      agencyId: member.agencyId,
      fullName: parsed.data.candidate.fullName,
      email: parsed.data.candidate.email.toLowerCase(),
      phone: parsed.data.candidate.phone,
      roleTitle: parsed.data.candidate.roleTitle,
      specialty: parsed.data.candidate.specialty,
      licenseState: parsed.data.candidate.licenseState,
      yearsExperience: parsed.data.candidate.yearsExperience,
    },
  });

  const assignment = await prisma.assignment.create({
    data: {
      agencyId: member.agencyId,
      candidateId: candidate.id,
      facilityName: parsed.data.assignment.facilityName,
      city: parsed.data.assignment.city,
      state: parsed.data.assignment.state,
      startDate: new Date(parsed.data.assignment.startDate),
      durationWeeks: parsed.data.assignment.durationWeeks,
      shift: parsed.data.assignment.shift,
      specialty: parsed.data.assignment.specialty,
      mspClientName: parsed.data.assignment.mspClientName,
      status: "IN_PROGRESS",
    },
  });

  const offer = await prisma.offer.create({
    data: {
      agencyId: member.agencyId,
      assignmentId: assignment.id,
      candidateId: candidate.id,
      recruiterId: auth.session.user.id,
      weeklyPay: parsed.data.compensation.weeklyPay,
      taxableRate: parsed.data.compensation.taxableRate,
      stipend: parsed.data.compensation.stipend,
      estimatedContractValue: parsed.data.compensation.estimatedContractValue,
      perks: {
        createMany: {
          data: parsed.data.perks,
        },
      },
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "OFFER_CREATED",
      userId: auth.session.user.id,
      candidateId: candidate.id,
      assignmentId: assignment.id,
      offerId: offer.id,
    },
  });

  return NextResponse.json({ offerId: offer.id, token: offer.shareableToken }, { status: 201 });
}
