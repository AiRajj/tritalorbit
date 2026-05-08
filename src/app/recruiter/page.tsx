import Link from "next/link";
import { Radar, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusPill } from "@/components/dashboard/risk-pill";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { formatCurrency, relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Recruiter Hub" };

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;
  const myOffers = await prisma.offer.findMany({
    where: { recruiterId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { candidate: true },
    take: 12,
  });

  const sent = myOffers.filter((o) => o.status === "SENT" || o.status === "VIEWED").length;
  const accepted = myOffers.filter((o) => o.status === "ACCEPTED").length;
  const draft = myOffers.filter((o) => o.status === "DRAFT").length;

  return (
    <>
      <PageHeader
        eyebrow="Recruiter"
        title={`Hi ${session.user.name?.split(" ")[0] || "there"}`}
        description="Your pipeline, focused on the next concrete action."
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/recruiter/risk">
                <Radar className="h-4 w-4" /> Risk pipeline
              </Link>
            </Button>
            <Button asChild>
              <Link href="/agency/offers/create">
                <Wand2 className="h-4 w-4" /> Build offer
              </Link>
            </Button>
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="In flight" value={sent} icon={Sparkles} />
        <KpiCard label="Accepted" value={accepted} tone="success" />
        <KpiCard label="Drafts" value={draft} tone="warning" />
      </div>
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="border-b border-orbit-deep/10 px-5 py-4">
            <h3 className="text-base font-semibold text-orbit-deep">My offers</h3>
          </div>
          {myOffers.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Wand2}
                title="No offers yet"
                description="Build your first boosted offer."
                action={
                  <Button asChild>
                    <Link href="/agency/offers/create">Create offer</Link>
                  </Button>
                }
              />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Candidate</th>
                  <th className="px-5 py-3">Facility</th>
                  <th className="px-5 py-3">Pay</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Updated</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orbit-deep/10">
                {myOffers.map((o) => (
                  <tr key={o.id}>
                    <td className="px-5 py-3 font-medium text-orbit-deep">{o.candidate.firstName} {o.candidate.lastName}</td>
                    <td className="px-5 py-3">{o.facilityName} · {o.city}, {o.state}</td>
                    <td className="px-5 py-3">{o.weeklyPay ? formatCurrency(Number(o.weeklyPay)) : "—"}</td>
                    <td className="px-5 py-3"><StatusPill status={o.status} /></td>
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
          )}
        </CardContent>
      </Card>
    </>
  );
}
