import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { offerBuilderSchema } from "@/lib/validators/offer";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = offerBuilderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid offer payload" }, { status: 400 });
    }

    let candidate = await prisma.candidate.findFirst({
      where: { agencyId: parsed.data.agencyId, email: parsed.data.candidate.email }
    });

    if (!candidate) {
      candidate = await prisma.candidate.create({
        data: {
          agencyId: parsed.data.agencyId,
          name: parsed.data.candidate.name,
          email: parsed.data.candidate.email,
          phone: parsed.data.candidate.phone,
          role: parsed.data.candidate.role,
          specialty: parsed.data.candidate.specialty,
          licenseState: parsed.data.candidate.licenseState,
          experienceYears: parsed.data.candidate.experienceYears
        }
      });
    }

    const assignment = await prisma.assignment.create({
      data: {
        agencyId: parsed.data.agencyId,
        candidateId: candidate.id,
        facilityName: parsed.data.assignment.facilityName,
        city: parsed.data.assignment.city,
        state: parsed.data.assignment.state,
        mspClient: parsed.data.assignment.mspClient,
        role: parsed.data.assignment.role,
        specialty: parsed.data.assignment.specialty,
        startDate: new Date(parsed.data.assignment.startDate),
        durationWeeks: parsed.data.assignment.durationWeeks,
        shift: parsed.data.assignment.shift
      }
    });

    const offer = await prisma.offer.create({
      data: {
        agencyId: parsed.data.agencyId,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        recruiterId: parsed.data.recruiterId,
        weeklyPay: parsed.data.compensation.weeklyPay,
        taxableRate: parsed.data.compensation.taxableRate,
        stipend: parsed.data.compensation.stipend,
        estimatedContractValue: parsed.data.compensation.estimatedContractValue,
        perks: {
          createMany: {
            data: parsed.data.perks
          }
        }
      }
    });

    await prisma.activityLog.create({
      data: {
        agencyId: parsed.data.agencyId,
        actorId: session.user.id,
        candidateId: candidate.id,
        offerId: offer.id,
        assignmentId: assignment.id,
        action: "offer.created"
      }
    });

    return NextResponse.json({ offerId: offer.id, token: offer.token }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
  }
}
