"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { DollarSign, Users, TrendingUp, CreditCard, Download, RefreshCw, Eye, Edit, Building2 } from "lucide-react"

type Subscription = {
  id: string
  agency: string
  plan: string
  status: string
  mrr: string
  users: number
  billingCycle: string
  nextBilling: string
  startDate: string
  [key: string]: unknown
}

const mockSubscriptions: Subscription[] = [
  { id: "S-001", agency: "Acme Health Staffing", plan: "Enterprise", status: "active", mrr: "$12,400", users: 45, billingCycle: "Annual", nextBilling: "Jan 15, 2027", startDate: "Jan 2025" },
  { id: "S-002", agency: "CareBridge Solutions", plan: "Professional", status: "active", mrr: "$8,200", users: 28, billingCycle: "Monthly", nextBilling: "Jun 1, 2026", startDate: "Mar 2025" },
  { id: "S-003", agency: "NovaMed Recruiting", plan: "Enterprise", status: "active", mrr: "$15,800", users: 62, billingCycle: "Annual", nextBilling: "Nov 1, 2026", startDate: "Nov 2024" },
  { id: "S-004", agency: "PrimeCare Staffing", plan: "Starter", status: "active", mrr: "$3,600", users: 12, billingCycle: "Monthly", nextBilling: "Jun 1, 2026", startDate: "Jun 2025" },
  { id: "S-005", agency: "MedElite Partners", plan: "Professional", status: "pending", mrr: "$7,900", users: 34, billingCycle: "Monthly", nextBilling: "—", startDate: "Apr 2026" },
  { id: "S-006", agency: "HealthForce Pro", plan: "Enterprise", status: "active", mrr: "$14,200", users: 51, billingCycle: "Annual", nextBilling: "Feb 1, 2027", startDate: "Feb 2025" },
  { id: "S-007", agency: "TravelNurse Hub", plan: "Professional", status: "active", mrr: "$6,100", users: 22, billingCycle: "Monthly", nextBilling: "Jun 1, 2026", startDate: "Aug 2025" },
  { id: "S-008", agency: "Apex Medical Group", plan: "Starter", status: "cancelled", mrr: "$0", users: 8, billingCycle: "Monthly", nextBilling: "—", startDate: "Sep 2025" },
]

const kpis = [
  { title: "Total MRR", value: "$68,200", change: 12.4, icon: DollarSign, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", sparklineData: [52000, 55000, 58000, 61000, 64000, 66000, 68200] },
  { title: "Active Subs", value: "6", change: 0, icon: CreditCard, iconColor: "text-blue-600", iconBg: "bg-blue-50", sparklineData: [4, 4, 5, 5, 6, 6, 6] },
  { title: "Total Users", value: "262", change: 8.3, icon: Users, iconColor: "text-purple-600", iconBg: "bg-purple-50", sparklineData: [200, 210, 220, 235, 245, 255, 262] },
  { title: "Avg Revenue/User", value: "$260", change: 3.8, icon: TrendingUp, iconColor: "text-[#0B3C5D]", iconBg: "bg-[#0B3C5D]/10", sparklineData: [230, 235, 240, 245, 250, 255, 260] },
]

const columns: Column<Subscription>[] = [
  {
    key: "agency", label: "Agency", sortable: true, render: (val) => (
      <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[#0B3C5D]" /><span className="font-medium text-sm">{String(val)}</span></div>
    ),
  },
  {
    key: "plan", label: "Plan", sortable: true, render: (val) => (
      <Badge variant="outline" className={`text-[10px] ${val === "Enterprise" ? "bg-[#0B3C5D]/10 text-[#0B3C5D]" : val === "Professional" ? "bg-purple-50 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
        {String(val)}
      </Badge>
    ),
  },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  { key: "mrr", label: "MRR", sortable: true, render: (val) => <span className="font-semibold text-emerald-700">{String(val)}</span> },
  { key: "users", label: "Users", sortable: true, className: "text-center" },
  { key: "billingCycle", label: "Billing", render: (val) => <Badge variant="secondary" className="text-[10px]">{String(val)}</Badge> },
  { key: "nextBilling", label: "Next Billing", render: (val) => <span className="text-xs text-muted-foreground">{String(val)}</span> },
  {
    key: "id", label: "", render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toast.info(`Editing ${row.agency}'s subscription`) }}><Edit className="h-3.5 w-3.5" /></Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${row.agency}`) }}><Eye className="h-3.5 w-3.5" /></Button>
      </div>
    ),
  },
]

export default function AdminSubscriptionsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Manage Subscriptions</h1>
            <p className="text-sm text-muted-foreground mt-1">Revenue and subscription management</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}><RefreshCw className="h-4 w-4 mr-1.5" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Export started")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => <KpiCard key={kpi.title} {...kpi} index={i} />)}
        </div>
        <DataTable title="All Subscriptions" columns={columns} data={mockSubscriptions} searchPlaceholder="Search subscriptions..." searchKeys={["agency", "plan"]} pageSize={10} onRowClick={(row) => toast.info(`Opening ${row.agency}'s subscription`)} />
      </div>
    </DashboardLayout>
  )
}
