import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createCheckoutSession } from "@/lib/services/billing";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { priceId?: string };
  if (!body.priceId) {
    return NextResponse.json({ error: "priceId is required" }, { status: 400 });
  }

  const checkout = await createCheckoutSession({
    customerEmail: session.user.email,
    priceId: body.priceId,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/agency?billing=success`,
    cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/pricing?billing=cancel`
  });

  return NextResponse.json(checkout);
}
