"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import {
  MapPin, Calendar, Clock, DollarSign, Send, Copy, Download,
  Edit, Plane, Home, Car, Package, Shield, Star, CheckCircle2,
  Building2, User, Sparkles, MessageSquare, Target, ArrowLeft,
  FileText, Heart, TrendingUp,
} from "lucide-react"

const mockOffer = {
  id: "offer-001",
  status: "SENT",
  candidateName: "Sarah Johnson",
  candidateEmail: "sarah.johnson@email.com",
  candidateSpecialty: "ICU RN",
  facilityName: "Memorial Medical Center",
  facilityCity: "Portland",
  facilityState: "OR",
  startDate: "2026-06-15",
  durationWeeks: 13,
  shift: "Day Shift (7a-7p)",
  weeklyPay: 2850,
  taxableRate: 42,
  stipend: 1200,
  totalContractValue: 52650,
  perks: {
    flightSupport: true,
    housingAssistance: true,
    carRental: false,
    relocationConcierge: true,
    firstWeekReadiness: true,
    emergencyHousing: false,
    loyaltyRewards: true,
  },
  aiBoost: {
    estimatedAcceptanceBoost: 32,
    closeStrategy: [
      "Lead with the total contract value of $52,650 — frame it as earning potential",
      "Emphasize Portland's quality of life: food scene, outdoor recreation, mild climate",
      "Highlight the full mobility package (flight + housing + concierge)",
      "Mention the loyalty rewards program for future assignments",
      "Create urgency: multiple candidates are being considered for this position",
    ],
    confidenceScore: 78,
  },
  createdAt: "2026-05-05T10:30:00Z",
  sentAt: "2026-05-05T11:00:00Z",
}

const perksList = [
  { key: "flightSupport", label: "Flight Support", icon: Plane, color: "text-blue-600 bg-blue-50" },
  { key: "housingAssistance", label: "Housing Assistance", icon: Home, color: "text-emerald-600 bg-emerald-50" },
  { key: "carRental", label: "Car Rental", icon: Car, color: "text-purple-600 bg-purple-50" },
  { key: "relocationConcierge", label: "Relocation Concierge", icon: Package, color: "text-orange-600 bg-orange-50" },
  { key: "firstWeekReadiness", label: "First Week Readiness", icon: Shield, color: "text-[#0B3C5D] bg-[#0B3C5D]/10" },
  { key: "emergencyHousing", label: "Emergency Housing", icon: Home, color: "text-red-600 bg-red-50" },
  { key: "loyaltyRewards", label: "Loyalty Rewards", icon: Star, color: "text-amber-600 bg-amber-50" },
]

const statusColorMap: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-700",
  SENT: "bg-blue-50 text-blue-700",
  VIEWED: "bg-purple-50 text-purple-700",
  ACCEPTED: "bg-emerald-50 text-emerald-700",
  DECLINED: "bg-red-50 text-red-700",
}

