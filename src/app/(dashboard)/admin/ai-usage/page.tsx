"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Bot, Sparkles, DollarSign, Clock, Download, RefreshCw, Building2 } from "lucide-react"

const kpis = [
  { title: "Total AI Calls", value: "45,892", change: 22.4, icon: Bot, iconColor: "text-purple-600", iconBg: "bg-purple-50", sparklineData: [28000, 32000, 35000, 38000, 41000, 43000, 45892] },
  { title: "Tokens Used", value: "12.4M", change: 18.7, icon: Sparkles, iconColor: "text-[#0B3C5D]", iconBg: "bg-[#0B3C5D]/10", sparklineData: [7.2, 8.1, 9.0, 9.8, 10.5, 11.4, 12.4] },
  { title: "AI Cost", value: "$1,248", change: 15.2, icon: DollarSign, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", sparklineData: [780, 850, 920, 1000, 1080, 1160, 1248] },
  { title: "Avg Response", value: "1.8s", change: -8.5, icon: Clock, iconColor: "text-amber-600", iconBg: "bg-amber-50", sparklineData: [2.4, 2.2, 2.1, 2.0, 1.9, 1.8, 1.8] },
]

const agentUsage = [
  { agent: "Offer Boost", calls: 12456, tokens: "3.2M", cost: "$384", avgResponse: "2.1s", successRate: 98.5 },
  { agent: "Retention Radar", calls: 8923, tokens: "2.8M", cost: "$336", avgResponse: "1.6s", successRate: 99.1 },
  { agent: "Readiness Engine", calls: 7845, tokens: "2.1M", cost: "$252", avgResponse: "1.4s", successRate: 99.3 },
  { agent: "Concierge Agent", calls: 11234, tokens: "3.0M", cost: "$180", avgResponse: "1.9s", successRate: 97.8 },
  { agent: "MSP Reporter", calls: 5434, tokens: "1.3M", cost: "$96", avgResponse: "2.5s", successRate: 99.0 },
]

type AgencyUsage = {
  agency: string
  calls: number
  tokens: string
  cost: string
  topAgent: string
  [key: string]: unknown
}

const agencyUsage: AgencyUsage[] = [
  { agency: "Acme Health Staffing", calls: 12340, tokens: "3.1M", cost: "$372", topAgent: "Offer Boost" },
  { agency: "NovaMed Recruiting", calls: 9870, tokens: "2.5M", cost: "$300", topAgent: "Retention Radar" },
  { agency: "HealthForce Pro", calls: 8200, tokens: "2.1M", cost: "$252", topAgent: "Offer Boost" },
  { agency: "CareBridge Solutions", calls: 6540, tokens: "1.6M", cost: "$192", topAgent: "Concierge Agent" },
  { agency: "TravelNurse Hub", calls: 4320, tokens: "1.1M", cost: "$132", topAgent: "Readiness Engine" },
]

const agencyColumns: Column<AgencyUsage>[] = [
  { key: "agency", label: "Agency", sortable: true, render: (val) => <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[#0B3C5D]" /><span className="font-medium text-sm">{String(val)}</span></div> },
  { key: "calls", label: "API Calls", sortable: true, render: (val) => <span className="font-medium">{Number(val).toLocaleString()}</span> },
  { key: "tokens", label: "Tokens", sortable: true },
  { key: "cost", label: "Cost", sortable: true, render: (val) => <span className="font-medium text-emerald-700">{String(val)}</span> },
  { key: "topAgent", label: "Top Agent", render: (val) => <Badge variant="secondary" className="text-[10px]">{String(val)}</Badge> },
]

export default function AdminAiUsagePage() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">AI Usage Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">Monitor AI agent usage, costs, and performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}><RefreshCw className="h-4 w-4 mr-1.5" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Report exported")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => <KpiCard key={kpi.title} {...kpi} index={i} />)}
        </div>

        {/* Agent Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Bot className="h-4 w-4 text-[#0B3C5D]" />
              AI Agent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentUsage.map((agent, i) => (
                <motion.div key={agent.agent} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B3C5D]/5 shrink-0">
                    <Sparkles className="h-5 w-5 text-[#0B3C5D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{agent.agent}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{agent.calls.toLocaleString()} calls</span>
                      <span>{agent.tokens} tokens</span>
                      <span>{agent.cost} cost</span>
                      <span>{agent.avgResponse} avg</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-emerald-600">{agent.successRate}%</p>
                    <p className="text-[10px] text-muted-foreground">Success Rate</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <DataTable title="Usage by Agency" columns={agencyColumns} data={agencyUsage} searchPlaceholder="Search agencies..." searchKeys={["agency"]} pageSize={10} />
      </div>
    </DashboardLayout>
  )
}
