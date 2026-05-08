import React from "react";
import { cn } from "@/lib/utils";

type StatusType = string;

const statusConfig: Record<string, { bg: string; text: string; label?: string }> = {
  DRAFT: { bg: "bg-slate-100", text: "text-slate-600" },
  SENT: { bg: "bg-blue-50 border border-blue-200", text: "text-blue-700", label: "Sent" },
  VIEWED: { bg: "bg-purple-50 border border-purple-200", text: "text-purple-700", label: "Viewed" },
  ACCEPTED: { bg: "bg-emerald-50 border border-emerald-200", text: "text-emerald-700", label: "Accepted" },
  DECLINED: { bg: "bg-red-50 border border-red-200", text: "text-red-700", label: "Declined" },
  EXPIRED: { bg: "bg-slate-100 border border-slate-200", text: "text-slate-500", label: "Expired" },
  WITHDRAWN: { bg: "bg-slate-100 border border-slate-200", text: "text-slate-500", label: "Withdrawn" },
  NEW: { bg: "bg-sky-50 border border-sky-200", text: "text-sky-700", label: "New" },
  IN_PROGRESS: { bg: "bg-amber-50 border border-amber-200", text: "text-amber-700", label: "In Progress" },
  WAITING_CANDIDATE: { bg: "bg-purple-50 border border-purple-200", text: "text-purple-700", label: "Waiting" },
  COMPLETED: { bg: "bg-emerald-50 border border-emerald-200", text: "text-emerald-700", label: "Completed" },
  CANCELLED: { bg: "bg-slate-100 border border-slate-200", text: "text-slate-500", label: "Cancelled" },
  ACTIVE: { bg: "bg-emerald-50 border border-emerald-200", text: "text-emerald-700", label: "Active" },
  NOT_STARTED: { bg: "bg-slate-100 border border-slate-200", text: "text-slate-500", label: "Not Started" },
  AT_RISK: { bg: "bg-orange-50 border border-orange-200", text: "text-orange-700", label: "At Risk" },
  READY: { bg: "bg-emerald-50 border border-emerald-200", text: "text-emerald-700", label: "Ready" },
  CRITICAL: { bg: "bg-red-50 border border-red-200", text: "text-red-700", label: "Critical" },
  CONFIRMED: { bg: "bg-emerald-50 border border-emerald-200", text: "text-emerald-700", label: "Confirmed" },
  BOOKED: { bg: "bg-blue-50 border border-blue-200", text: "text-blue-700", label: "Booked" },
  NOT_REQUESTED: { bg: "bg-slate-100 border border-slate-200", text: "text-slate-500", label: "Not Requested" },
  REQUESTED: { bg: "bg-sky-50 border border-sky-200", text: "text-sky-700", label: "Requested" },
};

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
  customLabel?: string;
}

export function StatusBadge({ status, size = "sm", customLabel }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { bg: "bg-slate-100", text: "text-slate-600" };
  const label = customLabel ?? config.label ?? status.replace(/_/g, " ");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        config.bg,
        config.text,
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {label}
    </span>
  );
}
