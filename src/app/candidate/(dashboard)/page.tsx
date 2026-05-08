import Link from "next/link";
import { Briefcase, Calendar, FileText, Home, Plane } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusPill } from "@/components/dashboard/risk-pill";
import { formatCurrency, formatDate, relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Hub" };

export default async function Page() {
  const session = await auth();
  const candidate = session?.user?.id
    ? await prisma.candidate.findFirst({ where: { userId: session.user.id } })
    : null;

  const offers = candidate
    ? await prisma.offer.findMany({
        where: { candidateId: candidate.id },
        orderBy: { updatedAt: "desc" },
        take: 10,
      })
    : [];

  const totalOffers = offers.length;
  const accepted = offers.filter((o) => o.status === "ACCEPTED").length;
  const pending = offers.filter((o) =>
    ["SENT", "VIEWED", "NEGOTIATING"].includes(o.status),
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="Clinician Hub"
        title={`Welcome${candidate ? ", " + candidate.firstName : ""}`}
        description="Your assignments, housing, travel, and documents — in one place."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Offers" value={totalOffers} icon={Briefcase} />
        <KpiCard label="Accepted" value={accepted} icon={Calendar} tone="success" />
        <KpiCard label="In review" value={pending} icon={FileText} tone="warning" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <div className="border-b border-orbit-deep/10 px-5 py-4">
              <h3 className="text-base font-semibold text-orbit-deep">My offers</h3>
              <p className="text-xs text-slate-500">Most recent assignments shared with you.</p>
            </div>
            {offers.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon={Briefcase}
                  title="No offers yet"
                  description="Once an agency sends you a boosted offer, it will appear here."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-3">Facility</th>
                      <th className="px-5 py-3">Pay</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Sent</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orbit-deep/10">
                    {offers.map((o) => (
                      <tr key={o.id} className="hover:bg-orbit-deep/[0.02]">
                        <td className="px-5 py-3">
                          <div className="font-medium text-orbit-deep">{o.facilityName}</div>
                          <div className="text-xs text-slate-500">{o.city}, {o.state}</div>
                        </td>
                        <td className="px-5 py-3">{o.weeklyPay ? formatCurrency(Number(o.weeklyPay)) : "—"}</td>
                        <td className="px-5 py-3">
                          <StatusPill status={o.status} />
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-500">
                          {o.sentAt ? relativeTime(o.sentAt) : "—"}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/candidate/offer/${o.publicToken}`}>Open hub</Link>
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
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">Quick actions</h3>
            <div className="mt-4 space-y-2">
              <Action href="/candidate/housing" icon={Home} label="Browse housing" />
              <Action href="/candidate/travel" icon={Plane} label="Travel checklist" />
              <Action href="/candidate/documents" icon={FileText} label="Document vault" />
              <Action href="/candidate/assignments" icon={Calendar} label="My assignments" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Action({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-orbit-deep/10 bg-white px-4 py-3 text-sm font-medium text-orbit-deep transition hover:bg-orbit-deep/5"
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-orbit-red" />
        {label}
      </span>
      <span aria-hidden>→</span>
    </Link>
  );
}
