import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { mspLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function MspDashboardPage() {
  const session = await requireRole([Role.MSP_VIEWER, Role.SUPER_ADMIN]);

  const reports = await prisma.mSPReport.findMany({ orderBy: { createdAt: "desc" }, take: 5 }).catch(() => []);

  return (
    <DashboardShell
      title="MSP Reporting"
      links={mspLinks}
      user={{ name: session.user.name ?? "MSP Viewer", email: session.user.email ?? "" }}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Date filters</Button>
          <Button variant="outline">Agency filters</Button>
          <Button variant="outline">Export CSV</Button>
          <Button variant="outline">Export PDF</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>
                  {new Date(report.periodStart).toLocaleDateString()} - {new Date(report.periodEnd).toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-slate-600">
                <p>Acceptance: {report.acceptanceRate}%</p>
                <p>Backout: {report.backoutRate}%</p>
                <p>Time-to-ready: {report.timeToReadyDays.toFixed(1)} days</p>
                <p>Show-up: {report.showUpRate}%</p>
                <p>Readiness: {report.readinessRate}%</p>
                <p className="pt-2 text-xs text-slate-500">{report.aiExecutiveSummary ?? "AI summary available on demand."}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
