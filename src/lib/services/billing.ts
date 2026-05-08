import Stripe from "stripe";
import { env } from "@/lib/env";

const stripe = env.stripeSecretKey
  ? new Stripe(env.stripeSecretKey, {
      typescript: true
    })
  : null;

export async function createCheckoutSession({
  customerEmail,
  priceId,
  successUrl,
  cancelUrl
}: {
  customerEmail: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!stripe) {
    return { mocked: true, url: null };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: customerEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl
  });

  return { mocked: false, url: session.url };
}
