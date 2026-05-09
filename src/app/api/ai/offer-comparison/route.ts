import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { runIntegrationAiAgent } from "@/lib/integrations/ai/openai";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { prompt?: string };
  const result = await runIntegrationAiAgent("Offer Comparison AI Agent", body.prompt ?? "Compare assignment offers using lifestyle, mobility, and risk context.");

  return NextResponse.json(result);
}
