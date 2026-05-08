import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAdminOverview } from "@/lib/services/dashboard-data";

export default async function AdminDashboardPage() {
  const data = await getAdminOverview();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Control Center</h1>
          <p className="text-sm text-slate-600">Manage platform entities, subscription health, AI usage, and governance.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader><CardTitle>Agencies</CardTitle></CardHeader><CardContent>{data.agencies}</CardContent></Card>
        <Card><CardHeader><CardTitle>Users</CardTitle></CardHeader><CardContent>{data.users}</CardContent></Card>
        <Card><CardHeader><CardTitle>Candidates</CardTitle></CardHeader><CardContent>{data.candidates}</CardContent></Card>
        <Card><CardHeader><CardTitle>Offers</CardTitle></CardHeader><CardContent>{data.offers}</CardContent></Card>
        <Card><CardHeader><CardTitle>Vendors</CardTitle></CardHeader><CardContent>{data.vendors}</CardContent></Card>
        <Card><CardHeader><CardTitle>AI usage</CardTitle></CardHeader><CardContent>{data.aiUsage}</CardContent></Card>
        <Card><CardHeader><CardTitle>Audit logs</CardTitle></CardHeader><CardContent>{data.audits}</CardContent></Card>
        <Card>
          <CardHeader><CardTitle>System settings</CardTitle></CardHeader>
          <CardContent><Button variant="outline" asChild><a href="/admin/vendors">Review vendors</a></Button></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform health and controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>• Manage agencies, users, candidates, offers, and vendors from centralized controls.</p>
          <p>• Review audit logs for account actions and workflow changes.</p>
          <p>• Monitor AI endpoint utilization and fallback behavior status.</p>
        </CardContent>
      </Card>
    </div>
  );
}
