"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type AssignmentOption = {
  id: string;
  facilityName: string;
  city: string;
  state: string;
};

export function TravelRequestForm({ assignments }: { assignments: AssignmentOption[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      assignmentId: formData.get("assignmentId"),
      preferredAirport: formData.get("preferredAirport"),
      originAirport: formData.get("originAirport"),
      departureDate: formData.get("departureDate"),
      returnDate: formData.get("returnDate") || undefined,
      needCar: formData.get("needCar") === "on",
      needHotel: formData.get("needHotel") === "on",
      baggageCount: Number(formData.get("baggageCount") || 1),
      carType: formData.get("carType") || undefined,
      hotelNights: formData.get("hotelNights") ? Number(formData.get("hotelNights")) : undefined,
      specialRequirements: formData.get("specialRequirements") || undefined,
      agencyTravelCredit: Number(formData.get("agencyTravelCredit") || 0)
    };

    const response = await fetch("/api/mobility-exchange/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to create travel request");
      return;
    }

    toast.success("Travel request published to Live Mobility Exchange™");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <Label htmlFor="assignmentId">Assignment</Label>
        <select
          id="assignmentId"
          name="assignmentId"
          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
          required
        >
          <option value="">Select assignment</option>
          {assignments.map((assignment) => (
            <option key={assignment.id} value={assignment.id}>
              {assignment.facilityName} — {assignment.city}, {assignment.state}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="originAirport">Origin Airport</Label>
          <Input id="originAirport" name="originAirport" placeholder="DFW" />
        </div>
        <div>
          <Label htmlFor="preferredAirport">Preferred Destination Airport</Label>
          <Input id="preferredAirport" name="preferredAirport" placeholder="JFK" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input id="departureDate" name="departureDate" type="date" required />
        </div>
        <div>
          <Label htmlFor="returnDate">Return Date (optional)</Label>
          <Input id="returnDate" name="returnDate" type="date" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="needCar" /> Include car rental bids
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="needHotel" /> Include hotel bids
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="baggageCount">Baggage count</Label>
          <Input id="baggageCount" name="baggageCount" type="number" min={0} max={5} defaultValue={1} />
        </div>
        <div>
          <Label htmlFor="carType">Car Type</Label>
          <Input id="carType" name="carType" placeholder="SUV" />
        </div>
        <div>
          <Label htmlFor="hotelNights">Hotel Nights</Label>
          <Input id="hotelNights" name="hotelNights" type="number" min={0} />
        </div>
      </div>

      <div>
        <Label htmlFor="agencyTravelCredit">Agency travel credit ($)</Label>
        <Input id="agencyTravelCredit" name="agencyTravelCredit" type="number" min={0} step="0.01" defaultValue={0} />
      </div>

      <div>
        <Label htmlFor="specialRequirements">Special requirements</Label>
        <Textarea
          id="specialRequirements"
          name="specialRequirements"
          rows={3}
          placeholder="Preferred nonstop, extra legroom, arrival before 5 PM."
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Publishing..." : "Publish live travel request"}
      </Button>
    </form>
  );
}
