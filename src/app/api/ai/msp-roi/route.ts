import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { runIntegrationAiAgent } from "@/lib/integrations/ai/openai";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { prompt?: string };
  const result = await runIntegrationAiAgent("MSP ROI AI Agent", body.prompt ?? "Generate executive ROI summary for MSP workforce mobility outcomes.");

  return NextResponse.json(result);
}
