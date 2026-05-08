"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { RiskBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  Download, RefreshCw, Calendar, User, Building2,
  CheckCircle2, AlertTriangle, Clock,
  Sparkles, Shield,
} from "lucide-react"

type CandidateRow = {
  name: string
  role: string
  facility: string
  startDate: string
  housingStatus: string
  travelStatus: string
  documentsStatus: string
  firstWeekReadiness: number
  riskScore: number
  riskLevel: string
  actionNeeded: string
  [key: string]: unknown
}

const mockCandidates: CandidateRow[] = [
  { name: "Sarah Johnson", role: "ICU RN", facility: "Memorial Medical Center", startDate: "Jun 15, 2026", housingStatus: "confirmed", travelStatus: "completed", documentsStatus: "completed", firstWeekReadiness: 95, riskScore: 12, riskLevel: "low", actionNeeded: "Schedule orientation call" },
  { name: "Kevin Hart", role: "ER RN", facility: "St. Luke's Hospital", startDate: "Jun 15, 2026", housingStatus: "in_progress", travelStatus: "pending", documentsStatus: "completed", firstWeekReadiness: 65, riskScore: 45, riskLevel: "medium", actionNeeded: "Confirm housing, book travel" },
  { name: "Nina Patel", role: "L&D RN", facility: "Cedar Sinai", startDate: "Jul 1, 2026", housingStatus: "pending", travelStatus: "pending", documentsStatus: "in_progress", firstWeekReadiness: 35, riskScore: 68, riskLevel: "high", actionNeeded: "Upload documents, arrange housing" },
  { name: "Emily Rodriguez", role: "PACU RN", facility: "Mass General", startDate: "Jun 20, 2026", housingStatus: "completed", travelStatus: "completed", documentsStatus: "in_progress", firstWeekReadiness: 78, riskScore: 28, riskLevel: "medium", actionNeeded: "Complete background check" },
  { name: "James Wilson", role: "Tele RN", facility: "Mayo Clinic", startDate: "Jul 8, 2026", housingStatus: "pending", travelStatus: "pending", documentsStatus: "pending", firstWeekReadiness: 15, riskScore: 82, riskLevel: "critical", actionNeeded: "Urgent: No response, escalate" },
  { name: "Maria Santos", role: "Med/Surg RN", facility: "Cleveland Clinic", startDate: "Jun 25, 2026", housingStatus: "confirmed", travelStatus: "in_progress", documentsStatus: "completed", firstWeekReadiness: 82, riskScore: 22, riskLevel: "low", actionNeeded: "Finalize travel arrangements" },
  { name: "Tom Chen", role: "ICU RN", facility: "UCSF Medical", startDate: "Jul 15, 2026", housingStatus: "in_progress", travelStatus: "pending", documentsStatus: "completed", firstWeekReadiness: 55, riskScore: 38, riskLevel: "medium", actionNeeded: "Follow up on housing options" },
  { name: "Ashley Brown", role: "OR Tech", facility: "Johns Hopkins", startDate: "Jun 28, 2026", housingStatus: "completed", travelStatus: "completed", documentsStatus: "completed", firstWeekReadiness: 100, riskScore: 5, riskLevel: "low", actionNeeded: "Ready — confirm start" },
  { name: "David Kim", role: "RT", facility: "Providence Portland", startDate: "Jul 5, 2026", housingStatus: "pending", travelStatus: "pending", documentsStatus: "pending", firstWeekReadiness: 10, riskScore: 90, riskLevel: "critical", actionNeeded: "Urgent: Missing everything, at risk of falloff" },
  { name: "Lisa Park", role: "NICU RN", facility: "Stanford Medical", startDate: "Jul 10, 2026", housingStatus: "confirmed", travelStatus: "completed", documentsStatus: "in_progress", firstWeekReadiness: 72, riskScore: 30, riskLevel: "medium", actionNeeded: "2 documents still pending" },
]

const statusIcon = (status: string) => {
  if (status === "completed" || status === "confirmed") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
  if (status === "in_progress") return <Clock className="h-4 w-4 text-amber-500" />
  return <AlertTriangle className="h-4 w-4 text-red-500" />
}

const columns: Column<CandidateRow>[] = [
  {
    key: "name", label: "Candidate", sortable: true, render: (val, row) => (
      <div>
        <p className="font-medium text-sm">{String(val)}</p>
        <p className="text-xs text-muted-foreground">{row.role}</p>
      </div>
    ),
  },
  {
    key: "facility", label: "Facility", sortable: true, render: (val) => (
      <span className="text-sm flex items-center gap-1"><Building2 className="h-3 w-3 text-muted-foreground" />{String(val)}</span>
    ),
  },
  {
    key: "startDate", label: "Start Date", sortable: true, render: (val) => (
      <span className="text-sm flex items-center gap-1"><Calendar className="h-3 w-3 text-muted-foreground" />{String(val)}</span>
    ),
  },
  {
    key: "housingStatus", label: "Housing", render: (val) => (
      <div className="flex items-center gap-1.5">{statusIcon(String(val))}<span className="text-xs capitalize">{String(val).replace("_", " ")}</span></div>
    ),
  },
  {
    key: "travelStatus", label: "Travel", render: (val) => (
      <div className="flex items-center gap-1.5">{statusIcon(String(val))}<span className="text-xs capitalize">{String(val).replace("_", " ")}</span></div>
    ),
  },
  {
    key: "documentsStatus", label: "Documents", render: (val) => (
      <div className="flex items-center gap-1.5">{statusIcon(String(val))}<span className="text-xs capitalize">{String(val).replace("_", " ")}</span></div>
    ),
  },
  {
    key: "firstWeekReadiness", label: "Readiness", sortable: true, render: (val) => {
      const v = Number(val)
      return (
        <div className="flex items-center gap-2 min-w-[100px]">
          <Progress value={v} className={`h-2 flex-1 ${v >= 80 ? "[&>div]:bg-emerald-500" : v >= 50 ? "[&>div]:bg-amber-500" : "[&>div]:bg-red-500"}`} />
          <span className="text-xs font-medium w-8 text-right">{v}%</span>
        </div>
      )
    },
  },
  {
    key: "riskScore", label: "Risk", sortable: true, render: (_, row) => (
      <RiskBadge level={row.riskLevel as "low" | "medium" | "high" | "critical"} score={Number(row.riskScore)} />
    ),
  },
  {
    key: "actionNeeded", label: "Action Needed", render: (val) => (
      <span className="text-xs text-muted-foreground max-w-[200px] truncate block">{String(val)}</span>
    ),
  },
]

