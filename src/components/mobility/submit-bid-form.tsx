"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {
  mobilityRequestId: string;
  bidType: "FLIGHT" | "HOUSING" | "CAR_RENTAL" | "HOTEL" | "FULL_RELOCATION_PACKAGE";
  destinationLabel: string;
};

export function SubmitBidForm({ mobilityRequestId, bidType, destinationLabel }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [housingMonthlyCost, setHousingMonthlyCost] = useState("");
  const [housingAddress, setHousingAddress] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [carRentalCompany, setCarRentalCompany] = useState("");
  const [carClass, setCarClass] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [nightlyRate, setNightlyRate] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("Free cancel up to 48 hours before move");
  const [notes, setNotes] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    const response = await fetch("/api/mobility/bids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobilityRequestId,
        bidType,
        packageName,
        totalPrice: Number(totalPrice),
        housingMonthlyCost: housingMonthlyCost ? Number(housingMonthlyCost) : undefined,
        housingAddress: housingAddress || undefined,
        airlineName: airlineName || undefined,
        flightNumber: flightNumber || undefined,
        carRentalCompany: carRentalCompany || undefined,
        carClass: carClass || undefined,
        hotelName: hotelName || undefined,
        nightlyRate: nightlyRate ? Number(nightlyRate) : undefined,
        cancellationPolicy: cancellationPolicy || undefined,
        notes: notes || undefined
      })
    });

    setSubmitting(false);

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: "Unable to submit" }));
      toast.error(err.error ?? "Unable to submit");
      return;
    }

    toast.success("Bid submitted. Candidate and agency notified.");
    router.refresh();
    setPackageName("");
    setTotalPrice("");
    setHousingMonthlyCost("");
    setHousingAddress("");
    setAirlineName("");
    setFlightNumber("");
    setCarRentalCompany("");
    setCarClass("");
    setHotelName("");
    setNightlyRate("");
    setNotes("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a bid</CardTitle>
        <p className="text-sm text-slate-600">For {destinationLabel}</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-900">Package name</span>
              <Input value={packageName} onChange={(e) => setPackageName(e.target.value)} required placeholder="Furnished 1BR + utilities" />
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-900">Total price (USD)</span>
              <Input type="number" min={1} value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} required />
            </label>
          </div>

          {bidType === "HOUSING" || bidType === "FULL_RELOCATION_PACKAGE" ? (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Address</span>
                <Input value={housingAddress} onChange={(e) => setHousingAddress(e.target.value)} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Monthly cost</span>
                <Input type="number" min={0} value={housingMonthlyCost} onChange={(e) => setHousingMonthlyCost(e.target.value)} />
              </label>
            </div>
          ) : null}

          {bidType === "FLIGHT" || bidType === "FULL_RELOCATION_PACKAGE" ? (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Airline</span>
                <Input value={airlineName} onChange={(e) => setAirlineName(e.target.value)} placeholder="Delta" />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Flight number</span>
                <Input value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} placeholder="DL1247" />
              </label>
            </div>
          ) : null}

          {bidType === "CAR_RENTAL" ? (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Rental company</span>
                <Input value={carRentalCompany} onChange={(e) => setCarRentalCompany(e.target.value)} placeholder="Enterprise" />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Class</span>
                <Input value={carClass} onChange={(e) => setCarClass(e.target.value)} placeholder="Mid-size" />
              </label>
            </div>
          ) : null}

          {bidType === "HOTEL" ? (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Hotel name</span>
                <Input value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-900">Nightly rate</span>
                <Input type="number" min={0} value={nightlyRate} onChange={(e) => setNightlyRate(e.target.value)} />
              </label>
            </div>
          ) : null}

          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-900">Cancellation policy</span>
            <Input value={cancellationPolicy} onChange={(e) => setCancellationPolicy(e.target.value)} />
          </label>

          <label className="space-y-1 text-sm">
            <span className="font-medium text-slate-900">Notes (optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-blue"
            />
          </label>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit bid"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
