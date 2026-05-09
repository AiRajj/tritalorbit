import { ComparisonSourceType, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";
import {
  calculateComparisonScores,
  deriveBestOverallLabel,
  generateComparisonNarrative,
  toDecimal
} from "@/lib/services/comparison";
import { offerComparisonSchema } from "@/lib/validators/wave2";

function estimateCostOfLivingIndex(state: string) {
  const highCost = ["CA", "NY", "NJ", "MA", "WA", "HI"];
  const mid = ["CO", "OR", "VA", "MD", "FL", "IL"];
  if (highCost.includes(state.toUpperCase())) return 1.35;
  if (mid.includes(state.toUpperCase())) return 1.15;
  return 1;
}

function getSupportScoresFromOfferPerks(perks: Array<{ name: string; enabled: boolean }>) {
  const has = (name: string) => perks.some((perk) => perk.name === name && perk.enabled);
  return {
    travelSupportScore: has("Flight Support") || has("Car Rental") ? 75 : 45,
    housingSupportScore: has("Housing Assistance") ? 80 : 45,
    readinessSupportScore: has("First Week Readiness") || has("Relocation Concierge") ? 78 : 50
  };
}

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
      if (!candidate) return NextResponse.json({ comparisons: [] });

      const comparisons = await prisma.offerComparison.findMany({
        where: { candidateId: candidate.id },
        include: {
          entries: true,
          insights: { orderBy: { rank: "asc" } },
          primaryOffer: true
        },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({ comparisons });
    }

    if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) return NextResponse.json({ comparisons: [] });

      const comparisons = await prisma.offerComparison.findMany({
        where: {
          candidate: {
            agencyId,
            ...(candidateIdParam ? { id: candidateIdParam } : {})
          }
        },
        include: {
          candidate: { select: { id: true, name: true } },
          entries: true,
          insights: { orderBy: { rank: "asc" } }
        },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({ comparisons });
    }

    if (session.user.role === Role.SUPER_ADMIN) {
      const comparisons = await prisma.offerComparison.findMany({
        include: {
          candidate: { select: { id: true, name: true } },
          entries: true,
          insights: true
        },
        orderBy: { createdAt: "desc" },
        take: 200
      });

      return NextResponse.json({ comparisons });
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Unable to load offer comparisons" }, { status: 500 });
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
    const parsed = offerComparisonSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid comparison payload" }, { status: 400 });
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
        select: { agencyId: true }
      });
      if (!candidate || candidate.agencyId !== agencyId) {
        return NextResponse.json({ error: "Candidate not found in agency" }, { status: 404 });
      }
    }

    const internalOfferIds = parsed.data.internalOfferIds;
    const externalOfferIds = parsed.data.externalOfferIds;

    const [internalOffers, externalOffers] = await Promise.all([
      prisma.offer.findMany({
        where: {
          id: internalOfferIds.length > 0 ? { in: internalOfferIds } : undefined,
          candidateId: candidateId!
        },
        include: {
          assignment: true,
          perks: true
        }
      }),
      prisma.externalOfferDocument.findMany({
        where: {
          id: externalOfferIds.length > 0 ? { in: externalOfferIds } : undefined,
          candidateId: candidateId!
        }
      })
    ]);

    const candidateInputs = [
      ...internalOffers.map((offer) => {
        const support = getSupportScoresFromOfferPerks(offer.perks);
        return {
          sourceType: ComparisonSourceType.INTERNAL_OFFER,
          internalOfferId: offer.id,
          externalOfferId: undefined,
          label: `${offer.assignment.facilityName} (${offer.assignment.city}, ${offer.assignment.state})`,
          weeklyPay: Number(offer.weeklyPay),
          stipend: Number(offer.stipend),
          durationWeeks: offer.assignment.durationWeeks,
          city: offer.assignment.city,
          state: offer.assignment.state,
          travelSupportScore: support.travelSupportScore,
          housingSupportScore: support.housingSupportScore,
          readinessSupportScore: support.readinessSupportScore,
          costOfLivingIndex: estimateCostOfLivingIndex(offer.assignment.state),
          notes: "Internal offer"
        };
      }),
      ...externalOffers.map((offer) => ({
        sourceType: ComparisonSourceType.EXTERNAL_OFFER,
        internalOfferId: undefined,
        externalOfferId: offer.id,
        label: `${offer.agencyName} (${offer.locationCity}, ${offer.locationState})`,
        weeklyPay: Number(offer.weeklyPay),
        stipend: Number(offer.stipend ?? 0),
        durationWeeks: offer.durationWeeks ?? 13,
        city: offer.locationCity,
        state: offer.locationState,
        travelSupportScore: offer.travelSupportScore,
        housingSupportScore: offer.housingSupportScore,
        readinessSupportScore: offer.readinessSupportScore,
        costOfLivingIndex: offer.costOfLivingIndex,
        notes: offer.sourceLabel
      }))
    ].map((entry) => ({
      ...entry,
      ...calculateComparisonScores(entry)
    }));

    if (candidateInputs.length < 2) {
      return NextResponse.json(
        { error: "At least two offers are required for comparison." },
        { status: 400 }
      );
    }

    const bestOverallLabel = deriveBestOverallLabel(candidateInputs);
    const aiNarrative = await generateComparisonNarrative(candidateInputs);

    const comparison = await prisma.offerComparison.create({
      data: {
        candidateId: candidateId!,
        primaryOfferId: parsed.data.primaryOfferId,
        createdById: session.user.id,
        status: "ANALYZED",
        recommendationTitle: aiNarrative.title,
        executiveSummary: aiNarrative.summary,
        bestOverallLabel,
        entries: {
          createMany: {
            data: candidateInputs.map((entry) => ({
              sourceType: entry.sourceType,
              internalOfferId: entry.internalOfferId,
              externalOfferId: entry.externalOfferId,
              label: entry.label,
              weeklyPay: toDecimal(entry.weeklyPay),
              stipend: toDecimal(entry.stipend),
              durationWeeks: entry.durationWeeks,
              city: entry.city,
              state: entry.state,
              travelSupportScore: entry.travelSupportScore,
              housingSupportScore: entry.housingSupportScore,
              readinessSupportScore: entry.readinessSupportScore,
              costOfLivingIndex: entry.costOfLivingIndex,
              totalValueScore: entry.totalValueScore,
              lifestyleScore: entry.lifestyleScore,
              notes: entry.notes
            }))
          }
        }
      }
    });

    if (aiNarrative.insights.length) {
      await prisma.offerComparisonInsight.createMany({
        data: aiNarrative.insights.map((insight, index) => ({
          comparisonId: comparison.id,
          heading: `Insight ${index + 1}`,
          detail: insight,
          rank: index + 1,
          aiModel: "openai-or-fallback"
        }))
      });
    }

    return NextResponse.json({ id: comparison.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to run offer comparison" }, { status: 500 });
  }
}
