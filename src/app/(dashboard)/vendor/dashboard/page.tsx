"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
  Package, Inbox, CheckCircle2, DollarSign,
  Plus, Star, MapPin, Home, Eye,
  ArrowUpRight, TrendingUp, Calendar,
  Edit,
} from "lucide-react"

const kpis = [
  { title: "Active Listings", value: "18", change: 5.9, icon: Package, iconColor: "text-blue-600", iconBg: "bg-blue-50", sparklineData: [12, 13, 14, 15, 16, 17, 18] },
  { title: "Booking Requests", value: "7", change: 16.7, icon: Inbox, iconColor: "text-purple-600", iconBg: "bg-purple-50", sparklineData: [4, 4, 5, 5, 6, 6, 7] },
  { title: "Completed Stays", value: "142", change: 8.4, icon: CheckCircle2, iconColor: "text-emerald-600", iconBg: "bg-emerald-50", sparklineData: [118, 122, 128, 132, 136, 139, 142] },
  { title: "Monthly Revenue", value: "$32,400", change: 12.1, icon: DollarSign, iconColor: "text-[#0B3C5D]", iconBg: "bg-[#0B3C5D]/10", sparklineData: [24000, 25500, 27000, 28500, 30000, 31200, 32400] },
]

type Listing = {
  name: string
  location: string
  type: string
  price: string
  status: string
  occupancy: number
  rating: number
  bookings: number
  [key: string]: unknown
}

const listings: Listing[] = [
  { name: "Riverview Studio Apt", location: "Portland, OR", type: "Studio", price: "$1,600/mo", status: "active", occupancy: 92, rating: 4.9, bookings: 28 },
  { name: "Downtown 1BR Suite", location: "Portland, OR", type: "1 Bedroom", price: "$2,100/mo", status: "active", occupancy: 88, rating: 4.7, bookings: 22 },
  { name: "Pearl District Loft", location: "Portland, OR", type: "1 Bedroom", price: "$2,400/mo", status: "active", occupancy: 95, rating: 4.8, bookings: 31 },
  { name: "Eastside 2BR Condo", location: "Portland, OR", type: "2 Bedroom", price: "$2,800/mo", status: "active", occupancy: 78, rating: 4.5, bookings: 15 },
  { name: "Sellwood Cottage", location: "Portland, OR", type: "2 Bedroom", price: "$2,200/mo", status: "inactive", occupancy: 0, rating: 4.6, bookings: 18 },
  { name: "NW Hills House", location: "Portland, OR", type: "3 Bedroom", price: "$3,500/mo", status: "active", occupancy: 65, rating: 4.4, bookings: 8 },
]

