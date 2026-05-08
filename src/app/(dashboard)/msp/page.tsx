import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMspDashboardData } from "@/lib/services/dashboard-data";

export default async function MspDashboardPage() {
  const data = await getMspDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">MSP Reporting Dashboard</h1>
          <p className="text-sm text-slate-600">Acceptance, readiness, backout, and supplier performance intelligence.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><a href="/api/exports/csv">Export CSV</a></Button>
          <Button asChild variant="outline"><a href="/api/exports/pdf">Export PDF</a></Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Offer acceptance rate</CardTitle></CardHeader>
          <CardContent>{Math.round((data.latest?.acceptanceRate ?? 0) * 100)}%</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Backout rate</CardTitle></CardHeader>
          <CardContent>{Math.round((data.latest?.backoutRate ?? 0) * 100)}%</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Time-to-ready</CardTitle></CardHeader>
          <CardContent>{data.latest?.timeToReadyDays ?? 0} days</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>First-day show-up rate</CardTitle></CardHeader>
          <CardContent>{Math.round((data.latest?.firstDayShowRate ?? 0) * 100)}%</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-generated executive summary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-700">
          {data.latest?.aiExecutiveSummary ?? "No AI summary generated yet."}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filter reports</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <input className="h-10 rounded-md border border-slate-300 px-3 text-sm" type="date" />
          <input className="h-10 rounded-md border border-slate-300 px-3 text-sm" type="date" />
          <select className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
            <option>All agencies</option>
          </select>
        </CardContent>
      </Card>
    </div>
  );
}
