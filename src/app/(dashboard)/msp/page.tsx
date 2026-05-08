"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { RiskBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from "recharts"
import {
  CheckCircle2, AlertTriangle, Clock, CalendarCheck,
  Download, RefreshCw, ArrowUpRight,
  FileText, TrendingUp,
} from "lucide-react"

const kpis = [
  { title: "Offer Acceptance Rate", value: "73%", change: 4.2, icon: CheckCircle2, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", sparklineData: [65, 67, 68, 70, 71, 72, 73] },
  { title: "Backout Rate", value: "8.4%", change: -1.8, icon: AlertTriangle, iconColor: "text-[#E63946]", iconBg: "bg-[#E63946]/10", sparklineData: [12, 11, 10, 9.5, 9, 8.8, 8.4] },
  { title: "Time-to-Ready", value: "6.2 days", change: -12, icon: Clock, iconColor: "text-blue-600", iconBg: "bg-blue-50", sparklineData: [9, 8.5, 8, 7.5, 7, 6.5, 6.2] },
  { title: "First Day Show Rate", value: "96.1%", change: 2.3, icon: CalendarCheck, iconColor: "text-purple-600", iconBg: "bg-purple-50", sparklineData: [91, 92, 93, 94, 94.5, 95.5, 96.1] },
]

type Supplier = {
  name: string
  initials: string
  activeOffers: number
  acceptanceRate: number
  backoutRate: number
  avgTimeToReady: string
  showRate: number
  tier: string
  [key: string]: unknown
}

const suppliers: Supplier[] = [
  { name: "Acme Health Staffing", initials: "AH", activeOffers: 342, acceptanceRate: 78, backoutRate: 5.2, avgTimeToReady: "4.8 days", showRate: 98.1, tier: "Gold" },
  { name: "CareBridge Solutions", initials: "CS", activeOffers: 189, acceptanceRate: 72, backoutRate: 8.1, avgTimeToReady: "6.1 days", showRate: 95.4, tier: "Silver" },
  { name: "NovaMed Recruiting", initials: "NM", activeOffers: 456, acceptanceRate: 81, backoutRate: 3.8, avgTimeToReady: "3.9 days", showRate: 97.8, tier: "Gold" },
  { name: "PrimeCare Staffing", initials: "PC", activeOffers: 98, acceptanceRate: 65, backoutRate: 12.4, avgTimeToReady: "8.2 days", showRate: 91.2, tier: "Bronze" },
  { name: "MedElite Partners", initials: "ME", activeOffers: 234, acceptanceRate: 74, backoutRate: 7.5, avgTimeToReady: "5.5 days", showRate: 96.3, tier: "Silver" },
  { name: "HealthForce Pro", initials: "HF", activeOffers: 312, acceptanceRate: 76, backoutRate: 6.9, avgTimeToReady: "5.1 days", showRate: 95.8, tier: "Gold" },
  { name: "TravelNurse Hub", initials: "TN", activeOffers: 167, acceptanceRate: 69, backoutRate: 9.8, avgTimeToReady: "7.1 days", showRate: 93.5, tier: "Silver" },
  { name: "Apex Medical Group", initials: "AM", activeOffers: 56, acceptanceRate: 58, backoutRate: 15.2, avgTimeToReady: "9.4 days", showRate: 88.7, tier: "Bronze" },
]

const supplierColumns: Column<Supplier>[] = [
  {
    key: "name", label: "Supplier", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">
            {row.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{String(val)}</p>
          <Badge
            variant={row.tier === "Gold" ? "default" : row.tier === "Silver" ? "secondary" : "outline"}
            className={`text-[10px] h-4 ${row.tier === "Gold" ? "bg-amber-100 text-amber-800 border-amber-200" : row.tier === "Silver" ? "bg-slate-100 text-slate-700" : "bg-orange-50 text-orange-700 border-orange-200"}`}
          >
            {row.tier}
          </Badge>
        </div>
      </div>
    ),
  },
  { key: "activeOffers", label: "Active Offers", sortable: true, className: "text-center" },
  {
    key: "acceptanceRate", label: "Acceptance", sortable: true, render: (val) => (
      <div className="flex items-center gap-2">
        <Progress value={Number(val)} className="h-1.5 w-16" />
        <span className="text-sm font-medium">{Number(val)}%</span>
      </div>
    ),
  },
  {
    key: "backoutRate", label: "Backout", sortable: true, render: (val) => {
      const v = Number(val)
      return (
        <span className={`text-sm font-medium ${v > 10 ? "text-red-600" : v > 7 ? "text-amber-600" : "text-emerald-600"}`}>
          {v}%
        </span>
      )
    },
  },
  { key: "avgTimeToReady", label: "Avg TTR", sortable: true },
  {
    key: "showRate", label: "Show Rate", sortable: true, render: (val) => {
      const v = Number(val)
      return (
        <span className={`text-sm font-medium ${v >= 96 ? "text-emerald-600" : v >= 93 ? "text-amber-600" : "text-red-600"}`}>
          {v}%
        </span>
      )
    },
  },
]

const monthlyTrends = [
  { month: "Nov", acceptance: 68, backout: 11.2, showRate: 92, ttr: 8.1 },
  { month: "Dec", acceptance: 69, backout: 10.5, showRate: 93, ttr: 7.8 },
  { month: "Jan", acceptance: 70, backout: 10.1, showRate: 93.5, ttr: 7.5 },
  { month: "Feb", acceptance: 71, backout: 9.5, showRate: 94, ttr: 7.1 },
  { month: "Mar", acceptance: 72, backout: 9.0, showRate: 95, ttr: 6.8 },
  { month: "Apr", acceptance: 73, backout: 8.4, showRate: 95.5, ttr: 6.5 },
  { month: "May", acceptance: 73, backout: 8.4, showRate: 96.1, ttr: 6.2 },
]

const supplierComparison = [
  { name: "Acme", acceptance: 78, backout: 5.2, showRate: 98 },
  { name: "CareBridge", acceptance: 72, backout: 8.1, showRate: 95 },
  { name: "NovaMed", acceptance: 81, backout: 3.8, showRate: 98 },
  { name: "PrimeCare", acceptance: 65, backout: 12.4, showRate: 91 },
  { name: "MedElite", acceptance: 74, backout: 7.5, showRate: 96 },
  { name: "HealthForce", acceptance: 76, backout: 6.9, showRate: 96 },
]

const readinessOverview = [
  { stage: "Offer Accepted", count: 156, percentage: 100 },
  { stage: "Documents Complete", count: 142, percentage: 91 },
  { stage: "Compliance Cleared", count: 134, percentage: 86 },
  { stage: "Housing Confirmed", count: 118, percentage: 76 },
  { stage: "Travel Booked", count: 108, percentage: 69 },
  { stage: "Assignment Ready", count: 98, percentage: 63 },
]

const highRiskCandidates = [
  { name: "David Thompson", agency: "PrimeCare", riskScore: 90, reason: "No housing, 3 days to start", daysToStart: 3 },
  { name: "Lisa Park", agency: "Acme Health", riskScore: 78, reason: "Missing ACLS certification", daysToStart: 8 },
  { name: "Sophie Lee", agency: "TravelNurse Hub", riskScore: 72, reason: "No response to doc request (5 days)", daysToStart: 12 },
  { name: "Chris Martinez", agency: "Apex Medical", riskScore: 68, reason: "Travel arrangements pending", daysToStart: 6 },
]

export default function MspDashboard() {
  const [dateRange, setDateRange] = useState("30d")
  const [agencyFilter, setAgencyFilter] = useState("all")

  return (
    <DashboardLayout role="msp">
      <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">MSP Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Managed Service Provider analytics & oversight</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={agencyFilter} onValueChange={setAgencyFilter}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue placeholder="All Agencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agencies</SelectItem>
                <SelectItem value="acme">Acme Health</SelectItem>
                <SelectItem value="carebridge">CareBridge</SelectItem>
                <SelectItem value="novamed">NovaMed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Report downloaded")}>
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.title} {...kpi} index={i} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                    <RechartsTooltip
                      contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="acceptance" name="Acceptance %" stroke="#0B3C5D" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="showRate" name="Show Rate %" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="backout" name="Backout %" stroke="#E63946" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Supplier Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={supplierComparison} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                    <RechartsTooltip
                      contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="acceptance" name="Acceptance %" fill="#0B3C5D" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="showRate" name="Show Rate %" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="backout" name="Backout %" fill="#E63946" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supplier Performance Table */}
        <DataTable
          title="Supplier Performance"
          columns={supplierColumns}
          data={suppliers}
          searchPlaceholder="Search suppliers..."
          searchKeys={["name", "tier"]}
          pageSize={8}
          onRowClick={(row) => toast.info(`Opening ${row.name} details`)}
          actions={
            <Button variant="outline" size="sm" onClick={() => toast.info("Full report coming soon")}>
              Full Report
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Assignment Readiness Funnel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#0B3C5D]" />
                Assignment Readiness Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {readinessOverview.map((stage, i) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-muted-foreground">{stage.count} ({stage.percentage}%)</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.percentage}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/70"
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* High Risk Candidates */}
          <Card className="border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                High-Risk Candidates
                <Badge variant="destructive" className="text-[10px]">{highRiskCandidates.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {highRiskCandidates.map((candidate, i) => (
                <motion.div
                  key={candidate.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50/30 p-3 cursor-pointer hover:bg-orange-50 transition-colors"
                  onClick={() => toast.info(`Viewing risk details for ${candidate.name}`)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium">{candidate.name}</p>
                      <RiskBadge level={candidate.riskScore >= 80 ? "critical" : "high"} score={candidate.riskScore} />
                    </div>
                    <p className="text-xs text-muted-foreground">{candidate.agency}</p>
                    <p className="text-xs text-orange-700 mt-0.5">{candidate.reason}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant={candidate.daysToStart <= 5 ? "destructive" : "outline"} className="text-[10px]">
                      {candidate.daysToStart}d to start
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Report Generation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#0B3C5D]" />
              Report Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Supplier Scorecard", desc: "Monthly performance metrics by agency" },
                { label: "Backout Analysis", desc: "Root cause analysis and trends" },
                { label: "Readiness Pipeline", desc: "Assignment readiness funnel report" },
                { label: "Financial Summary", desc: "Revenue, costs, and margin analysis" },
              ].map((report) => (
                <motion.button
                  key={report.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toast.success(`Generating ${report.label}...`)}
                  className="flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors hover:bg-slate-50 hover:border-[#0B3C5D]/20"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
                    <Download className="h-4.5 w-4.5 text-[#0B3C5D]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{report.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{report.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
