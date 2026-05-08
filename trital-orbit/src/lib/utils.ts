import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

export function getRiskColor(level: string): string {
  switch (level) {
    case "LOW": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "MEDIUM": return "text-amber-600 bg-amber-50 border-amber-200";
    case "HIGH": return "text-orange-600 bg-orange-50 border-orange-200";
    case "CRITICAL": return "text-red-600 bg-red-50 border-red-200";
    default: return "text-slate-600 bg-slate-50 border-slate-200";
  }
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    DRAFT: "text-slate-600 bg-slate-100",
    SENT: "text-blue-600 bg-blue-50",
    VIEWED: "text-purple-600 bg-purple-50",
    ACCEPTED: "text-emerald-600 bg-emerald-50",
    DECLINED: "text-red-600 bg-red-50",
    EXPIRED: "text-slate-500 bg-slate-50",
    NEW: "text-blue-600 bg-blue-50",
    IN_PROGRESS: "text-amber-600 bg-amber-50",
    WAITING_CANDIDATE: "text-purple-600 bg-purple-50",
    COMPLETED: "text-emerald-600 bg-emerald-50",
    CANCELLED: "text-slate-500 bg-slate-50",
    ACTIVE: "text-emerald-600 bg-emerald-50",
    AT_RISK: "text-orange-600 bg-orange-50",
    CRITICAL: "text-red-600 bg-red-50",
  };
  return map[status] ?? "text-slate-600 bg-slate-100";
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatRiskScore(score: number): string {
  if (score >= 75) return "Critical";
  if (score >= 50) return "High";
  if (score >= 25) return "Medium";
  return "Low";
}

export function daysUntil(date: Date | string | null | undefined): number | null {
  if (!date) return null;
  const now = new Date();
  const d = new Date(date);
  const diffMs = d.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
