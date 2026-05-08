"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import {
  MapPin, Calendar, Clock, Plane, Home, Car, Package,
  CheckCircle2, Phone, Mail, MessageSquare, Shield, Star,
  Building2, Sparkles,
} from "lucide-react"

const mockOffer = {
  candidateName: "Sarah",
  candidateFullName: "Sarah Johnson",
  recruiterName: "Michael Chen",
  recruiterPhone: "(555) 234-5678",
  recruiterEmail: "michael.chen@agency.com",
  facilityName: "Memorial Medical Center",
  facilityCity: "Portland",
  facilityState: "OR",
  specialty: "ICU RN",
  shift: "Day Shift (7a-7p)",
  startDate: "2026-06-15",
  durationWeeks: 13,
  weeklyPay: 2850,
  stipend: 1200,
  totalContractValue: 52650,
  perks: {
    flightSupport: true,
    housingAssistance: true,
    carRental: false,
    relocationConcierge: true,
    firstWeekReadiness: true,
  },
}

const checklist = [
  { id: "review-offer", label: "Review offer details" },
  { id: "check-dates", label: "Verify start date availability" },
  { id: "license-check", label: "Confirm license is current for Oregon" },
  { id: "housing-preference", label: "Submit housing preferences" },
  { id: "travel-details", label: "Provide travel/flight details" },
  { id: "documents", label: "Upload required documents" },
  { id: "orientation", label: "Review orientation materials" },
]

const travelOptions = [
  { title: "Round-Trip Flight", desc: "Economy class to Portland, OR", icon: Plane, included: true },
  { title: "Airport Pickup", desc: "Complimentary ride from PDX to housing", icon: Car, included: true },
  { title: "Luggage Allowance", desc: "2 checked bags covered", icon: Package, included: true },
]

const housingOptions = [
  { title: "Furnished 1BR Apartment", desc: "10 min from Memorial Medical Center", price: "$1,600/mo", distance: "3.2 miles", amenities: "WiFi, Parking, Laundry", rating: 4.8 },
  { title: "Studio Near Downtown", desc: "Modern studio in Pearl District", price: "$1,400/mo", distance: "4.5 miles", amenities: "WiFi, Gym, Rooftop", rating: 4.6 },
]

const carOptions = [
  { title: "Economy Sedan", desc: "Toyota Corolla or similar", price: "$280/week", icon: Car },
  { title: "Compact SUV", desc: "Honda CR-V or similar", price: "$350/week", icon: Car },
]

