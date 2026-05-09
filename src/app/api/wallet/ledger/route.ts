import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const take = Math.min(Number(url.searchParams.get("take") ?? 50), 200);

  try {
    if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) {
        return NextResponse.json({ entries: [] });
      }
      const entries = await prisma.walletLedgerEntry.findMany({
        where: { agencyId },
        orderBy: { createdAt: "desc" },
        take
      });
      return NextResponse.json({ entries });
    }

    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate) {
        return NextResponse.json({ entries: [] });
      }

      const entries = await prisma.walletLedgerEntry.findMany({
        where: { candidateId: candidate.id },
        orderBy: { createdAt: "desc" },
        take
      });
      return NextResponse.json({ entries });
    }

    if (session.user.role === Role.SUPER_ADMIN) {
      const entries = await prisma.walletLedgerEntry.findMany({
        orderBy: { createdAt: "desc" },
        take
      });
      return NextResponse.json({ entries });
    }

    return NextResponse.json({ error: "Role not authorized for wallet ledger" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Unable to load wallet ledger" }, { status: 500 });
  }
}
