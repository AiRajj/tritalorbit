import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    accepted: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    completed: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    verified: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    pending: "bg-amber-500/10 text-amber-700 border-amber-200",
    "in progress": "bg-blue-500/10 text-blue-700 border-blue-200",
    "in_progress": "bg-blue-500/10 text-blue-700 border-blue-200",
    waiting: "bg-purple-500/10 text-purple-700 border-purple-200",
    declined: "bg-red-500/10 text-red-700 border-red-200",
    rejected: "bg-red-500/10 text-red-700 border-red-200",
    inactive: "bg-gray-500/10 text-gray-700 border-gray-200",
    suspended: "bg-red-500/10 text-red-700 border-red-200",
    expired: "bg-gray-500/10 text-gray-700 border-gray-200",
    new: "bg-blue-500/10 text-blue-700 border-blue-200",
    cancelled: "bg-red-500/10 text-red-700 border-red-200",
  }
  return colors[status.toLowerCase()] || "bg-gray-500/10 text-gray-700 border-gray-200"
}
