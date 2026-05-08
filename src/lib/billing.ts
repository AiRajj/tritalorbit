import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    })
  : null;

export async function createCheckoutSession(input: {
  customerEmail: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!stripe) {
    return {
      id: "mock-session",
      url: `${input.successUrl}?mockCheckout=true`,
      mock: true,
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: input.customerEmail,
    line_items: [{ price: input.priceId, quantity: 1 }],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
  });

  return {
    id: session.id,
    url: session.url,
    mock: false,
  };
}

export function getStripeClient() {
  return stripe;
}
