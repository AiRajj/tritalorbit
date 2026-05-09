import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";
import { externalOfferSchema } from "@/lib/validators/wave2";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const candidateIdParam = url.searchParams.get("candidateId");

  try {
    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate) return NextResponse.json({ offers: [] });

      const offers = await prisma.externalOfferDocument.findMany({
        where: { candidateId: candidate.id },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({ offers });
    }

    if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) return NextResponse.json({ offers: [] });

      const offers = await prisma.externalOfferDocument.findMany({
        where: {
          candidate: {
            agencyId,
            ...(candidateIdParam ? { id: candidateIdParam } : {})
          }
        },
        include: {
          candidate: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({ offers });
    }

    if (session.user.role === Role.SUPER_ADMIN) {
      const offers = await prisma.externalOfferDocument.findMany({
        orderBy: { createdAt: "desc" },
        take: 200
      });
      return NextResponse.json({ offers });
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Unable to load external offers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.user.role, [Role.CANDIDATE, Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = externalOfferSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid external offer payload" }, { status: 400 });
    }

    let candidateId = parsed.data.candidateId;

    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate) {
        return NextResponse.json({ error: "Candidate profile not found" }, { status: 404 });
      }
      candidateId = candidate.id;
    } else {
      if (!candidateId) {
        return NextResponse.json({ error: "candidateId is required" }, { status: 400 });
      }

      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) {
        return NextResponse.json({ error: "Agency context not found" }, { status: 404 });
      }

      const candidate = await prisma.candidate.findUnique({
        where: { id: candidateId },
        select: { id: true, agencyId: true }
      });
      if (!candidate || candidate.agencyId !== agencyId) {
        return NextResponse.json({ error: "Candidate not found in agency" }, { status: 404 });
      }
    }

    const created = await prisma.externalOfferDocument.create({
      data: {
        candidateId: candidateId!,
        uploadedById: session.user.id,
        sourceLabel: parsed.data.sourceLabel,
        agencyName: parsed.data.agencyName,
        role: parsed.data.role,
        specialty: parsed.data.specialty,
        locationCity: parsed.data.locationCity,
        locationState: parsed.data.locationState,
        weeklyPay: parsed.data.weeklyPay,
        taxableRate: parsed.data.taxableRate,
        stipend: parsed.data.stipend,
        durationWeeks: parsed.data.durationWeeks,
        travelSupportScore: parsed.data.travelSupportScore ?? 50,
        housingSupportScore: parsed.data.housingSupportScore ?? 50,
        readinessSupportScore: parsed.data.readinessSupportScore ?? 50,
        costOfLivingIndex: parsed.data.costOfLivingIndex ?? 1,
        rawText: parsed.data.rawText
      }
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save external offer" }, { status: 500 });
  }
}
