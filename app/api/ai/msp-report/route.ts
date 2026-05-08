import { NextResponse } from "next/server";

import { runMspReportAgent } from "@/lib/ai";

export async function POST(request: Request) {
  const result = await runMspReportAgent(await request.json());
  return NextResponse.json(result);
}
