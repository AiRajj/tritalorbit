import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAgencyIdForUser, getCandidateForUser, hasAnyRole } from "@/lib/services/access";
import { getAgencyWalletWithLedger, getCandidateWalletWithLedger } from "@/lib/services/wallet";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (hasAnyRole(session.user.role, [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER])) {
      const agencyId = await getAgencyIdForUser(session.user.id);
      if (!agencyId) {
        return NextResponse.json({ error: "Agency context not found" }, { status: 404 });
      }

      const [{ wallet, entries }, candidateWallets] = await Promise.all([
        getAgencyWalletWithLedger(agencyId, 40),
        prisma.walletAccount.findMany({
          where: { candidate: { agencyId } },
          include: {
            candidate: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: { updatedAt: "desc" },
          take: 30
        })
      ]);

      return NextResponse.json({ wallet, entries, candidateWallets });
    }

    if (session.user.role === Role.CANDIDATE) {
      const candidate = await getCandidateForUser(session.user.id);
      if (!candidate) {
        return NextResponse.json({ error: "Candidate context not found" }, { status: 404 });
      }

      const [{ wallet, entries }, activeRequests] = await Promise.all([
        getCandidateWalletWithLedger(candidate.id, 40),
        prisma.travelBidRequest.findMany({
          where: {
            candidateId: candidate.id,
            status: { in: ["OPEN", "BID_ACTIVE", "BOOKED"] }
          },
          include: {
            selectedBid: true
          },
          orderBy: { createdAt: "desc" },
          take: 20
        })
      ]);

      return NextResponse.json({ wallet, entries, activeRequests });
    }

    if (session.user.role === Role.SUPER_ADMIN) {
      const accounts = await prisma.walletAccount.findMany({
        include: {
          agency: { select: { id: true, name: true } },
          candidate: { select: { id: true, name: true } }
        },
        orderBy: { updatedAt: "desc" },
        take: 100
      });

      return NextResponse.json({ accounts });
    }

    return NextResponse.json({ error: "Role not authorized for wallet accounts" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Unable to load wallet accounts" }, { status: 500 });
  }
}
