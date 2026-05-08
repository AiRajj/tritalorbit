import Link from "next/link";
import { ArrowRight, Filter, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge, riskTone } from "@/components/ui/status-badge";
import {
  activeOffers,
  agencyKpis,
  aiRecommendations,
  candidatesInNegotiation,
  recentActivity
} from "@/lib/content";
import { formatCurrency } from "@/lib/utils";

export function AgencyDashboard() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {agencyKpis.map((kpi) => (
          <Card key={kpi.label} className="p-5">
            <p className="text-sm font-bold text-slate-500">{kpi.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{kpi.value}</p>
            <p className="mt-2 text-xs font-bold text-[#0B3C5D]">{kpi.trend}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-black text-[#0B3C5D]">Active offers</h2>
              <p className="mt-1 text-sm text-slate-500">Filters, search, status badges, and risk-aware next actions.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input className="ml-2 bg-transparent text-sm outline-none" placeholder="Search offers" />
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/agency?status=backout-risk">
                  <Filter className="h-4 w-4" />
                  Filter
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
            <table className="w-full min-w-[820px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.16em] text-slate-500">
                  <th className="py-3">Candidate</th>
                  <th>Specialty</th>
                  <th>Facility</th>
                  <th>Location</th>
                  <th>Weekly pay</th>
                  <th>Status</th>
                  <th>Risk</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeOffers.map((offer) => (
                  <tr key={offer.id} className="border-b border-slate-100 text-sm">
                    <td className="py-4 font-bold text-slate-900">{offer.candidate}</td>
                    <td>{offer.specialty}</td>
                    <td>{offer.facility}</td>
                    <td>{offer.location}</td>
                    <td>{formatCurrency(offer.weeklyPay)}</td>
                    <td>
                      <StatusBadge label={offer.status} tone={offer.status === "Backout Risk" ? "red" : "blue"} />
                    </td>
                    <td>
                      <StatusBadge label={`${offer.risk}/100`} tone={riskTone(offer.risk)} />
                    </td>
                    <td>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/agency/offers/${offer.id}/preview`}>
                          Review <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="grid gap-6">
          <Card>
            <h3 className="text-xl font-black text-[#0B3C5D]">Candidates in negotiation</h3>
            <div className="mt-4 grid gap-3">
              {candidatesInNegotiation.map((item) => (
                <p key={item} className="rounded-3xl bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                  {item}
                </p>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-xl font-black text-[#0B3C5D]">AI recommendations</h3>
            <div className="mt-4 grid gap-3">
              {aiRecommendations.map((item) => (
                <p key={item} className="rounded-3xl bg-sky-50 p-4 text-sm font-semibold text-sky-800">
                  {item}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <Card>
        <h3 className="text-xl font-black text-[#0B3C5D]">Recent activity</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {recentActivity.map((item) => (
            <p key={item} className="rounded-3xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
}
