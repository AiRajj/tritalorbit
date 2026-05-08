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
  FileText, Clock, CheckCircle2, AlertTriangle,
  Plus, Eye, Send, User,
  MessageSquare, Calendar,
} from "lucide-react"

const kpis = [
  { title: "My Active Offers", value: "24", change: 4.2, icon: FileText, iconColor: "text-blue-600", iconBg: "bg-blue-50", sparklineData: [18, 19, 20, 21, 22, 23, 24] },
  { title: "Pending Responses", value: "8", change: -12, icon: Clock, iconColor: "text-amber-600", iconBg: "bg-amber-50", sparklineData: [14, 12, 11, 10, 9, 9, 8] },
  { title: "Accepted This Month", value: "12", change: 20, icon: CheckCircle2, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", sparklineData: [6, 7, 8, 9, 10, 11, 12] },
  { title: "Risk Alerts", value: "3", change: -25, icon: AlertTriangle, iconColor: "text-[#E63946]", iconBg: "bg-[#E63946]/10", sparklineData: [6, 5, 5, 4, 4, 3, 3] },
]

type Offer = {
  candidate: string
  initials: string
  facility: string
  specialty: string
  status: string
  weeklyPay: string
  riskScore: number
  riskLevel: string
  sentDate: string
  [key: string]: unknown
}

const myOffers: Offer[] = [
  { candidate: "Nina Patel", initials: "NP", facility: "Sunrise Medical", specialty: "ICU RN", status: "accepted", weeklyPay: "$2,900", riskScore: 18, riskLevel: "low", sentDate: "May 2, 2026" },
  { candidate: "Tyler Brooks", initials: "TB", facility: "Metro General", specialty: "ER RN", status: "viewed", weeklyPay: "$2,750", riskScore: 42, riskLevel: "medium", sentDate: "May 5, 2026" },
  { candidate: "Rachel Green", initials: "RG", facility: "Westside Clinic", specialty: "OR Tech", status: "sent", weeklyPay: "$3,050", riskScore: 30, riskLevel: "medium", sentDate: "May 6, 2026" },
  { candidate: "Kevin Hart", initials: "KH", facility: "Bay Area Hospital", specialty: "Tele RN", status: "accepted", weeklyPay: "$2,680", riskScore: 10, riskLevel: "low", sentDate: "May 1, 2026" },
  { candidate: "Sophie Lee", initials: "SL", facility: "Mountain View Med", specialty: "PACU RN", status: "pending", weeklyPay: "$2,820", riskScore: 55, riskLevel: "high", sentDate: "May 4, 2026" },
  { candidate: "Chris Davis", initials: "CD", facility: "Cedar Medical", specialty: "CVOR", status: "declined", weeklyPay: "$3,200", riskScore: 85, riskLevel: "critical", sentDate: "Apr 28, 2026" },
]

const offerColumns: Column<Offer>[] = [
  {
    key: "candidate", label: "Candidate", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">{row.initials}</AvatarFallback>
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
    key: "riskScore", label: "Risk", sortable: true, render: (val, row) => (
      <RiskBadge level={row.riskLevel as "low" | "medium" | "high" | "critical"} score={Number(val)} />
    ),
  },
  { key: "sentDate", label: "Sent", sortable: true },
  {
    key: "actions" as string, label: "", render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${row.candidate}`) }}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toast.info(`Messaging ${row.candidate}`) }}>
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

const pipeline = [
  { stage: "Sourced", count: 15, color: "bg-slate-400" },
  { stage: "Contacted", count: 12, color: "bg-blue-500" },
  { stage: "Offer Sent", count: 8, color: "bg-purple-500" },
  { stage: "Negotiating", count: 4, color: "bg-amber-500" },
  { stage: "Accepted", count: 12, color: "bg-emerald-500" },
  { stage: "Declined", count: 3, color: "bg-red-400" },
]

const totalPipeline = pipeline.reduce((sum, s) => sum + s.count, 0)

const activities: ActivityItem[] = [
  { id: "1", type: "offer_accepted", title: "Nina Patel accepted your offer", description: "Sunrise Medical - ICU RN @ $2,900/week", timestamp: "12m ago" },
  { id: "2", type: "offer_sent", title: "You sent offer to Rachel Green", description: "Westside Clinic - OR Tech @ $3,050/week", timestamp: "1h ago" },
  { id: "3", type: "risk_alert", title: "Sophie Lee risk score increased", description: "Risk went from 40% to 55% — no document response", timestamp: "2h ago" },
  { id: "4", type: "offer_declined", title: "Chris Davis declined offer", description: "Cedar Medical - CVOR — chose higher-paying contract", timestamp: "4h ago" },
  { id: "5", type: "booking", title: "Housing confirmed for Kevin Hart", description: "Bay Area apartment secured for Jun 1 start", timestamp: "5h ago" },
  { id: "6", type: "assignment", title: "Tyler Brooks viewed offer", description: "Opened offer email 2x in past hour", timestamp: "6h ago" },
]

export default function RecruiterDashboard() {
  return (
    <DashboardLayout role="recruiter">
      <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">My Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome back, Jordan — here&apos;s your pipeline overview</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info("Calendar opening...")}>
              <Calendar className="h-4 w-4 mr-1.5" />
              Schedule
            </Button>
            <Button size="sm" onClick={() => toast.info("Offer builder opening...")}>
              <Plus className="h-4 w-4 mr-1.5" />
              New Offer
            </Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.title} {...kpi} index={i} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DataTable
              title="My Offers"
              columns={offerColumns}
              data={myOffers}
              searchPlaceholder="Search my offers..."
              searchKeys={["candidate", "facility", "specialty", "status"]}
              pageSize={6}
              onRowClick={(row) => toast.info(`Opening offer for ${row.candidate}`)}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-[#0B3C5D]" />
                  Candidate Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pipeline.map((stage) => (
                  <div key={stage.stage} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{stage.stage}</span>
                      <span className="text-muted-foreground">{stage.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stage.count / totalPipeline) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`h-full rounded-full ${stage.color}`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Send bulk follow-up", icon: Send, action: "Bulk follow-up dialog opening..." },
                  { label: "View risk alerts", icon: AlertTriangle, action: "Risk alerts page opening..." },
                  { label: "Schedule interviews", icon: Calendar, action: "Interview scheduler opening..." },
                ].map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    className="w-full justify-start h-10"
                    onClick={() => toast.info(item.action)}
                  >
                    <item.icon className="h-4 w-4 mr-2 text-[#0B3C5D]" />
                    {item.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <ActivityFeed activities={activities} title="My Activity Log" />
      </div>
    </DashboardLayout>
  )
}
