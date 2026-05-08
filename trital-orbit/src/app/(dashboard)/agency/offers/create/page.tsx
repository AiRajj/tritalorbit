"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Zap, Home, Plane, Car, MapPin, Users, Award, Shield,
  Brain, ArrowRight, ChevronLeft, Loader2, CheckCircle2, Copy, Mail, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";

const offerSchema = z.object({
  candidateName: z.string().min(2, "Required"),
  candidateEmail: z.string().email("Valid email required"),
  candidatePhone: z.string().optional(),
  candidateRole: z.string().min(1, "Required"),
  candidateSpecialty: z.string().optional(),
  candidateLicenseState: z.string().optional(),
  candidateExperience: z.number().optional(),
  facilityName: z.string().min(2, "Required"),
  facilityCity: z.string().min(2, "Required"),
  facilityState: z.string().min(2, "Required"),
  startDate: z.string().optional(),
  duration: z.number().min(1).optional(),
  shiftType: z.string().optional(),
  specialty: z.string().optional(),
  mspClient: z.string().optional(),
  weeklyPay: z.number().min(1, "Required"),
  taxableRate: z.number().optional(),
  stipend: z.number().optional(),
  totalContractValue: z.number().optional(),
  notes: z.string().optional(),
});

type OfferFormData = z.infer<typeof offerSchema>;