export default function CandidateOfferPage() {
  const [completedItems, setCompletedItems] = useState<string[]>(["review-offer"])
  const [, setTracking] = useState({ viewed: true, clickedHousing: false, clickedTravel: false, requestedSupport: false, accepted: false })

  const trackAction = (action: string) => {
    fetch("/api/activity-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, candidateName: mockOffer.candidateFullName, timestamp: new Date().toISOString() }),
    }).catch(() => {})
  }

  const toggleCheckItem = (id: string) => {
    setCompletedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B3C5D]/5 to-[#F8FAFC]">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/80 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              New Offer
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome, {mockOffer.candidateName}!
            </h1>
            <p className="text-white/70 mt-2 text-lg">
              You have an exciting new assignment opportunity waiting for you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 -mt-4">
        {/* Assignment Summary Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-lg border-0">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
                  <Building2 className="h-6 w-6 text-[#0B3C5D]" />
                </div>
                <div>
                  <p className="font-bold text-lg text-[#1F2937]">{mockOffer.facilityName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />{mockOffer.facilityCity}, {mockOffer.facilityState}
                  </p>
                </div>
              </div>

              {/* Weekly Pay - Prominent */}
              <div className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/80 rounded-xl p-5 text-white text-center">
                <p className="text-sm text-white/70">Weekly Compensation</p>
                <p className="text-4xl font-bold mt-1">{formatCurrency(mockOffer.weeklyPay)}<span className="text-lg font-normal text-white/60">/week</span></p>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-white/60">
                  <span>+ {formatCurrency(mockOffer.stipend)}/week stipend</span>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <p className="text-xs text-white/50">Total Contract Value</p>
                  <p className="text-2xl font-bold">{formatCurrency(mockOffer.totalContractValue)}</p>
                </div>
              </div>

              {/* Quick Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <Calendar className="h-4 w-4 text-[#0B3C5D] mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-semibold">{new Date(mockOffer.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <Clock className="h-4 w-4 text-[#0B3C5D] mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-semibold">{mockOffer.durationWeeks} Weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Travel Support */}
        {mockOffer.perks.flightSupport && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Plane className="h-4 w-4 text-blue-600" />
                  Travel Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {travelOptions.map((opt) => (
                  <div key={opt.title} className="flex items-center gap-3 rounded-lg bg-blue-50/50 border border-blue-100 p-3" onClick={() => { setTracking((t) => ({ ...t, clickedTravel: true })); trackAction("clicked_travel") }}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                      <opt.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{opt.title}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Housing Options */}
        {mockOffer.perks.housingAssistance && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Home className="h-4 w-4 text-emerald-600" />
                  Housing Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {housingOptions.map((opt) => (
                  <div
                    key={opt.title}
                    className="rounded-xl border p-4 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors cursor-pointer"
                    onClick={() => { setTracking((t) => ({ ...t, clickedHousing: true })); trackAction("clicked_housing"); toast.info(`Viewing ${opt.title} details`) }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-sm">{opt.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      <p className="font-bold text-emerald-700">{opt.price}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{opt.distance}</span>
                      <span>{opt.amenities}</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{opt.rating}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Car Rental Options */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Car className="h-4 w-4 text-purple-600" />
                Car Rental Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {carOptions.map((opt) => (
                <div key={opt.title} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-purple-50/30 transition-colors cursor-pointer" onClick={() => toast.info(`Viewing ${opt.title} details`)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                    <opt.icon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{opt.title}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                  <p className="text-sm font-semibold text-purple-700">{opt.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Move Checklist */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#0B3C5D]" />
                  Move Checklist
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">{completedItems.length}/{checklist.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border p-3 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => toggleCheckItem(item.id)}
                >
                  <Checkbox
                    checked={completedItems.includes(item.id)}
                    onCheckedChange={() => toggleCheckItem(item.id)}
                  />
                  <span className={`text-sm ${completedItems.includes(item.id) ? "line-through text-muted-foreground" : "font-medium"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3">
          <Button
            className="w-full h-14 text-base bg-[#E63946] hover:bg-[#E63946]/90 shadow-lg"
            onClick={() => {
              setTracking((t) => ({ ...t, accepted: true }))
              trackAction("accepted_offer")
              toast.success("Offer accepted! Your recruiter has been notified.", { description: "You'll receive a confirmation email shortly." })
            }}
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Accept Offer
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12" onClick={() => {
              setTracking((t) => ({ ...t, requestedSupport: true }))
              trackAction("requested_travel")
              toast.success("Travel support request submitted!")
            }}>
              <Plane className="h-4 w-4 mr-1.5" />
              Request Travel
            </Button>
            <Button variant="outline" className="h-12" onClick={() => {
              setTracking((t) => ({ ...t, requestedSupport: true }))
              trackAction("requested_housing")
              toast.success("Housing support request submitted!")
            }}>
              <Home className="h-4 w-4 mr-1.5" />
              Request Housing
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12" onClick={() => {
              trackAction("requested_car")
              toast.success("Car rental request submitted!")
            }}>
              <Car className="h-4 w-4 mr-1.5" />
              Request Car
            </Button>
            <Button variant="outline" className="h-12" onClick={() => {
              trackAction("ask_recruiter")
              toast.info("Opening message to your recruiter...")
            }}>
              <MessageSquare className="h-4 w-4 mr-1.5" />
              Ask Recruiter
            </Button>
          </div>
        </motion.div>

        {/* Trust Layer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Card className="bg-slate-50 border-dashed">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#0B3C5D]">
                <Shield className="h-4 w-4" />
                Powered by TRITAL Orbit&trade;
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Your Recruiter</p>
                  <p className="font-medium">{mockOffer.recruiterName}</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.info("Calling recruiter...")}>
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.info("Emailing recruiter...")}>
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Support</p>
                  <p className="font-medium">24/7 Traveler Support</p>
                  <Button variant="ghost" size="sm" className="h-7 text-xs mt-1" onClick={() => toast.info("Connecting to support...")}>
                    <Phone className="h-3 w-3 mr-1" />
                    (800) 555-0199
                  </Button>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Your data is protected and encrypted. This offer is confidential.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
