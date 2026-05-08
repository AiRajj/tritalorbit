"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane,
  Home,
  Car,
  Package,
  ClipboardCheck,
  Building2,
  Star,
  Send,
  Copy,
  Download,
  Pencil,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Shield,
  Target,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const mockOffer = {
  id: "off-preview-001",
  token: "a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
  status: "READY" as string,
  createdAt: "2026-05-06T10:30:00Z",
  candidate: {
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "(555) 234-5678",
    role: "RN",
    specialty: "ICU",
    licenseState: "CA",
    yearsOfExperience: 7,
  },
  assignment: {
    facilityName: "Cedars-Sinai Medical Center",
    city: "Los Angeles",
    state: "CA",
    startDate: "2026-06-15",
    duration: 13,
    shift: "Night",
    specialty: "ICU",
    mspClient: "AMN Healthcare",
  },
  compensation: {
    weeklyPay: 2850,
    taxableRate: 1200,
    stipend: 1650,
    totalContractValue: 37050,
  },
  perks: {
    flightSupport: true,
    housingAssistance: true,
    carRental: true,
    relocationConcierge: false,
    firstWeekReadiness: true,
    emergencyHousing: true,
    loyaltyRewards: true,
  },
  aiEnhancement: {
    closeStrategy:
      "Lead with the total value of the offer — $37,050 over 13 weeks with 5 premium mobility perks. Emphasize that furnished housing near Cedars-Sinai and coordinated flights are included, removing all logistical friction. Highlight the loyalty completion bonus as an additional incentive. If Sarah raises rate concerns, reframe around total value — the perks alone save over $3,000 in out-of-pocket costs.",
    talkingPoints: [
      "Competitive $2,850/week rate for ICU RN in the LA market",
      "5 premium mobility perks included — most agencies offer zero",
      "Furnished housing near Cedars-Sinai eliminates apartment hunting",
      "Flight coordination removes travel planning stress",
      "Loyalty bonus rewards completing the full 13-week assignment",
      "Cedars-Sinai is a Magnet-designated, nationally ranked hospital",
    ],
    objectionHandlers: [
      {
        objection: "The rate is lower than expected",
        response:
          "When you factor in the 5 included perks — housing, flights, car rental, first-week readiness, and loyalty bonus — the total value exceeds $40,000. Most competing offers don't include these.",
      },
      {
        objection: "I'm considering other locations",
        response:
          "Los Angeles offers exceptional earning potential and quality of life. With Cedars-Sinai's reputation, this assignment strengthens your resume significantly.",
      },
      {
        objection: "I need to start sooner/later",
        response:
          "We have flexibility on the start date. Let's find a date that works perfectly for you while keeping this premium package locked in.",
      },
    ],
  },
  confidenceScore: 82,
  scoreBreakdown: {
    compensation: 85,
    perks: 90,
    facilityReputation: 88,
    locationDesirability: 75,
    candidateMatch: 78,
  },
};

const PERK_CONFIG = [
  { key: "flightSupport", label: "Flight Support", description: "Round-trip flight coordination to Los Angeles", icon: Plane },
  { key: "housingAssistance", label: "Housing Assistance", description: "Furnished housing near Cedars-Sinai", icon: Home },
  { key: "carRental", label: "Car Rental", description: "Weekly car rental in the LA area", icon: Car },
  { key: "relocationConcierge", label: "Relocation Concierge", description: "Full-service relocation coordination", icon: Package },
  { key: "firstWeekReadiness", label: "First Week Readiness", description: "Orientation prep, badge, parking, scrubs", icon: ClipboardCheck },
  { key: "emergencyHousing", label: "Emergency Housing", description: "Temporary housing for first 3 days", icon: Building2 },
  { key: "loyaltyRewards", label: "Loyalty Rewards", description: "Completion bonus for full assignment", icon: Star },
];

