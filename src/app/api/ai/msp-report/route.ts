import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { mspReportAgent } from "@/lib/ai/agents";

const schema = z.object({
  agencyName: z.string(),
  periodLabel: z.string(),
  metrics: z.object({
    offersSent: z.number(),
    accepted: z.number(),
    backouts: z.number(),
    onTimeStarts: z.number(),
    avgReadiness: z.number(),
    highRiskCount: z.number(),
  }),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }
  const out = mspReportAgent(parsed.data);
  return NextResponse.json({ ok: true, result: out });
}