const aiRecommendations = [
  { priority: "critical", candidate: "David Kim", action: "Escalate immediately — no housing, travel, or documents with 58 days to start. Schedule emergency call.", icon: AlertTriangle },
  { priority: "critical", candidate: "James Wilson", action: "No response to 3 outreach attempts. Try SMS and backup contact. Consider replacement candidate.", icon: AlertTriangle },
  { priority: "high", candidate: "Nina Patel", action: "First-time traveler needs extra guidance. Schedule 1:1 onboarding walkthrough and connect with housing coordinator.", icon: Shield },
  { priority: "medium", candidate: "Kevin Hart", action: "Housing in progress but travel not yet booked. Confirm housing first, then book flights.", icon: Clock },
  { priority: "low", candidate: "Ashley Brown", action: "100% ready. Send confirmation email and first-day guide. Consider for mentor program.", icon: CheckCircle2 },
]

export default function AssignmentLaunchPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredData = useMemo(() => {
    let data = mockCandidates
    if (statusFilter !== "all") {
      if (statusFilter === "ready") data = data.filter((c) => c.firstWeekReadiness >= 80)
      else if (statusFilter === "at-risk") data = data.filter((c) => c.riskLevel === "high" || c.riskLevel === "critical")
      else if (statusFilter === "pending") data = data.filter((c) => c.firstWeekReadiness < 50)
    }
    if (dateFilter !== "all") {
      if (dateFilter === "june") data = data.filter((c) => c.startDate.includes("Jun"))
      else if (dateFilter === "july") data = data.filter((c) => c.startDate.includes("Jul"))
    }
    return data
  }, [statusFilter, dateFilter])

  const exportCSV = () => {
    const headers = ["Name", "Role", "Facility", "Start Date", "Housing", "Travel", "Documents", "Readiness %", "Risk Score", "Action Needed"]
    const rows = mockCandidates.map((c) => [c.name, c.role, c.facility, c.startDate, c.housingStatus, c.travelStatus, c.documentsStatus, c.firstWeekReadiness, c.riskScore, c.actionNeeded])
    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "assignment-launch-report.csv"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("CSV exported successfully!")
  }

  return (
    <DashboardLayout role="agency">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Assignment Launch Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Track candidate readiness and launch assignments on time</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="june">June 2026</SelectItem>
                <SelectItem value="july">July 2026</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="h-4 w-4 mr-1.5" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Candidates", value: mockCandidates.length, color: "text-[#0B3C5D] bg-[#0B3C5D]/5", icon: User },
            { label: "Ready to Launch", value: mockCandidates.filter((c) => c.firstWeekReadiness >= 80).length, color: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 },
            { label: "At Risk", value: mockCandidates.filter((c) => c.riskLevel === "high" || c.riskLevel === "critical").length, color: "text-red-600 bg-red-50", icon: AlertTriangle },
            { label: "Avg Readiness", value: `${Math.round(mockCandidates.reduce((s, c) => s + c.firstWeekReadiness, 0) / mockCandidates.length)}%`, color: "text-amber-600 bg-amber-50", icon: Clock },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpi.color}`}>
                      <kpi.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1F2937]">{kpi.value}</p>
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Data Table */}
        <DataTable
          title="Candidate Readiness"
          columns={columns}
          data={filteredData}
          searchPlaceholder="Search by candidate or facility..."
          searchKeys={["name", "facility", "role"]}
          pageSize={10}
          onRowClick={(row) => toast.info(`Opening ${row.name}'s readiness details`)}
        />

        {/* AI Recommendations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0B3C5D]" />
              AI Action Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiRecommendations.map((rec, i) => (
              <motion.div
                key={rec.candidate}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-start gap-3 rounded-lg border p-3.5 ${
                  rec.priority === "critical"
                    ? "border-red-200 bg-red-50/30"
                    : rec.priority === "high"
                      ? "border-orange-200 bg-orange-50/30"
                      : rec.priority === "medium"
                        ? "border-amber-200 bg-amber-50/30"
                        : "border-emerald-200 bg-emerald-50/30"
                }`}
              >
                <rec.icon className={`h-4 w-4 mt-0.5 shrink-0 ${
                  rec.priority === "critical" ? "text-red-500" : rec.priority === "high" ? "text-orange-500" : rec.priority === "medium" ? "text-amber-500" : "text-emerald-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{rec.candidate}</span>
                    <Badge variant={rec.priority === "critical" ? "destructive" : "outline"} className="text-[10px] capitalize">{rec.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{rec.action}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 h-7 text-[11px]" onClick={() => toast.success(`Action started for ${rec.candidate}`)}>
                  Take Action
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
