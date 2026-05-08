import { NextResponse } from "next/server";

import { prisma, safeDb } from "@/lib/db";
import { offerCreateSchema } from "@/lib/validations";

function mapPerkType(perk: string) {
  const normalized = perk.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
  const aliases: Record<string, string> = {
    FLIGHT_SUPPORT: "FLIGHT_SUPPORT",
    HOUSING_ASSISTANCE: "HOUSING_ASSISTANCE",
    CAR_RENTAL: "CAR_RENTAL",
    RELOCATION_CONCIERGE: "RELOCATION_CONCIERGE",
    FIRST_WEEK_READINESS: "FIRST_WEEK_READINESS",
    EMERGENCY_HOUSING_SUPPORT: "EMERGENCY_HOUSING",
    LOYALTY_REWARDS: "LOYALTY_REWARDS"
  };
  return aliases[normalized] || "FIRST_WEEK_READINESS";
}

export async function POST(request: Request) {
  const parsed = offerCreateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid offer", issues: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const fallbackId = "orbit-demo-offer";
  const offer = await safeDb(async () => {
    const agency =
      (await prisma.agency.findFirst()) ||
      (await prisma.agency.create({
        data: { name: "Northstar Clinical Staffing", slug: "northstar-clinical-staffing", billingEmail: "billing@example.com" }
      }));
    const candidate = await prisma.candidate.create({
      data: {
        agencyId: agency.id,
        name: payload.candidate.name,
        email: payload.candidate.email,
        phone: payload.candidate.phone,
        role: payload.candidate.role,
        specialty: payload.candidate.specialty,
        licenseState: payload.candidate.licenseState,
        yearsExperience: payload.candidate.yearsExperience
      }
    });
    const assignment = await prisma.assignment.create({
      data: {
        agencyId: agency.id,
        candidateId: candidate.id,
        facilityName: payload.assignment.facilityName,
        city: payload.assignment.city,
        state: payload.assignment.state,
        startDate: new Date(payload.assignment.startDate),
        durationWeeks: payload.assignment.durationWeeks,
        shift: payload.assignment.shift,
        specialty: payload.assignment.specialty,
        mspClient: payload.assignment.mspClient,
        status: "OFFERED"
      }
    });
    return prisma.offer.create({
      data: {
        agencyId: agency.id,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        weeklyPay: payload.compensation.weeklyPay,
        taxableRate: payload.compensation.taxableRate,
        stipend: payload.compensation.stipend,
        totalContractValue: payload.compensation.totalContractValue,
        enhancedSummary: payload.ai?.enhancedSummary,
        valueStatement: payload.ai?.valueStatement,
        recruiterTalkingPts: payload.ai?.recruiterTalkingPoints?.join("\n"),
        smsPitch: payload.ai?.smsPitch,
        emailPitch: payload.ai?.emailPitch,
        pdfReadyOffer: payload.ai?.pdfReadyOffer,
        closeStrategy: payload.ai?.closeStrategy,
        candidateConfidence: payload.ai?.confidenceScore || 74,
        perks: {
          create: payload.perks.map((perk) => ({
            type: mapPerkType(perk) as never,
            title: perk,
            description: `${perk} is included in this enhanced TRITAL Orbit offer.`
          }))
        },
        aiInsights: payload.ai
          ? {
              create: {
                agent: "Offer Boost AI Agent",
                prompt: "Offer Boost Builder generated enhanced collateral.",
                response: payload.ai
              }
            }
          : undefined,
        activityLogs: {
          create: {
            agencyId: agency.id,
            candidateId: candidate.id,
            type: "OFFER_CREATED",
            message: "Enhanced offer created in Offer Boost Builder."
          }
        }
      },
      select: { id: true, token: true }
    });
  }, { id: fallbackId, token: "demo-token" });

  return NextResponse.json(offer);
}
