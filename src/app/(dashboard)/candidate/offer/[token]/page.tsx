"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Plane,
  Home,
  Car,
  Shield,
  Phone,
  Mail,
  Heart,
  Star,
  CheckCircle2,
  Building2,
  Stethoscope,
  MessageCircle,
  ChevronRight,
  Bed,
  Bath,
} from "lucide-react";

const MOCK_OFFER = {
  candidate: {
    firstName: "Sarah",
    lastName: "Chen",
    specialty: "ICU",
  },
  assignment: {
    facility: "Memorial Hospital",
    location: "Houston, TX",
    duration: "13 Weeks",
    shift: "Night",
    specialty: "ICU",
    startDate: "June 15, 2026",
    nurseToPatientRatio: "1:2",
    magnetStatus: true,
  },
  compensation: {
    weeklyPay: 2850,
    contractValue: 37050,
    taxableRate: 28,
    stipend: 1200,
  },
  travel: {
    flightIncluded: true,
    flightDetails: "Round-trip flight coordination from your home city",
    perks: [
      "Flight booking & coordination",
      "Airport pickup arranged",
      "Luggage allowance covered",
    ],
  },
  housing: [
    {
      id: "h1",
      title: "The Lofts at Medical Center",
      location: "6700 Main St, Houston, TX",
      monthlyRate: 1650,
      distanceToFacility: "0.8 miles",
      bedrooms: 1,
      bathrooms: 1,
      furnished: true,
    },
    {
      id: "h2",
      title: "Greenway Plaza Apartments",
      location: "3900 Richmond Ave, Houston, TX",
      monthlyRate: 1450,
      distanceToFacility: "2.1 miles",
      bedrooms: 1,
      bathrooms: 1,
      furnished: true,
    },
    {
      id: "h3",
      title: "Midtown Living Suites",
      location: "2500 Fannin St, Houston, TX",
      monthlyRate: 1850,
      distanceToFacility: "1.4 miles",
      bedrooms: 2,
      bathrooms: 1,
      furnished: true,
    },
  ],
  carRentals: [
    {
      id: "c1",
      vehicle: "Toyota Corolla",
      type: "Economy Sedan",
      weeklyRate: 245,
    },
    {
      id: "c2",
      vehicle: "Honda CR-V",
      type: "Compact SUV",
      weeklyRate: 325,
    },
  ],
  recruiter: {
    name: "Jessica Martinez",
    phone: "(555) 234-5678",
    email: "jessica.martinez@tritalorbit.com",
  },
};

const CHECKLIST_ITEMS = [
  { id: "accept", label: "Accept offer", icon: CheckCircle2 },
  { id: "travel", label: "Confirm travel dates", icon: Calendar },
  { id: "housing", label: "Select housing", icon: Home },
  { id: "transport", label: "Arrange transportation", icon: Car },
  { id: "documents", label: "Upload documents", icon: Shield },
  { id: "orientation", label: "Complete orientation prep", icon: Stethoscope },
];

function trackInteraction(action: string, details?: Record<string, unknown>) {
  console.log(`[TRITAL Orbit Tracking] ${action}`, details || "");
}

