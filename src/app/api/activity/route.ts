import { NextResponse } from "next/server";
import { z } from "zod";

import {
  handleHousingViewedNoAcceptance,
  handleOfferViewAutomation,
  logActivity,
} from "@/lib/automation";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token: z.string().uuid().optional(),
  offerId: z.string().uuid().optional(),
  action: z.string().min(2),
  metadata: z.record(z.string(), z.any()).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid activity payload" }, { status: 400 });
  }

  let offerId = parsed.data.offerId;

  if (!offerId && parsed.data.token) {
    const offer = await prisma.offer.findUnique({
      where: { shareableToken: parsed.data.token },
      select: { id: true },
    });
    offerId = offer?.id;
  }

  if (!offerId) {
    return NextResponse.json({ error: "Offer context missing" }, { status: 400 });
  }

  const offer = await prisma.offer.findUnique({ where: { id: offerId } });
  if (!offer) {
    return NextResponse.json({ error: "Offer not found" }, { status: 404 });
  }

  await logActivity({
    action: parsed.data.action,
    candidateId: offer.candidateId,
    assignmentId: offer.assignmentId,
    offerId: offer.id,
    metadata: parsed.data.metadata,
  });

  if (parsed.data.action === "OFFER_VIEWED") {
    await prisma.offer.update({
      where: { id: offer.id },
      data: {
        status: offer.status === "SENT" ? "VIEWED" : offer.status,
        viewedAt: new Date(),
      },
    });
    await handleOfferViewAutomation(offer.id);
  }

  if (parsed.data.action === "OFFER_ACCEPTED") {
    await prisma.offer.update({
      where: { id: offer.id },
      data: {
        status: "ACCEPTED",
        acceptedAt: new Date(),
      },
    });

    await prisma.assignment.update({
      where: { id: offer.assignmentId },
      data: {
        status: "IN_PROGRESS",
        firstWeekReadiness: 25,
        readinessNotes: "Auto-created readiness checklist after offer acceptance.",
      },
    });
  }

  if (parsed.data.action === "HOUSING_VIEWED" && offer.status !== "ACCEPTED") {
    await handleHousingViewedNoAcceptance(offer.id);
  }

  return NextResponse.json({ ok: true });
}
