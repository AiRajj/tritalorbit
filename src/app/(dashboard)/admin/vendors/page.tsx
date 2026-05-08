"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Store, CheckCircle2, XCircle, Eye, Star, MapPin,
  Clock, Shield, RefreshCw, Download, Plus,
} from "lucide-react"

type Vendor = {
  id: string
  name: string
  type: string
  city: string
  state: string
  status: string
  rating: number
  listings: number
  joinedDate: string
  contact: string
  [key: string]: unknown
}

const mockVendors: Vendor[] = [
  { id: "V-001", name: "HomeFinder Pro", type: "Housing", city: "Portland", state: "OR", status: "active", rating: 4.9, listings: 18, joinedDate: "Jan 2025", contact: "lisa@homefinder.com" },
  { id: "V-002", name: "TravelNurse Homes", type: "Housing", city: "Los Angeles", state: "CA", status: "active", rating: 4.7, listings: 34, joinedDate: "Mar 2025", contact: "info@tnhomes.com" },
  { id: "V-003", name: "AutoRent Healthcare", type: "Car Rental", city: "Nationwide", state: "US", status: "active", rating: 4.5, listings: 0, joinedDate: "Feb 2025", contact: "support@autorent.com" },
  { id: "V-004", name: "MedStay Suites", type: "Housing", city: "Boston", state: "MA", status: "active", rating: 4.8, listings: 12, joinedDate: "Apr 2025", contact: "book@medstay.com" },
  { id: "V-005", name: "Comfort Living Corp", type: "Housing", city: "San Francisco", state: "CA", status: "pending", rating: 4.3, listings: 8, joinedDate: "May 2026", contact: "info@comfortliving.com" },
  { id: "V-006", name: "NurseStay Express", type: "Housing", city: "Chicago", state: "IL", status: "pending", rating: 0, listings: 5, joinedDate: "May 2026", contact: "apply@nursestay.com" },
  { id: "V-007", name: "DriveHealth Fleet", type: "Car Rental", city: "Atlanta", state: "GA", status: "active", rating: 4.4, listings: 0, joinedDate: "Jan 2026", contact: "fleet@drivehealth.com" },
  { id: "V-008", name: "QuickStay Homes", type: "Housing", city: "Denver", state: "CO", status: "rejected", rating: 3.2, listings: 3, joinedDate: "Apr 2026", contact: "info@quickstay.com" },
]

const columns: Column<Vendor>[] = [
  {
    key: "name", label: "Vendor", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
          <Store className="h-4 w-4 text-[#0B3C5D]" />
        </div>
        <div>
          <p className="font-medium text-sm">{String(val)}</p>
          <p className="text-xs text-muted-foreground">{row.contact}</p>
        </div>
      </div>
    ),
  },
  { key: "type", label: "Type", sortable: true, render: (val) => <Badge variant="secondary" className="text-[10px]">{String(val)}</Badge> },
  {
    key: "city", label: "Location", sortable: true, render: (val, row) => (
      <span className="text-sm flex items-center gap-1"><MapPin className="h-3 w-3 text-muted-foreground" />{String(val)}, {row.state}</span>
    ),
  },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  {
    key: "rating", label: "Rating", sortable: true, render: (val) => {
      const r = Number(val)
      return r > 0 ? (
        <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><span className="text-sm font-medium">{r}</span></div>
      ) : <span className="text-xs text-muted-foreground">N/A</span>
    },
  },
  { key: "listings", label: "Listings", sortable: true, className: "text-center" },
  { key: "joinedDate", label: "Joined", render: (val) => <span className="text-xs text-muted-foreground">{String(val)}</span> },
  {
    key: "id", label: "Actions", render: (_, row) => (
      <div className="flex items-center gap-1">
        {row.status === "pending" && (
          <>
            <Button variant="outline" size="sm" className="h-7 text-[11px] text-emerald-700 hover:bg-emerald-50" onClick={(e) => { e.stopPropagation(); toast.success(`${row.name} approved!`) }}>
              <CheckCircle2 className="h-3 w-3 mr-1" />Approve
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-[11px] text-red-700 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); toast.error(`${row.name} rejected`) }}>
              <XCircle className="h-3 w-3 mr-1" />Reject
            </Button>
          </>
        )}
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${row.name} details`) }}>
          <Eye className="h-3.5 w-3.5" />
        </Button>
      </div>
    ),
  },
]

export default function AdminVendorsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Vendor Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Review, approve, and manage marketplace vendors</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("Data refreshed")}>
              <RefreshCw className="h-4 w-4 mr-1.5" />Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Export started")}>
              <Download className="h-4 w-4 mr-1.5" />Export
            </Button>
            <Button size="sm" onClick={() => toast.info("Add vendor form opening...")}>
              <Plus className="h-4 w-4 mr-1.5" />Add Vendor
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Vendors", value: mockVendors.length, color: "text-[#0B3C5D] bg-[#0B3C5D]/5", icon: Store },
            { label: "Active", value: mockVendors.filter((v) => v.status === "active").length, color: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 },
            { label: "Pending Review", value: mockVendors.filter((v) => v.status === "pending").length, color: "text-amber-600 bg-amber-50", icon: Clock },
            { label: "Avg Rating", value: (mockVendors.filter((v) => v.rating > 0).reduce((s, v) => s + v.rating, 0) / mockVendors.filter((v) => v.rating > 0).length).toFixed(1), color: "text-amber-600 bg-amber-50", icon: Star },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpi.color}`}>
                      <kpi.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1F2937]">{kpi.value}</p>
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <DataTable
          title="All Vendors"
          columns={columns}
          data={mockVendors}
          searchPlaceholder="Search vendors..."
          searchKeys={["name", "type", "city"]}
          pageSize={10}
          onRowClick={(row) => toast.info(`Opening ${row.name} details`)}
        />
      </div>
    </DashboardLayout>
  )
}
