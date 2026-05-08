import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token: z.string(),
  decision: z.enum(["ACCEPTED", "DECLINED"]),
  note: z.string().optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const offer = await prisma.offer.findUnique({
    where: { publicToken: parsed.data.token },
    include: { candidate: true, agency: true },
  });
  if (!offer) return NextResponse.json({ ok: false }, { status: 404 });

  await prisma.offer.update({
    where: { id: offer.id },
    data: {
      status: parsed.data.decision,
      respondedAt: new Date(),
    },
  });

  if (parsed.data.decision === "ACCEPTED") {
    await prisma.assignment.upsert({
      where: { offerId: offer.id },
      create: {
        offerId: offer.id,
        candidateId: offer.candidateId,
        agencyId: offer.agencyId,
        startDate: offer.startDate ?? null,
        status: "PRE_START",
      },
      update: { status: "PRE_START" },
    });
  }

  await prisma.activityLog.create({
    data: {
      candidateId: offer.candidateId,
      offerId: offer.id,
      action: parsed.data.decision === "ACCEPTED" ? "offer.accepted" : "offer.declined",
      description:
        parsed.data.decision === "ACCEPTED"
          ? `Candidate accepted the offer.`
          : `Candidate declined the offer.`,
    },
  });

  if (offer.recruiterId) {
    await prisma.notification.create({
      data: {
        userId: offer.recruiterId,
        type: "OFFER",
        title: parsed.data.decision === "ACCEPTED" ? "Offer accepted" : "Offer declined",
        message: `${offer.candidate.firstName} ${offer.candidate.lastName} ${parsed.data.decision === "ACCEPTED" ? "accepted" : "declined"} ${offer.facilityName}.`,
        link: `/agency/offers/${offer.id}/preview`,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
