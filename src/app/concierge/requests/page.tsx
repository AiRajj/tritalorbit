import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { conciergeLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

const columns = ["NEW", "IN_PROGRESS", "WAITING_CANDIDATE", "COMPLETED", "CANCELLED"] as const;

export default async function ConciergeRequestsPage() {
  const session = await requireRole([Role.CONCIERGE_MANAGER, Role.AGENCY_OWNER]);

  const tasks = await prisma.conciergeTask
    .findMany({ include: { candidate: true }, orderBy: { createdAt: "desc" }, take: 100 })
    .catch(() => []);

  return (
    <DashboardShell
      title="Concierge Task Board"
      links={conciergeLinks}
      user={{ name: session.user.name ?? "Concierge", email: session.user.email ?? "" }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {columns.map((status) => (
          <Card key={status}>
            <CardHeader>
              <CardTitle className="text-base">{status.replaceAll("_", " ")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div key={task.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                    <p className="font-medium text-slate-900">{task.title}</p>
                    <p className="text-slate-600">{task.candidate.fullName}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
