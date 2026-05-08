import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getStripeClient } from "@/lib/billing";

export async function POST(request: Request) {
  const stripe = getStripeClient();

  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, mock: true });
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      // Add subscription synchronization logic here.
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }
}
