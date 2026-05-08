import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators/forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid contact payload" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        source: "CONTACT",
        name: parsed.data.name,
        workEmail: parsed.data.workEmail,
        company: parsed.data.company,
        message: parsed.data.message
      }
    });

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit your message right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
