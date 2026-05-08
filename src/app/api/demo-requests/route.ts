import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { demoRequestSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = demoRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const record = await prisma.demoRequest.create({
    data: {
      ...parsed.data,
      preferredDate: parsed.data.preferredDate ? new Date(parsed.data.preferredDate) : null,
    },
  });

  return NextResponse.json({ id: record.id }, { status: 201 });
}
