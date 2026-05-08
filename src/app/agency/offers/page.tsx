import Link from "next/link";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusPill } from "@/components/dashboard/risk-pill";
import { prisma } from "@/lib/prisma";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { formatCurrency, relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Offers" };

const STATUS_TONE = {
  DRAFT: "muted",
  SENT: "default",
  VIEWED: "default",
  NEGOTIATING: "warning",
  ACCEPTED: "success",
  DECLINED: "destructive",
  WITHDRAWN: "destructive",
  EXPIRED: "muted",
} as const;

export default async function OffersIndexPage() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "AGENCY_OWNER", ctx?.agencyId ?? null);

  const offers = agencyId
    ? await prisma.offer.findMany({
        where: { agencyId },
        orderBy: { updatedAt: "desc" },
        include: { candidate: true },
        take: 50,
      })
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Offers"
        title="Offer pipeline"
        description="Every active and historical offer across the agency."
        actions={
          <Button asChild>
            <Link href="/agency/offers/create">
              <Wand2 className="h-4 w-4" /> Create offer
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          {offers.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={Wand2}
                title="No offers yet"
                description="Create your first boosted offer to populate the pipeline."
                action={
                  <Button asChild>
                    <Link href="/agency/offers/create">Create offer</Link>
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
                    <th className="px-5 py-3">Pay</th>
                    <th className="px-5 py-3">Confidence</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Updated</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orbit-deep/10">
                  {offers.map((o) => (
                    <tr key={o.id} className="hover:bg-orbit-deep/[0.02]">
                      <td className="px-5 py-3">
                        <div className="font-medium text-orbit-deep">{o.candidate.firstName} {o.candidate.lastName}</div>
                        <div className="text-xs text-slate-500">{o.candidate.specialty || o.candidate.role || "—"}</div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-medium">{o.facilityName}</div>
                        <div className="text-xs text-slate-500">{o.city}, {o.state}</div>
                      </td>
                      <td className="px-5 py-3">{o.weeklyPay ? formatCurrency(Number(o.weeklyPay)) : "—"}</td>
                      <td className="px-5 py-3">{o.confidenceScore ?? "—"}</td>
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
    </>
  );
}
