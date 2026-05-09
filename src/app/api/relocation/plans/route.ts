import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { relocationAssistantInputSchema } from "@/lib/validators/phase3";
import { generateRelocationPlan } from "@/lib/services/phase3";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
    select: { id: true }
  });

  const plans = await prisma.relocationPlan.findMany({
    where: candidate?.id ? { candidateId: candidate.id } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  return NextResponse.json({ plans });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = relocationAssistantInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid relocation input" }, { status: 400 });
  }

  const plan = await generateRelocationPlan(parsed.data);
  return NextResponse.json({ plan }, { status: 201 });
}
