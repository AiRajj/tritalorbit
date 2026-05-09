import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createWalletPaymentIntent } from "@/lib/integrations/payments/stripe";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { annual?: boolean };
  const amount = body.annual ? 149 : 14.99;
  const paymentIntent = await createWalletPaymentIntent({
    amount,
    currency: "USD",
    description: body.annual ? "Orbit Plus annual subscription" : "Orbit Plus monthly subscription"
  });

  return NextResponse.json({
    plan: body.annual ? "ORBIT_PLUS_ANNUAL" : "ORBIT_PLUS_MONTHLY",
    paymentIntent
  });
}
