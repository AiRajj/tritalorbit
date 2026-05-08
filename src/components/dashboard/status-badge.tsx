"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-slate-100 text-slate-700 border-slate-200" },
  sent: { label: "Sent", className: "bg-blue-50 text-blue-700 border-blue-200" },
  viewed: { label: "Viewed", className: "bg-purple-50 text-purple-700 border-purple-200" },
  accepted: { label: "Accepted", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  declined: { label: "Declined", className: "bg-red-50 text-red-700 border-red-200" },
  expired: { label: "Expired", className: "bg-gray-100 text-gray-500 border-gray-200" },
  backout: { label: "Backout", className: "bg-red-100 text-red-800 border-red-300" },
  new: { label: "New", className: "bg-blue-50 text-blue-700 border-blue-200" },
  in_progress: { label: "In Progress", className: "bg-amber-50 text-amber-700 border-amber-200" },
  waiting: { label: "Waiting", className: "bg-purple-50 text-purple-700 border-purple-200" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-500 border-gray-200" },
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  inactive: { label: "Inactive", className: "bg-gray-100 text-gray-500 border-gray-200" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
  confirmed: { label: "Confirmed", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-700 border-red-200" },
}

type RiskLevel = "low" | "medium" | "high" | "critical"

const riskConfig: Record<RiskLevel, { label: string; className: string }> = {
  low: { label: "Low Risk", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  medium: { label: "Medium Risk", className: "bg-amber-50 text-amber-700 border-amber-200" },
  high: { label: "High Risk", className: "bg-orange-50 text-orange-700 border-orange-200" },
  critical: { label: "Critical", className: "bg-red-50 text-red-700 border-red-300" },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] || {
    label: status,
    className: "bg-gray-100 text-gray-600 border-gray-200",
  }

  return (
    <Badge variant="outline" className={cn("text-[11px] font-semibold border", config.className, className)}>
      {config.label}
    </Badge>
  )
}

interface RiskBadgeProps {
  level: RiskLevel
  score?: number
  className?: string
}

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  const config = riskConfig[level]

  return (
    <Badge variant="outline" className={cn("text-[11px] font-semibold border", config.className, className)}>
      {score !== undefined ? `${score}%` : config.label}
    </Badge>
  )
}
