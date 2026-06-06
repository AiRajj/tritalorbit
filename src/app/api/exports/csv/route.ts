import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generateCsv } from "@/lib/services/export";
import { getCallerAgencyIds, requireSession } from "@/lib/api-auth";

export async function GET() {
  const guard = await requireSession();
  if (!guard.ok) return guard.response;

  try {
    const isAdmin = guard.session.user.role === Role.SUPER_ADMIN;
    const agencyIds = isAdmin ? undefined : await getCallerAgencyIds(guard.session.user.id);

    if (!isAdmin && agencyIds && agencyIds.length === 0) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const reports = await prisma.mSPReport.findMany({
      where: agencyIds ? { agencyId: { in: agencyIds } } : undefined,
      orderBy: { createdAt: "desc" },
      take: 25
    });

    const csv = generateCsv(
      reports.map((report) => ({
        id: report.id,
        periodStart: report.periodStart.toISOString(),
        periodEnd: report.periodEnd.toISOString(),
        acceptanceRate: report.acceptanceRate,
        backoutRate: report.backoutRate,
        timeToReadyDays: report.timeToReadyDays,
        firstDayShowRate: report.firstDayShowRate,
        readinessRate: report.readinessRate
      }))
    );

    await prisma.auditLog.create({
      data: {
        actorId: guard.session.user.id,
        action: "export.csv",
        targetType: "MSPReport",
        targetId: "batch",
        metadata: { count: reports.length, scope: isAdmin ? "all" : "agency" }
      }
    });

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=orbit-msp-report.csv"
      }
    });
  } catch {
    return NextResponse.json({ error: "Unable to generate CSV" }, { status: 500 });
  }
}
