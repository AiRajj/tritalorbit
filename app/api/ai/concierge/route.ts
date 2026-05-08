import { NextResponse } from "next/server";

import { runConciergeAgent } from "@/lib/ai";

export async function POST(request: Request) {
  const result = await runConciergeAgent(await request.json());
  return NextResponse.json(result);
}
