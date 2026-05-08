"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function BookingRequestForm({ offerId }: { offerId: string }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    const res = await fetch("/api/booking-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offerId,
        needFlight: formData.get("needFlight") === "on",
        needHousing: formData.get("needHousing") === "on",
        needCar: formData.get("needCar") === "on",
        moveDate: formData.get("moveDate"),
        budgetRange: formData.get("budgetRange"),
        preferredLocation: formData.get("preferredLocation"),
        notes: formData.get("notes"),
      }),
    });
    setLoading(false);

    if (!res.ok) {
      toast.error("Unable to submit booking request.");
      return;
    }

    toast.success("Request submitted to mobility concierge.");
    event.currentTarget.reset();
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-2 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
          <input type="checkbox" name="needFlight" /> Need flight
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
          <input type="checkbox" name="needHousing" /> Need housing
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm">
          <input type="checkbox" name="needCar" /> Need car
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input type="date" name="moveDate" />
        <Input name="budgetRange" placeholder="Budget range" />
      </div>
      <Input name="preferredLocation" placeholder="Preferred location" />
      <Textarea name="notes" placeholder="Notes for concierge team" rows={4} />
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Booking Request"}
      </Button>
    </form>
  );
}
