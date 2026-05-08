"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { ActivityFeed, type ActivityItem } from "@/components/dashboard/activity-feed"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Building2, Users, FileText, UserCheck, Store, DollarSign,
  Plus, Download, RefreshCw, Server, Database, Cpu, Shield,
  ArrowUpRight,
} from "lucide-react"

const kpis = [
  { title: "Total Agencies", value: "247", change: 12, icon: Building2, iconColor: "text-blue-600", iconBg: "bg-blue-50", sparklineData: [180, 195, 210, 218, 225, 238, 247] },
  { title: "Active Users", value: "3,842", change: 8.3, icon: Users, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", sparklineData: [3200, 3350, 3480, 3560, 3650, 3780, 3842] },
  { title: "Total Offers", value: "12,456", change: 15.2, icon: FileText, iconColor: "text-purple-600", iconBg: "bg-purple-50", sparklineData: [9800, 10200, 10800, 11200, 11600, 12100, 12456] },
  { title: "Active Candidates", value: "8,291", change: 5.7, icon: UserCheck, iconColor: "text-orange-600", iconBg: "bg-orange-50", sparklineData: [7200, 7450, 7680, 7900, 8050, 8180, 8291] },
  { title: "Active Vendors", value: "156", change: 3.1, icon: Store, iconColor: "text-[#0B3C5D]", iconBg: "bg-[#0B3C5D]/10", sparklineData: [130, 135, 140, 145, 148, 152, 156] },
  { title: "Monthly Revenue", value: "$284K", change: 18.5, icon: DollarSign, iconColor: "text-[#E63946]", iconBg: "bg-[#E63946]/10", sparklineData: [180, 195, 210, 230, 245, 268, 284] },
]

type Agency = {
  name: string
  plan: string
  users: number
  offers: number
  status: string
  revenue: string
  [key: string]: unknown
}

const agencies: Agency[] = [
  { name: "Acme Health Staffing", plan: "Enterprise", users: 45, offers: 892, status: "active", revenue: "$12,400" },
  { name: "CareBridge Solutions", plan: "Professional", users: 28, offers: 567, status: "active", revenue: "$8,200" },
  { name: "NovaMed Recruiting", plan: "Enterprise", users: 62, offers: 1245, status: "active", revenue: "$15,800" },
  { name: "PrimeCare Staffing", plan: "Starter", users: 12, offers: 234, status: "active", revenue: "$3,600" },
  { name: "MedElite Partners", plan: "Professional", users: 34, offers: 678, status: "pending", revenue: "$7,900" },
  { name: "HealthForce Pro", plan: "Enterprise", users: 51, offers: 1023, status: "active", revenue: "$14,200" },
  { name: "TravelNurse Hub", plan: "Professional", users: 22, offers: 445, status: "active", revenue: "$6,100" },
  { name: "Apex Medical Group", plan: "Starter", users: 8, offers: 156, status: "inactive", revenue: "$1,800" },
]

const agencyColumns: Column<Agency>[] = [
  { key: "name", label: "Agency Name", sortable: true, render: (val) => <span className="font-medium">{String(val)}</span> },
  {
    key: "plan", label: "Plan", sortable: true, render: (val) => (
      <span className={`text-xs font-medium px-2 py-1 rounded-md ${val === "Enterprise" ? "bg-[#0B3C5D]/10 text-[#0B3C5D]" : val === "Professional" ? "bg-purple-50 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
        {String(val)}
      </span>
    ),
  },
  { key: "users", label: "Users", sortable: true, className: "text-center" },
  { key: "offers", label: "Offers", sortable: true, className: "text-center", render: (val) => <span>{Number(val).toLocaleString()}</span> },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  { key: "revenue", label: "MRR", sortable: true, render: (val) => <span className="font-medium text-emerald-700">{String(val)}</span> },
]

const activities: ActivityItem[] = [
  { id: "1", type: "system", title: "NovaMed Recruiting upgraded to Enterprise", description: "Plan upgrade from Professional tier", timestamp: "5m ago" },
  { id: "2", type: "offer_accepted", title: "New agency registration approved", description: "CareBridge Solutions completed onboarding", timestamp: "22m ago" },
  { id: "3", type: "risk_alert", title: "High AI token usage detected", description: "Acme Health Staffing used 45K tokens today", timestamp: "1h ago" },
  { id: "4", type: "system", title: "System maintenance completed", description: "Database optimization improved query perf by 23%", timestamp: "2h ago" },
  { id: "5", type: "offer_sent", title: "12 new agencies this week", description: "Registration rate up 18% from last week", timestamp: "3h ago" },
  { id: "6", type: "assignment", title: "Compliance audit completed", description: "All agencies passed HIPAA compliance checks", timestamp: "5h ago" },
]

const systemHealth = [
  { name: "API Response Time", value: 98, label: "45ms avg", status: "healthy" },
  { name: "Database Performance", value: 95, label: "12ms avg", status: "healthy" },
  { name: "AI Model Uptime", value: 99.9, label: "99.9%", status: "healthy" },
  { name: "Storage Usage", value: 67, label: "67% used", status: "warning" },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Platform overview and management</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Report downloaded")}>
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </Button>
            <Button size="sm" onClick={() => toast.info("Agency creation form coming soon")}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add Agency
            </Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.title} {...kpi} index={i} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DataTable
              title="Agency Management"
              columns={agencyColumns}
              data={agencies}
              searchPlaceholder="Search agencies..."
              searchKeys={["name", "plan"]}
              pageSize={6}
              onRowClick={(row) => toast.info(`Opening ${row.name}`)}
              actions={
                <Button variant="outline" size="sm" onClick={() => toast.info("All agencies page coming soon")}>
                  View All
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              }
            />
          </div>
          <ActivityFeed activities={activities} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Shield className="h-4.5 w-4.5 text-[#0B3C5D]" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemHealth.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <Progress
                    value={item.value}
                    className={`h-2 ${item.status === "warning" ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500"}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Add Agency", icon: Building2, action: "Agency form opening..." },
                  { label: "Manage Users", icon: Users, action: "User management opening..." },
                  { label: "View Audit Logs", icon: Shield, action: "Audit logs opening..." },
                  { label: "AI Usage Report", icon: Cpu, action: "AI usage report opening..." },
                  { label: "Server Status", icon: Server, action: "Server status page opening..." },
                  { label: "Database Backup", icon: Database, action: "Initiating backup..." },
                ].map((item) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toast.info(item.action)}
                    className="flex items-center gap-3 rounded-xl border p-3.5 text-left transition-colors hover:bg-slate-50 hover:border-[#0B3C5D]/20"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
                      <item.icon className="h-4.5 w-4.5 text-[#0B3C5D]" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
