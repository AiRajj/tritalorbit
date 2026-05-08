import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Download,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  UserCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge, riskTone } from "@/components/ui/status-badge";
import { activeOffers, dashboardConfigs, recentActivity } from "@/lib/content";
import { formatCurrency } from "@/lib/utils";

type DashboardKey = keyof typeof dashboardConfigs;

export function DashboardShell({
  type,
  children
}: {
  type: DashboardKey;
  children?: React.ReactNode;
}) {
  const config = dashboardConfigs[type];
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-[#082f49] p-5 text-white lg:block">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-black text-[#0B3C5D]">TO</div>
            <div>
              <p className="font-black">TRITAL Orbit™</p>
              <p className="text-xs text-slate-300">{config.role}</p>
            </div>
          </Link>
          <nav className="mt-10 grid gap-2">
            {config.nav.map((item) => (
              <Link
                key={item}
                href={navHref(type, item)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                <LayoutDashboard className="h-4 w-4" />
                {item}
              </Link>
            ))}
          </nav>
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-4">
            <p className="text-sm font-bold">Production fallback state</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              Dashboards render demo operational data until PostgreSQL credentials are configured.
            </p>
          </div>
        </aside>
        <main>
          <TopBar title={config.title} />
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <KpiGrid kpis={config.kpis} />
            {children ?? <DefaultDashboard type={type} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function navHref(type: DashboardKey, item: string) {
  const slug = item.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const map: Record<string, string> = {
    "admin:vendors": "/admin/vendors",
    "admin:housing": "/admin/vendors",
    "recruiter:launch-readiness": "/agency/assignment-launch",
    "candidate:offer": "/candidate/offer/demo-token",
    "candidate:housing": "/candidate/housing",
    "candidate:travel": "/candidate/booking-request/orbit-demo-offer",
    "candidate:support": "/candidate/booking-request/orbit-demo-offer",
    "concierge:requests": "/concierge/requests",
    "concierge:task-board": "/concierge/requests",
    "concierge:vendors": "/agency/vendors",
    "vendor:listings": "/vendor/dashboard",
    "vendor:requests": "/vendor/dashboard",
    "vendor:verification": "/vendor/dashboard",
    "vendor:billing": "/vendor/dashboard",
    "vendor:profile": "/vendor/dashboard",
    "msp:exports": "/api/exports/msp/csv"
  };
  if (type === "admin") return map[`${type}:${slug}`] || "/admin";
  if (type === "recruiter") return map[`${type}:${slug}`] || "/agency";
  if (type === "candidate") return map[`${type}:${slug}`] || "/candidate";
  if (type === "concierge") return map[`${type}:${slug}`] || "/concierge";
  if (type === "vendor") return "/vendor/dashboard";
  if (type === "msp") return map[`${type}:${slug}`] || "/msp";
  return `/${type}`;
}

function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/agency" aria-label="Open dashboard navigation" className="rounded-2xl border border-slate-200 p-2 lg:hidden">
            <Menu className="h-5 w-5" />
          </Link>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E63946]">Command workspace</p>
            <h1 className="text-xl font-black text-[#0B3C5D] sm:text-2xl">{title}</h1>
          </div>
        </div>
        <div className="hidden flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 lg:mx-8 lg:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input className="ml-3 w-full bg-transparent text-sm outline-none" placeholder="Search candidates, offers, vendors..." />
        </div>
        <div className="flex items-center gap-2">
          <Link href="/agency?panel=notifications" aria-label="Notifications" className="relative rounded-2xl border border-slate-200 p-2">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#E63946]" />
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 sm:flex">
            <UserCircle className="h-5 w-5 text-[#0B3C5D]" />
            <span className="text-sm font-bold text-slate-700">Orbit User</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/api/auth/signout">
              <LogOut className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function KpiGrid({ kpis }: { kpis: readonly { label: string; value: string; trend: string; tone?: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="p-5">
          <p className="text-sm font-bold text-slate-500">{kpi.label}</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="text-3xl font-black text-slate-950">{kpi.value}</p>
            <StatusBadge label={kpi.trend} tone={(kpi.tone as "green" | "red" | "amber" | "blue" | "slate") || "slate"} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function DefaultDashboard({ type }: { type: DashboardKey }) {
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <Card>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-[#0B3C5D]">Operational queue</h2>
            <p className="mt-1 text-sm text-slate-500">Responsive table with loading, empty, and fallback states.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/agency/assignment-launch">
                <Download className="h-4 w-4" />
                Export
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/agency/offers/create">
                <Plus className="h-4 w-4" />
                Create offer
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.16em] text-slate-500">
                <th className="py-3">Candidate</th>
                <th>Role</th>
                <th>Facility</th>
                <th>Location</th>
                <th>Pay</th>
                <th>Status</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {activeOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-slate-100 text-sm">
                  <td className="py-4 font-bold text-slate-900">
                    <Link href={`/agency/offers/${offer.id}/preview`} className="hover:text-[#E63946]">
                      {offer.candidate}
                    </Link>
                  </td>
                  <td>{offer.role}</td>
                  <td>{offer.facility}</td>
                  <td>{offer.location}</td>
                  <td>{formatCurrency(offer.weeklyPay)}</td>
                  <td>
                    <StatusBadge label={offer.status} tone={offer.status === "Backout Risk" ? "red" : "blue"} />
                  </td>
                  <td>
                    <StatusBadge label={`${offer.risk}/100`} tone={riskTone(offer.risk)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {type === "admin" ? (
          <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            Empty-state example: no failed platform jobs are currently visible. New failures will appear here with remediation
            actions.
          </div>
        ) : null}
      </Card>
      <div className="grid gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[#0B3C5D]">Notifications</h3>
            <Settings className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-5 grid gap-3">
            {recentActivity.map((item) => (
              <div key={item} className="rounded-3xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-black text-[#0B3C5D]">Error state</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            If a live data source is unavailable, Orbit keeps the page usable, explains the fallback, and preserves available
            actions.
          </p>
        </Card>
      </div>
    </div>
  );
}
