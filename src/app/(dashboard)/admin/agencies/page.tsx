"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Building2, Plus, Download, RefreshCw, Eye, Edit,
} from "lucide-react"

type Agency = {
  id: string
  name: string
  plan: string
  users: number
  offers: number
  candidates: number
  status: string
  mrr: string
  joinDate: string
  contact: string
  [key: string]: unknown
}

const mockAgencies: Agency[] = [
  { id: "A-001", name: "Acme Health Staffing", plan: "Enterprise", users: 45, offers: 892, candidates: 312, status: "active", mrr: "$12,400", joinDate: "Jan 2025", contact: "admin@acmehealth.com" },
  { id: "A-002", name: "CareBridge Solutions", plan: "Professional", users: 28, offers: 567, candidates: 198, status: "active", mrr: "$8,200", joinDate: "Mar 2025", contact: "ops@carebridge.com" },
  { id: "A-003", name: "NovaMed Recruiting", plan: "Enterprise", users: 62, offers: 1245, candidates: 456, status: "active", mrr: "$15,800", joinDate: "Nov 2024", contact: "admin@novamed.com" },
  { id: "A-004", name: "PrimeCare Staffing", plan: "Starter", users: 12, offers: 234, candidates: 89, status: "active", mrr: "$3,600", joinDate: "Jun 2025", contact: "hello@primecare.com" },
  { id: "A-005", name: "MedElite Partners", plan: "Professional", users: 34, offers: 678, candidates: 234, status: "pending", mrr: "$7,900", joinDate: "Apr 2026", contact: "info@medelite.com" },
  { id: "A-006", name: "HealthForce Pro", plan: "Enterprise", users: 51, offers: 1023, candidates: 378, status: "active", mrr: "$14,200", joinDate: "Feb 2025", contact: "admin@healthforce.com" },
  { id: "A-007", name: "TravelNurse Hub", plan: "Professional", users: 22, offers: 445, candidates: 156, status: "active", mrr: "$6,100", joinDate: "Aug 2025", contact: "support@tnhub.com" },
  { id: "A-008", name: "Apex Medical Group", plan: "Starter", users: 8, offers: 156, candidates: 45, status: "inactive", mrr: "$1,800", joinDate: "Sep 2025", contact: "ops@apex.com" },
]

const columns: Column<Agency>[] = [
  {
    key: "name", label: "Agency", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
          <Building2 className="h-4 w-4 text-[#0B3C5D]" />
        </div>
        <div>
          <p className="font-medium text-sm">{String(val)}</p>
          <p className="text-xs text-muted-foreground">{row.contact}</p>
        </div>
      </div>
    ),
  },
  {
    key: "plan", label: "Plan", sortable: true, render: (val) => (
      <Badge variant="outline" className={`text-[10px] ${val === "Enterprise" ? "bg-[#0B3C5D]/10 text-[#0B3C5D]" : val === "Professional" ? "bg-purple-50 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
        {String(val)}
      </Badge>
    ),
  },
  { key: "users", label: "Users", sortable: true, className: "text-center" },
  { key: "offers", label: "Offers", sortable: true, className: "text-center", render: (val) => <span>{Number(val).toLocaleString()}</span> },
  { key: "candidates", label: "Candidates", sortable: true, className: "text-center" },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  { key: "mrr", label: "MRR", sortable: true, render: (val) => <span className="font-medium text-emerald-700">{String(val)}</span> },
  { key: "joinDate", label: "Joined", render: (val) => <span className="text-xs text-muted-foreground">{String(val)}</span> },
  {
    key: "id", label: "", render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toast.info(`Editing ${row.name}`) }}>
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${row.name}`) }}>
          <Eye className="h-3.5 w-3.5" />
        </Button>
      </div>
    ),
  },
]

export default function AdminAgenciesPage() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Manage Agencies</h1>
            <p className="text-sm text-muted-foreground mt-1">View and manage all registered agencies</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}><RefreshCw className="h-4 w-4 mr-1.5" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Export started")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
            <Button size="sm" onClick={() => toast.info("Add agency form opening...")}><Plus className="h-4 w-4 mr-1.5" />Add Agency</Button>
          </div>
        </div>

        <DataTable
          title="All Agencies"
          columns={columns}
          data={mockAgencies}
          searchPlaceholder="Search agencies..."
          searchKeys={["name", "plan", "contact"]}
          pageSize={10}
          onRowClick={(row) => toast.info(`Opening ${row.name}`)}
        />
      </div>
    </DashboardLayout>
  )
}
