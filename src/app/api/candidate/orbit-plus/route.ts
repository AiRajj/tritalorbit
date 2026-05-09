import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
    select: { id: true, agencyId: true }
  });

  if (!candidate) {
    return NextResponse.json({ subscription: null });
  }

  const subscription = await prisma.clinicianSubscription.findUnique({
    where: { candidateId: candidate.id }
  });

  return NextResponse.json({ subscription });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { annual?: boolean };
  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
    select: { id: true, agencyId: true }
  });

  if (!candidate) {
    return NextResponse.json({ error: "Candidate profile not found" }, { status: 400 });
  }

  const subscription = await prisma.clinicianSubscription.upsert({
    where: { candidateId: candidate.id },
    create: {
      candidateId: candidate.id,
      agencyId: candidate.agencyId,
      planName: body.annual ? "ORBIT_PLUS_ANNUAL" : "ORBIT_PLUS_MONTHLY",
      status: "ACTIVE",
      annualPlan: Boolean(body.annual),
      periodEndsAt: new Date(Date.now() + (body.annual ? 365 : 30) * 24 * 60 * 60 * 1000)
    },
    update: {
      planName: body.annual ? "ORBIT_PLUS_ANNUAL" : "ORBIT_PLUS_MONTHLY",
      status: "ACTIVE",
      annualPlan: Boolean(body.annual),
      periodEndsAt: new Date(Date.now() + (body.annual ? 365 : 30) * 24 * 60 * 60 * 1000)
    }
  });

  return NextResponse.json({ subscription }, { status: 201 });
}
