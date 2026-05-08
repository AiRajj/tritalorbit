"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText, Users, TrendingUp, AlertTriangle, CheckCircle2,
  Plus, ArrowRight, Clock, Brain, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/kpi-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";

interface AgencyStats {
  kpis: {
    totalOffers: number;
    acceptedOffers: number;
    pendingOffers: number;
    sentOffers: number;
    bookingRequests: number;
    highRiskCandidates: number;
    acceptanceRate: number;
  };
  recentOffers: Array<{
    id: string;
    candidateName: string;
    facilityCity: string;
    facilityState: string;
    candidateRole: string | null;
    weeklyPay: number | null;
    status: string;
    createdAt: string;
    retentionRisks: Array<{ score: number; riskLevel: string }>;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    createdAt: string;
  }>;
}

const activityIcons: Record<string, React.ElementType> = {
  OFFER_CREATED: FileText,
  OFFER_SENT: FileText,
  OFFER_VIEWED: CheckCircle2,
  OFFER_ACCEPTED: CheckCircle2,
  HOUSING_REQUESTED: Activity,
  TRAVEL_REQUESTED: Activity,
  BOOKING_CREATED: Activity,
  default: Activity,
};

export default function AgencyDashboard() {
  const [stats, setStats] = useState<AgencyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agency/stats")
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const kpis = stats?.kpis;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orbit-dark">Agency Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor your offer pipeline and candidate retention</p>
        </div>
        <Link href="/agency/offers/create">
          <Button className="bg-orbit-red hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Offer
          </Button>
        </Link>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard
          title="Total Offers"
          value={kpis?.totalOffers ?? 0}
          icon={FileText}
          iconColor="bg-blue-50 text-orbit-blue"
          loading={loading}
          change="+12% this month"
          changeType="positive"
        />
        <KPICard
          title="Accepted"
          value={kpis?.acceptedOffers ?? 0}
          icon={CheckCircle2}
          iconColor="bg-emerald-50 text-emerald-600"
          loading={loading}
          change="+8% vs last month"
          changeType="positive"
        />
        <KPICard
          title="Pending"
          value={kpis?.pendingOffers ?? 0}
          icon={Clock}
          iconColor="bg-amber-50 text-amber-600"
          loading={loading}
        />
        <KPICard
          title="Acceptance Rate"
          value={`${kpis?.acceptanceRate ?? 0}%`}
          icon={TrendingUp}
          iconColor="bg-purple-50 text-purple-600"
          loading={loading}
          change="+5% vs last month"
          changeType="positive"
        />
        <KPICard
          title="Booking Requests"
          value={kpis?.bookingRequests ?? 0}
          icon={Activity}
          iconColor="bg-sky-50 text-sky-600"
          loading={loading}
        />
        <KPICard
          title="High Risk"
          value={kpis?.highRiskCandidates ?? 0}
          icon={AlertTriangle}
          iconColor="bg-red-50 text-red-600"
          loading={loading}
          change={kpis?.highRiskCandidates ? "Action required" : "All clear"}
          changeType={kpis?.highRiskCandidates ? "negative" : "positive"}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Offers Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-base">Active Offers</CardTitle>
              <Link href="/agency/offers">
                <Button variant="ghost" size="sm" className="text-orbit-blue">
                  View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-14 bg-slate-100 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : stats?.recentOffers?.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No offers yet</p>
                  <p className="text-slate-400 text-sm mb-4">Create your first offer to get started</p>
                  <Link href="/agency/offers/create">
                    <Button size="sm" className="bg-orbit-blue hover:bg-orbit-blue-light text-white">
                      <Plus className="h-4 w-4 mr-1" />
                      Create First Offer
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {stats?.recentOffers?.slice(0, 8).map((offer) => {
                    const riskScore = offer.retentionRisks?.[0];
                    return (
                      <Link
                        key={offer.id}
                        href={`/agency/offers/${offer.id}/preview`}
                        className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-orbit-dark">{offer.candidateName}</div>
                          <div className="text-xs text-slate-500">
                            {offer.candidateRole} · {offer.facilityCity}, {offer.facilityState}
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-orbit-dark">
                          {formatCurrency(offer.weeklyPay)}/wk
                        </div>
                        <StatusBadge status={offer.status} />
                        {riskScore && (
                          <RiskBadge score={riskScore.score} level={riskScore.riskLevel as any} showScore={false} />
                        )}
                        <div className="text-xs text-slate-400">{formatRelativeTime(offer.createdAt)}</div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-5">
          {/* AI Recommendations */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-orbit-blue" />
                <CardTitle className="text-base">AI Recommendations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  priority: "urgent",
                  text: "3 candidates haven't viewed their offers in 6+ hours",
                  action: "Send follow-up",
                },
                {
                  priority: "high",
                  text: "2 candidates have start dates in 7 days with no housing",
                  action: "Send housing options",
                },
                {
                  priority: "medium",
                  text: "5 offers can be boosted with AI enhancement",
                  action: "Boost offers",
                },
              ].map((rec, i) => (
                <div key={i} className={`p-3 rounded-xl border ${
                  rec.priority === "urgent" ? "bg-red-50 border-red-200" :
                  rec.priority === "high" ? "bg-orange-50 border-orange-200" :
                  "bg-blue-50 border-blue-200"
                }`}>
                  <p className={`text-xs font-medium mb-1.5 ${
                    rec.priority === "urgent" ? "text-red-700" :
                    rec.priority === "high" ? "text-orange-700" :
                    "text-orbit-blue"
                  }`}>{rec.text}</p>
                  <button className={`text-xs font-semibold underline ${
                    rec.priority === "urgent" ? "text-red-600" :
                    rec.priority === "high" ? "text-orange-600" :
                    "text-orbit-blue"
                  }`}>{rec.action} →</button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-slate-500" />
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                <div className="space-y-2">
                  {[1,2,3].map(i => <div key={i} className="h-10 bg-slate-100 animate-pulse rounded-lg" />)}
                </div>
              ) : stats?.recentActivity?.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-4">No activity yet</p>
              ) : (
                stats?.recentActivity?.map((activity) => {
                  const Icon = activityIcons[activity.type] ?? activityIcons.default;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="h-3.5 w-3.5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">{activity.description}</p>
                        <p className="text-xs text-slate-400">{formatRelativeTime(activity.createdAt)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/agency/offers/create">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                  <Plus className="h-4 w-4" /> Create New Offer
                </Button>
              </Link>
              <Link href="/agency/assignment-launch">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                  <Activity className="h-4 w-4" /> Assignment Launch
                </Button>
              </Link>
              <Link href="/agency/booking-requests">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                  <Users className="h-4 w-4" /> Booking Requests
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
