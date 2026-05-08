import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { readinessAgent } from "@/lib/ai/agents";

const schema = z.object({
  housing: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETE", "BLOCKED"]),
  travel: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETE", "BLOCKED"]),
  documents: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETE", "BLOCKED"]),
  firstWeek: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETE", "BLOCKED"]),
  daysToStart: z.number().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }
  const out = readinessAgent(parsed.data);
  return NextResponse.json({ ok: true, result: out });
}
