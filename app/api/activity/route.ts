import { NextResponse } from "next/server";

import { prisma, safeDb } from "@/lib/db";
import { logCandidateViewedOffer, createReadinessChecklistOnAcceptance } from "@/lib/services/automation";

export async function POST(request: Request) {
  const body = (await request.json()) as { type?: string; offerId?: string; token?: string };
  const type = body.type || "ACTIVITY";

  if (type === "viewed_offer") {
    await logCandidateViewedOffer({ offerId: body.offerId, message: "Candidate viewed mobile offer hub.", metadata: body });
  } else if (type === "accepted_offer") {
    await createReadinessChecklistOnAcceptance({ offerId: body.offerId });
  }

  await safeDb(
    () =>
      prisma.activityLog.create({
        data: {
          offerId: body.offerId,
          type: type.toUpperCase(),
          message: `Candidate event tracked: ${type}`,
          metadata: body
        }
      }),
    null
  );

  return NextResponse.json({ ok: true });
}
