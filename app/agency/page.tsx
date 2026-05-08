import { AgencyDashboard } from "@/components/dashboard/agency-dashboard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AgencyPage() {
  return (
    <DashboardShell type="recruiter">
      <AgencyDashboard />
    </DashboardShell>
  );
}
