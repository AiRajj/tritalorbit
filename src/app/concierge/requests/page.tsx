import { Compass } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusPill } from "@/components/dashboard/risk-pill";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { formatCurrency, formatDate, relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Booking requests" };

export default async function Page() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "CONCIERGE_MANAGER", ctx?.agencyId ?? null);
  const reqs = agencyId
    ? await prisma.bookingRequest.findMany({
        where: { agencyId },
        include: { candidate: true, offer: true },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    : [];

  return (
    <>
      <PageHeader eyebrow="Concierge" title="Booking requests queue" description="Inbound mobility requests from candidates." />
      <Card>
        <CardContent className="p-0">
          {reqs.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Compass} title="Queue is empty" description="Candidate-submitted requests will appear here." />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Candidate</th>
                    <th className="px-5 py-3">Needs</th>
                    <th className="px-5 py-3">Move date</th>
                    <th className="px-5 py-3">Budget</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orbit-deep/10">
                  {reqs.map((r) => (
                    <tr key={r.id}>
                      <td className="px-5 py-3">
                        <div className="font-medium text-orbit-deep">{r.candidate.firstName} {r.candidate.lastName}</div>
                        <div className="text-xs text-slate-500">{r.offer ? `${r.offer.city}, ${r.offer.state}` : "—"}</div>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-700">
                        {[r.needHousing && "Housing", r.needFlight && "Flight", r.needCar && "Car"].filter(Boolean).join(" · ") || "—"}
                      </td>
                      <td className="px-5 py-3 text-xs">{r.moveDate ? formatDate(r.moveDate) : "—"}</td>
                      <td className="px-5 py-3 text-xs">
                        {r.budgetMin || r.budgetMax
                          ? `${r.budgetMin ? formatCurrency(Number(r.budgetMin)) : ""} – ${r.budgetMax ? formatCurrency(Number(r.budgetMax)) : ""}`
                          : "—"}
                      </td>
                      <td className="px-5 py-3"><StatusPill status={r.status} /></td>
                      <td className="px-5 py-3 text-xs text-slate-500">{relativeTime(r.createdAt)}</td>
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
