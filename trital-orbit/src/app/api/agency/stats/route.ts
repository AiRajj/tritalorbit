import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  const agencyId = user.agencyId;

  if (!agencyId) {
    return NextResponse.json({ error: "No agency associated" }, { status: 403 });
  }

  try {
    const [
      totalOffers,
      acceptedOffers,
      pendingOffers,
      sentOffers,
      bookingRequests,
      highRiskCandidates,
    ] = await Promise.all([
      prisma.offer.count({ where: { agencyId } }),
      prisma.offer.count({ where: { agencyId, status: "ACCEPTED" } }),
      prisma.offer.count({ where: { agencyId, status: { in: ["SENT", "VIEWED"] } } }),
      prisma.offer.count({ where: { agencyId, status: "SENT" } }),
      prisma.bookingRequest.count({ where: { agencyId } }),
      prisma.retentionRiskScore.count({
        where: {
          riskLevel: { in: ["HIGH", "CRITICAL"] },
          candidate: { agencyId },
        },
      }),
    ]);

    const acceptanceRate = totalOffers > 0
      ? Math.round((acceptedOffers / totalOffers) * 100)
      : 0;

    // Recent offers with risk scores
    const recentOffers = await prisma.offer.findMany({
      where: { agencyId },
      include: {
        perks: true,
        retentionRisks: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // Recent activity
    const recentActivity = await prisma.activityLog.findMany({
      where: { agencyId },
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    return NextResponse.json({
      kpis: {
        totalOffers,
        acceptedOffers,
        pendingOffers,
        sentOffers,
        bookingRequests,
        highRiskCandidates,
        acceptanceRate,
      },
      recentOffers,
      recentActivity,
    });
  } catch (error) {
    console.error("[AGENCY_STATS]", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
