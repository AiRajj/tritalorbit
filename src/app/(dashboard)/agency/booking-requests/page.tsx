"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
  Download, RefreshCw, Eye, Clock, Plane, Home, Car,
  User, Building2, Calendar, ArrowUpRight,
} from "lucide-react"

type BookingRequest = {
  id: string
  candidateName: string
  initials: string
  facilityName: string
  location: string
  services: string[]
  moveDate: string
  status: string
  conciergeOwner: string
  createdAt: string
  budget: string
  [key: string]: unknown
}

const mockRequests: BookingRequest[] = [
  { id: "BR-001", candidateName: "Sarah Johnson", initials: "SJ", facilityName: "Memorial Medical Center", location: "Portland, OR", services: ["Flight", "Housing"], moveDate: "Jun 10, 2026", status: "new", conciergeOwner: "Lisa Park", createdAt: "2h ago", budget: "$1,500-$2,000" },
  { id: "BR-002", candidateName: "Kevin Hart", initials: "KH", facilityName: "St. Luke's Hospital", location: "Boise, ID", services: ["Housing", "Car"], moveDate: "Jun 15, 2026", status: "in_progress", conciergeOwner: "Lisa Park", createdAt: "1d ago", budget: "$1,200-$1,800" },
  { id: "BR-003", candidateName: "Nina Patel", initials: "NP", facilityName: "Cedar Sinai", location: "Los Angeles, CA", services: ["Flight", "Housing", "Car"], moveDate: "Jul 1, 2026", status: "in_progress", conciergeOwner: "David Kim", createdAt: "2d ago", budget: "$2,000-$3,000" },
  { id: "BR-004", candidateName: "Emily Rodriguez", initials: "ER", facilityName: "Mass General", location: "Boston, MA", services: ["Flight"], moveDate: "Jun 20, 2026", status: "completed", conciergeOwner: "David Kim", createdAt: "5d ago", budget: "$400-$600" },
  { id: "BR-005", candidateName: "James Wilson", initials: "JW", facilityName: "Mayo Clinic", location: "Rochester, MN", services: ["Housing"], moveDate: "Jul 8, 2026", status: "new", conciergeOwner: "Unassigned", createdAt: "4h ago", budget: "$1,000-$1,600" },
  { id: "BR-006", candidateName: "Maria Santos", initials: "MS", facilityName: "Cleveland Clinic", location: "Cleveland, OH", services: ["Flight", "Housing", "Car"], moveDate: "Jun 25, 2026", status: "cancelled", conciergeOwner: "Lisa Park", createdAt: "1w ago", budget: "$1,800-$2,500" },
  { id: "BR-007", candidateName: "Tom Chen", initials: "TC", facilityName: "UCSF Medical Center", location: "San Francisco, CA", services: ["Housing"], moveDate: "Jul 15, 2026", status: "new", conciergeOwner: "Unassigned", createdAt: "6h ago", budget: "$2,200-$3,000" },
  { id: "BR-008", candidateName: "Ashley Brown", initials: "AB", facilityName: "Johns Hopkins", location: "Baltimore, MD", services: ["Flight", "Car"], moveDate: "Jun 28, 2026", status: "in_progress", conciergeOwner: "David Kim", createdAt: "3d ago", budget: "$600-$900" },
]

const serviceIcons: Record<string, typeof Plane> = { Flight: Plane, Housing: Home, Car: Car }

const columns: Column<BookingRequest>[] = [
  {
    key: "candidateName", label: "Candidate", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">{row.initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{String(val)}</p>
          <p className="text-xs text-muted-foreground">{row.facilityName}</p>
        </div>
      </div>
    ),
  },
  {
    key: "location", label: "Location", sortable: true, render: (val) => (
      <span className="text-sm flex items-center gap-1"><Building2 className="h-3 w-3 text-muted-foreground" />{String(val)}</span>
    ),
  },
  {
    key: "services", label: "Services", render: (val) => (
      <div className="flex items-center gap-1">
        {(val as string[]).map((svc) => {
          const Icon = serviceIcons[svc] || Plane
          return <Badge key={svc} variant="outline" className="text-[10px] gap-1"><Icon className="h-3 w-3" />{svc}</Badge>
        })}
      </div>
    ),
  },
  {
    key: "moveDate", label: "Move Date", sortable: true, render: (val) => (
      <span className="text-sm flex items-center gap-1"><Calendar className="h-3 w-3 text-muted-foreground" />{String(val)}</span>
    ),
  },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  {
    key: "conciergeOwner", label: "Concierge", sortable: true, render: (val) => (
      <span className={`text-sm ${val === "Unassigned" ? "text-amber-600 font-medium" : ""}`}>{String(val)}</span>
    ),
  },
  {
    key: "createdAt", label: "Submitted", render: (val) => (
      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{String(val)}</span>
    ),
  },
  {
    key: "id", label: "", render: (_, row) => (
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toast.info(`Opening details for ${row.candidateName}`) }}>
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
]

export default function AgencyBookingRequestsPage() {
  return (
    <DashboardLayout role="agency">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Booking Requests</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage candidate mobility and support requests</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Export started")}>
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "New Requests", value: "3", color: "text-blue-600 bg-blue-50" },
            { label: "In Progress", value: "3", color: "text-amber-600 bg-amber-50" },
            { label: "Completed", value: "1", color: "text-emerald-600 bg-emerald-50" },
            { label: "Cancelled", value: "1", color: "text-slate-500 bg-slate-50" },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl border p-4 text-center ${stat.color}`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <DataTable
          title="All Booking Requests"
          columns={columns}
          data={mockRequests}
          searchPlaceholder="Search requests..."
          searchKeys={["candidateName", "facilityName", "location", "conciergeOwner"]}
          pageSize={10}
          onRowClick={(row) => toast.info(`Opening ${row.candidateName}'s request`)}
        />
      </div>
    </DashboardLayout>
  )
}
