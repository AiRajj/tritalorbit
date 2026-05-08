import { NextResponse } from "next/server";

import { runOfferBoostAgent } from "@/lib/ai";

export async function POST(request: Request) {
  const result = await runOfferBoostAgent(await request.json());
  return NextResponse.json(result);
}
