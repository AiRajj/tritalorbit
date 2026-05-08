import { Role } from "@prisma/client";

import { KpiGrid } from "@/components/dashboards/kpi-grid";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth";
import { conciergeLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function ConciergePage() {
  const session = await requireRole([Role.CONCIERGE_MANAGER, Role.AGENCY_OWNER]);

  const [openRequests, inProgress, completed] = await Promise.all([
    prisma.bookingRequest.count({ where: { status: "NEW" } }).catch(() => 0),
    prisma.conciergeTask.count({ where: { status: "IN_PROGRESS" } }).catch(() => 0),
    prisma.conciergeTask.count({ where: { status: "COMPLETED" } }).catch(() => 0),
  ]);

  return (
    <DashboardShell
      title="Concierge Operations"
      links={conciergeLinks}
      user={{ name: session.user.name ?? "Concierge", email: session.user.email ?? "" }}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Concierge Dashboard</h1>
        <KpiGrid
          items={[
            { label: "New Requests", value: openRequests },
            { label: "In Progress", value: inProgress },
            { label: "Completed", value: completed },
          ]}
        />
      </div>
    </DashboardShell>
  );
}
