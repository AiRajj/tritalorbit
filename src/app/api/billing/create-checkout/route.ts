import { NextResponse } from "next/server";
import { z } from "zod";

import { createCheckoutSession } from "@/lib/billing";

const schema = z.object({
  customerEmail: z.string().email(),
  priceId: z.string().min(3),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const appUrl = process.env.APP_URL ?? "http://localhost:3000";

  const checkout = await createCheckoutSession({
    customerEmail: parsed.data.customerEmail,
    priceId: parsed.data.priceId,
    successUrl: `${appUrl}/pricing?checkout=success`,
    cancelUrl: `${appUrl}/pricing?checkout=cancelled`,
  });

  return NextResponse.json(checkout);
}