const listingColumns: Column<Listing>[] = [
  {
    key: "name", label: "Property", sortable: true, render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
          <Home className="h-5 w-5 text-[#0B3C5D]" />
        </div>
        <div>
          <p className="font-medium text-sm">{String(val)}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />{row.location}
          </p>
        </div>
      </div>
    ),
  },
  { key: "type", label: "Type", sortable: true },
  { key: "price", label: "Price", sortable: true, render: (val) => <span className="font-semibold">{String(val)}</span> },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={String(val)} /> },
  {
    key: "occupancy", label: "Occupancy", sortable: true, render: (val) => (
      <div className="flex items-center gap-2 min-w-[100px]">
        <Progress value={Number(val)} className="h-1.5 flex-1" />
        <span className="text-xs font-medium">{Number(val)}%</span>
      </div>
    ),
  },
  {
    key: "rating", label: "Rating", sortable: true, render: (val) => (
      <div className="flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        <span className="font-medium text-sm">{Number(val)}</span>
      </div>
    ),
  },
  {
    key: "actions" as string, label: "", render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toast.info(`Editing ${row.name}`) }}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${row.name}`) }}>
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

const incomingRequests = [
  { id: "1", candidate: "Sarah Johnson", agency: "Acme Health", type: "1BR Furnished", moveIn: "May 12, 2026", budget: "$1,800/mo", status: "new", urgency: "high" },
  { id: "2", candidate: "Kevin Hart", agency: "Acme Health", type: "Studio", moveIn: "Jun 1, 2026", budget: "$1,500/mo", status: "new", urgency: "medium" },
  { id: "3", candidate: "Nina Patel", agency: "CareBridge", type: "1BR Furnished", moveIn: "May 15, 2026", budget: "$2,000/mo", status: "in_progress", urgency: "high" },
  { id: "4", candidate: "Emily Rodriguez", agency: "NovaMed", type: "2BR", moveIn: "Jun 8, 2026", budget: "$2,500/mo", status: "in_progress", urgency: "low" },
]

const performanceMetrics = [
  { label: "Response Time", value: "2.3 hrs", target: "< 4 hrs", met: true },
  { label: "Booking Rate", value: "87%", target: "> 80%", met: true },
  { label: "Guest Satisfaction", value: "4.7/5", target: "> 4.5", met: true },
  { label: "Cancellation Rate", value: "4.2%", target: "< 5%", met: true },
  { label: "Avg. Stay Duration", value: "11.2 wks", target: "—", met: true },
  { label: "Repeat Bookings", value: "32%", target: "> 25%", met: true },
]

const profileCompletion = [
  { label: "Business Details", progress: 100 },
  { label: "Listing Photos", progress: 85 },
  { label: "Amenity Details", progress: 90 },
  { label: "Pricing & Policies", progress: 100 },
  { label: "Insurance & Compliance", progress: 75 },
]

const overallCompletion = Math.round(profileCompletion.reduce((s, p) => s + p.progress, 0) / profileCompletion.length)

export default function VendorDashboard() {
  return (
    <DashboardLayout role="vendor">
      <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Vendor Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">HomeFinder Pro — Manage your listings and bookings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info("Calendar view opening...")}>
              <Calendar className="h-4 w-4 mr-1.5" />
              Calendar
            </Button>
            <Button size="sm" onClick={() => toast.info("New listing form opening...")}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add Listing
            </Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.title} {...kpi} index={i} />
          ))}
        </div>

        <DataTable
          title="My Listings"
          columns={listingColumns}
          data={listings}
          searchPlaceholder="Search listings..."
          searchKeys={["name", "location", "type"]}
          pageSize={6}
          onRowClick={(row) => toast.info(`Opening ${row.name}`)}
          actions={
            <Button variant="outline" size="sm" onClick={() => toast.info("All listings page coming soon")}>
              View All
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Incoming Requests */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Inbox className="h-4 w-4 text-purple-600" />
                Incoming Requests
                <Badge variant="secondary" className="text-[10px]">{incomingRequests.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {incomingRequests.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-lg border p-3.5 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => toast.info(`Opening request from ${req.candidate}`)}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">
                      {req.candidate.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{req.candidate}</p>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {req.type} · Move-in: {req.moveIn} · Budget: {req.budget}
                    </p>
                  </div>
                  <Badge variant={req.urgency === "high" ? "destructive" : req.urgency === "medium" ? "outline" : "secondary"} className="text-[10px]">
                    {req.urgency}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {performanceMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-lg border p-3 text-center">
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className="text-lg font-bold text-[#1F2937] mt-1">{metric.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Target: {metric.target}
                      {metric.met && <CheckCircle2 className="h-3 w-3 text-emerald-500 inline ml-1" />}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completeness */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Profile Completeness</CardTitle>
                <CardDescription className="mt-1">Complete your profile to increase visibility and bookings</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#0B3C5D]">{overallCompletion}%</span>
              </div>
            </div>
            <Progress value={overallCompletion} className="h-2 mt-3" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {profileCompletion.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg border p-3 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toast.info(`Editing ${item.label}...`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.progress === 100 ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <span className="text-xs font-medium text-amber-600">{item.progress}%</span>
                    )}
                  </div>
                  <Progress value={item.progress} className={`h-1.5 ${item.progress === 100 ? "[&>div]:bg-emerald-500" : "[&>div]:bg-amber-500"}`} />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
