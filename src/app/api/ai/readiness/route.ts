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
    "Assignment Readiness AI Agent",
    body.prompt ?? "Summarize assignment readiness blockers and next actions."
  );

  return NextResponse.json(response);
}
