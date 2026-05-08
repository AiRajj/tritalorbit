import { NextResponse } from "next/server";

import { prisma, safeDb } from "@/lib/db";
import { generateCandidateUpdateOnTaskComplete } from "@/lib/services/automation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json()) as { status?: string };
  const status = body.status || "IN_PROGRESS";

  await safeDb(
    () =>
      prisma.bookingRequest.update({
        where: { id },
        data: { status: status as never }
      }),
    null
  );

  if (status === "COMPLETED") {
    await generateCandidateUpdateOnTaskComplete({ metadata: { bookingRequestId: id } });
  }

  return NextResponse.json({ ok: true, id, status });
}
