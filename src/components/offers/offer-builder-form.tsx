"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const perkOptions = [
  { type: "FLIGHT_SUPPORT", title: "Flight Support", description: "Travel planning and flight subsidy" },
  { type: "HOUSING_ASSISTANCE", title: "Housing Assistance", description: "Verified housing search and placement" },
  { type: "CAR_RENTAL", title: "Car Rental", description: "Discounted mobility options for assignment city" },
  { type: "RELOCATION_CONCIERGE", title: "Relocation Concierge", description: "Dedicated move coordinator" },
  { type: "FIRST_WEEK_READINESS", title: "First Week Readiness", description: "Checklist support and launch prep" },
  { type: "EMERGENCY_HOUSING", title: "Emergency Housing Support", description: "Rapid response fallback housing" },
  { type: "LOYALTY_REWARDS", title: "Loyalty Rewards", description: "Repeat assignment perks and retention rewards" },
];

export function OfferBuilderForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState<string[]>(["HOUSING_ASSISTANCE", "RELOCATION_CONCIERGE"]);
  const [aiOutput, setAiOutput] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const perksPayload = useMemo(
    () =>
      perkOptions.map((perk) => ({
        ...perk,
        included: selectedPerks.includes(perk.type),
      })),
    [selectedPerks],
  );

  async function handleGenerateAi(form: HTMLFormElement) {
    const formData = new FormData(form);
    const payload = {
      candidateName: String(formData.get("candidateFullName") || "Candidate"),
      role: String(formData.get("candidateRole") || "Clinician"),
      specialty: String(formData.get("assignmentSpecialty") || "Specialty"),
      location: `${formData.get("assignmentCity")}, ${formData.get("assignmentState")}`,
      weeklyPay: Number(formData.get("weeklyPay") || 0),
      perks: perksPayload.filter((p) => p.included).map((p) => p.title),
    };

    setAiLoading(true);
    const res = await fetch("/api/ai/offer-boost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setAiLoading(false);

    if (!res.ok) {
      toast.error("Could not generate AI enhancement.");
      return;
    }

    const data = (await res.json()) as { content?: string };
    setAiOutput(data.content ?? "No AI output generated.");
    toast.success("Enhanced offer generated.");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      candidate: {
        fullName: formData.get("candidateFullName"),
        email: formData.get("candidateEmail"),
        phone: formData.get("candidatePhone"),
        roleTitle: formData.get("candidateRole"),
        specialty: formData.get("candidateSpecialty"),
        licenseState: formData.get("candidateLicenseState"),
        yearsExperience: Number(formData.get("candidateExperience") || 0),
      },
      assignment: {
        facilityName: formData.get("facilityName"),
        city: formData.get("assignmentCity"),
        state: formData.get("assignmentState"),
        startDate: formData.get("startDate"),
        durationWeeks: Number(formData.get("durationWeeks") || 13),
        shift: formData.get("shift"),
        specialty: formData.get("assignmentSpecialty"),
        mspClientName: formData.get("mspClient"),
      },
      compensation: {
        weeklyPay: Number(formData.get("weeklyPay") || 0),
        taxableRate: Number(formData.get("taxableRate") || 0),
        stipend: Number(formData.get("stipend") || 0),
        estimatedContractValue: Number(formData.get("contractValue") || 0),
      },
      perks: perksPayload,
    };

    setLoading(true);
    const res = await fetch("/api/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      toast.error(data.error ?? "Offer creation failed");
      return;
    }

    const data = (await res.json()) as { offerId: string };
    toast.success("Offer saved successfully.");
    router.push(`/agency/offers/${data.offerId}/preview`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
      <Card>
        <CardHeader>
          <CardTitle>1. Candidate Info</CardTitle>
          <CardDescription>Core clinician profile and licensing details.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Input name="candidateFullName" placeholder="Name" required />
          <Input name="candidateEmail" type="email" placeholder="Email" required />
          <Input name="candidatePhone" placeholder="Phone" />
          <Input name="candidateRole" placeholder="Role" />
          <Input name="candidateSpecialty" placeholder="Specialty" />
          <Input name="candidateLicenseState" placeholder="License State" />
          <Input name="candidateExperience" placeholder="Experience (years)" type="number" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Assignment Info</CardTitle>
          <CardDescription>Facility, market, and start timeline.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Input name="facilityName" placeholder="Facility Name" required />
          <Input name="assignmentCity" placeholder="City" required />
          <Input name="assignmentState" placeholder="State (e.g. TX)" maxLength={2} required />
          <Input name="startDate" type="date" required />
          <Input name="durationWeeks" type="number" placeholder="Duration (weeks)" defaultValue={13} required />
          <Input name="shift" placeholder="Shift" required />
          <Input name="assignmentSpecialty" placeholder="Specialty" required />
          <Input name="mspClient" placeholder="MSP / Client" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Compensation</CardTitle>
          <CardDescription>Transparent package breakdown and total value.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Input name="weeklyPay" type="number" placeholder="Weekly Pay" required />
          <Input name="taxableRate" type="number" placeholder="Taxable Rate" required />
          <Input name="stipend" type="number" placeholder="Stipend" required />
          <Input name="contractValue" type="number" placeholder="Total Contract Value" required />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Add Value</CardTitle>
          <CardDescription>Toggle mobility perks included in this offer package.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {perkOptions.map((perk) => {
            const active = selectedPerks.includes(perk.type);
            return (
              <button
                key={perk.type}
                type="button"
                onClick={() =>
                  setSelectedPerks((prev) =>
                    prev.includes(perk.type) ? prev.filter((value) => value !== perk.type) : [...prev, perk.type],
                  )
                }
                className={`rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-[#0B3C5D] bg-[#0B3C5D]/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <p className="font-semibold text-slate-900">{perk.title}</p>
                <p className="mt-1 text-sm text-slate-600">{perk.description}</p>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. AI Offer Enhancement</CardTitle>
          <CardDescription>
            Generate enhanced offer summary, recruiter talking points, SMS and email pitch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => formRef.current && handleGenerateAi(formRef.current)}
            disabled={aiLoading}
          >
            {aiLoading ? "Generating..." : "Generate Enhanced Offer"}
          </Button>
          <Textarea
            value={aiOutput}
            onChange={(event) => setAiOutput(event.target.value)}
            placeholder="AI output appears here. You can edit before sending."
            rows={8}
          />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Saving..." : "Save Offer & Open Preview"}
        </Button>
      </div>
    </form>
  );
}
