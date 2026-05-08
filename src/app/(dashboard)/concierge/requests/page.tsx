"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
  Plane, Home, Car, Calendar, User,
  ArrowRight, Phone, Mail, X, MapPin,
} from "lucide-react"

type KanbanItem = {
  id: string
  candidateName: string
  initials: string
  facility: string
  location: string
  services: string[]
  moveDate: string
  budget: string
  notes: string
  status: string
}

const initialItems: KanbanItem[] = [
  { id: "1", candidateName: "Sarah Johnson", initials: "SJ", facility: "Memorial Medical", location: "Portland, OR", services: ["Flight", "Housing"], moveDate: "Jun 10", budget: "$1,500-$2,000", notes: "Prefers ground floor, pet-friendly", status: "new" },
  { id: "2", candidateName: "James Wilson", initials: "JW", facility: "Mayo Clinic", location: "Rochester, MN", services: ["Housing"], moveDate: "Jul 8", budget: "$1,000-$1,600", notes: "Near public transit", status: "new" },
  { id: "3", candidateName: "Tom Chen", initials: "TC", facility: "UCSF Medical", location: "San Francisco, CA", services: ["Housing"], moveDate: "Jul 15", budget: "$2,200-$3,000", notes: "Studio OK, needs parking", status: "new" },
  { id: "4", candidateName: "Kevin Hart", initials: "KH", facility: "St. Luke's", location: "Boise, ID", services: ["Housing", "Car"], moveDate: "Jun 15", budget: "$1,200-$1,800", notes: "", status: "in_progress" },
  { id: "5", candidateName: "Nina Patel", initials: "NP", facility: "Cedar Sinai", location: "Los Angeles, CA", services: ["Flight", "Housing", "Car"], moveDate: "Jul 1", budget: "$2,000-$3,000", notes: "First time traveler, needs extra support", status: "in_progress" },
  { id: "6", candidateName: "Ashley Brown", initials: "AB", facility: "Johns Hopkins", location: "Baltimore, MD", services: ["Flight", "Car"], moveDate: "Jun 28", budget: "$600-$900", notes: "", status: "waiting_candidate" },
  { id: "7", candidateName: "Emily Rodriguez", initials: "ER", facility: "Mass General", location: "Boston, MA", services: ["Flight"], moveDate: "Jun 20", budget: "$400-$600", notes: "Flight booked, confirmation sent", status: "completed" },
  { id: "8", candidateName: "Maria Santos", initials: "MS", facility: "Cleveland Clinic", location: "Cleveland, OH", services: ["Flight", "Housing", "Car"], moveDate: "Jun 25", budget: "$1,800-$2,500", notes: "Candidate withdrew from assignment", status: "cancelled" },
]

const columns = [
  { id: "new", label: "New", color: "bg-blue-500" },
  { id: "in_progress", label: "In Progress", color: "bg-amber-500" },
  { id: "waiting_candidate", label: "Waiting Candidate", color: "bg-purple-500" },
  { id: "completed", label: "Completed", color: "bg-emerald-500" },
  { id: "cancelled", label: "Cancelled", color: "bg-slate-400" },
]

const serviceIcons: Record<string, typeof Plane> = { Flight: Plane, Housing: Home, Car: Car }

export default function ConciergeRequestsPage() {
  const [items, setItems] = useState(initialItems)
  const [selectedItem, setSelectedItem] = useState<KanbanItem | null>(null)

  const moveItem = (id: string, newStatus: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
    const item = items.find((i) => i.id === id)
    if (item) {
      toast.success(`Moved ${item.candidateName} to ${columns.find((c) => c.id === newStatus)?.label}`)
    }
    setSelectedItem(null)
  }

  const getNextStatus = (current: string) => {
    const idx = columns.findIndex((c) => c.id === current)
    if (idx < columns.length - 2) return columns[idx + 1].id
    return null
  }

  return (
    <DashboardLayout role="concierge">
      <div className="p-4 lg:p-6 max-w-[1800px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Concierge Requests</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage mobility requests across all stages</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{items.length} total requests</span>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colItems = items.filter((item) => item.status === col.id)
            return (
              <div key={col.id} className="min-w-[300px] flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <h3 className="font-semibold text-sm text-[#1F2937]">{col.label}</h3>
                  <Badge variant="secondary" className="text-[10px] h-5">{colItems.length}</Badge>
                </div>

                <div className="space-y-3">
                  {colItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Card
                        className="cursor-pointer hover:shadow-md transition-all hover:border-[#0B3C5D]/30"
                        onClick={() => setSelectedItem(item)}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">{item.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.candidateName}</p>
                              <p className="text-xs text-muted-foreground truncate">{item.facility}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 flex-wrap">
                            {item.services.map((svc) => {
                              const Icon = serviceIcons[svc] || Plane
                              return (
                                <Badge key={svc} variant="outline" className="text-[10px] gap-1 h-5">
                                  <Icon className="h-2.5 w-2.5" />{svc}
                                </Badge>
                              )
                            })}
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{item.location}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{item.moveDate}</span>
                          </div>

                          {/* Move button */}
                          {col.id !== "completed" && col.id !== "cancelled" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full h-7 text-[11px]"
                              onClick={(e) => {
                                e.stopPropagation()
                                const next = getNextStatus(item.status)
                                if (next) moveItem(item.id, next)
                              }}
                            >
                              Move to {columns.find((c) => c.id === getNextStatus(item.status))?.label}
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {colItems.length === 0 && (
                    <div className="rounded-lg border-2 border-dashed p-6 text-center">
                      <p className="text-xs text-muted-foreground">No requests</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Detail Panel */}
        {selectedItem && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-[#0B3C5D]/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 text-[#0B3C5D]" />
                    {selectedItem.candidateName} — Request Details
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedItem(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Facility</p>
                    <p className="text-sm font-medium">{selectedItem.facility}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{selectedItem.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Move Date</p>
                    <p className="text-sm font-medium">{selectedItem.moveDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-medium">{selectedItem.budget}</p>
                  </div>
                </div>

                {selectedItem.notes && (
                  <div className="mt-4 rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm">{selectedItem.notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  {columns.filter((c) => c.id !== "cancelled").map((col) => (
                    <Button
                      key={col.id}
                      variant={selectedItem.status === col.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => moveItem(selectedItem.id, col.id)}
                    >
                      {col.label}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => moveItem(selectedItem.id, "cancelled")}>
                    Cancel
                  </Button>
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => toast.info("Calling candidate...")}>
                      <Phone className="h-3.5 w-3.5 mr-1" />Call
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Emailing candidate...")}>
                      <Mail className="h-3.5 w-3.5 mr-1" />Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}
