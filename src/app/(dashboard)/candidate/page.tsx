"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
  MapPin, Building2,
  CheckCircle2, Circle, FileText, Home, Upload,
  Phone, Mail, MessageSquare, Shield,
  Briefcase, ExternalLink,
} from "lucide-react"

const activeAssignment = {
  facility: "Memorial Hospital",
  location: "Portland, OR",
  specialty: "ICU RN",
  startDate: "May 15, 2026",
  endDate: "Aug 15, 2026",
  weeklyPay: "$2,850",
  status: "confirmed",
  recruiter: "Jordan Taylor",
  recruiterInitials: "JT",
  agency: "Acme Health Staffing",
}

const offers = [
  { id: "1", facility: "Memorial Hospital", location: "Portland, OR", specialty: "ICU RN", pay: "$2,850/wk", status: "accepted", startDate: "May 15, 2026", duration: "13 weeks" },
  { id: "2", facility: "St. Mary's Medical", location: "Seattle, WA", specialty: "ICU RN", pay: "$3,100/wk", status: "sent", startDate: "Jun 1, 2026", duration: "13 weeks" },
  { id: "3", facility: "City General", location: "San Francisco, CA", specialty: "ER Float", pay: "$3,250/wk", status: "expired", startDate: "Apr 20, 2026", duration: "8 weeks" },
]

const bookingRequest = {
  status: "in_progress",
  address: "1242 NW Everett St, Apt 4B",
  city: "Portland, OR",
  moveIn: "May 12, 2026",
  vendor: "HomeFinder Pro",
  type: "Furnished 1BR",
  monthlyRate: "$1,800",
}

const moveChecklist = [
  { id: "1", label: "Accept offer", completed: true },
  { id: "2", label: "Submit required documents", completed: true },
  { id: "3", label: "Complete compliance training", completed: true },
  { id: "4", label: "Housing booking confirmed", completed: false },
  { id: "5", label: "Travel arrangements", completed: false },
  { id: "6", label: "First day orientation details", completed: false },
]

const documents = [
  { name: "RN License - Oregon", status: "verified", expiry: "Dec 2027", type: "license" },
  { name: "BLS Certification", status: "verified", expiry: "Mar 2027", type: "cert" },
  { name: "ACLS Certification", status: "pending", expiry: "—", type: "cert" },
  { name: "TB Test Results", status: "verified", expiry: "May 2027", type: "health" },
  { name: "Background Check", status: "verified", expiry: "May 2027", type: "compliance" },
  { name: "Drug Screen", status: "pending", expiry: "—", type: "health" },
]

const completedDocs = documents.filter(d => d.status === "verified").length
const totalDocs = documents.length

export default function CandidateDashboard() {
  return (
    <DashboardLayout role="candidate">
      <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Welcome back, Alex</h1>
            <p className="text-sm text-muted-foreground mt-1">Here&apos;s your assignment overview</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info("Support chat opening...")}>
              <MessageSquare className="h-4 w-4 mr-1.5" />
              Get Help
            </Button>
          </div>
        </div>

        {/* Active Assignment Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="overflow-hidden border-[#0B3C5D]/20">
            <div className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/80 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Badge className="bg-white/20 text-white border-0 mb-2">Active Assignment</Badge>
                  <h2 className="text-xl font-bold">{activeAssignment.facility}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{activeAssignment.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{activeAssignment.specialty}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-white/60">Weekly Pay</p>
                    <p className="text-lg font-bold">{activeAssignment.weeklyPay}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/60">Start Date</p>
                    <p className="text-lg font-bold">{activeAssignment.startDate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/60">End Date</p>
                    <p className="text-lg font-bold">{activeAssignment.endDate}</p>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-semibold">
                      {activeAssignment.recruiterInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Your Recruiter: {activeAssignment.recruiter}</p>
                    <p className="text-xs text-muted-foreground">{activeAssignment.agency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.info("Calling recruiter...")}>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Emailing recruiter...")}>
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* My Offers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#0B3C5D]" />
                My Offers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {offers.map((offer, i) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 rounded-lg border p-3.5 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => toast.info(`Viewing offer from ${offer.facility}`)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
                    <Building2 className="h-5 w-5 text-[#0B3C5D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{offer.facility}</p>
                      <StatusBadge status={offer.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {offer.location} · {offer.specialty} · {offer.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{offer.pay}</p>
                    <p className="text-xs text-muted-foreground">{offer.startDate}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Booking Request */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Home className="h-4 w-4 text-purple-600" />
                Housing & Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Booking Status</span>
                  <StatusBadge status={bookingRequest.status} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="font-medium">{bookingRequest.address}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium">{bookingRequest.city}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Move-in</span><span className="font-medium">{bookingRequest.moveIn}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{bookingRequest.type}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Monthly Rate</span><span className="font-semibold text-[#0B3C5D]">{bookingRequest.monthlyRate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Vendor</span><span className="font-medium">{bookingRequest.vendor}</span></div>
                </div>
                <Button className="w-full" variant="outline" size="sm" onClick={() => toast.info("Viewing booking details...")}>
                  View Full Details
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Move Checklist */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Move Checklist</CardTitle>
                <span className="text-sm text-muted-foreground font-medium">{moveChecklist.filter(i => i.completed).length}/{moveChecklist.length}</span>
              </div>
              <Progress value={(moveChecklist.filter(i => i.completed).length / moveChecklist.length) * 100} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              {moveChecklist.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => {
                    if (!item.completed) toast.info(`Starting: ${item.label}`)
                  }}
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-300 shrink-0" />
                  )}
                  <span className={`text-sm ${item.completed ? "text-muted-foreground line-through" : "font-medium"}`}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#0B3C5D]" />
                  Documents & Credentials
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => toast.info("Upload dialog opening...")}>
                  <Upload className="h-4 w-4 mr-1.5" />
                  Upload
                </Button>
              </div>
              <CardDescription className="mt-1">{completedDocs} of {totalDocs} verified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {documents.map((doc, i) => (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-lg border p-3 hover:bg-slate-50 transition-colors"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${doc.status === "verified" ? "bg-emerald-50" : "bg-amber-50"}`}>
                    <FileText className={`h-4 w-4 ${doc.status === "verified" ? "text-emerald-600" : "text-amber-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">Expires: {doc.expiry}</p>
                  </div>
                  <StatusBadge status={doc.status === "verified" ? "completed" : "pending"} />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Support Contact */}
        <Card className="bg-gradient-to-r from-[#0B3C5D]/5 to-transparent border-[#0B3C5D]/10">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
                <MessageSquare className="h-6 w-6 text-[#0B3C5D]" />
              </div>
              <div>
                <p className="font-semibold">Need help with your assignment?</p>
                <p className="text-sm text-muted-foreground">Your concierge team is here to assist 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => toast.info("Live chat opening...")}>
                <MessageSquare className="h-4 w-4 mr-1.5" />
                Live Chat
              </Button>
              <Button onClick={() => toast.info("Calling support...")}>
                <Phone className="h-4 w-4 mr-1.5" />
                Call Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
