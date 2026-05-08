import { BarChart3, Briefcase, Download, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi";
import { mspReportAgent } from "@/lib/ai/agents";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "MSP Reports" };

export default async function Page() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "MSP_VIEWER", ctx?.agencyId ?? null);

  let metrics = {
    offersSent: 0,
    accepted: 0,
    backouts: 0,
    onTimeStarts: 0,
    avgReadiness: 0,
    highRiskCount: 0,
  };
  let agencyName = "Your network";

  if (agencyId) {
    const [agency, offersSent, accepted, backouts, readiness, highRisk] = await Promise.all([
      prisma.agency.findUnique({ where: { id: agencyId } }),
      prisma.offer.count({ where: { agencyId, status: { in: ["SENT", "VIEWED", "NEGOTIATING", "ACCEPTED"] } } }),
      prisma.offer.count({ where: { agencyId, status: "ACCEPTED" } }),
      prisma.assignment.count({ where: { agencyId, status: "BACKED_OUT" } }),
      prisma.assignment.aggregate({ where: { agencyId }, _avg: { readinessScore: true } }),
      prisma.retentionRiskScore.count({ where: { candidate: { agencyId }, level: { in: ["HIGH", "CRITICAL"] } } }),
    ]);
    metrics = {
      offersSent,
      accepted,
      backouts,
      onTimeStarts: Math.max(0, accepted - backouts),
      avgReadiness: Math.round(readiness._avg.readinessScore ?? 0),
      highRiskCount: highRisk,
    };
    agencyName = agency?.name ?? agencyName;
  }

  const acceptanceRate = metrics.offersSent > 0 ? Math.round((metrics.accepted / metrics.offersSent) * 100) : 0;
  const backoutRate = metrics.accepted > 0 ? Math.round((metrics.backouts / metrics.accepted) * 100) : 0;

  const summary = mspReportAgent({
    agencyName,
    periodLabel: "Last 90 days",
    metrics,
  });

  return (
    <>
      <PageHeader
        eyebrow="MSP Reporting"
        title={`${agencyName} — supplier scorecard`}
        description="Acceptance, backout, readiness, and AI-generated executive summary."
        actions={
          <>
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4" /> Export PDF
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Offers Sent" value={metrics.offersSent} icon={BarChart3} />
        <KpiCard label="Acceptance" value={`${acceptanceRate}%`} icon={Briefcase} tone="success" />
        <KpiCard label="Backout rate" value={`${backoutRate}%`} icon={Briefcase} tone="accent" />
        <KpiCard label="On-time starts" value={metrics.onTimeStarts} tone="success" />
        <KpiCard label="Avg readiness" value={`${metrics.avgReadiness}%`} />
        <KpiCard label="High-risk" value={metrics.highRiskCount} tone="warning" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orbit-red" />
              <h3 className="text-base font-semibold text-orbit-deep">AI executive summary</h3>
            </div>
            <p className="mt-3 text-sm text-slate-700">{summary.executiveSummary}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Highlights</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                  {summary.highlights.map((h) => <li key={h}>• {h}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-orbit-red">Watch-outs</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                  {summary.watchouts.map((h) => <li key={h}>• {h}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-orbit-deep/10 bg-orbit-deep/[0.04] p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-orbit-deep">Recommendation</div>
              <p className="mt-1 text-sm text-slate-700">{summary.recommendation}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-base font-semibold text-orbit-deep">Reporting period</h3>
            <p className="text-xs text-slate-500">Default rolling 90 days. Customizable on Enterprise plan.</p>
            <div className="mt-5 space-y-3 text-sm">
              <Row label="Acceptance rate" value={`${acceptanceRate}%`} />
              <Row label="Backout rate" value={`${backoutRate}%`} />
              <Row label="Readiness" value={`${metrics.avgReadiness}%`} />
              <Row label="High-risk count" value={`${metrics.highRiskCount}`} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-orbit-deep/10 pb-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-orbit-deep">{value}</span>
    </div>
  );
}
