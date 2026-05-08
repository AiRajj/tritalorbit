import { NextResponse } from "next/server";

import { prisma, safeDb } from "@/lib/db";
import { leadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  const lead = await safeDb(() => prisma.lead.create({ data: parsed.data }), {
    id: crypto.randomUUID(),
    ...parsed.data,
    createdAt: new Date()
  });

  return NextResponse.json({ ok: true, lead });
}
