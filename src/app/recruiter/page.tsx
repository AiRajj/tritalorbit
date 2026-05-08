import { Role } from "@prisma/client";

import { KpiGrid } from "@/components/dashboards/kpi-grid";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { getAgencyDashboardData } from "@/lib/dashboard-data";
import { recruiterLinks } from "@/lib/navigation";

export default async function RecruiterPage() {
  const session = await requireRole([Role.RECRUITER, Role.AGENCY_OWNER]);
  const data = await getAgencyDashboardData(session.user.id);

  return (
    <DashboardShell
      title="Recruiter Workspace"
      links={recruiterLinks}
      user={{ name: session.user.name ?? "Recruiter", email: session.user.email ?? "" }}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Recruiter Dashboard</h1>
        <KpiGrid
          items={[
            { label: "Open Negotiations", value: data?.kpis.pending ?? 0 },
            { label: "High Risk Candidates", value: data?.risks.length ?? 0 },
            { label: "Assignment Ready", value: `${data?.kpis.assignmentReady ?? 0}%` },
          ]}
        />
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>• Lead with housing certainty for candidates with start dates inside 10 days.</p>
            <p>• Use value framing over rate-only framing in high-competition markets.</p>
            <p>• Trigger concierge introduction within first 30 minutes of offer view.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
