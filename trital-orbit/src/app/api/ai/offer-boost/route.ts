import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateOfferBoost } from "@/lib/ai";
import { z } from "zod";

const schema = z.object({
  candidateName: z.string(),
  role: z.string(),
  specialty: z.string(),
  facilityName: z.string(),
  facilityCity: z.string(),
  facilityState: z.string(),
  weeklyPay: z.number(),
  duration: z.number(),
  startDate: z.string().optional(),
  perks: z.array(z.string()),
  totalContractValue: z.number().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);
    const result = await generateOfferBoost(data);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 });
    }
    console.error("[AI_OFFER_BOOST]", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
