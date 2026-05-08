import { NextResponse } from "next/server";
import { demoSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = demoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }
    const created = await prisma.demoRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        company: parsed.data.company ?? null,
        phone: parsed.data.phone ?? null,
        role: parsed.data.role ?? null,
        teamSize: parsed.data.teamSize ?? null,
        preferredTime: parsed.data.preferredTime ? new Date(parsed.data.preferredTime) : null,
        notes: parsed.data.notes ?? null,
      },
    });
    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    console.error("[demo] failed", err);
    return NextResponse.json({ ok: false, error: "Unable to record demo request." }, { status: 500 });
  }
}
