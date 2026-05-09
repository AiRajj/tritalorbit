"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TravelBidForm({ requestId }: { requestId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      requestId,
      packageType: formData.get("packageType"),
      airline: formData.get("airline"),
      flightType: formData.get("flightType"),
      stops: Number(formData.get("stops") || 0),
      totalPrice: Number(formData.get("totalPrice")),
      includesCar: formData.get("includesCar") === "on",
      includesHotel: formData.get("includesHotel") === "on",
      carProvider: formData.get("carProvider") || undefined,
      hotelName: formData.get("hotelName") || undefined,
      notes: formData.get("notes") || undefined,
      expiresAt: formData.get("expiresAt")
    };

    const response = await fetch(`/api/mobility-exchange/requests/${requestId}/bids`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to submit bid");
      return;
    }

    toast.success("Travel bid submitted");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor={`packageType-${requestId}`}>Package Type</Label>
          <select
            id={`packageType-${requestId}`}
            name="packageType"
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            defaultValue="FLIGHT_ONLY"
          >
            <option value="FLIGHT_ONLY">Flight Only</option>
            <option value="FLIGHT_CAR">Flight + Car</option>
            <option value="FLIGHT_HOTEL">Flight + Hotel</option>
            <option value="FULL_RELOCATION">Full Relocation</option>
          </select>
        </div>
        <div>
          <Label htmlFor={`airline-${requestId}`}>Airline</Label>
          <Input id={`airline-${requestId}`} name="airline" placeholder="Delta" required />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor={`flightType-${requestId}`}>Flight Type</Label>
          <Input id={`flightType-${requestId}`} name="flightType" placeholder="Nonstop" required />
        </div>
        <div>
          <Label htmlFor={`stops-${requestId}`}>Stops</Label>
          <Input id={`stops-${requestId}`} name="stops" type="number" min={0} max={4} defaultValue={0} />
        </div>
        <div>
          <Label htmlFor={`totalPrice-${requestId}`}>Total Price ($)</Label>
          <Input id={`totalPrice-${requestId}`} name="totalPrice" type="number" min={1} step="0.01" required />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="includesCar" /> Includes car
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="includesHotel" /> Includes hotel
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor={`carProvider-${requestId}`}>Car Provider</Label>
          <Input id={`carProvider-${requestId}`} name="carProvider" placeholder="Hertz" />
        </div>
        <div>
          <Label htmlFor={`hotelName-${requestId}`}>Hotel Name</Label>
          <Input id={`hotelName-${requestId}`} name="hotelName" placeholder="Hilton Midtown" />
        </div>
      </div>

      <div>
        <Label htmlFor={`expiresAt-${requestId}`}>Bid Expiration</Label>
        <Input id={`expiresAt-${requestId}`} name="expiresAt" type="datetime-local" required />
      </div>

      <div>
        <Label htmlFor={`notes-${requestId}`}>Notes</Label>
        <Textarea id={`notes-${requestId}`} name="notes" rows={2} />
      </div>

      <Button type="submit" size="sm" disabled={loading}>
        {loading ? "Submitting..." : "Submit bid"}
      </Button>
    </form>
  );
}
