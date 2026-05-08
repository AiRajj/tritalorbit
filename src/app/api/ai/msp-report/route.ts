import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { runAiAgent } from "@/lib/services/ai";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { prompt?: string };
  const response = await runAiAgent(
    "MSP Reporting AI Agent",
    body.prompt ?? "Generate an executive summary of acceptance, readiness, and supplier performance."
  );

  return NextResponse.json(response);
}
