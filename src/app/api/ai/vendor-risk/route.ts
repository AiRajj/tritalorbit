import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { runIntegrationAiAgent } from "@/lib/integrations/ai/openai";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { prompt?: string };
  const result = await runIntegrationAiAgent("Vendor Risk AI Agent", body.prompt ?? "Assess vendor chargeback and delivery risk using booking and dispute signals.");

  return NextResponse.json(result);
}
