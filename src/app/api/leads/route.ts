import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validators/forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
    }

    const lead = await prisma.lead.create({ data: parsed.data });
    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to store lead. Please try again or contact support@tritalorbit.com." },
      { status: 500 }
    );
  }
}