const housingOptions = [
  {
    name: "The Residences at Beverly",
    type: "1BR Furnished Apartment",
    distance: "2.1 miles from facility",
    amenities: "Pool, Gym, In-unit W/D",
    gradient: "from-[#0B3C5D]/20 to-[#0B3C5D]/5",
  },
  {
    name: "Miracle Mile Suites",
    type: "Studio Furnished Suite",
    distance: "1.8 miles from facility",
    amenities: "Rooftop, Parking, Pet-Friendly",
    gradient: "from-[#E63946]/20 to-[#E63946]/5",
  },
  {
    name: "West Hollywood Living",
    type: "1BR Modern Apartment",
    distance: "3.4 miles from facility",
    amenities: "Concierge, Gym, Terrace",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "destructive" }> = {
  DRAFT: { label: "Draft", variant: "secondary" },
  READY: { label: "Ready to Send", variant: "warning" },
  SENT: { label: "Sent", variant: "default" },
  VIEWED: { label: "Viewed", variant: "warning" },
  ACCEPTED: { label: "Accepted", variant: "success" },
  DECLINED: { label: "Declined", variant: "destructive" },
};

export default function OfferPreviewPage() {
  const { toast } = useToast();
  const [offerStatus, setOfferStatus] = useState(mockOffer.status);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showSentConfirmation, setShowSentConfirmation] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const enabledPerks = PERK_CONFIG.filter(
    (p) => mockOffer.perks[p.key as keyof typeof mockOffer.perks]
  );

  const currentStatus = statusConfig[offerStatus] || statusConfig.DRAFT;
  const candidatePortalUrl = `https://orbit.trital.com/offer/${mockOffer.token}`;

  async function handleSendOffer() {
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSending(false);
    setShowSendDialog(false);
    setOfferStatus("SENT");
    setShowSentConfirmation(true);
    toast({
      title: "Offer sent successfully",
      description: `Offer has been sent to ${mockOffer.candidate.email}`,
    });
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(candidatePortalUrl);
    toast({
      title: "Link copied",
      description: "Candidate portal URL copied to clipboard",
    });
  }

  function handleDownloadPDF() {
    toast({
      title: "PDF generation ready",
      description: "Your offer PDF is being generated and will download shortly.",
    });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#1F2937]/60 mb-6">
          <Link href="/agency/offers" className="hover:text-[#0B3C5D] transition-colors">Offers</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#0B3C5D] font-medium">Offer Preview</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-[#1F2937]">Offer Preview</h1>
              <Badge variant={currentStatus.variant}>{currentStatus.label}</Badge>
            </div>
            <p className="text-[#1F2937]/60">
              {mockOffer.candidate.firstName} {mockOffer.candidate.lastName} — {mockOffer.candidate.role} at {mockOffer.assignment.facilityName}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <Copy className="mr-1 h-3.5 w-3.5" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="mr-1 h-3.5 w-3.5" />
              PDF
            </Button>
          </div>
        </div>

        {/* Sent Confirmation Banner */}
        {showSentConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-800">Offer sent successfully</p>
                <p className="mt-1 text-sm text-emerald-700">
                  Sent to {mockOffer.candidate.email} on {new Date().toLocaleDateString()}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-emerald-600">Candidate portal:</span>
                  <code className="rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 font-mono">
                    {candidatePortalUrl.slice(0, 55)}...
                  </code>
                  <button onClick={handleCopyLink} className="text-emerald-600 hover:text-emerald-800">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content - Left 2 columns */}
          <div className="space-y-6 lg:col-span-2">
            {/* Premium Offer Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Offer Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B3C5D]/10">
                      <span className="text-lg font-bold text-[#0B3C5D]">
                        {mockOffer.candidate.firstName[0]}{mockOffer.candidate.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1F2937]">
                        {mockOffer.candidate.firstName} {mockOffer.candidate.lastName}
                      </h3>
                      <p className="text-sm text-[#1F2937]/60">
                        {mockOffer.candidate.role} — {mockOffer.candidate.specialty} · {mockOffer.candidate.yearsOfExperience} years experience
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-[#0B3C5D]" />
                      <div>
                        <p className="text-xs text-[#1F2937]/50">Facility</p>
                        <p className="text-sm font-medium">{mockOffer.assignment.facilityName}</p>
                        <p className="text-xs text-[#1F2937]/60">{mockOffer.assignment.city}, {mockOffer.assignment.state}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-0.5 text-[#0B3C5D]" />
                      <div>
                        <p className="text-xs text-[#1F2937]/50">Duration</p>
                        <p className="text-sm font-medium">{mockOffer.assignment.duration} weeks</p>
                        <p className="text-xs text-[#1F2937]/60">Start {mockOffer.assignment.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-[#0B3C5D]" />
                      <div>
                        <p className="text-xs text-[#1F2937]/50">Shift</p>
                        <p className="text-sm font-medium">{mockOffer.assignment.shift}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 mt-0.5 text-[#0B3C5D]" />
                      <div>
                        <p className="text-xs text-[#1F2937]/50">MSP</p>
                        <p className="text-sm font-medium">{mockOffer.assignment.mspClient}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Compensation Block */}
                  <div className="rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/70">Weekly Pay</p>
                        <p className="text-3xl font-bold">{formatCurrency(mockOffer.compensation.weeklyPay)}</p>
                      </div>
                      <DollarSign className="h-10 w-10 text-white/20" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 border-t border-white/20 pt-4">
                      <div>
                        <p className="text-xs text-white/50">Taxable Rate</p>
                        <p className="text-lg font-semibold">{formatCurrency(mockOffer.compensation.taxableRate)}/wk</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Stipend</p>
                        <p className="text-lg font-semibold">{formatCurrency(mockOffer.compensation.stipend)}/wk</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Total Contract</p>
                        <p className="text-lg font-semibold">{formatCurrency(mockOffer.compensation.totalContractValue)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Included Mobility Perks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Included Mobility Perks</CardTitle>
                  <Badge>{enabledPerks.length} included</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {enabledPerks.map((perk) => {
                    const Icon = perk.icon;
                    return (
                      <motion.div
                        key={perk.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 rounded-lg border border-[#0B3C5D]/10 bg-[#0B3C5D]/5 p-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
                          <Icon className="h-4 w-4 text-[#0B3C5D]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0B3C5D]">{perk.label}</p>
                          <p className="text-xs text-[#1F2937]/60">{perk.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Housing Support */}
            {mockOffer.perks.housingAssistance && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-[#0B3C5D]" />
                    Housing Options
                  </CardTitle>
                  <CardDescription>Available furnished housing near {mockOffer.assignment.facilityName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {housingOptions.map((option, idx) => (
                      <div key={idx} className="overflow-hidden rounded-xl border border-[#1F2937]/10">
                        <div className={cn("h-32 bg-gradient-to-br", option.gradient, "flex items-center justify-center")}>
                          <Home className="h-10 w-10 text-[#1F2937]/20" />
                        </div>
                        <div className="p-3">
                          <p className="font-semibold text-sm text-[#1F2937]">{option.name}</p>
                          <p className="text-xs text-[#1F2937]/60">{option.type}</p>
                          <div className="mt-2 flex items-center gap-1 text-xs text-[#0B3C5D]">
                            <MapPin className="h-3 w-3" />
                            {option.distance}
                          </div>
                          <p className="mt-1 text-xs text-[#1F2937]/50">{option.amenities}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Travel Support */}
            {mockOffer.perks.flightSupport && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-[#0B3C5D]" />
                    Travel Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B3C5D]/10">
                        <Plane className="h-5 w-5 text-[#0B3C5D]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1F2937]">Round-trip Flight Coordination</p>
                        <p className="mt-1 text-sm text-[#1F2937]/60">
                          Our mobility concierge will coordinate your round-trip flights to Los Angeles.
                          Flights are booked within 48 hours of assignment confirmation and include
                          one checked bag. Return flight is scheduled for the week after assignment completion.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Badge variant="outline" className="text-xs">Departure: Home → LAX</Badge>
                          <Badge variant="outline" className="text-xs">Return: LAX → Home</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Transportation Support */}
            {mockOffer.perks.carRental && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-[#0B3C5D]" />
                    Transportation Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B3C5D]/10">
                        <Car className="h-5 w-5 text-[#0B3C5D]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1F2937]">Weekly Car Rental</p>
                        <p className="mt-1 text-sm text-[#1F2937]/60">
                          A rental car will be arranged for the duration of your assignment in Los Angeles.
                          Vehicle pickup is coordinated at LAX upon arrival with GPS navigation included.
                          Standard midsize or compact SUV options available.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Badge variant="outline" className="text-xs">13-week rental</Badge>
                          <Badge variant="outline" className="text-xs">Insurance included</Badge>
                          <Badge variant="outline" className="text-xs">Unlimited mileage</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Close Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#0B3C5D]" />
                  AI-Generated Close Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-[#0B3C5D]/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-[#0B3C5D]" />
                    <h4 className="font-semibold text-[#0B3C5D]">Strategy</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-[#1F2937]/80">
                    {mockOffer.aiEnhancement.closeStrategy}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-[#0B3C5D]" />
                    <h4 className="font-semibold text-[#1F2937]">Key Talking Points</h4>
                  </div>
                  <div className="space-y-2">
                    {mockOffer.aiEnhancement.talkingPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                        <p className="text-sm text-[#1F2937]/80">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <h4 className="font-semibold text-[#1F2937]">Objection Handlers</h4>
                  </div>
                  <div className="space-y-3">
                    {mockOffer.aiEnhancement.objectionHandlers.map((handler, idx) => (
                      <div key={idx} className="rounded-lg border border-[#1F2937]/10 p-3">
                        <p className="text-sm font-medium text-[#E63946]">
                          &ldquo;{handler.objection}&rdquo;
                        </p>
                        <p className="mt-1.5 text-sm text-[#1F2937]/70">{handler.response}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right column */}
          <div className="space-y-6">
            {/* Candidate Confidence Score */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Confidence Score</CardTitle>
                <CardDescription>AI-predicted acceptance likelihood</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#0B3C5D"
                        strokeWidth="10"
                        strokeDasharray={`${(mockOffer.confidenceScore / 100) * 327} 327`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-[#0B3C5D]">{mockOffer.confidenceScore}</span>
                      <span className="text-xs text-[#1F2937]/50">/100</span>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    {Object.entries(mockOffer.scoreBreakdown).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="capitalize text-[#1F2937]/70">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="font-medium text-[#1F2937]">{value}</span>
                        </div>
                        <Progress value={value} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#1F2937]/60">Offer ID</span>
                  <span className="font-mono text-xs">{mockOffer.id}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-[#1F2937]/60">Created</span>
                  <span>{new Date(mockOffer.createdAt).toLocaleDateString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-[#1F2937]/60">Candidate</span>
                  <span>{mockOffer.candidate.email}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-[#1F2937]/60">Perks</span>
                  <Badge variant="secondary">{enabledPerks.length} active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 left-0 right-0 mt-8 -mx-4 border-t border-[#1F2937]/10 bg-white/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-[#1F2937]/60">
              <span className="font-medium text-[#1F2937]">
                {mockOffer.candidate.firstName} {mockOffer.candidate.lastName}
              </span>{" "}
              · {mockOffer.candidate.role} · {formatCurrency(mockOffer.compensation.weeklyPay)}/wk
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/agency/offers/create">
                  <Pencil className="mr-1 h-3.5 w-3.5" />
                  Edit Offer
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                <Download className="mr-1 h-3.5 w-3.5" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="mr-1 h-3.5 w-3.5" />
                Copy Link
              </Button>
              <Button
                size="sm"
                onClick={() => setShowSendDialog(true)}
                disabled={offerStatus === "SENT"}
              >
                <Send className="mr-1 h-3.5 w-3.5" />
                {offerStatus === "SENT" ? "Sent" : "Send to Candidate"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Send Confirmation Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Offer to Candidate</DialogTitle>
            <DialogDescription>
              This will send the offer package to {mockOffer.candidate.firstName} {mockOffer.candidate.lastName} at{" "}
              <strong>{mockOffer.candidate.email}</strong>. The candidate will receive an email with a link to
              view and accept the offer.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg bg-[#F8FAFC] p-3 text-sm">
            <p className="font-medium text-[#1F2937]">Offer includes:</p>
            <ul className="mt-1 space-y-1 text-[#1F2937]/70">
              <li>• {formatCurrency(mockOffer.compensation.weeklyPay)}/week for {mockOffer.assignment.duration} weeks</li>
              <li>• {enabledPerks.length} mobility perks</li>
              <li>• Total value: {formatCurrency(mockOffer.compensation.totalContractValue)}</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendOffer} disabled={isSending}>
              {isSending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="mr-1 h-4 w-4" />
                  </motion.div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-1 h-4 w-4" />
                  Confirm &amp; Send
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
