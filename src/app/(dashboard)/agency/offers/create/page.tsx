"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Home,
  Car,
  Package,
  ClipboardCheck,
  Building2,
  Star,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Save,
  Eye,
  Loader2,
  DollarSign,
  User,
  Briefcase,
  Gift,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const STEPS = [
  { id: 1, label: "Candidate", icon: User },
  { id: 2, label: "Assignment", icon: Briefcase },
  { id: 3, label: "Compensation", icon: DollarSign },
  { id: 4, label: "Add Value", icon: Gift },
  { id: 5, label: "AI Boost", icon: Zap },
] as const;

const ROLES = ["RN", "LPN", "CNA", "RT", "PT", "OT", "SLP", "CRNA", "NP", "PA"] as const;

const SPECIALTIES = [
  "ICU", "ER", "Med-Surg", "OR", "L&D", "NICU", "PICU", "Tele",
  "Oncology", "Cardiac", "Neuro", "Rehab", "Psych", "Home Health",
] as const;

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
] as const;

const DURATIONS = [
  { value: 8, label: "8 weeks" },
  { value: 13, label: "13 weeks" },
  { value: 26, label: "26 weeks" },
  { value: 52, label: "52 weeks" },
];

const SHIFTS = ["Day", "Night", "Rotating"] as const;

interface PerkConfig {
  key: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
}

const PERKS: PerkConfig[] = [
  { key: "flightSupport", label: "Flight Support", description: "Coordinate round-trip flights to assignment location", icon: Plane, emoji: "✈️" },
  { key: "housingAssistance", label: "Housing Assistance", description: "Furnished housing near facility", icon: Home, emoji: "🏠" },
  { key: "carRental", label: "Car Rental", description: "Weekly car rental at assignment location", icon: Car, emoji: "🚗" },
  { key: "relocationConcierge", label: "Relocation Concierge", description: "Full-service relocation coordination", icon: Package, emoji: "📦" },
  { key: "firstWeekReadiness", label: "First Week Readiness", description: "Orientation prep, badge, parking, scrubs", icon: ClipboardCheck, emoji: "📋" },
  { key: "emergencyHousing", label: "Emergency Housing Support", description: "Temporary housing for first 3 days", icon: Building2, emoji: "🏨" },
  { key: "loyaltyRewards", label: "Loyalty Rewards", description: "Bonus for completing full assignment", icon: Star, emoji: "⭐" },
];

interface CandidateInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  specialty: string;
  licenseState: string;
  yearsOfExperience: number;
}

interface AssignmentInfo {
  facilityName: string;
  city: string;
  state: string;
  startDate: string;
  duration: number;
  shift: string;
  specialty: string;
  mspClient: string;
}

interface CompensationInfo {
  weeklyPay: number;
  taxableRate: number;
  stipend: number;
  totalContractValue: number;
}

interface PerksState {
  [key: string]: boolean;
}

interface AIResults {
  enhancedSummary: string;
  valueStatement: string;
  talkingPoints: string;
  smsPitch: string;
  emailPitch: string;
  closeStrategy: string;
}

