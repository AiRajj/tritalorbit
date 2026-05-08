"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Plus, Download, RefreshCw, Eye, MapPin } from "lucide-react"

type CandidateRow = {
  id: string
  name: string
  initials: string
  email: string
  specialty: string
  licenseState: string
  experience: number
  status: string
  agency: string
  offers: number
  [key: string]: unknown
}

const mockCandidates: CandidateRow[] = [
  { id: "C-001", name: "Sarah Johnson", initials: "SJ", email: "sarah@email.com", specialty: "ICU RN", licenseState: "OR", experience: 8, status: "active", agency: "Acme Health", offers: 3 },
  { id: "C-002", name: "Kevin Hart", initials: "KH", email: "kevin@email.com", specialty: "ER RN", licenseState: "ID", experience: 5, status: "active", agency: "Acme Health", offers: 2 },
  { id: "C-003", name: "Nina Patel", initials: "NP", email: "nina@email.com", specialty: "L&D RN", licenseState: "CA", experience: 3, status: "active", agency: "CareBridge", offers: 1 },
  { id: "C-004", name: "Emily Rodriguez", initials: "ER", email: "emily@email.com", specialty: "PACU RN", licenseState: "MA", experience: 12, status: "active", agency: "NovaMed", offers: 4 },
  { id: "C-005", name: "James Wilson", initials: "JW", email: "james@email.com", specialty: "Tele RN", licenseState: "MN", experience: 6, status: "inactive", agency: "PrimeCare", offers: 1 },
  { id: "C-006", name: "Maria Santos", initials: "MS", email: "maria@email.com", specialty: "Med/Surg RN", licenseState: "OH", experience: 10, status: "active", agency: "HealthForce", offers: 5 },
  { id: "C-007", name: "Tom Chen", initials: "TC", email: "tom@email.com", specialty: "ICU RN", licenseState: "CA", experience: 7, status: "active", agency: "NovaMed", offers: 2 },
  { id: "C-008", name: "Ashley Brown", initials: "AB", email: "ashley@email.com", specialty: "OR Tech", licenseState: "MD", experience: 4, status: "active", agency: "HealthForce", offers: 3 },
]

const columns: Column<CandidateRow>[] = [
  {
    key: "name", label: "Candidate", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8"><AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">{row.initials}</AvatarFallback></Avatar>
        <div><p className="font-medium text-sm">{String(val)}</p><p className="text-xs text-muted-foreground">{row.email}</p></div>
      </div>
    ),
  },
  { key: "specialty", label: "Specialty", sortable: true, render: (val) => <Badge variant="secondary" className="text-[10px]">{String(val)}</Badge> },
  { key: "licenseState", label: "License", sortable: true, render: (val) => <span className="text-sm flex items-center gap-1"><MapPin className="h-3 w-3 text-muted-foreground" />{String(val)}</span> },
  { key: "experience", label: "Exp (yrs)", sortable: true, className: "text-center" },
  { key: "agency", label: "Agency", sortable: true },
  { key: "offers", label: "Offers", sortable: true, className: "text-center" },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  {
    key: "id", label: "", render: (_, row) => (
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${row.name}`) }}><Eye className="h-3.5 w-3.5" /></Button>
    ),
  },
]

export default function AdminCandidatesPage() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Manage Candidates</h1>
            <p className="text-sm text-muted-foreground mt-1">View all candidates across agencies</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}><RefreshCw className="h-4 w-4 mr-1.5" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Export started")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
          </div>
        </div>
        <DataTable title="All Candidates" columns={columns} data={mockCandidates} searchPlaceholder="Search candidates..." searchKeys={["name", "email", "specialty", "agency"]} pageSize={10} onRowClick={(row) => toast.info(`Opening ${row.name}`)} />
      </div>
    </DashboardLayout>
  )
}
