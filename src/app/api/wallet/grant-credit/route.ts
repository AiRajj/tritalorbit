import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, hasAnyRole } from "@/lib/services/access";
import { grantCandidateCredit } from "@/lib/services/wallet";
import { walletCreditGrantSchema } from "@/lib/validators/mobility";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
    return NextResponse.json({ error: "Only agency users can grant candidate credits" }, { status: 403 });
  }

  try {
    const parsed = walletCreditGrantSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credit grant payload" }, { status: 400 });
    }

    const agencyId = await getAgencyIdForUser(session.user.id);
    if (!agencyId) {
      return NextResponse.json({ error: "Agency context not found" }, { status: 404 });
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: parsed.data.candidateId },
      select: { id: true, agencyId: true }
    });
    if (!candidate || candidate.agencyId !== agencyId) {
      return NextResponse.json({ error: "Candidate not found in agency" }, { status: 404 });
    }

    await grantCandidateCredit({
      agencyId,
      candidateId: parsed.data.candidateId,
      amount: parsed.data.amount,
      description: parsed.data.description,
      travelRequestId: parsed.data.travelRequestId,
      createdById: session.user.id
    });

    await prisma.activityLog.create({
      data: {
        agencyId,
        actorId: session.user.id,
        candidateId: parsed.data.candidateId,
        action: "wallet.credit_granted",
        metadata: {
          amount: parsed.data.amount,
          travelRequestId: parsed.data.travelRequestId
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to grant credit" },
      { status: 500 }
    );
  }
}
