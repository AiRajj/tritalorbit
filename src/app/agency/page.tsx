import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Compass,
  KanbanSquare,
  Plus,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi";
import { EmptyState } from "@/components/dashboard/empty-state";
import { RiskPill, StatusPill } from "@/components/dashboard/risk-pill";
import {
  getAgencyKpis,
  getActiveOffers,
  getHighRiskCandidates,
  getRecentActivity,
} from "@/lib/queries/agency";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { formatCurrency, formatDate, relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agency Overview" };

const STATUS_TONE: Record<string, "default" | "success" | "warning" | "destructive" | "muted"> = {
  DRAFT: "muted",
  SENT: "default",
  VIEWED: "default",
  NEGOTIATING: "warning",
  ACCEPTED: "success",
  DECLINED: "destructive",
  WITHDRAWN: "destructive",
  EXPIRED: "muted",
};

export default async function AgencyOverviewPage() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "AGENCY_OWNER", ctx?.agencyId ?? null);

  if (!agencyId) {
    return (
      <>
        <PageHeader
          eyebrow="Agency"
          title={`Welcome${ctx?.name ? ", " + ctx.name.split(" ")[0] : ""}`}
          description="No agency is associated with your account yet."
          actions={
            <Button asChild>
              <Link href="/agency/settings">Set up agency</Link>
            </Button>
          }
        />
        <EmptyState
          icon={Sparkles}
          title="Spin up your agency workspace"
          description="Add agency details, invite recruiters, and start sending boosted offers."
          action={
            <Button asChild>
              <Link href="/agency/settings">Configure agency</Link>
            </Button>
          }
        />
      </>
    );
  }

  const [kpis, activeOffers, highRisk, activity] = await Promise.all([
    getAgencyKpis(agencyId),
    getActiveOffers(agencyId),
    getHighRiskCandidates(agencyId),
    getRecentActivity(agencyId),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Agency Overview"
        title="Pipeline at a glance"
        description="Live KPIs across your offers, retention risk, and assignment readiness."
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/agency/booking-requests">
                <KanbanSquare className="h-4 w-4" /> Booking requests
              </Link>
            </Button>
            <Button asChild>
              <Link href="/agency/offers/create">
                <Wand2 className="h-4 w-4" /> Create boosted offer
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Offers Sent" value={kpis.offersSent} icon={Send} hint="Last 90 days" />
        <KpiCard label="Accepted" value={kpis.accepted} icon={CheckCircle2} tone="success" />
        <KpiCard label="Pending" value={kpis.pending} icon={Calendar} tone="warning" />
        <KpiCard label="Backout Risk" value={kpis.highRisk} icon={AlertTriangle} tone="accent" />
        <KpiCard label="Booking Requests" value={kpis.bookings} icon={Compass} />
        <KpiCard label="Assignment Ready" value={`${kpis.readiness}%`} icon={BarChart3} tone="success" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-orbit-deep/10 px-5 py-4">
              <div>
                <h3 className="text-base font-semibold text-orbit-deep">Active offers</h3>
                <p className="text-xs text-slate-500">Latest pipeline activity across recruiters.</p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/agency/offers">View all</Link>
              </Button>
            </div>
            {activeOffers.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon={Wand2}
                  title="No offers yet"
                  description="Build your first boosted offer in under 5 minutes."
                  action={
                    <Button asChild>
                      <Link href="/agency/offers/create">
                        <Plus className="h-4 w-4" /> Create offer
                      </Link>
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-3">Candidate</th>
                      <th className="px-5 py-3">Facility</th>
                      <th className="px-5 py-3">Pay / Wk</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Updated</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orbit-deep/10">
                    {activeOffers.map((o) => (
                      <tr key={o.id} className="hover:bg-orbit-deep/[0.02]">
                        <td className="px-5 py-3 font-medium text-orbit-deep">
                          {o.candidate.firstName} {o.candidate.lastName}
                          <div className="text-xs text-slate-500">{o.candidate.specialty || o.candidate.role || "—"}</div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="font-medium text-slate-800">{o.facilityName}</div>
                          <div className="text-xs text-slate-500">{o.city}, {o.state}</div>
                        </td>
                        <td className="px-5 py-3">{formatCurrency(o.weeklyPay ? Number(o.weeklyPay) : null)}</td>
                        <td className="px-5 py-3">
                          <StatusPill status={o.status} tone={STATUS_TONE[o.status]} />
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-500">{relativeTime(o.updatedAt)}</td>
                        <td className="px-5 py-3 text-right">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/agency/offers/${o.id}/preview`}>Open</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-orbit-deep/10 px-5 py-4">
              <div>
                <h3 className="text-base font-semibold text-orbit-deep">High-risk candidates</h3>
                <p className="text-xs text-slate-500">Top of mind this week.</p>
              </div>
              <Badge variant="accent">{highRisk.length}</Badge>
            </div>
            <div className="p-5">
              {highRisk.length === 0 ? (
                <EmptyState
                  icon={AlertTriangle}
                  title="No high-risk candidates"
                  description="Risk Engine has nothing flagged. Keep cadence."
                />
              ) : (
                <ul className="space-y-3">
                  {highRisk.map((r) => (
                    <li key={r.id} className="rounded-xl border border-orbit-deep/10 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-orbit-deep">
                            {r.candidate.firstName} {r.candidate.lastName}
                          </div>
                          <div className="text-xs text-slate-500">
                            {r.offer ? `${r.offer.facilityName} · ${r.offer.city}, ${r.offer.state}` : "No active offer"}
                          </div>
                        </div>
                        <RiskPill level={r.level} score={r.score} />
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs text-slate-600">{r.reasoning}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-orbit-deep/10 px-5 py-4">
              <h3 className="text-base font-semibold text-orbit-deep">Recent activity</h3>
              <Activity className="h-4 w-4 text-slate-400" />
            </div>
            {activity.length === 0 ? (
              <div className="p-5">
                <EmptyState
                  icon={Activity}
                  title="No activity yet"
                  description="Once offers and bookings start moving, you'll see real-time updates here."
                />
              </div>
            ) : (
              <ul className="divide-y divide-orbit-deep/10">
                {activity.map((a) => (
                  <li key={a.id} className="flex items-start gap-3 px-5 py-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-orbit-red" />
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-medium text-orbit-deep">{a.actor?.name ?? "System"}</span>{" "}
                        <span className="text-slate-600">{a.description ?? a.action}</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {a.offer && <Link href={`/agency/offers/${a.offer.id}/preview`} className="hover:text-orbit-deep">{a.offer.facilityName}</Link>}
                        {a.candidate && <span> · {a.candidate.firstName} {a.candidate.lastName}</span>}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{relativeTime(a.createdAt)}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orbit-red" />
              <h3 className="text-base font-semibold text-orbit-deep">AI recommendations</h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-xl border border-orbit-red/15 bg-orbit-red/[0.04] p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-orbit-red">Action</div>
                <p className="mt-1 text-slate-700">
                  {kpis.highRisk > 0
                    ? `${kpis.highRisk} candidates flagged HIGH or CRITICAL — call within 24h.`
                    : "Pipeline stable. Maintain weekly cadence with mid-funnel candidates."}
                </p>
              </li>
              <li className="rounded-xl border border-orbit-deep/10 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-orbit-deep">Mobility lift</div>
                <p className="mt-1 text-slate-700">
                  Activate Orbit Concierge on offers without housing assist to lift acceptance ~12%.
                </p>
              </li>
              <li className="rounded-xl border border-orbit-deep/10 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-orbit-deep">Readiness</div>
                <p className="mt-1 text-slate-700">
                  Target ≥85% Day-1 readiness across active assignments. Current: {kpis.readiness}%.
                </p>
              </li>
            </ul>
            <Button asChild variant="outline" className="mt-5 w-full">
              <Link href="/agency/assignment-launch">
                Open Assignment Launch <span aria-hidden> →</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500">
          Agency: <span className="font-medium text-slate-700">{kpis.offersSent + kpis.bookings} actions tracked</span> · Status: <span className="font-medium text-emerald-700">Live</span>
        </p>
      </div>
    </>
  );
}
