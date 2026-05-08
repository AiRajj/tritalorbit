"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  TrendingDown,
  Clock,
  CheckCircle2,
  Download,
  FileText,
  Calendar,
  BarChart3,
  PieChart,
  Building2,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Users,
} from "lucide-react";

const kpis = [
  { label: "Acceptance Rate", value: "76%", trend: "up", change: "+4% vs last quarter", icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, target: "Target: 80%" },
  { label: "Backout Rate", value: "8.2%", trend: "down", change: "-2.1% vs last quarter", icon: <TrendingDown className="h-5 w-5 text-emerald-500" />, target: "Target: <10%" },
  { label: "Time-to-Ready", value: "4.3 days", trend: "down", change: "-0.8 days vs last quarter", icon: <Clock className="h-5 w-5 text-blue-500" />, target: "Target: <5 days" },
  { label: "Show-up Rate", value: "94%", trend: "up", change: "+2% vs last quarter", icon: <Users className="h-5 w-5 text-[#0B3C5D]" />, target: "Target: 95%" },
];

const acceptanceTrend = [
  { month: "Dec", value: 68 },
  { month: "Jan", value: 71 },
  { month: "Feb", value: 69 },
  { month: "Mar", value: 74 },
  { month: "Apr", value: 73 },
  { month: "May", value: 76 },
];

const readinessBreakdown = [
  { label: "Fully Ready", value: 62, color: "bg-emerald-500" },
  { label: "Pending Credentials", value: 18, color: "bg-amber-500" },
  { label: "Housing Needed", value: 12, color: "bg-blue-500" },
  { label: "License Transfer", value: 8, color: "bg-purple-500" },
];

const supplierPerformance = [
  { name: "Apex Healthcare Staffing", acceptance: 82, backout: 5, readiness: 4.1, offers: 45, rating: "A" },
  { name: "MedPro Travel Nurses", acceptance: 78, backout: 7, readiness: 3.8, offers: 38, rating: "A" },
  { name: "NurseFlex Partners", acceptance: 71, backout: 12, readiness: 5.2, offers: 32, rating: "B" },
  { name: "TravelCare Solutions", acceptance: 69, backout: 9, readiness: 4.9, offers: 28, rating: "B" },
  { name: "HealthBridge Staffing", acceptance: 65, backout: 14, readiness: 6.1, offers: 21, rating: "C" },
];

const agencies = ["All Agencies", "Apex Healthcare Staffing", "MedPro Travel Nurses", "NurseFlex Partners", "TravelCare Solutions", "HealthBridge Staffing"];

export default function MSPDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState("All Agencies");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#1F2937]">MSP Reports Dashboard</h1>
        <p className="text-sm text-[#1F2937]/60 mt-1">Cross-agency analytics and performance metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-lg bg-[#0B3C5D]/5 p-2">{kpi.icon}</div>
                  {kpi.trend === "up" && <ArrowUpRight className="h-4 w-4 text-emerald-500" />}
                  {kpi.trend === "down" && <ArrowDownRight className="h-4 w-4 text-emerald-500" />}
                </div>
                <p className="text-2xl font-bold text-[#1F2937]">{kpi.value}</p>
                <p className="text-xs text-[#1F2937]/60">{kpi.label}</p>
                <p className="text-[10px] text-emerald-600 mt-1">{kpi.change}</p>
                <p className="text-[10px] text-[#1F2937]/40">{kpi.target}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-[#1F2937]/20 rounded-lg px-4 py-2 pr-8 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]"
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
            >
              {agencies.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 border border-[#1F2937]/20 rounded-lg px-3 py-2 text-sm">
            <Calendar className="h-4 w-4 text-[#1F2937]/40" />
            <span className="text-[#1F2937]/70">Last 6 months</span>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3 w-3 mr-1.5" /> Export PDF
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <FileText className="h-3 w-3 mr-1.5" /> Export CSV
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#0B3C5D]" />
                Offer Acceptance Trend
              </CardTitle>
              <CardDescription>Monthly acceptance rate over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-48">
                {acceptanceTrend.map((point) => (
                  <div key={point.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-[#1F2937]">{point.value}%</span>
                    <div className="w-full rounded-t-md bg-[#0B3C5D] transition-all" style={{ height: `${(point.value / 100) * 160}px` }} />
                    <span className="text-xs text-[#1F2937]/50">{point.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5 text-[#0B3C5D]" />
                Assignment Readiness Breakdown
              </CardTitle>
              <CardDescription>Current distribution of assignment readiness states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {readinessBreakdown.map((segment) => (
                  <div key={segment.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-[#1F2937]">{segment.label}</span>
                      <span className="text-sm font-semibold text-[#1F2937]">{segment.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-[#1F2937]/5 overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all", segment.color)} style={{ width: `${segment.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6 flex-wrap">
                {readinessBreakdown.map((segment) => (
                  <div key={segment.label} className="flex items-center gap-1.5">
                    <div className={cn("h-2.5 w-2.5 rounded-full", segment.color)} />
                    <span className="text-xs text-[#1F2937]/60">{segment.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#0B3C5D]" />
              Supplier Performance Comparison
            </CardTitle>
            <CardDescription>Key performance metrics by staffing agency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Agency</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Acceptance %</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Backout %</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Avg Readiness (days)</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Total Offers</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierPerformance.map((supplier) => (
                    <tr key={supplier.name} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{supplier.name}</td>
                      <td className="py-3 px-4">
                        <span className={cn("font-semibold", supplier.acceptance >= 75 ? "text-emerald-600" : supplier.acceptance >= 70 ? "text-amber-600" : "text-[#E63946]")}>
                          {supplier.acceptance}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={cn("font-semibold", supplier.backout <= 8 ? "text-emerald-600" : supplier.backout <= 12 ? "text-amber-600" : "text-[#E63946]")}>
                          {supplier.backout}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#1F2937]">{supplier.readiness}</td>
                      <td className="py-3 px-4 text-[#1F2937]">{supplier.offers}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={supplier.rating === "A" ? "success" : supplier.rating === "B" ? "warning" : "destructive"}
                          className="text-xs"
                        >
                          {supplier.rating}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
        <Card className="border-[#0B3C5D]/20 bg-gradient-to-r from-[#0B3C5D]/[0.03] to-transparent">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#0B3C5D]" />
              AI Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-[#1F2937]/80">
              <p>
                <strong className="text-[#1F2937]">Overall Performance:</strong> Cross-agency metrics show a positive trend with acceptance rates improving 4% quarter-over-quarter to 76%, approaching the 80% target. Backout rates have decreased to 8.2%, well within the &lt;10% threshold.
              </p>
              <p>
                <strong className="text-[#1F2937]">Top Performer:</strong> Apex Healthcare Staffing leads with 82% acceptance and only 5% backout rate. Their average readiness time of 4.1 days sets the benchmark.
              </p>
              <p>
                <strong className="text-[#1F2937]">Action Required:</strong> HealthBridge Staffing shows concerning trends with 14% backout rate and 6.1-day readiness time. Recommend a performance improvement plan and increased monitoring.
              </p>
              <p>
                <strong className="text-[#1F2937]">Forecast:</strong> Based on current trajectories, we project reaching the 80% acceptance target by end of Q3 2026. Expanding the concierge program could accelerate this by 2-3 weeks.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
