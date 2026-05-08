import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateCsv } from "@/lib/services/export";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const reports = await prisma.mSPReport.findMany({
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
