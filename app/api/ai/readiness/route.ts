import { NextResponse } from "next/server";

import { runReadinessAgent } from "@/lib/ai";

export async function POST(request: Request) {
  const result = await runReadinessAgent(await request.json());
  return NextResponse.json(result);
}
