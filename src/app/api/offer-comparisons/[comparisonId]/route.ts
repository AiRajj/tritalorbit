import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";

export async function GET(_: Request, { params }: { params: Promise<{ comparisonId: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { comparisonId } = await params;

  try {
    const comparison = await prisma.offerComparison.findUnique({
      where: { id: comparisonId },
      include: {
        candidate: { select: { id: true, name: true, agencyId: true, userId: true } },
        entries: { orderBy: [{ totalValueScore: "desc" }] },
        insights: { orderBy: [{ rank: "asc" }] }
      }
    });

    if (!comparison) {
      return NextResponse.json({ error: "Comparison not found" }, { status: 404 });
    }

    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate || candidate.id !== comparison.candidateId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId || agencyId !== comparison.candidate.agencyId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ comparison });
  } catch {
    return NextResponse.json({ error: "Unable to load comparison" }, { status: 500 });
  }
}
