import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { runIntegrationAiAgent } from "@/lib/integrations/ai/openai";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { prompt?: string };
  const result = await runIntegrationAiAgent("Wallet Optimization AI Agent", body.prompt ?? "Recommend how sponsored credits should be used to improve readiness.");

  return NextResponse.json(result);
}
