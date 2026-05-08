import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }
    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        company: parsed.data.company ?? null,
        phone: parsed.data.phone ?? null,
        role: parsed.data.role ?? null,
        message: parsed.data.message ?? null,
        source: parsed.data.source ?? "marketing",
      },
    });
    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("[leads] failed", err);
    return NextResponse.json({ ok: false, error: "Unable to capture lead." }, { status: 500 });
  }
}
