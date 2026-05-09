import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { withDbFallback } from "@/lib/services/db-fallback";
import { runIntegrationAiAgent } from "@/lib/integrations/ai/openai";

export async function listFirstWeekGuides(candidateId?: string) {
  return withDbFallback(
    () =>
      prisma.firstWeekGuide.findMany({
        where: candidateId ? { candidateId } : undefined,
        include: { checklistItems: true },
        orderBy: { updatedAt: "desc" },
        take: 12
      }),
    []
  );
}

export async function upsertFirstWeekGuide(
  input: Prisma.FirstWeekGuideUncheckedCreateInput & { checklistTitles?: string[] }
) {
  const confidenceSeed = 72 + Math.min(input.checklistTitles?.length ?? 0, 20);

  const guide = await prisma.firstWeekGuide.create({
    data: {
      assignmentId: input.assignmentId,
      candidateId: input.candidateId,
      agencyId: input.agencyId,
      facilityParkingInfo: input.facilityParkingInfo,
      firstDayInstructions: input.firstDayInstructions,
      nearestGrocery: input.nearestGrocery,
      nearestPharmacy: input.nearestPharmacy,
      nearestUrgentCare: input.nearestUrgentCare,
      localTransportationTips: input.localTransportationTips,
      weatherSummary: input.weatherSummary,
      safetyNotes: input.safetyNotes,
      emergencyContacts: input.emergencyContacts,
      firstWeekConfidenceScore: confidenceSeed,
      generatedByAI: false,
      checklistItems: input.checklistTitles
        ? {
            create: input.checklistTitles.map((title) => ({
              title,
              category: "READINESS",
              description: `Complete: ${title}`
            }))
          }
        : undefined
    },
    include: { checklistItems: true }
  });

  return guide;
}

export async function generateRelocationPlan(input: {
  assignmentId: string;
  candidateId: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  shift?: string;
  budget?: number;
  petNeeds?: string;
  commutePreference?: string;
}) {
  const ai = await runIntegrationAiAgent(
    "Relocation Assistant AI Agent",
    `Build relocation plan from ${input.originCity}, ${input.originState} to ${input.destinationCity}, ${input.destinationState}.`
  );

  return prisma.relocationPlan.create({
    data: {
      assignmentId: input.assignmentId,
      candidateId: input.candidateId,
      originCity: input.originCity,
      originState: input.originState,
      destinationCity: input.destinationCity,
      destinationState: input.destinationState,
      moveTimeline: ai.bullets[0] ?? "Move plan starts 14 days before assignment.",
      cityOrientation: ai.bullets[1] ?? "Focus on facility commute and essentials first week.",
      weatherExpectations: ai.summary,
      packingChecklist: `Budget: ${input.budget ?? 0}; Shift: ${input.shift ?? "TBD"}`,
      housingGuidance: "Prioritize furnished housing within preferred commute range.",
      transportationGuidance: "Confirm first week transport before travel booking.",
      firstWeekPreparation: "Review parking, onboarding logistics, and emergency contacts.",
      risks: input.petNeeds ? `Pet accommodation needed: ${input.petNeeds}` : "No critical relocation blockers detected.",
      nextBestActions: `Commute preference: ${input.commutePreference ?? "standard"}; confirm housing in 48 hours.`,
      generatedByAI: !ai.mock
    }
  });
}

export async function listOfferWarRoom(agencyId: string) {
  return withDbFallback(
    () =>
      prisma.offerIntelligence.findMany({
        where: { agencyId },
        include: { offer: true },
        orderBy: { updatedAt: "desc" },
        take: 40
      }),
    []
  );
}
