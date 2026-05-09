"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ExternalOfferForm({ candidateId }: { candidateId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      candidateId,
      sourceLabel: formData.get("sourceLabel"),
      agencyName: formData.get("agencyName"),
      role: formData.get("role"),
      specialty: formData.get("specialty"),
      locationCity: formData.get("locationCity"),
      locationState: formData.get("locationState"),
      weeklyPay: Number(formData.get("weeklyPay")),
      taxableRate: formData.get("taxableRate") ? Number(formData.get("taxableRate")) : undefined,
      stipend: formData.get("stipend") ? Number(formData.get("stipend")) : undefined,
      durationWeeks: formData.get("durationWeeks") ? Number(formData.get("durationWeeks")) : undefined,
      travelSupportScore: formData.get("travelSupportScore") ? Number(formData.get("travelSupportScore")) : undefined,
      housingSupportScore: formData.get("housingSupportScore") ? Number(formData.get("housingSupportScore")) : undefined,
      readinessSupportScore: formData.get("readinessSupportScore") ? Number(formData.get("readinessSupportScore")) : undefined,
      costOfLivingIndex: formData.get("costOfLivingIndex") ? Number(formData.get("costOfLivingIndex")) : undefined,
      rawText: formData.get("rawText") || undefined
    };

    const response = await fetch("/api/offer-comparisons/external-offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to add external offer");
      return;
    }

    toast.success("External offer added");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="sourceLabel">Source Label</Label>
          <Input id="sourceLabel" name="sourceLabel" placeholder="Aya Offer PDF" required />
        </div>
        <div>
          <Label htmlFor="agencyName">Agency Name</Label>
          <Input id="agencyName" name="agencyName" placeholder="Aya Healthcare" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" placeholder="RN" required />
        </div>
        <div>
          <Label htmlFor="specialty">Specialty</Label>
          <Input id="specialty" name="specialty" placeholder="ICU" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="locationCity">City</Label>
          <Input id="locationCity" name="locationCity" required />
        </div>
        <div>
          <Label htmlFor="locationState">State</Label>
          <Input id="locationState" name="locationState" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <Label htmlFor="weeklyPay">Weekly Pay</Label>
          <Input id="weeklyPay" name="weeklyPay" type="number" min={0} step="0.01" required />
        </div>
        <div>
          <Label htmlFor="taxableRate">Taxable Rate</Label>
          <Input id="taxableRate" name="taxableRate" type="number" min={0} step="0.01" />
        </div>
        <div>
          <Label htmlFor="stipend">Stipend</Label>
          <Input id="stipend" name="stipend" type="number" min={0} step="0.01" />
        </div>
        <div>
          <Label htmlFor="durationWeeks">Duration Weeks</Label>
          <Input id="durationWeeks" name="durationWeeks" type="number" min={1} max={52} defaultValue={13} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <Label htmlFor="travelSupportScore">Travel Score</Label>
          <Input id="travelSupportScore" name="travelSupportScore" type="number" min={0} max={100} defaultValue={50} />
        </div>
        <div>
          <Label htmlFor="housingSupportScore">Housing Score</Label>
          <Input id="housingSupportScore" name="housingSupportScore" type="number" min={0} max={100} defaultValue={50} />
        </div>
        <div>
          <Label htmlFor="readinessSupportScore">Readiness Score</Label>
          <Input id="readinessSupportScore" name="readinessSupportScore" type="number" min={0} max={100} defaultValue={50} />
        </div>
        <div>
          <Label htmlFor="costOfLivingIndex">COL Index</Label>
          <Input id="costOfLivingIndex" name="costOfLivingIndex" type="number" min={0.5} max={3} step="0.01" defaultValue={1} />
        </div>
      </div>

      <div>
        <Label htmlFor="rawText">Offer Notes / Raw Text</Label>
        <Textarea id="rawText" name="rawText" rows={3} placeholder="Paste key details from competitor offer" />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add External Offer"}
      </Button>
    </form>
  );
}
