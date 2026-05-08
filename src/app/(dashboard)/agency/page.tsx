"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { ActivityFeed, type ActivityItem } from "@/components/dashboard/activity-feed"
import { StatusBadge, RiskBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
  FileText, CheckCircle2, Clock, AlertTriangle, Home, Rocket,
  Plus, Filter, Download, Brain, Sparkles, ArrowUpRight,
  Eye, Phone,
} from "lucide-react"

const kpis = [
  { title: "Offers Sent", value: "342", change: 12.5, icon: FileText, iconColor: "text-blue-600", iconBg: "bg-blue-50", sparklineData: [260, 280, 295, 310, 325, 335, 342] },
  { title: "Accepted Offers", value: "189", change: 8.2, icon: CheckCircle2, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", sparklineData: [140, 150, 158, 165, 172, 182, 189] },
  { title: "Pending Offers", value: "67", change: -3.1, icon: Clock, iconColor: "text-amber-600", iconBg: "bg-amber-50", sparklineData: [85, 80, 78, 75, 72, 69, 67] },
  { title: "Backout Risk", value: "12%", change: -2.4, icon: AlertTriangle, iconColor: "text-[#E63946]", iconBg: "bg-[#E63946]/10", sparklineData: [18, 16, 15, 14, 14, 13, 12] },
  { title: "Booking Requests", value: "28", change: 15, icon: Home, iconColor: "text-purple-600", iconBg: "bg-purple-50", sparklineData: [18, 20, 22, 24, 25, 27, 28] },
  { title: "Assignment Ready", value: "78%", change: 5.3, icon: Rocket, iconColor: "text-[#0B3C5D]", iconBg: "bg-[#0B3C5D]/10", sparklineData: [62, 65, 68, 70, 73, 76, 78] },
]

type Offer = {
  candidate: string
  initials: string
  facility: string
  status: string
  weeklyPay: string
  riskScore: number
  riskLevel: string
  startDate: string
  specialty: string
  [key: string]: unknown
}

const offers: Offer[] = [
  { candidate: "Sarah Johnson", initials: "SJ", facility: "Memorial Hospital", status: "accepted", weeklyPay: "$2,850", riskScore: 78, riskLevel: "high", startDate: "May 15, 2026", specialty: "ICU RN" },
  { candidate: "Michael Chen", initials: "MC", facility: "St. Mary's Medical", status: "sent", weeklyPay: "$2,640", riskScore: 25, riskLevel: "low", startDate: "May 22, 2026", specialty: "ER RN" },
  { candidate: "Emily Rodriguez", initials: "ER", facility: "City General", status: "viewed", weeklyPay: "$3,100", riskScore: 45, riskLevel: "medium", startDate: "Jun 1, 2026", specialty: "OR Tech" },
  { candidate: "James Wilson", initials: "JW", facility: "Regional Medical Center", status: "accepted", weeklyPay: "$2,920", riskScore: 15, riskLevel: "low", startDate: "May 18, 2026", specialty: "Med-Surg RN" },
  { candidate: "Lisa Park", initials: "LP", facility: "Children's Hospital", status: "pending", weeklyPay: "$3,250", riskScore: 62, riskLevel: "high", startDate: "Jun 8, 2026", specialty: "PICU RN" },
  { candidate: "David Thompson", initials: "DT", facility: "Valley Health", status: "declined", weeklyPay: "$2,780", riskScore: 90, riskLevel: "critical", startDate: "May 12, 2026", specialty: "CVOR" },
  { candidate: "Amanda Foster", initials: "AF", facility: "Lakeside Medical", status: "accepted", weeklyPay: "$2,950", riskScore: 20, riskLevel: "low", startDate: "May 20, 2026", specialty: "L&D RN" },
  { candidate: "Robert Kim", initials: "RK", facility: "University Hospital", status: "sent", weeklyPay: "$3,400", riskScore: 35, riskLevel: "medium", startDate: "Jun 15, 2026", specialty: "CRNA" },
]

const offerColumns: Column<Offer>[] = [
  {
    key: "candidate", label: "Candidate", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">
            {row.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{String(val)}</p>
          <p className="text-xs text-muted-foreground">{row.specialty}</p>
        </div>
      </div>
    ),
  },
  { key: "facility", label: "Facility", sortable: true },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  { key: "weeklyPay", label: "Weekly Pay", sortable: true, render: (val) => <span className="font-semibold">{String(val)}</span> },
  {
    key: "riskScore", label: "Risk Score", sortable: true, render: (val, row) => (
      <RiskBadge level={row.riskLevel as "low" | "medium" | "high" | "critical"} score={Number(val)} />
    ),
  },
  { key: "startDate", label: "Start Date", sortable: true },
  {
    key: "actions" as string, label: "", render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${row.candidate}'s offer`) }}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toast.info(`Contacting ${row.candidate}`) }}>
          <Phone className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

const activities: ActivityItem[] = [
  { id: "1", type: "offer_accepted", title: "Sarah Johnson accepted offer", description: "Memorial Hospital - ICU RN @ $2,850/week", timestamp: "5m ago" },
  { id: "2", type: "risk_alert", title: "Backout risk increased for Lisa Park", description: "Risk score rose from 45% to 62% - housing not secured", timestamp: "18m ago" },
  { id: "3", type: "offer_sent", title: "Offer sent to Robert Kim", description: "University Hospital - CRNA @ $3,400/week", timestamp: "42m ago" },
  { id: "4", type: "booking", title: "Housing booked for James Wilson", description: "Furnished 1BR near Regional Medical Center", timestamp: "1h ago" },
  { id: "5", type: "offer_declined", title: "David Thompson declined offer", description: "Valley Health - CVOR - Candidate chose competitor", timestamp: "2h ago" },
  { id: "6", type: "assignment", title: "Amanda Foster assignment ready", description: "All credentials verified, housing confirmed", timestamp: "3h ago" },
]

const highRiskCandidates = [
  { name: "David Thompson", score: 90, reason: "Declined — exploring competitor offers", specialty: "CVOR" },
  { name: "Sarah Johnson", score: 78, reason: "Housing not yet confirmed", specialty: "ICU RN" },
  { name: "Lisa Park", score: 62, reason: "No response to document request", specialty: "PICU RN" },
]

const aiRecommendations = [
  { title: "Contact Sarah Johnson", description: "High risk of backout. Recommend securing housing within 48 hours to reduce risk by ~25%.", priority: "high" },
  { title: "Re-engage David Thompson", description: "Candidate declined but may reconsider with 8% pay increase based on market analysis.", priority: "medium" },
  { title: "Fast-track Lisa Park", description: "Document reminders overdue. Auto-send follow-up to prevent assignment delay.", priority: "medium" },
]

const negotiationCandidates = [
  { name: "Emily Rodriguez", facility: "City General", status: "Counter-offered", lastAction: "Requested $200 more/week" },
  { name: "Robert Kim", facility: "University Hospital", status: "Reviewing", lastAction: "Opened offer 3 times today" },
  { name: "Lisa Park", facility: "Children's Hospital", status: "Negotiating", lastAction: "Asked about housing benefits" },
]

export default function AgencyDashboard() {
  return (
    <DashboardLayout role="agency">
      <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Agency Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Acme Health Staffing — Offer management & pipeline</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info("Filters coming soon")}>
              <Filter className="h-4 w-4 mr-1.5" />
              Filters
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Report exported")}>
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </Button>
            <Button size="sm" onClick={() => toast.info("Offer builder opening...")}>
              <Plus className="h-4 w-4 mr-1.5" />
              Create Offer
            </Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.title} {...kpi} index={i} />
          ))}
        </div>

        <DataTable
          title="Active Offers"
          columns={offerColumns}
          data={offers}
          searchPlaceholder="Search candidates, facilities..."
          searchKeys={["candidate", "facility", "specialty", "status"]}
          pageSize={8}
          onRowClick={(row) => toast.info(`Opening offer details for ${row.candidate}`)}
          actions={
            <Button variant="outline" size="sm" onClick={() => toast.info("All offers page coming soon")}>
              View All
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                Candidates in Negotiation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {negotiationCandidates.map((candidate) => (
                <motion.div
                  key={candidate.name}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toast.info(`Opening ${candidate.name}'s negotiation`)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{candidate.facility}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={candidate.status.toLowerCase().replace(/-/g, "_")} />
                    <p className="text-[11px] text-muted-foreground mt-1 truncate max-w-[140px]">{candidate.lastAction}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                High-Risk Candidates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {highRiskCandidates.map((candidate) => (
                <motion.div
                  key={candidate.name}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-3 rounded-lg border border-orange-200 bg-white p-3 cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => toast.info(`Viewing risk details for ${candidate.name}`)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{candidate.name}</p>
                      <RiskBadge level={candidate.score >= 80 ? "critical" : candidate.score >= 60 ? "high" : "medium"} score={candidate.score} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{candidate.specialty}</p>
                    <p className="text-xs text-orange-700 mt-1">{candidate.reason}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#0B3C5D]/20 bg-[#0B3C5D]/[0.02]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#0B3C5D]" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiRecommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 2 }}
                  className="rounded-lg border p-3 cursor-pointer hover:bg-white hover:shadow-sm transition-all"
                  onClick={() => toast.info(`Action: ${rec.title}`)}
                >
                  <div className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{rec.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        <ActivityFeed activities={activities} />
      </div>
    </DashboardLayout>
  )
}