export default function OfferBoostBuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiResults, setAIResults] = useState<AIResults | null>(null);

  const [candidate, setCandidate] = useState<CandidateInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    specialty: "",
    licenseState: "",
    yearsOfExperience: 0,
  });

  const [assignment, setAssignment] = useState<AssignmentInfo>({
    facilityName: "",
    city: "",
    state: "",
    startDate: "",
    duration: 13,
    shift: "",
    specialty: "",
    mspClient: "",
  });

  const [compensation, setCompensation] = useState<CompensationInfo>({
    weeklyPay: 0,
    taxableRate: 0,
    stipend: 0,
    totalContractValue: 0,
  });

  const [perks, setPerks] = useState<PerksState>({
    flightSupport: false,
    housingAssistance: false,
    carRental: false,
    relocationConcierge: false,
    firstWeekReadiness: false,
    emergencyHousing: false,
    loyaltyRewards: false,
  });

  const totalPerks = Object.values(perks).filter(Boolean).length;
  const progressPercent = (currentStep / STEPS.length) * 100;

  function updateCompensation(field: keyof CompensationInfo, value: number) {
    setCompensation((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "weeklyPay") {
        next.totalContractValue = value * assignment.duration;
      }
      return next;
    });
  }

  function validateStep(step: number): boolean {
    switch (step) {
      case 1:
        return !!(
          candidate.firstName &&
          candidate.lastName &&
          candidate.email &&
          candidate.phone &&
          candidate.role &&
          candidate.specialty &&
          candidate.licenseState
        );
      case 2:
        return !!(
          assignment.facilityName &&
          assignment.city &&
          assignment.state &&
          assignment.startDate &&
          assignment.shift &&
          assignment.specialty
        );
      case 3:
        return compensation.weeklyPay > 0;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  }

  function handleNext() {
    if (!validateStep(currentStep)) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePrev() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function handleGenerateAI() {
    setIsGeneratingAI(true);
    await new Promise((r) => setTimeout(r, 2800));

    setAIResults({
      enhancedSummary: `Premium ${assignment.duration}-week ${candidate.role} assignment at ${assignment.facilityName || "the facility"} in ${assignment.city || "the city"}, ${assignment.state || "ST"}. ${candidate.firstName || "The candidate"} ${candidate.lastName || ""} brings ${candidate.yearsOfExperience || 0} years of ${candidate.specialty || "clinical"} experience. This offer includes a competitive weekly package of ${formatCurrency(compensation.weeklyPay)} with ${totalPerks} mobility perks designed to ensure a seamless transition and exceptional assignment experience. Total contract value: ${formatCurrency(compensation.totalContractValue)}.`,
      valueStatement: `Dear ${candidate.firstName || "Candidate"},\n\nWe've crafted this offer specifically for you, recognizing your ${candidate.yearsOfExperience || 0} years of expertise in ${candidate.specialty || "your specialty"}. Beyond the competitive ${formatCurrency(compensation.weeklyPay)}/week compensation, we're committed to supporting your entire journey with ${totalPerks} premium mobility perks${perks.housingAssistance ? ", including furnished housing" : ""}${perks.flightSupport ? " and coordinated flights" : ""}. Our goal is to make this your best assignment yet — from Day 1 through completion.`,
      talkingPoints: `• Highlight the ${formatCurrency(compensation.weeklyPay)}/week rate — above market for ${candidate.specialty || "this specialty"} in ${assignment.state || "the area"}\n• Emphasize the ${totalPerks} included mobility perks — these save the candidate $2,000+ in out-of-pocket costs\n• ${assignment.facilityName || "The facility"} has a strong reputation and is a Magnet-designated hospital\n• ${assignment.duration}-week duration provides stability with potential for extension\n• Total contract value of ${formatCurrency(compensation.totalContractValue)} demonstrates long-term earning potential\n• ${perks.loyaltyRewards ? "Loyalty bonus for completing full assignment adds extra incentive" : "Consider adding loyalty rewards for additional close leverage"}`,
      smsPitch: `Hi ${candidate.firstName || "there"}! 🌟 Exciting ${candidate.role || "travel"} opportunity at ${assignment.facilityName || "a top facility"} in ${assignment.city || "a great city"}, ${assignment.state || ""}. ${formatCurrency(compensation.weeklyPay)}/wk + ${totalPerks} mobility perks (${perks.housingAssistance ? "housing, " : ""}${perks.flightSupport ? "flights, " : ""}and more). ${assignment.duration}-week contract starting ${assignment.startDate || "soon"}. Want the full details?`,
      emailPitch: `Subject: Exclusive ${candidate.role} Opportunity — ${formatCurrency(compensation.weeklyPay)}/wk at ${assignment.facilityName || "Premier Facility"}\n\nHi ${candidate.firstName || "there"},\n\nI wanted to personally reach out about a premium ${candidate.specialty || ""} ${candidate.role || "travel"} assignment that I believe is an excellent match for your experience.\n\n📍 Facility: ${assignment.facilityName || "Top-tier Medical Center"}\n📅 Duration: ${assignment.duration} weeks starting ${assignment.startDate || "TBD"}\n💰 Weekly Pay: ${formatCurrency(compensation.weeklyPay)}\n💎 Total Value: ${formatCurrency(compensation.totalContractValue)}\n\nWhat sets this apart: We've included ${totalPerks} premium mobility perks to ensure your complete comfort and success:\n${perks.housingAssistance ? "✅ Furnished housing near the facility\n" : ""}${perks.flightSupport ? "✅ Round-trip flight coordination\n" : ""}${perks.carRental ? "✅ Weekly car rental\n" : ""}${perks.firstWeekReadiness ? "✅ First-week readiness package\n" : ""}${perks.loyaltyRewards ? "✅ Loyalty completion bonus\n" : ""}\nI'd love to walk you through the details. When's a good time for a quick call?\n\nBest regards`,
      closeStrategy: `**Close Strategy for ${candidate.firstName || "Candidate"} ${candidate.lastName || ""}**\n\n1. **Lead with Value, Not Price**: Open by discussing the total package — ${totalPerks} perks + compensation. Frame the ${formatCurrency(compensation.totalContractValue)} total value.\n\n2. **Create Urgency**: "This position at ${assignment.facilityName || "the facility"} has had significant interest. I wanted to bring it to you first because of your ${candidate.specialty || ""} background."\n\n3. **Handle Objections**:\n   - *"The rate is lower than I expected"* → Emphasize the total value including perks (worth $2,000+/assignment) and the stipend of ${formatCurrency(compensation.stipend)}\n   - *"I'm considering other offers"* → Highlight the mobility perks that other agencies don't provide\n   - *"I'm not sure about the location"* → ${perks.housingAssistance ? "We handle housing completely" : "We can assist with housing"}. ${perks.flightSupport ? "Flights are coordinated for you." : ""}\n\n4. **Trial Close**: "If we can get you started by ${assignment.startDate || "the target date"}, would you be ready to commit today?"`,
    });
    setIsGeneratingAI(false);
  }

  async function handleSubmit(status: "DRAFT" | "READY") {
    setIsSubmitting(true);
    try {
      const payload = {
        candidate,
        assignment,
        compensation: {
          ...compensation,
          totalContractValue: compensation.weeklyPay * assignment.duration,
        },
        perks,
        aiEnhancement: aiResults || undefined,
        status,
      };

      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: status === "DRAFT" ? "Draft saved" : "Offer created",
          description: status === "DRAFT"
            ? "Your offer has been saved as a draft."
            : "Your offer is ready. Redirecting to preview...",
        });
        if (status === "READY") {
          router.push(`/agency/offers/${data.data.id}/preview`);
        }
      } else {
        toast({ title: "Error", description: data.error || "Failed to create offer", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[#1F2937]/60 mb-4">
            <Link href="/agency/offers" className="hover:text-[#0B3C5D] transition-colors">
              Offers
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0B3C5D] font-medium">Create Offer</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Offer Boost Builder</h1>
          <p className="mt-1 text-[#1F2937]/60">
            Create a competitive, AI-enhanced offer package for your candidate
          </p>
        </div>

        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isComplete = currentStep > step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (isComplete || isActive) setCurrentStep(step.id);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    isActive && "bg-[#0B3C5D] text-white shadow-md",
                    isComplete && "bg-[#0B3C5D]/10 text-[#0B3C5D] cursor-pointer",
                    !isActive && !isComplete && "text-[#1F2937]/40 cursor-default"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                      isActive && "bg-white/20",
                      isComplete && "bg-[#0B3C5D] text-white",
                      !isActive && !isComplete && "bg-[#1F2937]/10"
                    )}
                  >
                    {isComplete ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                  </div>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step 1: Candidate Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#0B3C5D]" />
                    Candidate Information
                  </CardTitle>
                  <CardDescription>Enter the candidate&apos;s details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Sarah"
                        value={candidate.firstName}
                        onChange={(e) => setCandidate({ ...candidate, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Mitchell"
                        value={candidate.lastName}
                        onChange={(e) => setCandidate({ ...candidate, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="sarah@example.com"
                        value={candidate.email}
                        onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={candidate.phone}
                        onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Role *</Label>
                      <Select
                        value={candidate.role}
                        onValueChange={(v) => setCandidate({ ...candidate, role: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Specialty *</Label>
                      <Select
                        value={candidate.specialty}
                        onValueChange={(v) => setCandidate({ ...candidate, specialty: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIALTIES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>License State *</Label>
                      <Select
                        value={candidate.licenseState}
                        onValueChange={(v) => setCandidate({ ...candidate, licenseState: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        min={0}
                        max={50}
                        placeholder="5"
                        value={candidate.yearsOfExperience || ""}
                        onChange={(e) =>
                          setCandidate({ ...candidate, yearsOfExperience: parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Assignment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#0B3C5D]" />
                    Assignment Information
                  </CardTitle>
                  <CardDescription>Details about the travel assignment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="facilityName">Facility Name *</Label>
                    <Input
                      id="facilityName"
                      placeholder="Cedars-Sinai Medical Center"
                      value={assignment.facilityName}
                      onChange={(e) => setAssignment({ ...assignment, facilityName: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Los Angeles"
                        value={assignment.city}
                        onChange={(e) => setAssignment({ ...assignment, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State *</Label>
                      <Select
                        value={assignment.state}
                        onValueChange={(v) => setAssignment({ ...assignment, state: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={assignment.startDate}
                        onChange={(e) => setAssignment({ ...assignment, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration *</Label>
                      <Select
                        value={String(assignment.duration)}
                        onValueChange={(v) => {
                          const dur = parseInt(v);
                          setAssignment({ ...assignment, duration: dur });
                          setCompensation((prev) => ({
                            ...prev,
                            totalContractValue: prev.weeklyPay * dur,
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {DURATIONS.map((d) => (
                            <SelectItem key={d.value} value={String(d.value)}>
                              {d.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Shift *</Label>
                      <Select
                        value={assignment.shift}
                        onValueChange={(v) => setAssignment({ ...assignment, shift: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shift" />
                        </SelectTrigger>
                        <SelectContent>
                          {SHIFTS.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Specialty *</Label>
                      <Select
                        value={assignment.specialty}
                        onValueChange={(v) => setAssignment({ ...assignment, specialty: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIALTIES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mspClient">MSP / Client</Label>
                      <Input
                        id="mspClient"
                        placeholder="Optional"
                        value={assignment.mspClient}
                        onChange={(e) => setAssignment({ ...assignment, mspClient: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Compensation */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#0B3C5D]" />
                    Compensation
                  </CardTitle>
                  <CardDescription>Define the compensation package</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="weeklyPay">Weekly Pay *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F2937]/40" />
                        <Input
                          id="weeklyPay"
                          type="number"
                          min={0}
                          className="pl-9"
                          placeholder="2,850"
                          value={compensation.weeklyPay || ""}
                          onChange={(e) => updateCompensation("weeklyPay", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxableRate">Taxable Rate</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F2937]/40" />
                        <Input
                          id="taxableRate"
                          type="number"
                          min={0}
                          className="pl-9"
                          placeholder="1,200"
                          value={compensation.taxableRate || ""}
                          onChange={(e) => updateCompensation("taxableRate", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stipend">Stipend</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F2937]/40" />
                        <Input
                          id="stipend"
                          type="number"
                          min={0}
                          className="pl-9"
                          placeholder="1,650"
                          value={compensation.stipend || ""}
                          onChange={(e) => updateCompensation("stipend", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 p-6 text-white">
                    <p className="text-sm font-medium text-white/70">Estimated Total Contract Value</p>
                    <p className="mt-1 text-4xl font-bold">
                      {formatCurrency(compensation.weeklyPay * assignment.duration)}
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      {formatCurrency(compensation.weeklyPay)}/week × {assignment.duration} weeks
                    </p>
                    {(compensation.taxableRate > 0 || compensation.stipend > 0) && (
                      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                        {compensation.taxableRate > 0 && (
                          <div>
                            <p className="text-xs text-white/50">Taxable Rate</p>
                            <p className="text-lg font-semibold">{formatCurrency(compensation.taxableRate)}/wk</p>
                          </div>
                        )}
                        {compensation.stipend > 0 && (
                          <div>
                            <p className="text-xs text-white/50">Stipend</p>
                            <p className="text-lg font-semibold">{formatCurrency(compensation.stipend)}/wk</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Add Value (Perks) */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-[#0B3C5D]" />
                        Add Value — Mobility Perks
                      </CardTitle>
                      <CardDescription>Toggle perks to include in the offer package</CardDescription>
                    </div>
                    <Badge variant={totalPerks > 0 ? "default" : "secondary"}>
                      {totalPerks} perk{totalPerks !== 1 ? "s" : ""} selected
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {PERKS.map((perk) => {
                      const isActive = perks[perk.key];
                      const Icon = perk.icon;
                      return (
                        <motion.div
                          key={perk.key}
                          layout
                          animate={{
                            scale: isActive ? 1 : 0.98,
                            borderColor: isActive ? "#0B3C5D" : "rgba(31,41,55,0.1)",
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className={cn(
                            "relative rounded-xl border-2 p-4 transition-shadow",
                            isActive
                              ? "border-[#0B3C5D] bg-[#0B3C5D]/5 shadow-md"
                              : "border-[#1F2937]/10 bg-white hover:shadow-sm"
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-lg text-lg",
                                  isActive ? "bg-[#0B3C5D]/10" : "bg-[#1F2937]/5"
                                )}
                              >
                                <Icon className={cn("h-5 w-5", isActive ? "text-[#0B3C5D]" : "text-[#1F2937]/50")} />
                              </div>
                              <div>
                                <p className={cn("font-semibold", isActive ? "text-[#0B3C5D]" : "text-[#1F2937]")}>
                                  {perk.emoji} {perk.label}
                                </p>
                                <p className="mt-0.5 text-sm text-[#1F2937]/60">{perk.description}</p>
                              </div>
                            </div>
                            <Switch
                              checked={isActive}
                              onCheckedChange={(checked) =>
                                setPerks({ ...perks, [perk.key]: checked })
                              }
                            />
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 rounded-lg bg-white p-3"
                            >
                              <div className="flex items-center gap-1.5 text-xs text-[#0B3C5D]">
                                <Check className="h-3 w-3" />
                                Included in offer package
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: AI Enhancement */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-[#0B3C5D]" />
                      AI Offer Enhancement
                    </CardTitle>
                    <CardDescription>
                      Generate AI-powered content to strengthen your offer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!aiResults && !isGeneratingAI && (
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleGenerateAI}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/80 px-8 py-6 text-white shadow-lg transition-shadow hover:shadow-xl"
                      >
                        <Sparkles className="h-6 w-6" />
                        <span className="text-lg font-semibold">Generate Enhanced Offer</span>
                      </motion.button>
                    )}

                    {isGeneratingAI && (
                      <div className="flex flex-col items-center justify-center py-12">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="mb-4"
                        >
                          <Sparkles className="h-12 w-12 text-[#0B3C5D]" />
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-lg font-medium text-[#1F2937]"
                        >
                          Enhancing your offer with AI...
                        </motion.p>
                        <p className="mt-2 text-sm text-[#1F2937]/60">
                          Analyzing compensation, perks, and market data
                        </p>
                        <div className="mt-6 w-full max-w-sm space-y-3">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                          <Skeleton className="h-4 w-3/5" />
                        </div>
                      </div>
                    )}

                    {aiResults && (
                      <Tabs defaultValue="summary" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
                          <TabsTrigger value="summary">Summary</TabsTrigger>
                          <TabsTrigger value="value">Value</TabsTrigger>
                          <TabsTrigger value="talking">Talking Pts</TabsTrigger>
                          <TabsTrigger value="sms">SMS</TabsTrigger>
                          <TabsTrigger value="email">Email</TabsTrigger>
                          <TabsTrigger value="close">Close</TabsTrigger>
                        </TabsList>
                        <TabsContent value="summary" className="mt-4">
                          <div className="rounded-lg border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                            <h4 className="mb-2 font-semibold text-[#0B3C5D]">Enhanced Offer Summary</h4>
                            <p className="text-sm leading-relaxed text-[#1F2937]/80 whitespace-pre-wrap">
                              {aiResults.enhancedSummary}
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="value" className="mt-4">
                          <div className="rounded-lg border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                            <h4 className="mb-2 font-semibold text-[#0B3C5D]">Candidate Value Statement</h4>
                            <p className="text-sm leading-relaxed text-[#1F2937]/80 whitespace-pre-wrap">
                              {aiResults.valueStatement}
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="talking" className="mt-4">
                          <div className="rounded-lg border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                            <h4 className="mb-2 font-semibold text-[#0B3C5D]">Recruiter Talking Points</h4>
                            <p className="text-sm leading-relaxed text-[#1F2937]/80 whitespace-pre-wrap">
                              {aiResults.talkingPoints}
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="sms" className="mt-4">
                          <div className="rounded-lg border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                            <h4 className="mb-2 font-semibold text-[#0B3C5D]">SMS Pitch</h4>
                            <p className="text-sm leading-relaxed text-[#1F2937]/80 whitespace-pre-wrap">
                              {aiResults.smsPitch}
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="email" className="mt-4">
                          <div className="rounded-lg border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                            <h4 className="mb-2 font-semibold text-[#0B3C5D]">Email Pitch</h4>
                            <p className="text-sm leading-relaxed text-[#1F2937]/80 whitespace-pre-wrap">
                              {aiResults.emailPitch}
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="close" className="mt-4">
                          <div className="rounded-lg border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                            <h4 className="mb-2 font-semibold text-[#0B3C5D]">Close Strategy</h4>
                            <p className="text-sm leading-relaxed text-[#1F2937]/80 whitespace-pre-wrap">
                              {aiResults.closeStrategy}
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                  </CardContent>
                </Card>

                {aiResults && (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={() => handleSubmit("READY")}
                      disabled={isSubmitting}
                      className="flex-1"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Eye className="mr-2 h-4 w-4" />
                      )}
                      Save &amp; Preview
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSubmit("DRAFT")}
                      disabled={isSubmitting}
                      size="lg"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save as Draft
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          {currentStep < STEPS.length && (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
          {currentStep === STEPS.length && !aiResults && (
            <Button variant="outline" onClick={() => handleSubmit("DRAFT")} disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
