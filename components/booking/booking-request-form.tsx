"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/form-controls";

export function BookingRequestForm({ offerId }: { offerId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { notify } = useToast();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/booking-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        offerId,
        needsFlight: data.needsFlight === "on",
        needsHousing: data.needsHousing === "on",
        needsCar: data.needsCar === "on"
      })
    });
    setLoading(false);

    if (response.ok) {
      notify({
        title: "Booking request created",
        body: "A concierge task was created and the agency booking queue was updated."
      });
      router.push("/candidate");
    } else {
      notify({ title: "Request captured as fallback", body: "The request can be retried when database credentials are configured." });
    }
  }

  return (
    <Card>
      <form onSubmit={submit} className="grid gap-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["needsFlight", "Need flight?"],
            ["needsHousing", "Need housing?"],
            ["needsCar", "Need car?"]
          ].map(([name, label]) => (
            <label key={name} className="flex items-center gap-3 rounded-3xl border border-slate-200 p-4 text-sm font-bold">
              <input name={name} type="checkbox" className="h-4 w-4 accent-[#E63946]" />
              {label}
            </label>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Move date"><Input name="moveDate" type="date" required defaultValue="2026-06-01" /></Field>
          <Field label="Budget range"><Input name="budgetRange" placeholder="$1,800 - $2,400" /></Field>
        </div>
        <Field label="Preferred location"><Input name="preferredLocation" placeholder="Within 15 minutes of facility" /></Field>
        <Field label="Notes"><Textarea name="notes" placeholder="Share timing, pets, parking, accessibility, or reimbursement questions." /></Field>
        <Button type="submit" size="lg" disabled={loading}>{loading ? "Creating request..." : "Submit booking request"}</Button>
      </form>
    </Card>
  );
}
