import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { UserRole } from "@prisma/client";

const createOfferSchema = z.object({
  candidateName: z.string().min(2),
  candidateEmail: z.string().email(),
  candidatePhone: z.string().optional(),
  candidateRole: z.string().optional(),
  candidateSpecialty: z.string().optional(),
  candidateLicenseState: z.string().optional(),
  candidateExperience: z.number().optional(),
  facilityName: z.string().min(2),
  facilityCity: z.string().min(2),
  facilityState: z.string().min(2),
  startDate: z.string().optional(),
  duration: z.number().optional(),
  shiftType: z.string().optional(),
  specialty: z.string().optional(),
  mspClient: z.string().optional(),
  weeklyPay: z.number().optional(),
  taxableRate: z.number().optional(),
  stipend: z.number().optional(),
  totalContractValue: z.number().optional(),
  perks: z.array(z.object({
    type: z.string(),
    title: z.string(),
    description: z.string().optional(),
    value: z.number().optional(),
    isEnabled: z.boolean(),
  })).optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  try {
    const user = session.user as any;
    const agencyId = user.agencyId;

    if (!agencyId && user.role !== UserRole.SUPER_ADMIN) {
      return NextResponse.json({ error: "No agency access" }, { status: 403 });
    }

    const where: Record<string, unknown> = {};
    if (agencyId) where.agencyId = agencyId;
    if (status) where.status = status;

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
        where,
        include: {
          perks: true,
          retentionRisks: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.offer.count({ where }),
    ]);

    return NextResponse.json({ offers, total, page, limit });
  } catch (error) {
    console.error("[OFFERS_GET]", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  const allowedRoles = [UserRole.SUPER_ADMIN, UserRole.AGENCY_OWNER, UserRole.RECRUITER];
  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const data = createOfferSchema.parse(body);

    const agencyId = user.agencyId;
    if (!agencyId && user.role !== UserRole.SUPER_ADMIN) {
      return NextResponse.json({ error: "No agency associated" }, { status: 403 });
    }

    // Get recruiter member record
    const recruiterMember = await prisma.agencyMember.findFirst({
      where: { userId: user.id },
    });

    const offer = await prisma.offer.create({
      data: {
        agencyId: agencyId ?? "system",
        recruiterId: recruiterMember?.id,
        candidateName: data.candidateName,
        candidateEmail: data.candidateEmail,
        candidatePhone: data.candidatePhone,
        candidateRole: data.candidateRole,
        candidateSpecialty: data.candidateSpecialty,
        candidateLicenseState: data.candidateLicenseState,
        candidateExperience: data.candidateExperience,
        facilityName: data.facilityName,
        facilityCity: data.facilityCity,
        facilityState: data.facilityState,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        duration: data.duration,
        shiftType: data.shiftType,
        specialty: data.specialty,
        mspClient: data.mspClient,
        weeklyPay: data.weeklyPay,
        taxableRate: data.taxableRate,
        stipend: data.stipend,
        totalContractValue: data.totalContractValue,
        notes: data.notes,
        status: "DRAFT",
        perks: data.perks ? {
          create: data.perks.map((perk) => ({
            type: perk.type,
            title: perk.title,
            description: perk.description,
            value: perk.value,
            isEnabled: perk.isEnabled,
          })),
        } : undefined,
      },
      include: { perks: true },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        agencyId,
        offerId: offer.id,
        type: "OFFER_CREATED",
        description: `Offer created for ${data.candidateName} at ${data.facilityName}`,
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 });
    }
    console.error("[OFFERS_POST]", error);
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
  }
}