export default function CandidateOfferPage() {
  const { toast } = useToast();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [offerAccepted, setOfferAccepted] = useState(false);

  useEffect(() => {
    trackInteraction("offer_viewed", {
      facility: MOCK_OFFER.assignment.facility,
      candidate: `${MOCK_OFFER.candidate.firstName} ${MOCK_OFFER.candidate.lastName}`,
    });
  }, []);

  const handleAcceptOffer = () => {
    setOfferAccepted(true);
    setCheckedItems((prev) => ({ ...prev, accept: true }));
    trackInteraction("offer_accepted", {
      facility: MOCK_OFFER.assignment.facility,
      weeklyPay: MOCK_OFFER.compensation.weeklyPay,
    });
    toast({
      title: "Offer Accepted!",
      description:
        "Congratulations! Your recruiter will be in touch with next steps.",
    });
  };

  const handleRequestTravel = () => {
    trackInteraction("travel_clicked", {
      facility: MOCK_OFFER.assignment.facility,
    });
    toast({
      title: "Travel Support Requested",
      description:
        "Our concierge team will coordinate your travel within 24 hours.",
    });
  };

  const handleRequestHousing = (housingId?: string) => {
    trackInteraction("housing_clicked", {
      housingId,
      facility: MOCK_OFFER.assignment.facility,
    });
    toast({
      title: "Housing Request Sent",
      description:
        "We'll confirm availability and send you the details shortly.",
    });
  };

  const handleRequestCar = () => {
    trackInteraction("car_support_requested", {
      facility: MOCK_OFFER.assignment.facility,
    });
    toast({
      title: "Car Rental Requested",
      description:
        "We'll arrange your rental car and send confirmation details.",
    });
  };

  const handleAskRecruiter = () => {
    trackInteraction("support_requested", {
      recruiter: MOCK_OFFER.recruiter.name,
    });
    toast({
      title: "Message Sent",
      description: `${MOCK_OFFER.recruiter.name} will get back to you shortly.`,
    });
  };

  const handleChecklistToggle = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7]">
        {/* Header */}
        <div className="bg-[#0B3C5D] text-white">
          <div className="mx-auto max-w-2xl px-4 py-6">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
              <Shield className="h-4 w-4" />
              <span>Secure Candidate Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Hi {MOCK_OFFER.candidate.firstName}, here&apos;s your assignment
              with {MOCK_OFFER.assignment.facility}
            </h1>
            <p className="text-white/80 mt-1 text-sm">
              Review your details below and let us know how we can help
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-6 space-y-4 pb-32">
          {/* Assignment Summary Card */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 text-white pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Assignment Details
                </CardTitle>
                {MOCK_OFFER.assignment.magnetStatus && (
                  <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400">
                    <Star className="h-3 w-3 mr-1" />
                    Magnet
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 divide-x divide-y divide-[#1F2937]/10">
                <div className="p-4">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1">
                    Facility
                  </div>
                  <div className="font-semibold text-[#1F2937]">
                    {MOCK_OFFER.assignment.facility}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Location
                  </div>
                  <div className="font-semibold text-[#1F2937]">
                    {MOCK_OFFER.assignment.location}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Duration
                  </div>
                  <div className="font-semibold text-[#1F2937]">
                    {MOCK_OFFER.assignment.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Shift
                  </div>
                  <div className="font-semibold text-[#1F2937]">
                    {MOCK_OFFER.assignment.shift}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Stethoscope className="h-3 w-3" /> Specialty
                  </div>
                  <div className="font-semibold text-[#1F2937]">
                    {MOCK_OFFER.assignment.specialty}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Start Date
                  </div>
                  <div className="font-semibold text-[#0B3C5D]">
                    {MOCK_OFFER.assignment.startDate}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation Card */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 text-center border-b border-[#1F2937]/10 bg-emerald-50/50">
                <div className="text-sm text-emerald-700 font-medium mb-1">
                  Weekly Pay
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-emerald-700">
                  ${MOCK_OFFER.compensation.weeklyPay.toLocaleString()}
                </div>
                <div className="text-sm text-[#1F2937]/60 mt-1">per week</div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-[#1F2937]/10">
                <div className="p-4 text-center">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1">
                    Contract Value
                  </div>
                  <div className="text-lg font-bold text-[#1F2937]">
                    ${MOCK_OFFER.compensation.contractValue.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1">
                    Taxable Rate
                  </div>
                  <div className="text-lg font-bold text-[#1F2937]">
                    ${MOCK_OFFER.compensation.taxableRate}/hr
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-xs text-[#1F2937]/50 uppercase tracking-wider mb-1">
                    Stipend
                  </div>
                  <div className="text-lg font-bold text-[#1F2937]">
                    ${MOCK_OFFER.compensation.stipend.toLocaleString()}/wk
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Support */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-[#0B3C5D]">
                <Plane className="h-5 w-5" />
                Travel Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#1F2937]/70 mb-3">
                {MOCK_OFFER.travel.flightDetails}
              </p>
              <div className="space-y-2">
                {MOCK_OFFER.travel.perks.map((perk, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-[#1F2937]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {perk}
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-4 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90"
                onClick={handleRequestTravel}
              >
                <Plane className="h-4 w-4 mr-2" />
                Request Travel Support
              </Button>
            </CardContent>
          </Card>

          {/* Housing Options */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-[#0B3C5D]">
                <Home className="h-5 w-5" />
                Housing Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_OFFER.housing.map((h) => (
                <div
                  key={h.id}
                  className="rounded-lg border border-[#1F2937]/10 overflow-hidden hover:border-[#0B3C5D]/30 transition-colors"
                >
                  <div className="h-28 bg-gradient-to-br from-[#0B3C5D]/10 via-[#0B3C5D]/5 to-transparent flex items-center justify-center">
                    <Home className="h-10 w-10 text-[#0B3C5D]/20" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-[#1F2937]">
                          {h.title}
                        </h4>
                        <p className="text-xs text-[#1F2937]/60">
                          {h.location}
                        </p>
                      </div>
                      {h.furnished && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-[#0B3C5D]/10 text-[#0B3C5D]"
                        >
                          Furnished
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#1F2937]/60 mb-3">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />$
                        {h.monthlyRate.toLocaleString()}/mo
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {h.distanceToFacility}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="h-3 w-3" />
                        {h.bedrooms} BD
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-3 w-3" />
                        {h.bathrooms} BA
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleRequestHousing(h.id)}
                    >
                      Request This
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                className="w-full bg-[#0B3C5D] hover:bg-[#0B3C5D]/90"
                onClick={() => handleRequestHousing()}
              >
                <Home className="h-4 w-4 mr-2" />
                Request Housing Support
              </Button>
            </CardContent>
          </Card>

          {/* Car Rental */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-[#0B3C5D]">
                <Car className="h-5 w-5" />
                Car Rental Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_OFFER.carRentals.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#1F2937]/10 hover:border-[#0B3C5D]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-[#0B3C5D]/10 flex items-center justify-center">
                      <Car className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1F2937]">
                        {c.vehicle}
                      </div>
                      <div className="text-xs text-[#1F2937]/60">{c.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#0B3C5D]">
                      ${c.weeklyRate}/wk
                    </div>
                  </div>
                </div>
              ))}
              <Button
                className="w-full bg-[#0B3C5D] hover:bg-[#0B3C5D]/90"
                onClick={handleRequestCar}
              >
                <Car className="h-4 w-4 mr-2" />
                Request Car Support
              </Button>
            </CardContent>
          </Card>

          {/* Move Checklist */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2 text-[#0B3C5D]">
                  <CheckCircle2 className="h-5 w-5" />
                  Move Checklist
                </CardTitle>
                <Badge
                  variant={
                    completedCount === CHECKLIST_ITEMS.length
                      ? "success"
                      : "secondary"
                  }
                >
                  {completedCount}/{CHECKLIST_ITEMS.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {CHECKLIST_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-200"
                          : "border-[#1F2937]/10 hover:border-[#0B3C5D]/30"
                      }`}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleChecklistToggle(item.id)}
                      />
                      <Icon
                        className={`h-4 w-4 ${isChecked ? "text-emerald-600" : "text-[#1F2937]/40"}`}
                      />
                      <span
                        className={`text-sm ${isChecked ? "text-emerald-700 line-through" : "text-[#1F2937]"}`}
                      >
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Trust Layer */}
          <Card className="overflow-hidden border-0 shadow-md bg-[#0B3C5D]/[0.03]">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-[#0B3C5D] flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-[#0B3C5D]">
                    Powered by TRITAL Orbit&trade;
                  </span>
                </div>
                <p className="text-xs text-[#1F2937]/60">
                  Your assignment. Your journey. Our support.
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-9 w-9 rounded-full bg-[#0B3C5D]/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-[#0B3C5D]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#1F2937]">
                      {MOCK_OFFER.recruiter.name}
                    </div>
                    <div className="text-[#1F2937]/60 text-xs">
                      {MOCK_OFFER.recruiter.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-9 w-9 rounded-full bg-[#0B3C5D]/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-[#0B3C5D]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#1F2937]">Support</div>
                    <div className="text-[#1F2937]/60 text-xs">
                      support@tritalorbit.com
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-3 border-t border-[#1F2937]/10">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-[#1F2937]/60">
                  HIPAA-Aware &middot; Secure &middot; Encrypted
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky CTA Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#1F2937]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
          <div className="mx-auto max-w-2xl px-4 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-none">
              <Button
                className={`shrink-0 ${
                  offerAccepted
                    ? "bg-emerald-600 hover:bg-emerald-600 cursor-default"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
                onClick={handleAcceptOffer}
                disabled={offerAccepted}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                {offerAccepted ? "Accepted" : "Accept Offer"}
              </Button>
              <Button
                variant="outline"
                className="shrink-0 border-[#0B3C5D] text-[#0B3C5D]"
                onClick={handleRequestTravel}
              >
                <Plane className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Request </span>Travel
              </Button>
              <Button
                variant="outline"
                className="shrink-0 border-[#0B3C5D] text-[#0B3C5D]"
                onClick={() => handleRequestHousing()}
              >
                <Home className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Request </span>Housing
              </Button>
              <Button
                variant="outline"
                className="shrink-0 border-[#0B3C5D] text-[#0B3C5D]"
                onClick={handleRequestCar}
              >
                <Car className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Request </span>Car
              </Button>
              <Button
                variant="ghost"
                className="shrink-0 text-[#0B3C5D]"
                onClick={handleAskRecruiter}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Ask Recruiter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
