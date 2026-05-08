"use client";

import React, { useState } from "react";
import { Download, FileText, TrendingUp, TrendingDown, BarChart3, Brain, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/dashboard/kpi-card";

const supplierData = [
  { name: "PrimeStaff Healthcare", acceptanceRate: 78, backoutRate: 8, timeToReady: 4.2, mobilityUtilization: 65, trend: "up" },
  { name: "MedForce Staffing", acceptanceRate: 71, backoutRate: 12, timeToReady: 5.8, mobilityUtilization: 48, trend: "up" },
  { name: "HealthBridge Agency", acceptanceRate: 83, backoutRate: 6, timeToReady: 3.9, mobilityUtilization: 72, trend: "up" },
  { name: "QuickCare Staffing", acceptanceRate: 62, backoutRate: 19, timeToReady: 7.2, mobilityUtilization: 31, trend: "down" },
];

export default function MSPDashboard() {
  const [dateRange, setDateRange] = useState("30d");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const generateSummary = () => {
    setAiSummaryLoading(true);
    setTimeout(() => {
      setAiSummary("This period shows strong performance improvements across the supplier network. HealthBridge Agency leads with a 83% acceptance rate and the lowest backout rate at 6%. QuickCare Staffing requires attention — their 19% backout rate is 2.4x above the network average. Platform-wide, mobility support utilization at 54% is driving meaningful improvements in offer acceptance rates, with agencies using TRITAL Orbit™ perks seeing 31% better outcomes than those without. Recommend prioritizing QuickCare onboarding for the Concierge module.");
      setAiSummaryLoading(false);
    }, 1800);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orbit-dark">MSP Performance Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Supplier performance, acceptance rates, and backout analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />Export PDF
          </Button>
        </div>
      </div>

      {/* Network KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Avg Acceptance Rate" value="73.5%" icon={TrendingUp} iconColor="bg-emerald-50 text-emerald-600" change="+8.2% vs prior period" changeType="positive" />
        <KPICard title="Avg Backout Rate" value="11.3%" icon={TrendingDown} iconColor="bg-red-50 text-red-600" change="-4.1% improvement" changeType="positive" />
        <KPICard title="Time to Ready (days)" value="5.3" icon={Calendar} iconColor="bg-orbit-blue/10 text-orbit-blue" change="-1.4 days vs last period" changeType="positive" />
        <KPICard title="First-Day Show-Up" value="96.2%" icon={TrendingUp} iconColor="bg-emerald-50 text-emerald-600" change="+2.1%" changeType="positive" />
        <KPICard title="Mobility Utilization" value="54%" icon={BarChart3} iconColor="bg-purple-50 text-purple-600" change="+12% from Q1" changeType="positive" />
      </div>

      {/* AI Executive Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-orbit-blue" />
              <CardTitle className="text-base">AI Executive Summary</CardTitle>
            </div>
            <Button
              onClick={generateSummary}
              loading={aiSummaryLoading}
              size="sm"
              className="bg-orbit-blue hover:bg-orbit-blue-light text-white"
            >
              {aiSummary ? "Regenerate" : "Generate Summary"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {aiSummary ? (
            <div className="bg-orbit-blue/5 rounded-xl p-4 border border-orbit-blue/10">
              <p className="text-sm text-slate-700 leading-relaxed">{aiSummary}</p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <Brain className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">Click "Generate Summary" to get an AI-powered analysis of this period's supplier performance.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Supplier Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Agency</th>
                <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Acceptance Rate</th>
                <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Backout Rate</th>
                <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Time to Ready</th>
                <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Mobility Utilization</th>
                <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {supplierData.map((supplier, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-sm text-orbit-dark">{supplier.name}</div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`text-sm font-semibold ${supplier.acceptanceRate >= 75 ? "text-emerald-600" : supplier.acceptanceRate >= 65 ? "text-amber-600" : "text-red-600"}`}>
                      {supplier.acceptanceRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`text-sm font-semibold ${supplier.backoutRate <= 8 ? "text-emerald-600" : supplier.backoutRate <= 15 ? "text-amber-600" : "text-red-600"}`}>
                      {supplier.backoutRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="text-sm text-orbit-dark font-medium">{supplier.timeToReady}d</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-200 rounded-full">
                        <div
                          className="h-1.5 rounded-full bg-orbit-blue"
                          style={{ width: `${supplier.mobilityUtilization}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600">{supplier.mobilityUtilization}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {supplier.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500 mx-auto" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
