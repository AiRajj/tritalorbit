"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import {
  Inbox, Loader2, Clock, CheckCircle2,
  ArrowRight, Brain, Sparkles,
  Store, Plus,
} from "lucide-react"

const kpis = [
  { title: "New Requests", value: "14", change: 8, icon: Inbox, iconColor: "text-blue-600", iconBg: "bg-blue-50", sparklineData: [8, 9, 10, 11, 12, 13, 14] },
  { title: "In Progress", value: "9", change: -5, icon: Loader2, iconColor: "text-amber-600", iconBg: "bg-amber-50", sparklineData: [12, 11, 10, 10, 9, 9, 9] },
  { title: "Waiting", value: "5", change: 0, icon: Clock, iconColor: "text-purple-600", iconBg: "bg-purple-50", sparklineData: [6, 5, 5, 6, 5, 5, 5] },
  { title: "Completed Today", value: "7", change: 40, icon: CheckCircle2, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", sparklineData: [3, 4, 4, 5, 5, 6, 7] },
]

interface Task {
  id: string
  candidate: string
  initials: string
  type: string
  title: string
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  dueDate: string
  status: "new" | "in_progress" | "waiting" | "completed"
}

const tasks: Task[] = [
  { id: "1", candidate: "Sarah Johnson", initials: "SJ", type: "Housing", title: "Find furnished 1BR near Memorial Hospital", priority: "urgent", assignee: "Riley P.", dueDate: "Today", status: "new" },
  { id: "2", candidate: "Nina Patel", initials: "NP", type: "Travel", title: "Book flights SFO → PDX for May 12", priority: "high", assignee: "Riley P.", dueDate: "Today", status: "new" },
  { id: "3", candidate: "Tyler Brooks", initials: "TB", type: "Documents", title: "Collect OR state license verification", priority: "medium", assignee: "Riley P.", dueDate: "May 10", status: "new" },
  { id: "4", candidate: "Kevin Hart", initials: "KH", type: "Housing", title: "Schedule apartment tour at Bay View", priority: "high", assignee: "Riley P.", dueDate: "Today", status: "in_progress" },
  { id: "5", candidate: "Amanda Foster", initials: "AF", type: "Utilities", title: "Set up electric & internet accounts", priority: "medium", assignee: "Riley P.", dueDate: "May 11", status: "in_progress" },
  { id: "6", candidate: "Emily Rodriguez", initials: "ER", type: "Orientation", title: "Confirm first-day orientation details", priority: "medium", assignee: "Riley P.", dueDate: "May 12", status: "in_progress" },
  { id: "7", candidate: "Lisa Park", initials: "LP", type: "Housing", title: "Waiting on vendor availability for 2BR", priority: "high", assignee: "Riley P.", dueDate: "May 9", status: "waiting" },
  { id: "8", candidate: "Robert Kim", initials: "RK", type: "Insurance", title: "Waiting on renter's insurance confirmation", priority: "low", assignee: "Riley P.", dueDate: "May 13", status: "waiting" },
  { id: "9", candidate: "Chris Davis", initials: "CD", type: "Housing", title: "Lease signed for Cedar Medical apartment", priority: "low", assignee: "Riley P.", dueDate: "Completed", status: "completed" },
  { id: "10", candidate: "Rachel Green", initials: "RG", type: "Travel", title: "Flight booked LAX → PDX May 28", priority: "low", assignee: "Riley P.", dueDate: "Completed", status: "completed" },
  { id: "11", candidate: "Sophie Lee", initials: "SL", type: "Orientation", title: "Mountain View Med orientation packet sent", priority: "low", assignee: "Riley P.", dueDate: "Completed", status: "completed" },
]

const columns: { key: Task["status"]; label: string; color: string; icon: React.ElementType }[] = [
  { key: "new", label: "New", color: "border-t-blue-500", icon: Inbox },
  { key: "in_progress", label: "In Progress", color: "border-t-amber-500", icon: Loader2 },
  { key: "waiting", label: "Waiting", color: "border-t-purple-500", icon: Clock },
  { key: "completed", label: "Completed", color: "border-t-emerald-500", icon: CheckCircle2 },
]

const priorityColors: Record<string, string> = {
  urgent: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-blue-100 text-blue-700",
  low: "bg-slate-100 text-slate-600",
}

const vendors = [
  { name: "HomeFinder Pro", type: "Housing", rating: 4.8, listings: 24 },
  { name: "TravelEase Corp", type: "Travel", rating: 4.6, listings: 15 },
  { name: "UtilityConnect", type: "Utilities", rating: 4.5, listings: 8 },
  { name: "InsureQuick", type: "Insurance", rating: 4.7, listings: 12 },
]

const aiSuggestions = [
  { title: "Auto-assign housing vendor", description: "Sarah Johnson's housing request matches 3 listings from HomeFinder Pro near Memorial Hospital." },
  { title: "Bulk document reminder", description: "3 candidates have overdue document submissions. Send automated follow-up emails." },
  { title: "Vendor capacity alert", description: "HomeFinder Pro is at 90% capacity in Portland. Consider activating backup vendor." },
]

export default function ConciergeDashboard() {
  return (
    <DashboardLayout role="concierge">
      <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Concierge Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage candidate relocation tasks</p>
          </div>
          <Button size="sm" onClick={() => toast.info("New task form opening...")}>
            <Plus className="h-4 w-4 mr-1.5" />
            New Task
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.title} {...kpi} index={i} />
          ))}
        </div>

        {/* Kanban Board */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.key)
            return (
              <div key={col.key} className={`rounded-xl border border-t-4 ${col.color} bg-white`}>
                <div className="flex items-center justify-between p-3 pb-2">
                  <div className="flex items-center gap-2">
                    <col.icon className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">{col.label}</h3>
                    <Badge variant="secondary" className="text-[10px] h-5 min-w-5 justify-center">
                      {colTasks.length}
                    </Badge>
                  </div>
                </div>
                <ScrollArea className="h-[380px]">
                  <div className="p-2 space-y-2">
                    {colTasks.map((task, i) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -1, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                        className="rounded-lg border bg-white p-3 cursor-pointer transition-colors"
                        onClick={() => toast.info(`Opening task: ${task.title}`)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-[10px] font-semibold">
                              {task.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium text-muted-foreground">{task.candidate}</span>
                        </div>
                        <p className="text-sm font-medium leading-snug mb-2">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${priorityColors[task.priority]}`}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span className="text-[11px] text-muted-foreground">{task.dueDate}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Vendor Quick Access */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Store className="h-4 w-4 text-[#0B3C5D]" />
                Vendor Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vendors.map((vendor) => (
                <motion.div
                  key={vendor.name}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toast.info(`Opening ${vendor.name}`)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
                    <Store className="h-5 w-5 text-[#0B3C5D]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor.type} · {vendor.listings} listings</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-amber-500">★</span>
                    <span className="font-medium">{vendor.rating}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* AI Task Suggestions */}
          <Card className="border-[#0B3C5D]/20 bg-[#0B3C5D]/[0.02]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#0B3C5D]" />
                AI Task Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((suggestion, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 2 }}
                  className="rounded-lg border p-3 cursor-pointer hover:bg-white hover:shadow-sm transition-all"
                  onClick={() => toast.info(`Applying suggestion: ${suggestion.title}`)}
                >
                  <div className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-[#0B3C5D] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{suggestion.description}</p>
                      <Button variant="link" className="h-auto p-0 text-xs text-[#0B3C5D] mt-1" onClick={(e) => { e.stopPropagation(); toast.success("Suggestion applied!") }}>
                        Apply suggestion <ArrowRight className="h-3 w-3 ml-0.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
