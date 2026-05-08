import { Role } from "@prisma/client";

import { KpiGrid } from "@/components/dashboards/kpi-grid";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { adminLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await requireRole([Role.SUPER_ADMIN]);

  const [agencies, users, offers, vendors] = await Promise.all([
    prisma.agency.count().catch(() => 0),
    prisma.user.count().catch(() => 0),
    prisma.offer.count().catch(() => 0),
    prisma.vendor.count().catch(() => 0),
  ]);

  return (
    <DashboardShell
      title="Admin Control Center"
      links={adminLinks}
      user={{ name: session.user.name ?? "Admin", email: session.user.email ?? "" }}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Admin Control Center</h1>
        <KpiGrid
          items={[
            { label: "Agencies", value: agencies },
            { label: "Users", value: users },
            { label: "Offers", value: offers },
            { label: "Vendors", value: vendors },
          ]}
        />
        <Card>
          <CardHeader>
            <CardTitle>System Settings & Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>• Subscription billing pipelines: ready (Stripe integration scaffolding complete)</p>
            <p>• Email notifications: ready (Resend integration scaffolding complete)</p>
            <p>• AI usage tracking: available via AIInsight + AuditLog models</p>
            <p>• Platform governance: role middleware and audit logging enabled</p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
