"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Download, RefreshCw, Clock, Shield, User, Settings, FileText, Key } from "lucide-react"

type AuditLog = {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  details: string
  ipAddress: string
  severity: string
  [key: string]: unknown
}

const mockLogs: AuditLog[] = [
  { id: "AL-001", timestamp: "May 8, 2026 3:24 AM", user: "admin@trital.com", action: "LOGIN", resource: "Auth", details: "Admin login successful", ipAddress: "192.168.1.100", severity: "info" },
  { id: "AL-002", timestamp: "May 8, 2026 3:18 AM", user: "michael@acmehealth.com", action: "CREATE", resource: "Offer", details: "Created offer O-009 for Sarah Johnson", ipAddress: "10.0.0.45", severity: "info" },
  { id: "AL-003", timestamp: "May 8, 2026 2:45 AM", user: "jessica@acmehealth.com", action: "UPDATE", resource: "Candidate", details: "Updated candidate status to ON_ASSIGNMENT", ipAddress: "10.0.0.46", severity: "info" },
  { id: "AL-004", timestamp: "May 8, 2026 1:30 AM", user: "system", action: "AUTOMATED", resource: "AI", details: "Batch risk score calculation completed (45 candidates)", ipAddress: "internal", severity: "info" },
  { id: "AL-005", timestamp: "May 7, 2026 11:15 PM", user: "unknown", action: "LOGIN_FAILED", resource: "Auth", details: "Failed login attempt (3rd attempt)", ipAddress: "203.0.113.50", severity: "warning" },
  { id: "AL-006", timestamp: "May 7, 2026 10:00 PM", user: "admin@trital.com", action: "DELETE", resource: "User", details: "Deactivated user robert@primecare.com", ipAddress: "192.168.1.100", severity: "warning" },
  { id: "AL-007", timestamp: "May 7, 2026 8:30 PM", user: "sarah@novamed.com", action: "EXPORT", resource: "Report", details: "Exported MSP report for Q1 2026", ipAddress: "10.0.0.80", severity: "info" },
  { id: "AL-008", timestamp: "May 7, 2026 6:00 PM", user: "system", action: "BACKUP", resource: "Database", details: "Automated daily backup completed", ipAddress: "internal", severity: "info" },
  { id: "AL-009", timestamp: "May 7, 2026 4:22 PM", user: "david@carebridge.com", action: "UPDATE", resource: "Booking", details: "Updated booking request BR-004 status to completed", ipAddress: "10.0.0.62", severity: "info" },
  { id: "AL-010", timestamp: "May 7, 2026 2:10 PM", user: "admin@trital.com", action: "CONFIG", resource: "Settings", details: "Updated AI model settings: max tokens increased to 4096", ipAddress: "192.168.1.100", severity: "warning" },
]

const severityColors: Record<string, string> = {
  info: "bg-blue-50 text-blue-700 border-blue-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
}

const actionIcons: Record<string, typeof User> = {
  LOGIN: Key, LOGIN_FAILED: Key, CREATE: FileText, UPDATE: Settings, DELETE: User, EXPORT: FileText, AUTOMATED: Settings, BACKUP: Shield, CONFIG: Settings,
}

const columns: Column<AuditLog>[] = [
  { key: "timestamp", label: "Timestamp", sortable: true, render: (val) => <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{String(val)}</span> },
  { key: "user", label: "User", sortable: true, render: (val) => <span className="text-sm font-medium">{String(val)}</span> },
  {
    key: "action", label: "Action", sortable: true, render: (val) => {
      const Icon = actionIcons[String(val)] || Settings
      return <Badge variant="outline" className="text-[10px] gap-1"><Icon className="h-3 w-3" />{String(val)}</Badge>
    },
  },
  { key: "resource", label: "Resource", sortable: true, render: (val) => <Badge variant="secondary" className="text-[10px]">{String(val)}</Badge> },
  { key: "details", label: "Details", render: (val) => <span className="text-xs text-muted-foreground max-w-[300px] truncate block">{String(val)}</span> },
  { key: "ipAddress", label: "IP Address", render: (val) => <span className="text-xs font-mono text-muted-foreground">{String(val)}</span> },
  {
    key: "severity", label: "Severity", render: (val) => (
      <Badge variant="outline" className={`text-[10px] ${severityColors[String(val)] || ""}`}>{String(val)}</Badge>
    ),
  },
]

export default function AdminAuditLogsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Audit Logs</h1>
            <p className="text-sm text-muted-foreground mt-1">Track all system activity and user actions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Logs refreshed")}><RefreshCw className="h-4 w-4 mr-1.5" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Logs exported")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
          </div>
        </div>
        <DataTable title="System Audit Logs" columns={columns} data={mockLogs} searchPlaceholder="Search logs..." searchKeys={["user", "action", "resource", "details"]} pageSize={10} />
      </div>
    </DashboardLayout>
  )
}
