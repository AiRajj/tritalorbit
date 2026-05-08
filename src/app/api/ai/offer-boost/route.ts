import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { offerBoostAgent } from "@/lib/ai/agents";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  candidateName: z.string().min(1),
  role: z.string().optional(),
  specialty: z.string().optional(),
  facilityName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  weeklyPay: z.number().nullable().optional(),
  durationWeeks: z.number().nullable().optional(),
  startDate: z.string().nullable().optional(),
  perks: z.array(z.string()).default([]),
  offerId: z.string().optional(),
  candidateId: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }
  const result = await offerBoostAgent(parsed.data);

  // Persist as AIInsight
  try {
    await prisma.aIInsight.create({
      data: {
        agent: "OFFER_BOOST",
        prompt: JSON.stringify(parsed.data),
        output: JSON.stringify(result),
        actorId: session.user.id,
        candidateId: parsed.data.candidateId ?? null,
        metadata: { offerId: parsed.data.offerId ?? null },
      },
    });
  } catch {
    /* non-fatal */
  }

  return NextResponse.json({ ok: true, result });
}
