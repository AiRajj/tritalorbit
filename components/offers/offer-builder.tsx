"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, Loader2 } from "lucide-react";

import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/form-controls";
import { StatusBadge } from "@/components/ui/status-badge";
import type { OfferBoostResult } from "@/lib/types";

const perkCards = [
  "Flight Support",
  "Housing Assistance",
  "Car Rental",
  "Relocation Concierge",
  "First Week Readiness",
  "Emergency Housing Support",
  "Loyalty Rewards"
];

const initialAi: OfferBoostResult = {
  enhancedSummary: "",
  valueStatement: "",
  recruiterTalkingPoints: [],
  smsPitch: "",
  emailPitch: "",
  pdfReadyOffer: "",
  closeStrategy: "",
  confidenceScore: 0
};

export function OfferBuilder() {
  const [selectedPerks, setSelectedPerks] = useState<string[]>(["Housing Assistance", "First Week Readiness"]);
  const [ai, setAi] = useState<OfferBoostResult>(initialAi);
  const [loadingAi, setLoadingAi] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createdOfferId, setCreatedOfferId] = useState<string | null>(null);
  const { notify } = useToast();

  const totalContractValue = useMemo(() => 2680 * 13, []);

  function togglePerk(perk: string) {
    setSelectedPerks((current) => (current.includes(perk) ? current.filter((item) => item !== perk) : [...current, perk]));
  }

  async function generateOffer() {
    setLoadingAi(true);
    const response = await fetch("/api/ai/offer-boost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ perks: selectedPerks, candidate: "Maya Johnson", assignment: "Phoenix ICU" })
    });
    const data = (await response.json()) as OfferBoostResult;
    setAi(data);
    setLoadingAi(false);
    notify({ title: "Enhanced offer generated", body: "AI copy, SMS, email, close strategy, and PDF-ready offer are ready." });
  }

  async function saveOffer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      candidate: {
        name: String(formData.get("candidateName")),
        email: String(formData.get("candidateEmail")),
        phone: String(formData.get("candidatePhone")),
        role: String(formData.get("candidateRole")),
        specialty: String(formData.get("candidateSpecialty")),
        licenseState: String(formData.get("licenseState")),
        yearsExperience: Number(formData.get("experience"))
      },
      assignment: {
        facilityName: String(formData.get("facilityName")),
        city: String(formData.get("city")),
        state: String(formData.get("state")),
        startDate: String(formData.get("startDate")),
        durationWeeks: Number(formData.get("duration")),
        shift: String(formData.get("shift")),
        specialty: String(formData.get("assignmentSpecialty")),
        mspClient: String(formData.get("mspClient"))
      },
      compensation: {
        weeklyPay: Number(formData.get("weeklyPay")),
        taxableRate: Number(formData.get("taxableRate")),
        stipend: Number(formData.get("stipend")),
        totalContractValue: Number(formData.get("totalContractValue"))
      },
      perks: selectedPerks,
      ai
    };
    const response = await fetch("/api/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = (await response.json()) as { id: string };
    setSaving(false);
    if (response.ok) {
      setCreatedOfferId(data.id);
      notify({ title: "Offer saved", body: "The offer, perks, AI insights, and activity log are ready." });
    } else {
      notify({ title: "Offer fallback saved", body: "The live database is unavailable, so a demo offer ID was returned." });
      setCreatedOfferId(data.id || "orbit-demo-offer");
    }
  }

  return (
    <form onSubmit={saveOffer} className="grid gap-6">
      <Card>
        <SectionTitle number="1" title="Candidate Info" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Field label="Name"><Input name="candidateName" required defaultValue="Maya Johnson" /></Field>
          <Field label="Email"><Input name="candidateEmail" type="email" required defaultValue="maya.johnson@example.com" /></Field>
          <Field label="Phone"><Input name="candidatePhone" defaultValue="555-0188" /></Field>
          <Field label="Role"><Input name="candidateRole" required defaultValue="Travel RN" /></Field>
          <Field label="Specialty"><Input name="candidateSpecialty" required defaultValue="ICU" /></Field>
          <Field label="License State"><Input name="licenseState" required defaultValue="AZ" /></Field>
          <Field label="Experience"><Input name="experience" type="number" required defaultValue={7} /></Field>
        </div>
      </Card>
      <Card>
        <SectionTitle number="2" title="Assignment Info" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Field label="Facility Name"><Input name="facilityName" required defaultValue="Northlake Medical Center" /></Field>
          <Field label="City"><Input name="city" required defaultValue="Phoenix" /></Field>
          <Field label="State"><Input name="state" required defaultValue="AZ" /></Field>
          <Field label="Start Date"><Input name="startDate" type="date" required defaultValue="2026-06-03" /></Field>
          <Field label="Duration"><Input name="duration" type="number" required defaultValue={13} /></Field>
          <Field label="Shift"><Input name="shift" required defaultValue="Nights, 3x12" /></Field>
          <Field label="Specialty"><Input name="assignmentSpecialty" required defaultValue="ICU" /></Field>
          <Field label="MSP / Client"><Input name="mspClient" defaultValue="Premier MSP" /></Field>
        </div>
      </Card>
      <Card>
        <SectionTitle number="3" title="Compensation" />
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          <Field label="Weekly Pay"><Input name="weeklyPay" type="number" required defaultValue={2680} /></Field>
          <Field label="Taxable Rate"><Input name="taxableRate" type="number" required defaultValue={42} /></Field>
          <Field label="Stipend"><Input name="stipend" type="number" required defaultValue={1240} /></Field>
          <Field label="Estimated Total Contract Value"><Input name="totalContractValue" type="number" required defaultValue={totalContractValue} /></Field>
        </div>
      </Card>
      <Card>
        <SectionTitle number="4" title="Add Value" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {perkCards.map((perk) => {
            const active = selectedPerks.includes(perk);
            return (
              <button
                type="button"
                key={perk}
                onClick={() => togglePerk(perk)}
                className={`rounded-3xl border p-4 text-left transition ${
                  active ? "border-[#E63946] bg-red-50 ring-4 ring-[#E63946]/10" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <CheckCircle2 className={active ? "h-5 w-5 text-[#E63946]" : "h-5 w-5 text-slate-300"} />
                <p className="mt-3 font-black text-slate-900">{perk}</p>
              </button>
            );
          })}
        </div>
      </Card>
      <Card>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <SectionTitle number="5" title="AI Offer Enhancement" />
          <Button type="button" onClick={generateOffer} disabled={loadingAi}>
            {loadingAi ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
            Generate Enhanced Offer
          </Button>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Field label="Enhanced offer summary"><Textarea readOnly value={ai.enhancedSummary} placeholder="Generate to populate." /></Field>
          <Field label="Candidate-facing value statement"><Textarea readOnly value={ai.valueStatement} placeholder="Generate to populate." /></Field>
          <Field label="SMS pitch"><Textarea readOnly value={ai.smsPitch} placeholder="Generate to populate." /></Field>
          <Field label="Email pitch"><Textarea readOnly value={ai.emailPitch} placeholder="Generate to populate." /></Field>
          <Field label="PDF-ready offer"><Textarea readOnly value={ai.pdfReadyOffer} placeholder="Generate to populate." /></Field>
          <Field label="Close strategy"><Textarea readOnly value={ai.closeStrategy} placeholder="Generate to populate." /></Field>
        </div>
        {ai.confidenceScore ? <div className="mt-4"><StatusBadge label={`Candidate confidence ${ai.confidenceScore}/100`} tone="green" /></div> : null}
      </Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="submit" size="lg" disabled={saving}>{saving ? "Saving..." : "Save Offer"}</Button>
        <Button asChild size="lg" variant="outline" className={!createdOfferId ? "pointer-events-none opacity-50" : ""}>
          <Link href={`/agency/offers/${createdOfferId || "orbit-demo-offer"}/preview`}>
            Preview offer <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </form>
  );
}

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0B3C5D] text-sm font-black text-white">{number}</span>
      <h2 className="text-2xl font-black text-[#0B3C5D]">{title}</h2>
    </div>
  );
}
