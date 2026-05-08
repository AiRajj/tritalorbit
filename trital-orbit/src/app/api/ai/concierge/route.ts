import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateConciergeInsights } from "@/lib/ai";
import { z } from "zod";

const schema = z.object({
  candidateName: z.string(),
  assignmentCity: z.string(),
  assignmentState: z.string(),
  startDate: z.string().optional(),
  needsHousing: z.boolean(),
  needsFlight: z.boolean(),
  needsCar: z.boolean(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);
    const result = await generateConciergeInsights(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI_CONCIERGE]", error);
    return NextResponse.json({ error: "Concierge insights generation failed" }, { status: 500 });
  }
}
