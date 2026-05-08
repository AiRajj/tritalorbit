import { NextResponse } from "next/server";
import { z } from "zod";

import { generateAiResponse } from "@/lib/ai";

const schema = z.object({
  candidateName: z.string(),
  role: z.string(),
  specialty: z.string(),
  location: z.string(),
  weeklyPay: z.number(),
  perks: z.array(z.string()),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const prompt = `Create an offer enhancement for ${parsed.data.candidateName}, a ${parsed.data.role} (${parsed.data.specialty}) in ${parsed.data.location}. Weekly pay ${parsed.data.weeklyPay}. Perks: ${parsed.data.perks.join(", ")}. Return sections: summary, value statement, recruiter talking points, sms pitch, email pitch, close strategy.`;

  const fallback = `Summary: This assignment combines strong earnings with premium mobility support to reduce relocation stress.\nValue statement: Your weekly compensation is reinforced by concierge-backed housing, travel, and launch readiness support.\nRecruiter talking points: Lead with certainty of first-week success and reduced out-of-pocket move friction.\nSMS pitch: "I found a role that protects your weekly earnings and includes concierge housing/travel support so your move is smooth from day one."\nEmail pitch: "This assignment pairs competitive compensation with a full mobility package so you can focus on care delivery, not logistics."\nClose strategy: Confirm timing priorities, remove housing concerns first, and secure acceptance with launch support commitments.`;

  const response = await generateAiResponse({ prompt, fallback });
  return NextResponse.json(response);
}
