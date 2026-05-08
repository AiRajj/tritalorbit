import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: parsed.data,
  });

  return NextResponse.json({ id: lead.id }, { status: 201 });
}
