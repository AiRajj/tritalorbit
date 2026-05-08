"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type FormValues = {
  needFlight: boolean;
  needHousing: boolean;
  needCar: boolean;
  moveDate?: string;
  budgetMin?: string;
  budgetMax?: string;
  preferredLocation?: string;
  notes?: string;
};

export function BookingRequestForm({
  offerId,
  candidateId,
  agencyId,
  defaults,
  preferredLocation,
}: {
  offerId: string;
  candidateId: string;
  agencyId: string;
  defaults: { needFlight?: boolean; needHousing?: boolean; needCar?: boolean };
  preferredLocation?: string;
}) {
  const router = useRouter();
  const [submitted, setSubmitted] = React.useState(false);
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      needFlight: defaults.needFlight ?? false,
      needHousing: defaults.needHousing ?? true,
      needCar: defaults.needCar ?? false,
      preferredLocation,
    },
  });
  const values = watch();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          offerId,
          candidateId,
          agencyId,
          needFlight: data.needFlight,
          needHousing: data.needHousing,
          needCar: data.needCar,
          moveDate: data.moveDate || null,
          budgetMin: data.budgetMin ? Number(data.budgetMin) : null,
          budgetMax: data.budgetMax ? Number(data.budgetMax) : null,
          preferredLocation: data.preferredLocation || null,
          notes: data.notes || null,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error("Failed");
      toast.success("Request received", { description: "Concierge will respond within 1 business day." });
      setSubmitted(true);
    } catch {
      toast.error("Couldn't submit request.");
    }
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        <div className="font-semibold">Request received.</div>
        <p className="mt-1 text-sm">A concierge will reach out within 1 business day with shortlisted options.</p>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label>What do you need?</Label>
        <div className="grid gap-2 md:grid-cols-3">
          <ToggleRow label="Flight" checked={values.needFlight} onChange={(v) => setValue("needFlight", v)} />
          <ToggleRow label="Housing" checked={values.needHousing} onChange={(v) => setValue("needHousing", v)} />
          <ToggleRow label="Car rental" checked={values.needCar} onChange={(v) => setValue("needCar", v)} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Preferred move date">
          <Input type="date" {...register("moveDate")} />
        </Field>
        <Field label="Preferred location">
          <Input {...register("preferredLocation")} />
        </Field>
        <Field label="Budget min ($)">
          <Input type="number" {...register("budgetMin")} />
        </Field>
        <Field label="Budget max ($)">
          <Input type="number" {...register("budgetMax")} />
        </Field>
      </div>

      <Field label="Notes for the concierge">
        <Textarea rows={3} placeholder="Anything we should know? Pets, partner, parking, accessibility…" {...register("notes")} />
      </Field>

      <div>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Submit request"}
        </Button>
      </div>
    </form>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      className={
        "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition " +
        (checked ? "border-orbit-deep/30 bg-orbit-deep/5" : "border-orbit-deep/10 bg-white hover:bg-orbit-deep/[0.02]")
      }
    >
      <span className="text-sm font-medium text-orbit-deep">{label}</span>
      <Checkbox checked={checked} onCheckedChange={(v) => onChange(!!v)} />
    </label>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
