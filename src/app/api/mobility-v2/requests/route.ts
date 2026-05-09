import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser } from "@/lib/services/access";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [candidate, agencyId] = await Promise.all([
    getCandidateForUser(session.user.id),
    getAgencyIdForUser(session.user.id)
  ]);

  const filters = [
    candidate ? { candidateId: candidate.id } : null,
    agencyId ? { agencyId } : null
  ].filter((item): item is { candidateId: string } | { agencyId: string } => Boolean(item));

  const requests = await prisma.mobilityRequest.findMany({
    where: filters.length > 0 ? { OR: filters } : undefined,
    include: { bids: true },
    orderBy: { createdAt: "desc" },
    take: 40
  });

  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    candidateId?: string;
    agencyId?: string;
    assignmentId?: string;
    requestType?: "FLIGHT" | "HOUSING" | "CAR_RENTAL" | "HOTEL" | "FULL_RELOCATION_PACKAGE";
    assignmentCity?: string;
    assignmentState?: string;
    facilityName?: string;
    startDate?: string;
  };

  if (!body.candidateId || !body.agencyId || !body.assignmentId || !body.requestType || !body.assignmentCity || !body.assignmentState || !body.facilityName || !body.startDate) {
    return NextResponse.json({ error: "Missing required request fields" }, { status: 400 });
  }

  const record = await prisma.mobilityRequest.create({
    data: {
      candidateId: body.candidateId,
      agencyId: body.agencyId,
      assignmentId: body.assignmentId,
      createdByUserId: session.user.id,
      requestType: body.requestType,
      assignmentCity: body.assignmentCity,
      assignmentState: body.assignmentState,
      facilityName: body.facilityName,
      startDate: new Date(body.startDate),
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
      status: "OPEN_FOR_BIDS"
    }
  });

  return NextResponse.json({ request: record }, { status: 201 });
}
