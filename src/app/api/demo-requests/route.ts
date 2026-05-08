import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { demoRequestSchema } from "@/lib/validators/forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = demoRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid demo request payload" }, { status: 400 });
    }

    const requestRecord = await prisma.demoRequest.create({ data: parsed.data });
    return NextResponse.json({ id: requestRecord.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to save demo request at the moment. Please retry shortly." },
      { status: 500 }
    );
  }
}
