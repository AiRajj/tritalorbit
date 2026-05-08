"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { US_STATES, SPECIALTIES, SHIFT_TYPES } from "@/lib/constants"
import {
  User, Mail, Phone, Briefcase, Award, MapPin, Building2, Calendar,
  Clock, DollarSign, Plane, Home, Car, Heart, Package, Shield,
  Star, Sparkles, Send, Save, ChevronRight, ChevronLeft, Loader2,
  FileText, MessageSquare, Mail as MailIcon, Copy, CheckCircle2,
} from "lucide-react"

const offerFormSchema = z.object({
  candidateName: z.string().min(2, "Name is required"),
  candidateEmail: z.string().email("Valid email required"),
  candidatePhone: z.string().min(10, "Valid phone required"),
  candidateRole: z.string().min(1, "Role is required"),
  candidateSpecialty: z.string().min(1, "Specialty is required"),
  licenseState: z.string().min(1, "License state is required"),
  experienceYears: z.number().min(0, "Must be 0 or more"),
  facilityName: z.string().min(2, "Facility name is required"),
  facilityCity: z.string().min(2, "City is required"),
  facilityState: z.string().min(1, "State is required"),
  startDate: z.string().min(1, "Start date is required"),
  durationWeeks: z.number().min(1, "Duration required"),
  shift: z.string().min(1, "Shift is required"),
  assignmentSpecialty: z.string().min(1, "Specialty is required"),
  mspClient: z.string().optional(),
  weeklyPay: z.number().min(1, "Weekly pay required"),
  taxableRate: z.number().min(0, "Taxable rate required"),
  stipend: z.number().min(0, "Stipend required"),
  flightSupport: z.boolean().default(false),
  housingAssistance: z.boolean().default(false),
  carRental: z.boolean().default(false),
  relocationConcierge: z.boolean().default(false),
  firstWeekReadiness: z.boolean().default(false),
  emergencyHousing: z.boolean().default(false),
  loyaltyRewards: z.boolean().default(false),
})

type OfferFormValues = z.infer<typeof offerFormSchema>

const sections = [
  { id: 0, label: "Candidate Info", icon: User },
  { id: 1, label: "Assignment", icon: Building2 },
  { id: 2, label: "Compensation", icon: DollarSign },
  { id: 3, label: "Value Add", icon: Heart },
  { id: 4, label: "AI Enhancement", icon: Sparkles },
]

