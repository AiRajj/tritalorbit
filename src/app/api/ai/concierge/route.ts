import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { conciergeAgent } from "@/lib/ai/agents";

const schema = z.object({
  candidateName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  needs: z.object({
    flight: z.boolean().optional(),
    housing: z.boolean().optional(),
    car: z.boolean().optional(),
  }),
  notes: z.string().optional(),
  budget: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }
  const out = await conciergeAgent(parsed.data);
  return NextResponse.json({ ok: true, result: out });
}
