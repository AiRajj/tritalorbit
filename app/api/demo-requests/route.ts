import { NextResponse } from "next/server";

import { prisma, safeDb } from "@/lib/db";
import { demoRequestSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const parsed = demoRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid demo request", issues: parsed.error.flatten() }, { status: 400 });
  }

  const demoRequest = await safeDb(() => prisma.demoRequest.create({ data: parsed.data }), {
    id: crypto.randomUUID(),
    ...parsed.data,
    createdAt: new Date()
  });

  return NextResponse.json({ ok: true, demoRequest });
}