const valueAddPerks = [
  { key: "flightSupport" as const, label: "Flight Support", description: "Round-trip flight to assignment location", icon: Plane, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { key: "housingAssistance" as const, label: "Housing Assistance", description: "Fully furnished housing near facility", icon: Home, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { key: "carRental" as const, label: "Car Rental", description: "Weekly car rental during assignment", icon: Car, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { key: "relocationConcierge" as const, label: "Relocation Concierge", description: "Dedicated moving & setup support", icon: Package, color: "text-orange-600 bg-orange-50 border-orange-200" },
  { key: "firstWeekReadiness" as const, label: "First Week Readiness", description: "Welcome kit, orientation support, local guide", icon: Shield, color: "text-[#0B3C5D] bg-[#0B3C5D]/5 border-[#0B3C5D]/20" },
  { key: "emergencyHousing" as const, label: "Emergency Housing", description: "48-hour emergency housing guarantee", icon: Home, color: "text-red-600 bg-red-50 border-red-200" },
  { key: "loyaltyRewards" as const, label: "Loyalty Rewards", description: "Bonus points and perks for returning travelers", icon: Star, color: "text-amber-600 bg-amber-50 border-amber-200" },
]

interface AIBoostResult {
  subject: string
  headline: string
  body: string
  highlights: string[]
  urgencyNote: string
  estimatedAcceptanceBoost: number
}

export default function OfferBoostBuilderPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiResult, setAiResult] = useState<AIBoostResult | null>(null)

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema) as any,
    defaultValues: {
      candidateName: "", candidateEmail: "", candidatePhone: "",
      candidateRole: "", candidateSpecialty: "", licenseState: "",
      experienceYears: 0, facilityName: "", facilityCity: "",
      facilityState: "", startDate: "", durationWeeks: 13,
      shift: "", assignmentSpecialty: "", mspClient: "",
      weeklyPay: 0, taxableRate: 0, stipend: 0,
      flightSupport: false, housingAssistance: false, carRental: false,
      relocationConcierge: false, firstWeekReadiness: false,
      emergencyHousing: false, loyaltyRewards: false,
    },
  })

  const weeklyPay = form.watch("weeklyPay")
  const taxableRate = form.watch("taxableRate")
  const stipend = form.watch("stipend")
  const durationWeeks = form.watch("durationWeeks")

  const totalContractValue = (weeklyPay + stipend) * (durationWeeks || 1)

  const handleNext = async () => {
    let fieldsToValidate: (keyof OfferFormValues)[] = []
    if (currentSection === 0) fieldsToValidate = ["candidateName", "candidateEmail", "candidatePhone", "candidateRole", "candidateSpecialty", "licenseState"]
    else if (currentSection === 1) fieldsToValidate = ["facilityName", "facilityCity", "facilityState", "startDate", "durationWeeks", "shift", "assignmentSpecialty"]
    else if (currentSection === 2) fieldsToValidate = ["weeklyPay", "taxableRate", "stipend"]

    if (fieldsToValidate.length > 0) {
      const valid = await form.trigger(fieldsToValidate)
      if (!valid) return
    }
    setCurrentSection((s) => Math.min(s + 1, 4))
  }

  const handlePrev = () => setCurrentSection((s) => Math.max(s - 1, 0))

  const generateAIBoost = async () => {
    setIsGeneratingAI(true)
    try {
      const values = form.getValues()
      const res = await fetch("/api/ai/offer-boost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: values.candidateName,
          specialty: values.assignmentSpecialty || values.candidateSpecialty,
          facilityName: values.facilityName,
          facilityLocation: `${values.facilityCity}, ${values.facilityState}`,
          payRate: values.weeklyPay / 36,
          shiftType: values.shift,
          startDate: values.startDate,
          housingStipend: values.housingAssistance ? values.stipend : undefined,
        }),
      })
      const data = await res.json()
      setAiResult(data)
      toast.success("AI Offer Boost generated successfully!")
    } catch {
      toast.error("Failed to generate AI boost. Using fallback.")
      setAiResult({
        subject: `Exclusive ${form.getValues("assignmentSpecialty")} Opportunity at ${form.getValues("facilityName")}`,
        headline: `Your Next Adventure Awaits in ${form.getValues("facilityCity")}, ${form.getValues("facilityState")}`,
        body: `Dear ${form.getValues("candidateName")},\n\nWe're excited to present an exceptional opportunity at ${form.getValues("facilityName")}. This assignment offers competitive compensation with a total contract value of ${formatCurrency(totalContractValue)}, along with comprehensive support services to ensure your success.\n\nThis position has been specifically matched to your expertise and preferences. We believe it's an outstanding fit for your next career move.`,
        highlights: [
          `Weekly pay of ${formatCurrency(weeklyPay)} with full benefits`,
          `${durationWeeks}-week assignment at a top-rated facility`,
          "Comprehensive mobility support included",
          "Dedicated recruiter support throughout",
          "Fast-track onboarding available",
        ],
        urgencyNote: "This position is seeing high interest — respond within 48 hours to secure priority consideration.",
        estimatedAcceptanceBoost: 28,
      })
    } finally {
      setIsGeneratingAI(false)
    }
  }

  const onSubmit = async (values: OfferFormValues) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, totalContractValue, aiBoost: aiResult }),
      })
      if (res.ok) {
        toast.success("Offer created successfully!")
      } else {
        toast.error("Failed to create offer")
      }
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout role="agency">
      <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Offer Boost Builder</h1>
            <p className="text-sm text-muted-foreground mt-1">Create a compelling, AI-enhanced offer package</p>
          </div>
          <Badge variant="outline" className="bg-[#0B3C5D]/5 text-[#0B3C5D] border-[#0B3C5D]/20">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(i)}
              className="flex items-center gap-2 shrink-0"
            >
              <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                i === currentSection
                  ? "bg-[#0B3C5D] text-white shadow-md"
                  : i < currentSection
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-500"
              }`}>
                {i < currentSection ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <section.icon className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">{section.label}</span>
              </div>
              {i < sections.length - 1 && <ChevronRight className="h-4 w-4 text-slate-300 shrink-0" />}
            </button>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* Section 1: Candidate Info */}
              {currentSection === 0 && (
                <motion.div
                  key="candidate"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="h-5 w-5 text-[#0B3C5D]" />
                        Candidate Information
                      </CardTitle>
                      <CardDescription>Enter the candidate&apos;s details for this offer</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="candidateName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Jane Doe" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="candidateEmail" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="jane@example.com" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="candidatePhone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="(555) 123-4567" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="candidateRole" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Travel RN" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="candidateSpecialty" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specialty</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select specialty" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SPECIALTIES.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="licenseState" render={({ field }) => (
                          <FormItem>
                            <FormLabel>License State</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {US_STATES.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="experienceYears" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience (years)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="number" min={0} className="pl-10" value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Section 2: Assignment Info */}
              {currentSection === 1 && (
                <motion.div
                  key="assignment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Building2 className="h-5 w-5 text-[#0B3C5D]" />
                        Assignment Information
                      </CardTitle>
                      <CardDescription>Details about the healthcare facility and assignment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="facilityName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facility Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Memorial Hospital" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="facilityCity" render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Portland" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="facilityState" render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {US_STATES.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="startDate" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="date" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="durationWeeks" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (weeks)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="number" min={1} className="pl-10" value={field.value} onChange={(e) => field.onChange(parseInt(e.target.value) || 1)} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="shift" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shift</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select shift" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SHIFT_TYPES.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="assignmentSpecialty" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specialty</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select specialty" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SPECIALTIES.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="mspClient" render={({ field }) => (
                          <FormItem>
                            <FormLabel>MSP / Client <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Client name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Section 3: Compensation */}
              {currentSection === 2 && (
                <motion.div
                  key="compensation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <DollarSign className="h-5 w-5 text-[#0B3C5D]" />
                        Compensation Package
                      </CardTitle>
                      <CardDescription>Define the financial terms of this offer</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="weeklyPay" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weekly Pay ($)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="number" min={0} step={50} className="pl-10" value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="taxableRate" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Taxable Rate ($/hr)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="number" min={0} step={1} className="pl-10" value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="stipend" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weekly Stipend ($)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="number" min={0} step={50} className="pl-10" value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 p-6 text-white"
                      >
                        <p className="text-sm font-medium text-white/70 mb-1">Total Contract Value</p>
                        <p className="text-4xl font-bold tracking-tight">{formatCurrency(totalContractValue)}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
                          <span>{formatCurrency(weeklyPay)}/week pay</span>
                          <span className="text-white/30">+</span>
                          <span>{formatCurrency(stipend)}/week stipend</span>
                          <span className="text-white/30">&times;</span>
                          <span>{durationWeeks} weeks</span>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Section 4: Value Add */}
              {currentSection === 3 && (
                <motion.div
                  key="valueadd"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Heart className="h-5 w-5 text-[#E63946]" />
                        Add Value Perks
                      </CardTitle>
                      <CardDescription>Toggle premium mobility and support perks to differentiate your offer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {valueAddPerks.map((perk, i) => (
                          <FormField key={perk.key} control={form.control} name={perk.key} render={({ field }) => (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <div
                                className={`relative flex items-center gap-4 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                                  field.value
                                    ? perk.color + " shadow-sm"
                                    : "border-slate-200 hover:border-slate-300 bg-white"
                                }`}
                                onClick={() => field.onChange(!field.value)}
                              >
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
                                  field.value ? "bg-white/80" : "bg-slate-50"
                                }`}>
                                  <perk.icon className={`h-6 w-6 ${field.value ? perk.color.split(" ")[0] : "text-slate-400"}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-semibold text-sm ${field.value ? "" : "text-slate-700"}`}>{perk.label}</p>
                                  <p className={`text-xs mt-0.5 ${field.value ? "opacity-70" : "text-muted-foreground"}`}>{perk.description}</p>
                                </div>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            </motion.div>
                          )} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Section 5: AI Enhancement */}
              {currentSection === 4 && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Sparkles className="h-5 w-5 text-[#0B3C5D]" />
                        AI Offer Enhancement
                      </CardTitle>
                      <CardDescription>Generate AI-powered content to maximize your offer&apos;s acceptance rate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        type="button"
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/80 hover:from-[#0B3C5D]/90 hover:to-[#0B3C5D]/70 h-14 text-base"
                        onClick={generateAIBoost}
                        disabled={isGeneratingAI}
                      >
                        {isGeneratingAI ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Generating Enhanced Offer...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-5 w-5 mr-2" />
                            Generate Enhanced Offer
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {aiResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Acceptance Boost */}
                      <Card className="border-emerald-200 bg-emerald-50/30">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-emerald-700">Estimated Acceptance Boost</p>
                              <p className="text-xs text-emerald-600 mt-0.5">Based on AI analysis of offer competitiveness</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-3xl font-bold text-emerald-700">+{aiResult.estimatedAcceptanceBoost}%</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Enhanced Offer Summary */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[#0B3C5D]" />
                            Enhanced Offer Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Subject Line</Label>
                            <p className="text-sm font-medium mt-1">{aiResult.subject}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Headline</Label>
                            <p className="text-lg font-bold text-[#0B3C5D] mt-1">{aiResult.headline}</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Candidate Value Statement */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Heart className="h-4 w-4 text-[#E63946]" />
                            Candidate-Facing Value Statement
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-slate-50 rounded-lg p-4 text-sm whitespace-pre-line">{aiResult.body}</div>
                        </CardContent>
                      </Card>

                      {/* Recruiter Talking Points */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-purple-600" />
                            Recruiter Talking Points
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {aiResult.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* SMS Pitch */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-600" />
                            SMS Pitch
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-blue-50 rounded-lg p-4 text-sm">
                            Hi {form.getValues("candidateName")}! Exciting {form.getValues("assignmentSpecialty")} opportunity at {form.getValues("facilityName")} in {form.getValues("facilityCity")}, {form.getValues("facilityState")}. {formatCurrency(weeklyPay)}/week + perks. {aiResult.urgencyNote} Reply YES to learn more!
                          </div>
                          <Button variant="outline" size="sm" className="mt-2" onClick={() => { navigator.clipboard.writeText(`Hi ${form.getValues("candidateName")}! Exciting opportunity...`); toast.success("SMS pitch copied!") }}>
                            <Copy className="h-3.5 w-3.5 mr-1.5" />
                            Copy SMS
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Email Pitch */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <MailIcon className="h-4 w-4 text-orange-600" />
                            Email Pitch
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-orange-50 rounded-lg p-4 space-y-2">
                            <p className="text-xs font-semibold text-orange-800">Subject: {aiResult.subject}</p>
                            <div className="text-sm whitespace-pre-line">{aiResult.body}</div>
                            <p className="text-sm font-medium text-orange-800 mt-3">{aiResult.urgencyNote}</p>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2" onClick={() => { navigator.clipboard.writeText(aiResult.body); toast.success("Email pitch copied!") }}>
                            <Copy className="h-3.5 w-3.5 mr-1.5" />
                            Copy Email
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentSection === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1.5" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {currentSection < 4 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1.5" />
                  </Button>
                ) : (
                  <>
                    <Button type="button" variant="outline" onClick={() => { toast.success("Offer saved as draft"); }}>
                      <Save className="h-4 w-4 mr-1.5" />
                      Save Draft
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-[#E63946] hover:bg-[#E63946]/90">
                      {isSubmitting ? (
                        <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" />Submitting...</>
                      ) : (
                        <><Send className="h-4 w-4 mr-1.5" />Submit Offer</>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  )
}
