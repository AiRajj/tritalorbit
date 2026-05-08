import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { runAiAgent } from "@/lib/services/ai";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { offerId?: string; prompt?: string; candidateId?: string; assignmentId?: string };
  const prompt = body.prompt ?? "Generate enhanced healthcare assignment offer messaging.";

  const result = await runAiAgent("Offer Boost AI Agent", prompt);

  if (body.offerId) {
    await prisma.aIInsight.create({
      data: {
        type: "OFFER_BOOST",
        agencyId: null,
        candidateId: body.candidateId,
        assignmentId: body.assignmentId,
        offerId: body.offerId,
        title: "Offer boost recommendation",
        content: `${result.summary}\n${result.bullets.join("\n")}`,
        model: result.mock ? "fallback-mock" : "openai"
      }
    });
  }

  return NextResponse.json(result);
}
