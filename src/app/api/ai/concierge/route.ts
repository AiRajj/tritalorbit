import { NextResponse } from "next/server";
import { z } from "zod";

import { generateAiResponse } from "@/lib/ai";

const schema = z.object({
  candidateName: z.string(),
  requestSummary: z.string(),
  status: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const fallback = `Task summary: ${parsed.data.requestSummary}\nSuggested next task: Confirm candidate budget and send 3 verified housing options.\nCandidate update draft: "We’re finalizing options that match your timeline and budget. You’ll receive curated recommendations shortly."\nVendor recommendation: Prioritize verified vendors with high response scores in assignment market.`;

  const ai = await generateAiResponse({
    prompt: `Concierge support for ${parsed.data.candidateName}, status ${parsed.data.status}. Request: ${parsed.data.requestSummary}. Return concise summary, next tasks, candidate update draft, vendor recommendation.`,
    fallback,
  });

  return NextResponse.json(ai);
}