const perkOptions = [
  {
    id: "flight",
    type: "FLIGHT",
    icon: Plane,
    title: "Flight Support",
    description: "Roundtrip or one-way flight coverage to assignment city",
    color: "bg-sky-50 border-sky-200 text-sky-700",
    activeColor: "bg-sky-600 text-white border-sky-600",
  },
  {
    id: "housing",
    type: "HOUSING",
    icon: Home,
    title: "Housing Assistance",
    description: "Verified furnished housing options near the facility",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    activeColor: "bg-emerald-600 text-white border-emerald-600",
  },
  {
    id: "car",
    type: "CAR_RENTAL",
    icon: Car,
    title: "Car Rental",
    description: "Rental vehicle for the duration of the assignment",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    activeColor: "bg-purple-600 text-white border-purple-600",
  },
  {
    id: "relocation",
    type: "RELOCATION",
    icon: MapPin,
    title: "Relocation Concierge",
    description: "Full concierge support for move planning and execution",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    activeColor: "bg-orange-600 text-white border-orange-600",
  },
  {
    id: "firstweek",
    type: "FIRST_WEEK",
    icon: Award,
    title: "First Week Readiness",
    description: "Day-1 support package with orientation and checklist",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    activeColor: "bg-amber-600 text-white border-amber-600",
  },
  {
    id: "emergency",
    type: "EMERGENCY_HOUSING",
    icon: Shield,
    title: "Emergency Housing Support",
    description: "Backup housing guarantee if primary falls through",
    color: "bg-red-50 border-red-200 text-red-700",
    activeColor: "bg-red-600 text-white border-red-600",
  },
  {
    id: "loyalty",
    type: "LOYALTY",
    icon: Users,
    title: "Loyalty Rewards",
    description: "Points and bonuses for repeat assignments",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    activeColor: "bg-indigo-600 text-white border-indigo-600",
  },
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

interface AIResult {
  enhancedSummary: string;
  valueStatement: string;
  recruiterTalkingPoints: string;
  smsPitch: string;
  emailPitch: string;
  closeStrategy: string;
  confidenceScore: number;
}

export default function CreateOfferPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [enabledPerks, setEnabledPerks] = useState<Set<string>>(new Set());
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedOfferId, setSavedOfferId] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
  });

  const watchedValues = watch();

  const togglePerk = (perkId: string) => {
    setEnabledPerks((prev) => {
      const next = new Set(prev);
      if (next.has(perkId)) next.delete(perkId);
      else next.add(perkId);
      return next;
    });
  };

  const generateAI = async () => {
    const values = watchedValues;
    if (!values.candidateName || !values.weeklyPay || !values.facilityCity) {
      toast.error("Fill in candidate info and compensation first");
      return;
    }

    setAiLoading(true);
    try {
      const selectedPerks = perkOptions
        .filter((p) => enabledPerks.has(p.id))
        .map((p) => p.title);

      const res = await fetch("/api/ai/offer-boost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: values.candidateName,
          role: values.candidateRole ?? "Clinician",
          specialty: values.candidateSpecialty ?? values.specialty ?? "Healthcare",
          facilityName: values.facilityName,
          facilityCity: values.facilityCity,
          facilityState: values.facilityState,
          weeklyPay: values.weeklyPay,
          duration: values.duration ?? 13,
          startDate: values.startDate,
          perks: selectedPerks,
          totalContractValue: values.totalContractValue,
        }),
      });

      const data = await res.json();
      setAiResult(data);
      toast.success("AI offer enhancement generated!");
      setStep(5);
    } catch {
      toast.error("AI generation failed. Using demo data.");
    } finally {
      setAiLoading(false);
    }
  };

  const saveOffer = async () => {
    handleSubmit(async (data) => {
      setSaving(true);
      try {
        const perks = perkOptions
          .filter((p) => enabledPerks.has(p.id))
          .map((p) => ({
            type: p.type,
            title: p.title,
            description: p.description,
            isEnabled: true,
          }));

        const res = await fetch("/api/offers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, perks }),
        });

        if (!res.ok) {
          toast.error("Failed to save offer");
          return;
        }

        const offer = await res.json();
        setSavedOfferId(offer.id);

        // Save AI data if available
        if (aiResult && offer.id) {
          await fetch(`/api/offers/${offer.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              aiEnhancedSummary: aiResult.enhancedSummary,
              aiValueStatement: aiResult.valueStatement,
              aiRecruiterTalkingPoints: aiResult.recruiterTalkingPoints,
              aiSMSPitch: aiResult.smsPitch,
              aiEmailPitch: aiResult.emailPitch,
              aiCloseStrategy: aiResult.closeStrategy,
              candidateConfidenceScore: aiResult.confidenceScore,
            }),
          });
        }

        toast.success("Offer created successfully!");
        router.push(`/agency/offers/${offer.id}/preview`);
      } catch {
        toast.error("Failed to create offer. Please try again.");
      } finally {
        setSaving(false);
      }
    })();
  };

  const totalValue = watchedValues.duration && watchedValues.weeklyPay
    ? watchedValues.duration * watchedValues.weeklyPay
    : null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/agency/offers">
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-orbit-dark">Offer Boost Builder</h1>
          <p className="text-slate-500 text-sm">Create a premium, AI-enhanced offer in minutes</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { num: 1, label: "Candidate" },
          { num: 2, label: "Assignment" },
          { num: 3, label: "Compensation" },
          { num: 4, label: "Perks" },
          { num: 5, label: "AI Boost" },
        ].map(({ num, label }, i) => (
          <React.Fragment key={num}>
            <button
              onClick={() => num <= 4 && setStep(num as any)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                step === num
                  ? "bg-orbit-blue text-white"
                  : step > num
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                step > num ? "bg-emerald-500 text-white" : "bg-white/20"
              }`}>
                {step > num ? "✓" : num}
              </span>
              {label}
            </button>
            {i < 4 && <div className={`h-px flex-1 ${step > num ? "bg-emerald-300" : "bg-slate-200"}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Candidate Info */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Candidate Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input {...register("candidateName")} className="mt-1" placeholder="Maria Santos" />
                {errors.candidateName && <p className="text-red-500 text-xs mt-1">{errors.candidateName.message}</p>}
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" {...register("candidateEmail")} className="mt-1" placeholder="maria@email.com" />
                {errors.candidateEmail && <p className="text-red-500 text-xs mt-1">{errors.candidateEmail.message}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input type="tel" {...register("candidatePhone")} className="mt-1" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <Label>Role *</Label>
                <Select onValueChange={(v) => setValue("candidateRole", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RN">Registered Nurse (RN)</SelectItem>
                    <SelectItem value="LPN">Licensed Practical Nurse (LPN)</SelectItem>
                    <SelectItem value="PT">Physical Therapist (PT)</SelectItem>
                    <SelectItem value="OT">Occupational Therapist (OT)</SelectItem>
                    <SelectItem value="RT">Respiratory Therapist (RT)</SelectItem>
                    <SelectItem value="CRNA">CRNA</SelectItem>
                    <SelectItem value="NP">Nurse Practitioner (NP)</SelectItem>
                    <SelectItem value="PA">Physician Assistant (PA)</SelectItem>
                    <SelectItem value="SLP">Speech-Language Pathologist (SLP)</SelectItem>
                    <SelectItem value="RAD">Radiology Tech</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.candidateRole && <p className="text-red-500 text-xs mt-1">{errors.candidateRole.message}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Specialty</Label>
                <Input {...register("candidateSpecialty")} className="mt-1" placeholder="ICU, ER, Med-Surg..." />
              </div>
              <div>
                <Label>License State</Label>
                <Select onValueChange={(v) => setValue("candidateLicenseState", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Years Experience</Label>
                <Input
                  type="number"
                  {...register("candidateExperience", { valueAsNumber: true })}
                  className="mt-1"
                  placeholder="3"
                  min={0}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>
                Next: Assignment Info <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Assignment Info */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Assignment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label>Facility Name *</Label>
              <Input {...register("facilityName")} className="mt-1" placeholder="St. Mary's Medical Center" />
              {errors.facilityName && <p className="text-red-500 text-xs mt-1">{errors.facilityName.message}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>City *</Label>
                <Input {...register("facilityCity")} className="mt-1" placeholder="Phoenix" />
                {errors.facilityCity && <p className="text-red-500 text-xs mt-1">{errors.facilityCity.message}</p>}
              </div>
              <div>
                <Label>State *</Label>
                <Select onValueChange={(v) => setValue("facilityState", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.facilityState && <p className="text-red-500 text-xs mt-1">{errors.facilityState.message}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input type="date" {...register("startDate")} className="mt-1" />
              </div>
              <div>
                <Label>Duration (weeks)</Label>
                <Input
                  type="number"
                  {...register("duration", { valueAsNumber: true })}
                  className="mt-1"
                  placeholder="13"
                  min={1}
                />
              </div>
              <div>
                <Label>Shift Type</Label>
                <Select onValueChange={(v) => setValue("shiftType", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Days">Days (7am–7pm)</SelectItem>
                    <SelectItem value="Nights">Nights (7pm–7am)</SelectItem>
                    <SelectItem value="Rotating">Rotating</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Specialty / Unit</Label>
                <Input {...register("specialty")} className="mt-1" placeholder="ICU, ER, Med-Surg..." />
              </div>
              <div>
                <Label>MSP / Client</Label>
                <Input {...register("mspClient")} className="mt-1" placeholder="Healthcare Partners MSP" />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button onClick={() => setStep(3)}>
                Next: Compensation <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Compensation */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Compensation Package</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Gross Weekly Pay *</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <Input
                    type="number"
                    {...register("weeklyPay", { valueAsNumber: true })}
                    className="pl-7"
                    placeholder="2400"
                    min={0}
                  />
                </div>
                {errors.weeklyPay && <p className="text-red-500 text-xs mt-1">{errors.weeklyPay.message}</p>}
              </div>
              <div>
                <Label>Taxable Rate</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <Input
                    type="number"
                    {...register("taxableRate", { valueAsNumber: true })}
                    className="pl-7"
                    placeholder="650"
                    min={0}
                  />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Weekly Stipend</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <Input
                    type="number"
                    {...register("stipend", { valueAsNumber: true })}
                    className="pl-7"
                    placeholder="1750"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <Label>Est. Total Contract Value</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <Input
                    type="number"
                    {...register("totalContractValue", { valueAsNumber: true })}
                    className="pl-7"
                    placeholder={totalValue?.toString() ?? "31200"}
                    min={0}
                  />
                </div>
              </div>
            </div>

            {/* Live calculation */}
            {totalValue && (
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-700 mb-1">Auto-calculated total contract value</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${totalValue.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  {watchedValues.weeklyPay?.toLocaleString()} /wk × {watchedValues.duration} weeks
                </p>
              </div>
            )}

            <div>
              <Label>Internal Notes</Label>
              <Textarea {...register("notes")} className="mt-1" placeholder="Any internal notes about this offer..." rows={3} />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button onClick={() => setStep(4)}>
                Next: Add Value Perks <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Perks */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Add Value — Mobility Perks</CardTitle>
              <Badge className="bg-orbit-blue/10 text-orbit-blue border-0">
                {enabledPerks.size} selected
              </Badge>
            </div>
            <p className="text-slate-500 text-sm mt-1">Toggle the perks you're including in this offer. Each one is displayed in the candidate portal.</p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {perkOptions.map((perk) => {
                const enabled = enabledPerks.has(perk.id);
                return (
                  <div
                    key={perk.id}
                    onClick={() => togglePerk(perk.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      enabled
                        ? "border-orbit-blue bg-orbit-blue/5 shadow-orbit"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          enabled ? "bg-orbit-blue text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          <perk.icon className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-sm text-orbit-dark">{perk.title}</span>
                      </div>
                      <Switch checked={enabled} onCheckedChange={() => togglePerk(perk.id)} />
                    </div>
                    <p className="text-xs text-slate-500">{perk.description}</p>
                  </div>
                );
              })}
            </div>

            <Separator className="mb-6" />

            {/* AI Boost CTA */}
            <div className="bg-orbit-gradient rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">AI Offer Enhancement</h3>
                  <p className="text-white/75 text-sm mb-4">
                    Generate an enhanced offer summary, candidate value statement, SMS pitch, email pitch, and recruiter close strategy — powered by AI.
                  </p>
                  <Button
                    onClick={generateAI}
                    loading={aiLoading}
                    className="bg-white text-orbit-dark hover:bg-white/90 font-semibold"
                  >
                    {aiLoading ? "Generating..." : "Generate Enhanced Offer"}
                    {!aiLoading && <Zap className="h-4 w-4 ml-1" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(3)}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button onClick={saveOffer} loading={saving} className="bg-orbit-blue hover:bg-orbit-blue-light text-white">
                Save & Preview Offer <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: AI Results */}
      {step === 5 && aiResult && (
        <div className="space-y-5">
          <Card className="border-orbit-blue border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orbit-blue/10 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-orbit-blue" />
                </div>
                <div>
                  <CardTitle>AI-Generated Offer Enhancement</CardTitle>
                  <p className="text-sm text-slate-500">Confidence Score: {aiResult.confidenceScore}/100</p>
                </div>
                <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-0">Ready to Send</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enhanced Summary */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-semibold">Enhanced Offer Summary</Label>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => { navigator.clipboard.writeText(aiResult.enhancedSummary); toast.success("Copied!"); }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-700">
                  {aiResult.enhancedSummary}
                </div>
              </div>

              {/* Value Statement */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-semibold">Candidate Value Statement</Label>
                  <Button variant="ghost" size="icon-sm" onClick={() => { navigator.clipboard.writeText(aiResult.valueStatement); toast.success("Copied!"); }}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="bg-orbit-blue/5 rounded-xl p-4 border border-orbit-blue/20 text-sm text-orbit-dark font-medium">
                  {aiResult.valueStatement}
                </div>
              </div>

              <Separator />

              {/* SMS Pitch */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-emerald-500" />
                    <Label className="text-sm font-semibold">SMS Pitch</Label>
                  </div>
                  <Button variant="ghost" size="icon-sm" onClick={() => { navigator.clipboard.writeText(aiResult.smsPitch); toast.success("Copied!"); }}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-sm text-emerald-800 font-mono">
                  {aiResult.smsPitch}
                </div>
              </div>

              {/* Email Pitch */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-orbit-blue" />
                    <Label className="text-sm font-semibold">Email Pitch</Label>
                  </div>
                  <Button variant="ghost" size="icon-sm" onClick={() => { navigator.clipboard.writeText(aiResult.emailPitch); toast.success("Copied!"); }}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-700 whitespace-pre-wrap">
                  {aiResult.emailPitch}
                </div>
              </div>

              {/* Recruiter Talking Points */}
              <div>
                <Label className="text-sm font-semibold mb-2 block">Recruiter Talking Points</Label>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-sm text-amber-800">
                  {aiResult.recruiterTalkingPoints}
                </div>
              </div>

              {/* Close Strategy */}
              <div>
                <Label className="text-sm font-semibold mb-2 block">Close Strategy</Label>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 text-sm text-purple-800">
                  {aiResult.closeStrategy}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(4)}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Perks
            </Button>
            <Button
              onClick={saveOffer}
              loading={saving}
              className="bg-orbit-blue hover:bg-orbit-blue-light text-white"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Save & Preview Offer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
