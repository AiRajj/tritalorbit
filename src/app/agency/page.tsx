import Link from "next/link";
import { Role } from "@prisma/client";

import { KpiGrid } from "@/components/dashboards/kpi-grid";
import { EmptyState } from "@/components/dashboards/states";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireRole } from "@/lib/auth";
import { getAgencyDashboardData } from "@/lib/dashboard-data";
import { agencyLinks } from "@/lib/navigation";
import { formatCurrency } from "@/lib/utils";

export default async function AgencyPage() {
  const session = await requireRole([Role.AGENCY_OWNER, Role.RECRUITER]);
  const data = await getAgencyDashboardData(session.user.id);

  return (
    <DashboardShell
      title="Agency Command Center"
      links={agencyLinks}
      user={{ name: session.user.name ?? "Agency User", email: session.user.email ?? "" }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Agency Dashboard</h1>
            <p className="text-sm text-slate-500">Offer-to-start mobility performance</p>
          </div>
          <Link href="/agency/offers/create">
            <Button>Create Offer</Button>
          </Link>
        </div>

        <KpiGrid
          items={[
            { label: "Offers Sent", value: data?.kpis.sent ?? 0 },
            { label: "Accepted Offers", value: data?.kpis.accepted ?? 0 },
            { label: "Pending Offers", value: data?.kpis.pending ?? 0 },
            { label: "Backout Risk", value: `${data?.kpis.backoutRisk ?? 0}%` },
            { label: "Booking Requests", value: data?.kpis.bookingRequests ?? 0 },
            { label: "Assignment Ready %", value: `${data?.kpis.assignmentReady ?? 0}%` },
          ]}
        />

        <Card>
          <CardHeader>
            <CardTitle>Active Offers</CardTitle>
          </CardHeader>
          <CardContent>
            {!data?.offers.length ? (
              <EmptyState
                title="No active offers yet"
                description="Start by creating your first enhanced offer package."
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Weekly Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.offers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>{offer.candidate.fullName}</TableCell>
                      <TableCell>{offer.assignment.facilityName}</TableCell>
                      <TableCell>{formatCurrency(offer.weeklyPay)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            offer.status === "ACCEPTED"
                              ? "success"
                              : offer.status === "DECLINED"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {offer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/agency/offers/${offer.id}/preview`} className="text-[#0B3C5D] hover:underline">
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>High-risk candidates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data?.risks.length ? (
                data.risks.map((risk) => (
                  <div key={risk.id} className="rounded-xl border border-slate-200 p-3">
                    <p className="font-medium text-slate-900">{risk.candidate.fullName}</p>
                    <p className="text-sm text-slate-600">
                      Risk {risk.score} ({risk.label})
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{risk.suggestedAction}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No elevated risk candidates detected.</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data?.activities.length ? (
                data.activities.map((activity) => (
                  <div key={activity.id} className="rounded-xl border border-slate-200 p-3 text-sm">
                    <p className="font-medium text-slate-900">{activity.action.replaceAll("_", " ")}</p>
                    <p className="text-xs text-slate-500">{new Date(activity.createdAt).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No recent events available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
