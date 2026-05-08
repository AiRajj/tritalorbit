"use client";

import React from "react";
import Link from "next/link";
import { FileText, Users, Target, AlertTriangle, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/kpi-card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { RiskBadge } from "@/components/dashboard/risk-badge";

const myOffers = [
  { id: "1", candidateName: "Maria Santos", role: "RN - ICU", city: "Phoenix", pay: 2800, status: "SENT", risk: 82 },
  { id: "2", candidateName: "David Chen", role: "PT", city: "Dallas", pay: 2200, status: "VIEWED", risk: 24 },
  { id: "3", candidateName: "Lisa Park", role: "CRNA", city: "Chicago", pay: 4100, status: "ACCEPTED", risk: 12 },
  { id: "4", candidateName: "James Okafor", role: "RN - ER", city: "Seattle", pay: 3100, status: "DRAFT", risk: null },
];

export default function RecruiterDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orbit-dark">Recruiter Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Your offer pipeline and candidate retention alerts</p>
        </div>
        <Link href="/agency/offers/create">
          <Button className="bg-orbit-red hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />Create Offer
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="My Active Offers" value={4} icon={FileText} iconColor="bg-orbit-blue/10 text-orbit-blue" change="2 awaiting response" />
        <KPICard title="Accepted This Month" value={3} icon={Users} iconColor="bg-emerald-50 text-emerald-600" change="+1 vs last month" changeType="positive" />
        <KPICard title="High Risk Alerts" value={1} icon={AlertTriangle} iconColor="bg-red-50 text-red-600" change="Action required" changeType="negative" />
        <KPICard title="My Acceptance Rate" value="75%" icon={Target} iconColor="bg-purple-50 text-purple-600" change="+8% vs avg" changeType="positive" />
      </div>

      {/* Risk Alerts */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-base text-red-700">Risk Alerts — Action Required</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-xl p-4 border border-red-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-orbit-dark">Maria Santos — RN ICU — Phoenix, AZ</span>
                  <RiskBadge score={82} showScore />
                </div>
                <p className="text-sm text-red-700">Has not responded in 6 hours. Start date in 5 days. No housing confirmed.</p>
                <p className="text-xs text-red-600 mt-1 font-medium">Suggested: Call immediately, send housing options via text</p>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white flex-shrink-0">
                Take Action <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Offers */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">My Offers</CardTitle>
          <Link href="/recruiter/offers">
            <Button variant="ghost" size="sm" className="text-orbit-blue">View All</Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {myOffers.map((offer) => (
              <Link key={offer.id} href={`/agency/offers/${offer.id}/preview`}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-sm text-orbit-dark">{offer.candidateName}</div>
                  <div className="text-xs text-slate-500">{offer.role} · {offer.city}</div>
                </div>
                <div className="text-sm font-semibold text-orbit-dark">${offer.pay.toLocaleString()}/wk</div>
                <StatusBadge status={offer.status} />
                {offer.risk !== null && <RiskBadge score={offer.risk} showScore={false} />}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
