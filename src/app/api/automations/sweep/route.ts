import { NextResponse } from "next/server";
import { subHours } from "date-fns";
import { Role } from "@prisma/client";

import {
  handleConciergeTaskCompleted,
  handleOfferNotViewedInTwoHours,
  handleOfferViewAutomation,
} from "@/lib/automation";
import { requireApiRole } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const auth = await requireApiRole([Role.SUPER_ADMIN, Role.AGENCY_OWNER, Role.CONCIERGE_MANAGER]);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const staleOffers = await prisma.offer.findMany({
    where: {
      status: "SENT",
      viewedAt: null,
      sentAt: { lte: subHours(new Date(), 2) },
    },
    take: 100,
  });

  await Promise.all(staleOffers.map((offer) => handleOfferNotViewedInTwoHours(offer.id)));

  const housingRiskOffers = await prisma.offer.findMany({
    where: {
      assignment: {
        startDate: { lte: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) },
        housingStatus: { not: "READY" },
      },
    },
    include: { assignment: true },
    take: 100,
  });

  await Promise.all(housingRiskOffers.map((offer) => handleOfferViewAutomation(offer.id)));

  const completedTasks = await prisma.conciergeTask.findMany({
    where: { status: "COMPLETED" },
    take: 100,
  });

  await Promise.all(completedTasks.map((task) => handleConciergeTaskCompleted(task.id)));

  return NextResponse.json({
    checkedOffers: staleOffers.length,
    checkedHousingRisks: housingRiskOffers.length,
    completedTasks: completedTasks.length,
  });
}
