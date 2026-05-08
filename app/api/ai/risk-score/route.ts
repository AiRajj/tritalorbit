import { NextResponse } from "next/server";

import { runRiskScoreAgent } from "@/lib/ai";

export async function POST(request: Request) {
  const result = await runRiskScoreAgent(await request.json());
  return NextResponse.json(result);
}
