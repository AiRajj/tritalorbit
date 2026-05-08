import {
  Activity,
  Briefcase,
  Building2,
  CheckCircle2,
  Database,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Control Center" };

export default async function Page() {
  const [agencies, users, candidates, offers, vendors, audit] = await Promise.all([
    prisma.agency.count(),
    prisma.user.count(),
    prisma.candidate.count(),
    prisma.offer.count(),
    prisma.vendor.count(),
    prisma.auditLog.count(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Admin Control Center"
        title="Platform health"
        description="Operational metrics, configuration, and audit-ready oversight."
      />
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Agencies" value={agencies} icon={Building2} />
        <KpiCard label="Users" value={users} icon={Users} />
        <KpiCard label="Candidates" value={candidates} icon={Briefcase} />
        <KpiCard label="Offers" value={offers} icon={Sparkles} tone="accent" />
        <KpiCard label="Vendors" value={vendors} icon={Wallet} />
        <KpiCard label="Audit events" value={audit} icon={ShieldCheck} tone="success" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-base font-semibold text-orbit-deep">System health</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <Row icon={CheckCircle2} ok label="Database" detail="Connected · responsive" />
              <Row icon={CheckCircle2} ok label="Auth.js" detail="JWT sessions · enforcing RBAC" />
              <Row icon={CheckCircle2} ok={!!process.env.OPENAI_API_KEY} label="OpenAI integration" detail={process.env.OPENAI_API_KEY ? "Live" : "Mock fallbacks active"} />
              <Row icon={CheckCircle2} ok={!!process.env.STRIPE_SECRET_KEY} label="Stripe" detail={process.env.STRIPE_SECRET_KEY ? "Live" : "Test mode"} />
              <Row icon={CheckCircle2} ok={!!process.env.RESEND_API_KEY} label="Resend transactional email" detail={process.env.RESEND_API_KEY ? "Live" : "Logging only"} />
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-orbit-red" />
              <h3 className="text-base font-semibold text-orbit-deep">Quick links</h3>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <QuickLink href="/admin/agencies" label="Manage agencies" />
              <QuickLink href="/admin/users" label="Manage users" />
              <QuickLink href="/admin/vendors" label="Manage vendors" />
              <QuickLink href="/admin/subscriptions" label="Subscriptions" />
              <QuickLink href="/admin/audit" label="Audit log" />
              <QuickLink href="/admin/ai-usage" label="AI usage" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Row({
  icon: Icon,
  ok,
  label,
  detail,
}: {
  icon: typeof CheckCircle2;
  ok: boolean;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-orbit-deep/10 bg-white p-3">
      <div className="flex items-center gap-2">
        <Icon className={ok ? "h-4 w-4 text-emerald-600" : "h-4 w-4 text-amber-600"} />
        <div>
          <div className="font-medium text-orbit-deep">{label}</div>
          <div className="text-xs text-slate-500">{detail}</div>
        </div>
      </div>
      <span className={ok ? "text-xs font-semibold text-emerald-700" : "text-xs font-semibold text-amber-700"}>{ok ? "OK" : "Idle"}</span>
    </li>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-xl border border-orbit-deep/10 bg-white px-4 py-2 text-orbit-deep transition hover:bg-orbit-deep/5">
      <span>{label}</span>
      <span aria-hidden>→</span>
    </Link>
  );
}
