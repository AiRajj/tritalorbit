import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token: z.string().min(1),
  event: z.enum(["viewed", "clickedHousing", "clickedTravel", "clickedCar", "askedRecruiter"]),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const offer = await prisma.offer.findUnique({
    where: { publicToken: parsed.data.token },
    select: { id: true, candidateId: true, status: true },
  });
  if (!offer) return NextResponse.json({ ok: false }, { status: 404 });

  if (parsed.data.event === "viewed" && offer.status === "SENT") {
    await prisma.offer.update({
      where: { id: offer.id },
      data: { status: "VIEWED", viewedAt: new Date() },
    });
  }
  await prisma.activityLog.create({
    data: {
      candidateId: offer.candidateId,
      offerId: offer.id,
      action: `candidate.${parsed.data.event}`,
      description: `Candidate ${parsed.data.event}.`,
    },
  });
  return NextResponse.json({ ok: true });
}
