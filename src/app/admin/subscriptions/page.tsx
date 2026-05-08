import { Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Subscriptions" };

export default async function Page() {
  const subs = await prisma.agencySubscription.findMany({
    include: { agency: true, plan: true },
    orderBy: { createdAt: "desc" },
  });
  const plans = await prisma.subscriptionPlan.findMany({ orderBy: { monthlyPrice: "asc" } });

  return (
    <>
      <PageHeader eyebrow="Admin" title="Subscriptions" description="Plan tiers, status, and renewals across agencies." />

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-orbit-red">{p.tier}</div>
              <div className="mt-1 text-lg font-semibold text-orbit-deep">{p.name}</div>
              <div className="mt-2 text-2xl font-semibold text-orbit-deep">{formatCurrency(Number(p.monthlyPrice))}<span className="text-sm text-slate-500">/mo</span></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="border-b border-orbit-deep/10 px-5 py-4">
            <h3 className="text-base font-semibold text-orbit-deep">Active subscriptions</h3>
          </div>
          {subs.length === 0 ? (
            <div className="p-6"><EmptyState icon={Wallet} title="No subscriptions yet" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Agency</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Renews</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orbit-deep/10">
                {subs.map((s) => (
                  <tr key={s.id}>
                    <td className="px-5 py-3 font-medium text-orbit-deep">{s.agency.name}</td>
                    <td className="px-5 py-3">{s.plan.name}</td>
                    <td className="px-5 py-3"><Badge variant={s.status === "ACTIVE" ? "success" : "muted"}>{s.status}</Badge></td>
                    <td className="px-5 py-3 text-xs text-slate-500">{s.renewsAt ? formatDate(s.renewsAt) : "—"}</td>
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
