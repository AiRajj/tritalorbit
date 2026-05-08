"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const perkOptions = [
  "Flight Support",
  "Housing Assistance",
  "Car Rental",
  "Relocation Concierge",
  "First Week Readiness",
  "Emergency Housing Support",
  "Loyalty Rewards"
];

export function OfferBuilderForm({ recruiterId, agencyId }: { recruiterId: string; agencyId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<null | {
    summary: string;
    bullets: string[];
    mock: boolean;
  }>(null);

  const [perks, setPerks] = useState(() =>
    perkOptions.map((name) => ({
      name,
      enabled: ["Flight Support", "Housing Assistance", "Relocation Concierge", "First Week Readiness"].includes(name)
    }))
  );

  const estimatedContractValue = useMemo(() => {
    return "Auto-calculated from input values";
  }, []);

  function updatePerk(name: string, enabled: boolean) {
    setPerks((current) => current.map((perk) => (perk.name === name ? { ...perk, enabled } : perk)));
  }

  async function generateEnhancedOffer(formData: FormData) {
    setAiLoading(true);

    const prompt = `Candidate ${formData.get("candidateName")} for ${formData.get("role")} ${formData.get("specialty")} at ${formData.get("facilityName")} in ${formData.get("city")}, ${formData.get("state")}. Weekly pay ${formData.get("weeklyPay")} stipend ${formData.get("stipend")}.`;

    const response = await fetch("/api/ai/offer-boost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    setAiLoading(false);

    if (!response.ok) {
      toast.error("Unable to generate AI output");
      return;
    }

    const data = (await response.json()) as { summary: string; bullets: string[]; mock: boolean };
    setAiOutput(data);
    toast.success(data.mock ? "Generated professional fallback copy" : "AI enhancement generated");
  }

  async function onSubmit(formData: FormData) {
    setLoading(true);

    const weeklyPay = Number(formData.get("weeklyPay"));
    const taxableRate = Number(formData.get("taxableRate"));
    const stipend = Number(formData.get("stipend"));
    const durationWeeks = Number(formData.get("durationWeeks"));

    const payload = {
      recruiterId,
      agencyId,
      candidate: {
        name: formData.get("candidateName"),
        email: formData.get("candidateEmail"),
        phone: formData.get("candidatePhone"),
        role: formData.get("role"),
        specialty: formData.get("specialty"),
        licenseState: formData.get("licenseState"),
        experienceYears: Number(formData.get("experienceYears"))
      },
      assignment: {
        facilityName: formData.get("facilityName"),
        city: formData.get("city"),
        state: formData.get("state"),
        startDate: formData.get("startDate"),
        durationWeeks,
        shift: formData.get("shift"),
        specialty: formData.get("specialty"),
        role: formData.get("role"),
        mspClient: formData.get("mspClient")
      },
      compensation: {
        weeklyPay,
        taxableRate,
        stipend,
        estimatedContractValue: Number.isFinite(weeklyPay * durationWeeks) ? weeklyPay * durationWeeks : 0
      },
      perks
    };

    const response = await fetch("/api/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to save offer");
      return;
    }

    const data = (await response.json()) as { offerId: string };
    toast.success("Offer created");
    router.push(`/agency/offers/${data.offerId}/preview`);
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Candidate Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="candidateName">Name</Label>
            <Input id="candidateName" name="candidateName" required />
          </div>
          <div>
            <Label htmlFor="candidateEmail">Email</Label>
            <Input id="candidateEmail" name="candidateEmail" type="email" required />
          </div>
          <div>
            <Label htmlFor="candidatePhone">Phone</Label>
            <Input id="candidatePhone" name="candidatePhone" required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" name="role" required />
          </div>
          <div>
            <Label htmlFor="specialty">Specialty</Label>
            <Input id="specialty" name="specialty" required />
          </div>
          <div>
            <Label htmlFor="licenseState">License State</Label>
            <Input id="licenseState" name="licenseState" required />
          </div>
          <div>
            <Label htmlFor="experienceYears">Experience (years)</Label>
            <Input id="experienceYears" name="experienceYears" type="number" min="0" defaultValue="1" required />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Assignment Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="facilityName">Facility Name</Label>
            <Input id="facilityName" name="facilityName" required />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" required />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" required />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" name="startDate" type="date" required />
          </div>
          <div>
            <Label htmlFor="durationWeeks">Duration (weeks)</Label>
            <Input id="durationWeeks" name="durationWeeks" type="number" min="1" defaultValue="13" required />
          </div>
          <div>
            <Label htmlFor="shift">Shift</Label>
            <Input id="shift" name="shift" required />
          </div>
          <div>
            <Label htmlFor="mspClient">MSP / Client</Label>
            <Input id="mspClient" name="mspClient" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Compensation</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="weeklyPay">Weekly Pay</Label>
            <Input id="weeklyPay" name="weeklyPay" type="number" min="0" step="0.01" required />
          </div>
          <div>
            <Label htmlFor="taxableRate">Taxable Rate</Label>
            <Input id="taxableRate" name="taxableRate" type="number" min="0" step="0.01" required />
          </div>
          <div>
            <Label htmlFor="stipend">Stipend</Label>
            <Input id="stipend" name="stipend" type="number" min="0" step="0.01" required />
          </div>
          <div>
            <Label>Estimated Total Contract Value</Label>
            <p className="mt-2 text-sm text-slate-600">{estimatedContractValue}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Add Value</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => (
            <div key={perk.name} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-medium text-slate-700">{perk.name}</p>
              <Checkbox checked={perk.enabled} onCheckedChange={(checked) => updatePerk(perk.name, checked)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. AI Offer Enhancement</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            onClick={async (event) => {
              const form = event.currentTarget.closest("form");
              if (!form) return;
              await generateEnhancedOffer(new FormData(form));
            }}
          >
            <Sparkles className="h-4 w-4" />
            {aiLoading ? "Generating..." : "Generate Enhanced Offer"}
          </Button>

          {aiOutput ? (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Enhanced offer summary</p>
              <p className="mt-2 text-sm text-slate-700">{aiOutput.summary}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {aiOutput.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
              <Textarea
                className="mt-4"
                readOnly
                value={`Candidate-facing value statement:\n${aiOutput.summary}\n\nRecruiter talking points:\n${aiOutput.bullets.join("\n")}\n\nSMS pitch:\n${aiOutput.summary}\n\nEmail pitch:\nSubject: Assignment with full mobility support\n${aiOutput.summary}`}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving offer..." : "Save offer and continue"}
      </Button>
    </form>
  );
}
