"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {
  token: string;
  candidateName: string;
  assignmentLabel: string;
};

export function PublicBookingForm({ token, candidateName, assignmentLabel }: Props) {
  const router = useRouter();
  const [needFlight, setNeedFlight] = useState(true);
  const [needHousing, setNeedHousing] = useState(true);
  const [needCar, setNeedCar] = useState(false);
  const [moveDate, setMoveDate] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    const response = await fetch(`/api/candidate/offers/${token}/booking-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        needFlight,
        needHousing,
        needCar,
        moveDate: moveDate || undefined,
        budgetRange: budgetRange || undefined,
        preferredLocation: preferredLocation || undefined,
        notes: notes || undefined
      })
    });

    setSubmitting(false);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unable to submit" }));
      toast.error(error.error ?? "Unable to submit");
      return;
    }

    toast.success("Concierge team notified. You will hear back within 24 hours.");
    router.push(`/candidate/offer/${token}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request mobility support</CardTitle>
        <p className="text-sm text-slate-600">
          {candidateName}, tell our concierge team what you need for {assignmentLabel}.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit}>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-slate-900">What do you need?</legend>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                checked={needFlight}
                onChange={(e) => setNeedFlight(e.target.checked)}
                className="h-4 w-4 accent-orbit-blue"
              />
              <span className="text-sm">Flight from home to assignment city</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                checked={needHousing}
                onChange={(e) => setNeedHousing(e.target.checked)}
                className="h-4 w-4 accent-orbit-blue"
              />
              <span className="text-sm">Furnished housing near the facility</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                checked={needCar}
                onChange={(e) => setNeedCar(e.target.checked)}
                className="h-4 w-4 accent-orbit-blue"
              />
              <span className="text-sm">Car rental or local transportation</span>
            </label>
          </fieldset>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-900">Move date</span>
              <Input type="date" value={moveDate} onChange={(e) => setMoveDate(e.target.value)} />
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-900">Housing budget (optional)</span>
              <Input
                placeholder="$1,800 - $2,300"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
              />
            </label>
          </div>

          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-900">Preferred location (optional)</span>
            <Input
              placeholder="Within 20 min of facility, pet-friendly"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
            />
          </label>

          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-900">Anything else our concierge should know?</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-blue"
              placeholder="Pets, accessibility needs, gear shipping..."
            />
          </label>

          <Button type="submit" disabled={submitting} className="w-full md:w-auto">
            {submitting ? "Sending..." : "Send to concierge team"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
