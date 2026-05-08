import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAssignmentLaunchRows } from "@/lib/services/dashboard-data";

export default async function AssignmentLaunchPage() {
  const rows = await getAssignmentLaunchRows();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assignment Launch Dashboard</h1>
          <p className="text-sm text-slate-600">Monitor readiness between offer acceptance and first day.</p>
        </div>
        <Button asChild variant="outline">
          <a href="/api/exports/csv">Export CSV</a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <Input placeholder="Search candidate or facility" />
          <select className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
            <option>All risk tiers</option>
            <option>High/Critical</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
            <option>All readiness statuses</option>
            <option>Blocked</option>
            <option>In Progress</option>
            <option>Ready</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Readiness tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-slate-900">{row.candidate} • {row.role}</p>
                <Badge variant={row.riskScore > 75 ? "destructive" : row.riskScore > 50 ? "secondary" : "default"}>
                  Risk {row.riskScore}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">{row.facility} • Starts {new Date(row.startDate).toLocaleDateString()}</p>
              <div className="mt-2 grid gap-2 text-xs text-slate-600 sm:grid-cols-5">
                <p>Housing: {row.housingStatus}</p>
                <p>Travel: {row.travelStatus}</p>
                <p>Documents: {row.documentsStatus}</p>
                <p>Readiness: {row.firstWeekReadiness}%</p>
                <p className="font-medium text-orbit-red">Action: {row.actionNeeded}</p>
              </div>
              <p className="mt-2 text-xs text-slate-500">AI recommendation: Address {row.actionNeeded.toLowerCase()} within 24 hours.</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
