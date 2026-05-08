import { NextResponse } from "next/server";
import { z } from "zod";

import { generateAiResponse } from "@/lib/ai";

const schema = z.object({
  housingStatus: z.string(),
  travelStatus: z.string(),
  documentsStatus: z.string(),
  checklistCompletion: z.number().min(0).max(100),
  daysUntilStart: z.number(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const fallback = `Readiness summary: Candidate is ${parsed.data.checklistCompletion}% complete with ${parsed.data.daysUntilStart} days until start.\nGaps: ${parsed.data.housingStatus !== "READY" ? "Housing" : "None"}, ${parsed.data.travelStatus !== "READY" ? "Travel" : "None"}, ${parsed.data.documentsStatus !== "READY" ? "Documents" : "None"}.\nActions: Assign concierge follow-up and complete missing checklist items within 24 hours.`;

  const ai = await generateAiResponse({
    prompt: `Summarize assignment readiness and next steps for housing=${parsed.data.housingStatus}, travel=${parsed.data.travelStatus}, documents=${parsed.data.documentsStatus}, completion=${parsed.data.checklistCompletion}, daysUntilStart=${parsed.data.daysUntilStart}.`,
    fallback,
  });

  return NextResponse.json(ai);
}
