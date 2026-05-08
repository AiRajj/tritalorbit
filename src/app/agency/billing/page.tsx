import { Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Billing" };

export default async function Page() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "AGENCY_OWNER", ctx?.agencyId ?? null);

  const sub = agencyId
    ? await prisma.agencySubscription.findUnique({
        where: { agencyId },
        include: { plan: true },
      })
    : null;
  const payments = agencyId
    ? await prisma.paymentRecord.findMany({ where: { agencyId }, orderBy: { createdAt: "desc" }, take: 20 })
    : [];

  return (
    <>
      <PageHeader eyebrow="Account" title="Billing" description="Subscription, invoices, and Stripe-ready payment records." />
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-base font-semibold text-orbit-deep">Plan</h3>
            {!sub ? (
              <p className="mt-2 text-sm text-slate-600">No active subscription. Talk to your account manager to activate billing.</p>
            ) : (
              <div className="mt-4 space-y-3 text-sm">
                <Row label="Tier" value={sub.plan.name} />
                <Row label="Status" value={<Badge variant={sub.status === "ACTIVE" ? "success" : "muted"}>{sub.status}</Badge>} />
                <Row label="Monthly" value={formatCurrency(Number(sub.plan.monthlyPrice))} />
                <Row label="Renews" value={sub.renewsAt ? formatDate(sub.renewsAt) : "—"} />
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base font-semibold text-orbit-deep">Payment methods</h3>
            <p className="mt-2 text-xs text-slate-500">Stripe-managed. Once Stripe keys are configured, cards appear here.</p>
            <div className="mt-4 rounded-xl border border-dashed border-orbit-deep/15 bg-white p-4 text-center text-sm text-slate-500">
              No payment method on file
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="border-b border-orbit-deep/10 px-5 py-4">
            <h3 className="text-base font-semibold text-orbit-deep">Recent invoices</h3>
          </div>
          {payments.length === 0 ? (
            <div className="p-6"><EmptyState icon={Wallet} title="No invoices yet" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orbit-deep/10">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="px-5 py-3 text-xs text-slate-500">{formatDate(p.createdAt)}</td>
                    <td className="px-5 py-3">{p.description ?? "Subscription"}</td>
                    <td className="px-5 py-3">{formatCurrency(Number(p.amount))}</td>
                    <td className="px-5 py-3"><Badge variant={p.status === "paid" ? "success" : "muted"}>{p.status}</Badge></td>
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

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-orbit-deep/10 pb-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-orbit-deep">{value}</span>
    </div>
  );
}
