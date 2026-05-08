"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText, UserCheck, AlertTriangle, CheckCircle2, Send,
  Home, Star, Clock, type LucideIcon,
} from "lucide-react"

export interface ActivityItem {
  id: string
  type: "offer_sent" | "offer_accepted" | "offer_declined" | "risk_alert" | "booking" | "assignment" | "system" | "review"
  title: string
  description: string
  timestamp: string
  user?: string
}

const activityIcons: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  offer_sent: { icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
  offer_accepted: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  offer_declined: { icon: FileText, color: "text-red-500", bg: "bg-red-50" },
  risk_alert: { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50" },
  booking: { icon: Home, color: "text-purple-600", bg: "bg-purple-50" },
  assignment: { icon: UserCheck, color: "text-[#0B3C5D]", bg: "bg-[#0B3C5D]/10" },
  system: { icon: Clock, color: "text-slate-500", bg: "bg-slate-100" },
  review: { icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  title?: string
  maxHeight?: string
  className?: string
}

export function ActivityFeed({
  activities,
  title = "Recent Activity",
  maxHeight = "h-[400px]",
  className,
}: ActivityFeedProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className={maxHeight}>
          <div className="space-y-1">
            {activities.map((activity, index) => {
              const config = activityIcons[activity.type] || activityIcons.system
              const Icon = config.icon

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="flex gap-3 rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                >
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1F2937] leading-snug">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap pt-0.5">
                    {activity.timestamp}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
