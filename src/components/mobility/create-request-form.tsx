"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {
  agencyId: string;
  candidateId: string;
  assignmentId?: string;
  defaultDestinationCity?: string;
  defaultDestinationState?: string;
  defaultFacilityName?: string;
  durationWeeks?: number;
  candidateName: string;
};

const REQUEST_TYPES = [
  { value: "FULL_RELOCATION_PACKAGE", label: "Full relocation package" },
  { value: "FLIGHT", label: "Flight only" },
  { value: "HOUSING", label: "Housing only" },
  { value: "CAR_RENTAL", label: "Car rental" },
  { value: "HOTEL", label: "Hotel" }
] as const;

const URGENCY = [
  { value: "MEDIUM", label: "Standard" },
  { value: "HIGH", label: "High — start in <2 weeks" },
  { value: "CRITICAL", label: "Critical — start in <1 week" },
  { value: "LOW", label: "Low — flexible" }
] as const;

export function CreateMobilityRequestForm(props: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [requestType, setRequestType] = useState<(typeof REQUEST_TYPES)[number]["value"]>("FULL_RELOCATION_PACKAGE");
  const [urgencyLevel, setUrgencyLevel] = useState<(typeof URGENCY)[number]["value"]>("HIGH");
  const [originCity, setOriginCity] = useState("");
  const [originState, setOriginState] = useState("");
  const [destinationCity, setDestinationCity] = useState(props.defaultDestinationCity ?? "");
  const [destinationState, setDestinationState] = useState(props.defaultDestinationState ?? "");
  const [facilityName, setFacilityName] = useState(props.defaultFacilityName ?? "");
  const [moveDate, setMoveDate] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [petFriendly, setPetFriendly] = useState(false);
  const [housingNeeded, setHousingNeeded] = useState(true);
  const [carNeeded, setCarNeeded] = useState(false);
  const [baggageNeeded, setBaggageNeeded] = useState(true);
  const [notes, setNotes] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    const response = await fetch("/api/mobility/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agencyId: props.agencyId,
        candidateId: props.candidateId,
        assignmentId: props.assignmentId,
        requestType,
        urgencyLevel,
        originCity: originCity || undefined,
        originState: originState || undefined,
        destinationCity,
        destinationState,
        assignmentCity: destinationCity,
        assignmentState: destinationState,
        facilityName: facilityName || undefined,
        moveDate: moveDate || undefined,
        budgetMax: budgetMax ? Number(budgetMax) : undefined,
        petFriendly,
        housingNeeded,
        carNeeded,
        baggageNeeded,
        notes: notes || undefined,
        durationWeeks: props.durationWeeks
      })
    });

    setSubmitting(false);

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: "Unable to submit" }));
      toast.error(err.error ?? "Unable to submit");
      return;
    }

    const data = await response.json();
    toast.success(`Request live. ${data.bidsSeeded ?? 0} verified vendor bids ready for review.`);
    router.push(`/candidate/mobility-request/${data.id}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New mobility request</CardTitle>
        <p className="text-sm text-slate-600">
          {props.candidateName}, tell verified vendors what you need. Most bids land within 2 hours.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={onSubmit}>
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">1. What kind of support?</legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {REQUEST_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={`cursor-pointer rounded-lg border p-3 text-sm transition ${
                    requestType === type.value ? "border-orbit-blue bg-orbit-blue/5" : "border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="requestType"
                    value={type.value}
                    checked={requestType === type.value}
                    onChange={() => setRequestType(type.value)}
                    className="sr-only"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">2. Where to?</legend>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Destination city</span>
                <Input value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} required />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Destination state</span>
                <Input value={destinationState} onChange={(e) => setDestinationState(e.target.value)} required maxLength={20} />
              </label>
            </div>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-900">Facility (optional)</span>
              <Input value={facilityName} onChange={(e) => setFacilityName(e.target.value)} placeholder="Baylor Regional Medical Center" />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">From city (optional)</span>
                <Input value={originCity} onChange={(e) => setOriginCity(e.target.value)} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">From state (optional)</span>
                <Input value={originState} onChange={(e) => setOriginState(e.target.value)} maxLength={20} />
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">3. Timing & budget</legend>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Move date</span>
                <Input type="date" value={moveDate} onChange={(e) => setMoveDate(e.target.value)} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Max budget (USD)</span>
                <Input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="2400"
                  min={0}
                />
              </label>
            </div>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-900">Urgency</span>
              <select
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value as typeof urgencyLevel)}
                className="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-blue"
              >
                {URGENCY.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-slate-900">4. Preferences</legend>
            <div className="grid gap-2 md:grid-cols-2">
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
                <input type="checkbox" checked={housingNeeded} onChange={(e) => setHousingNeeded(e.target.checked)} className="h-4 w-4 accent-orbit-blue" />
                Furnished housing
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
                <input type="checkbox" checked={carNeeded} onChange={(e) => setCarNeeded(e.target.checked)} className="h-4 w-4 accent-orbit-blue" />
                Car rental
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
                <input type="checkbox" checked={baggageNeeded} onChange={(e) => setBaggageNeeded(e.target.checked)} className="h-4 w-4 accent-orbit-blue" />
                Checked bags
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
                <input type="checkbox" checked={petFriendly} onChange={(e) => setPetFriendly(e.target.checked)} className="h-4 w-4 accent-orbit-blue" />
                Pet-friendly housing
              </label>
            </div>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-900">Notes for vendors</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-blue"
                placeholder="Accessibility needs, gear, shift start time..."
              />
            </label>
          </fieldset>

          <Button type="submit" disabled={submitting} className="w-full md:w-auto">
            {submitting ? "Submitting..." : "Open for vendor bids"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
