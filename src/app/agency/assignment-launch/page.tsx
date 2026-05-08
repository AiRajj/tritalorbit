import Link from "next/link";
import { CalendarCheck2, Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { RiskPill, StatusPill } from "@/components/dashboard/risk-pill";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Assignment Launch" };

const STATUS_LABEL: Record<string, "success" | "warning" | "destructive" | "muted" | "default"> = {
  COMPLETE: "success",
  IN_PROGRESS: "warning",
  BLOCKED: "destructive",
  NOT_STARTED: "muted",
};

export default async function Page() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "AGENCY_OWNER", ctx?.agencyId ?? null);
  const assignments = agencyId
    ? await prisma.assignment.findMany({
        where: { agencyId },
        include: {
          candidate: true,
          offer: true,
        },
        orderBy: [{ startDate: "asc" }, { createdAt: "desc" }],
        take: 100,
      })
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Assignment Launch Dashboard"
        description="Track readiness from offer accepted to first day. Filters, status colors, and AI action recommendations."
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />
      <Card>
        <CardContent className="p-0">
          {assignments.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={CalendarCheck2}
                title="No active assignments"
                description="Once offers are accepted, readiness tracking begins automatically."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Candidate</th>
                    <th className="px-5 py-3">Facility</th>
                    <th className="px-5 py-3">Start</th>
                    <th className="px-5 py-3">Housing</th>
                    <th className="px-5 py-3">Travel</th>
                    <th className="px-5 py-3">Documents</th>
                    <th className="px-5 py-3">Day-1</th>
                    <th className="px-5 py-3">Risk</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orbit-deep/10">
                  {assignments.map((a) => (
                    <tr key={a.id}>
                      <td className="px-5 py-3">
                        <div className="font-medium text-orbit-deep">{a.candidate.firstName} {a.candidate.lastName}</div>
                        <div className="text-xs text-slate-500">{a.candidate.role || a.candidate.specialty || "—"}</div>
                      </td>
                      <td className="px-5 py-3">{a.offer.facilityName}<div className="text-xs text-slate-500">{a.offer.city}, {a.offer.state}</div></td>
                      <td className="px-5 py-3 text-xs">{a.startDate ? formatDate(a.startDate) : "—"}</td>
                      <td className="px-5 py-3"><StatusPill status={a.housingStatus} tone={STATUS_LABEL[a.housingStatus]} /></td>
                      <td className="px-5 py-3"><StatusPill status={a.travelStatus} tone={STATUS_LABEL[a.travelStatus]} /></td>
                      <td className="px-5 py-3"><StatusPill status={a.documentsStatus} tone={STATUS_LABEL[a.documentsStatus]} /></td>
                      <td className="px-5 py-3"><StatusPill status={a.firstWeekStatus} tone={STATUS_LABEL[a.firstWeekStatus]} /></td>
                      <td className="px-5 py-3"><RiskPill level={a.riskLevel} score={a.riskScore} /></td>
                      <td className="px-5 py-3 text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/agency/offers/${a.offerId}/preview`}>Open</Link>
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
    </>
  );
}
