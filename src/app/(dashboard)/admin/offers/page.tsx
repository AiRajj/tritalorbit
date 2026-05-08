"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { Download, RefreshCw, Eye, Building2, Calendar } from "lucide-react"

type OfferRow = {
  id: string
  candidateName: string
  facility: string
  location: string
  specialty: string
  weeklyPay: number
  status: string
  agency: string
  startDate: string
  createdAt: string
  [key: string]: unknown
}

const mockOffers: OfferRow[] = [
  { id: "O-001", candidateName: "Sarah Johnson", facility: "Memorial Medical Center", location: "Portland, OR", specialty: "ICU RN", weeklyPay: 2850, status: "sent", agency: "Acme Health", startDate: "Jun 15, 2026", createdAt: "May 5, 2026" },
  { id: "O-002", candidateName: "Kevin Hart", facility: "St. Luke's Hospital", location: "Boise, ID", specialty: "ER RN", weeklyPay: 2400, status: "viewed", agency: "Acme Health", startDate: "Jun 15, 2026", createdAt: "May 3, 2026" },
  { id: "O-003", candidateName: "Nina Patel", facility: "Cedar Sinai", location: "Los Angeles, CA", specialty: "L&D RN", weeklyPay: 3200, status: "accepted", agency: "CareBridge", startDate: "Jul 1, 2026", createdAt: "Apr 28, 2026" },
  { id: "O-004", candidateName: "Emily Rodriguez", facility: "Mass General", location: "Boston, MA", specialty: "PACU RN", weeklyPay: 2950, status: "accepted", agency: "NovaMed", startDate: "Jun 20, 2026", createdAt: "Apr 25, 2026" },
  { id: "O-005", candidateName: "James Wilson", facility: "Mayo Clinic", location: "Rochester, MN", specialty: "Tele RN", weeklyPay: 2600, status: "draft", agency: "PrimeCare", startDate: "Jul 8, 2026", createdAt: "May 7, 2026" },
  { id: "O-006", candidateName: "Maria Santos", facility: "Cleveland Clinic", location: "Cleveland, OH", specialty: "Med/Surg RN", weeklyPay: 2500, status: "declined", agency: "HealthForce", startDate: "Jun 25, 2026", createdAt: "May 1, 2026" },
  { id: "O-007", candidateName: "Tom Chen", facility: "UCSF Medical", location: "San Francisco, CA", specialty: "ICU RN", weeklyPay: 3400, status: "sent", agency: "NovaMed", startDate: "Jul 15, 2026", createdAt: "May 6, 2026" },
  { id: "O-008", candidateName: "Ashley Brown", facility: "Johns Hopkins", location: "Baltimore, MD", specialty: "OR Tech", weeklyPay: 2200, status: "accepted", agency: "HealthForce", startDate: "Jun 28, 2026", createdAt: "Apr 20, 2026" },
]

const columns: Column<OfferRow>[] = [
  { key: "candidateName", label: "Candidate", sortable: true, render: (val) => <span className="font-medium text-sm">{String(val)}</span> },
  {
    key: "facility", label: "Facility", sortable: true, render: (val, row) => (
      <div><p className="text-sm">{String(val)}</p><p className="text-xs text-muted-foreground flex items-center gap-0.5"><Building2 className="h-3 w-3" />{row.location}</p></div>
    ),
  },
  { key: "specialty", label: "Specialty", sortable: true },
  { key: "weeklyPay", label: "Weekly Pay", sortable: true, render: (val) => <span className="font-semibold text-[#0B3C5D]">{formatCurrency(Number(val))}</span> },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  { key: "agency", label: "Agency", sortable: true },
  { key: "startDate", label: "Start Date", render: (val) => <span className="text-xs flex items-center gap-1"><Calendar className="h-3 w-3 text-muted-foreground" />{String(val)}</span> },
  {
    key: "id", label: "", render: (_, row) => (
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toast.info(`Viewing offer for ${row.candidateName}`) }}><Eye className="h-3.5 w-3.5" /></Button>
    ),
  },
]

export default function AdminOffersPage() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Manage Offers</h1>
            <p className="text-sm text-muted-foreground mt-1">View all offers across the platform</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}><RefreshCw className="h-4 w-4 mr-1.5" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Export started")}><Download className="h-4 w-4 mr-1.5" />Export</Button>
          </div>
        </div>
        <DataTable title="All Offers" columns={columns} data={mockOffers} searchPlaceholder="Search offers..." searchKeys={["candidateName", "facility", "agency", "specialty"]} pageSize={10} onRowClick={(row) => toast.info(`Opening offer for ${row.candidateName}`)} />
      </div>
    </DashboardLayout>
  )
}