export default function OfferPreviewPage() {
  const [sending, setSending] = useState(false)
  const offer = mockOffer
  const enabledPerks = perksList.filter(
    (p) => offer.perks[p.key as keyof typeof offer.perks]
  )

  const handleSendToCandidate = async () => {
    setSending(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    toast.success("Offer sent to candidate!", { description: `Email sent to ${offer.candidateEmail}` })
  }

  return (
    <DashboardLayout role="agency">
      <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => toast.info("Navigating back...")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#1F2937]">Offer Preview</h1>
                <Badge className={statusColorMap[offer.status]}>{offer.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Created May 5, 2026 &bull; Sent May 5, 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => toast.info("Opening editor...")}>
              <Edit className="h-4 w-4 mr-1.5" />
              Edit Offer
            </Button>
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(`https://orbit.trital.com/offer/${offer.id}`); toast.success("Link copied to clipboard!") }}>
              <Copy className="h-4 w-4 mr-1.5" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("PDF downloading...", { description: "Offer PDF will be ready shortly" })}>
              <Download className="h-4 w-4 mr-1.5" />
              Download PDF
            </Button>
            <Button size="sm" className="bg-[#E63946] hover:bg-[#E63946]/90" onClick={handleSendToCandidate} disabled={sending}>
              <Send className="h-4 w-4 mr-1.5" />
              {sending ? "Sending..." : "Send to Candidate"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Pay Hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 p-8 text-white">
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                    <DollarSign className="h-4 w-4" />
                    Weekly Compensation
                  </div>
                  <div className="text-5xl font-bold tracking-tight">{formatCurrency(offer.weeklyPay)}<span className="text-xl font-normal text-white/60">/week</span></div>
                  <div className="flex items-center gap-6 mt-4 text-sm text-white/70">
                    <span>${offer.taxableRate}/hr taxable</span>
                    <span>{formatCurrency(offer.stipend)}/week stipend</span>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <p className="text-sm text-white/60 mb-1">Total Assignment Value</p>
                    <p className="text-3xl font-bold">{formatCurrency(offer.totalContractValue)}</p>
                    <p className="text-xs text-white/50 mt-1">{offer.durationWeeks} weeks total contract</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Assignment Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#0B3C5D]" />
                    Assignment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Facility</p>
                      <p className="text-sm font-medium">{offer.facilityName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />Location</p>
                      <p className="text-sm font-medium">{offer.facilityCity}, {offer.facilityState}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />Start Date</p>
                      <p className="text-sm font-medium">{new Date(offer.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />Duration</p>
                      <p className="text-sm font-medium">{offer.durationWeeks} weeks</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Shift</p>
                      <p className="text-sm font-medium">{offer.shift}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Specialty</p>
                      <p className="text-sm font-medium">{offer.candidateSpecialty}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mobility Perks */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Heart className="h-4 w-4 text-[#E63946]" />
                    Included Mobility Perks
                    <Badge variant="secondary" className="text-[10px]">{enabledPerks.length} included</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {enabledPerks.map((perk, i) => (
                      <motion.div
                        key={perk.key}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className={`flex items-center gap-3 rounded-xl border p-4 ${perk.color}`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shrink-0">
                          <perk.icon className={`h-5 w-5 ${perk.color.split(" ")[0]}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{perk.label}</p>
                          <p className="text-xs opacity-70">Included in package</p>
                        </div>
                        <CheckCircle2 className="h-5 w-5 ml-auto text-emerald-600" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Housing Support", icon: Home, color: "text-emerald-600", desc: "Fully furnished housing near your facility, move-in ready", active: offer.perks.housingAssistance },
                { title: "Travel Support", icon: Plane, color: "text-blue-600", desc: "Round-trip flight booking and reimbursement", active: offer.perks.flightSupport },
                { title: "Transportation", icon: Car, color: "text-purple-600", desc: "Weekly car rental for commute and local travel", active: offer.perks.carRental },
              ].map((block, i) => (
                <motion.div key={block.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }}>
                  <Card className={block.active ? "" : "opacity-50"}>
                    <CardContent className="pt-6 text-center">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl mx-auto mb-3 ${block.active ? "bg-slate-50" : "bg-slate-100"}`}>
                        <block.icon className={`h-6 w-6 ${block.color}`} />
                      </div>
                      <p className="font-semibold text-sm">{block.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{block.desc}</p>
                      <Badge variant={block.active ? "default" : "outline"} className="mt-3 text-[10px]">
                        {block.active ? "Included" : "Not Included"}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - 1 col */}
          <div className="space-y-6">
            {/* Candidate Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B3C5D]/10">
                      <User className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <div>
                      <p className="font-semibold">{offer.candidateName}</p>
                      <p className="text-xs text-muted-foreground">{offer.candidateSpecialty}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{offer.candidateEmail}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Confidence Score */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#0B3C5D]" />
                    Candidate Confidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative h-32 w-32">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                        <circle
                          cx="18" cy="18" r="16" fill="none"
                          stroke={offer.aiBoost.confidenceScore >= 70 ? "#10b981" : offer.aiBoost.confidenceScore >= 40 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="2.5"
                          strokeDasharray={`${offer.aiBoost.confidenceScore} ${100 - offer.aiBoost.confidenceScore}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-[#1F2937]">{offer.aiBoost.confidenceScore}%</span>
                        <span className="text-[10px] text-muted-foreground">Score</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Based on offer competitiveness, market data, and candidate preferences
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Acceptance Boost */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Card className="border-emerald-200 bg-emerald-50/30">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-emerald-700">+{offer.aiBoost.estimatedAcceptanceBoost}%</p>
                  <p className="text-xs text-emerald-600 mt-1">Estimated acceptance boost with AI enhancement</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Close Strategy */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#0B3C5D]" />
                    AI Close Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {offer.aiBoost.closeStrategy.map((strategy, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0B3C5D]/10 shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-[#0B3C5D]">{i + 1}</span>
                        </div>
                        <span className="text-slate-700">{strategy}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
