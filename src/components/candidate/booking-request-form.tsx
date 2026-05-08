"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BookingRequestForm({ offerId }: { offerId: string }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      offerId,
      needFlight: formData.get("needFlight") === "on",
      needHousing: formData.get("needHousing") === "on",
      needCar: formData.get("needCar") === "on",
      moveDate: formData.get("moveDate"),
      budgetRange: formData.get("budgetRange"),
      preferredLocation: formData.get("preferredLocation"),
      notes: formData.get("notes")
    };

    const response = await fetch("/api/booking-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to submit request");
      return;
    }

    toast.success("Booking request submitted. Concierge team has been notified.");
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid gap-2 text-sm text-slate-700">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="needFlight" /> Need flight?
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="needHousing" /> Need housing?
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="needCar" /> Need car?
        </label>
      </div>

      <div>
        <Label htmlFor="moveDate">Move date</Label>
        <Input id="moveDate" name="moveDate" type="date" />
      </div>

      <div>
        <Label htmlFor="budgetRange">Budget range</Label>
        <Input id="budgetRange" name="budgetRange" placeholder="$1800-$2300" />
      </div>

      <div>
        <Label htmlFor="preferredLocation">Preferred location</Label>
        <Input id="preferredLocation" name="preferredLocation" />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" rows={4} />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit booking request"}
      </Button>
    </form>
  );
}
