"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Plus, Download, RefreshCw, Edit, Trash2, Clock } from "lucide-react"

type UserRow = {
  id: string
  name: string
  initials: string
  email: string
  role: string
  agency: string
  status: string
  lastLogin: string
  createdAt: string
  [key: string]: unknown
}

const mockUsers: UserRow[] = [
  { id: "U-001", name: "Michael Chen", initials: "MC", email: "michael@acmehealth.com", role: "RECRUITER", agency: "Acme Health Staffing", status: "active", lastLogin: "2h ago", createdAt: "Jan 2025" },
  { id: "U-002", name: "Jessica Rivera", initials: "JR", email: "jessica@acmehealth.com", role: "ACCOUNT_MANAGER", agency: "Acme Health Staffing", status: "active", lastLogin: "1d ago", createdAt: "Feb 2025" },
  { id: "U-003", name: "David Kim", initials: "DK", email: "david@carebridge.com", role: "RECRUITER", agency: "CareBridge Solutions", status: "active", lastLogin: "5h ago", createdAt: "Mar 2025" },
  { id: "U-004", name: "Sarah Thompson", initials: "ST", email: "sarah@novamed.com", role: "MSP_ADMIN", agency: "NovaMed Recruiting", status: "active", lastLogin: "30m ago", createdAt: "Nov 2024" },
  { id: "U-005", name: "Robert Johnson", initials: "RJ", email: "robert@primecare.com", role: "RECRUITER", agency: "PrimeCare Staffing", status: "inactive", lastLogin: "2w ago", createdAt: "Jun 2025" },
  { id: "U-006", name: "Admin User", initials: "AU", email: "admin@trital.com", role: "ADMIN", agency: "TRITAL", status: "active", lastLogin: "Just now", createdAt: "Oct 2024" },
  { id: "U-007", name: "Lisa Park", initials: "LP", email: "lisa@healthforce.com", role: "RECRUITER", agency: "HealthForce Pro", status: "active", lastLogin: "3h ago", createdAt: "Feb 2025" },
  { id: "U-008", name: "Tom Williams", initials: "TW", email: "tom@tnhub.com", role: "ACCOUNT_MANAGER", agency: "TravelNurse Hub", status: "pending", lastLogin: "Never", createdAt: "May 2026" },
]

const roleColors: Record<string, string> = {
  ADMIN: "bg-red-50 text-red-700 border-red-200",
  MSP_ADMIN: "bg-amber-50 text-amber-700 border-amber-200",
  ACCOUNT_MANAGER: "bg-purple-50 text-purple-700 border-purple-200",
  RECRUITER: "bg-blue-50 text-blue-700 border-blue-200",
}

const columns: Column<UserRow>[] = [
  {
    key: "name", label: "User", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">{row.initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{String(val)}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "role", label: "Role", sortable: true, render: (val) => (
      <Badge variant="outline" className={`text-[10px] ${roleColors[String(val)] || ""}`}>
        {String(val).replace("_", " ")}
      </Badge>
    ),
  },
  { key: "agency", label: "Agency", sortable: true },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  {
    key: "lastLogin", label: "Last Login", render: (val) => (
      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{String(val)}</span>
    ),
  },
  { key: "createdAt", label: "Created", render: (val) => <span className="text-xs text-muted-foreground">{String(val)}</span> },
  {
    key: "id", label: "", render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toast.info(`Editing ${row.name}`) }}><Edit className="h-3.5 w-3.5" /></Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600" onClick={(e) => { e.stopPropagation(); toast.error(`${row.name} deactivated`) }}><Trash2 className="h-3.5 w-3.5" /></Button>
      </div>
    ),
  },
]

export default function AdminUsersPage() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Manage Users</h1>
            <p className="text-sm text-muted-foreground mt-1">View and manage all platform users</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}><RefreshCw className="h-4 w-4 mr-1.5" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Export started")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
            <Button size="sm" onClick={() => toast.info("Add user form opening...")}><Plus className="h-4 w-4 mr-1.5" />Add User</Button>
          </div>
        </div>

        <DataTable
          title="All Users"
          columns={columns}
          data={mockUsers}
          searchPlaceholder="Search users..."
          searchKeys={["name", "email", "agency", "role"]}
          pageSize={10}
          onRowClick={(row) => toast.info(`Opening ${row.name}'s profile`)}
        />
      </div>
    </DashboardLayout>
  )
}
