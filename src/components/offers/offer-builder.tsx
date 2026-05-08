"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  Compass,
  CreditCard,
  Gift,
  Home,
  PlaneTakeoff,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { offerCreateSchema, type OfferCreateInput } from "@/lib/validators";
import { formatCurrency } from "@/lib/utils";

const PERKS: Array<{
  key: keyof OfferCreateInput;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { key: "flightSupport", label: "Flight support", description: "Travel booked + reimbursed.", icon: PlaneTakeoff },
  { key: "housingAssist", label: "Housing assistance", description: "Verified options near facility.", icon: Home },
  { key: "carRental", label: "Car rental", description: "Stipend-aligned weekly rate.", icon: Car },
  { key: "relocationConcierge", label: "Relocation concierge", description: "1:1 ops support before Day 1.", icon: Compass },
  { key: "firstWeekReadiness", label: "First-week readiness", description: "72h pre-start orientation call.", icon: CheckCircle2 },
  { key: "emergencyHousing", label: "Emergency housing", description: "Backup if primary falls through.", icon: ShieldAlert },
  { key: "loyaltyRewards", label: "Loyalty rewards", description: "Renewal-tied perks.", icon: Gift },
];

const STEPS = [
  { id: "candidate", title: "Candidate", icon: Stethoscope },
  { id: "assignment", title: "Assignment", icon: Building2 },
  { id: "comp", title: "Compensation", icon: CreditCard },
  { id: "perks", title: "Add value", icon: Sparkles },
];

export function OfferBuilder() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OfferCreateInput>({
    resolver: zodResolver(offerCreateSchema),
    defaultValues: {
      flightSupport: false,
      housingAssist: true,
      carRental: false,
      relocationConcierge: true,
      firstWeekReadiness: true,
      emergencyHousing: false,
      loyaltyRewards: false,
    },
  });

  const values = watch();
  const totalContract = React.useMemo(() => {
    const w = Number(values.weeklyPay);
    const d = Number(values.durationWeeks);
    if (!w || !d) return null;
    return w * d;
  }, [values.weeklyPay, values.durationWeeks]);

  const onSubmit = async (data: OfferCreateInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      toast.success("Offer created", { description: "Generating the boosted version…" });
      // Trigger boost in background, then route to preview
      try {
        await fetch(`/api/offers/${json.offerId}/boost`, { method: "POST" });
      } catch {
        /* non-fatal */
      }
      router.push(`/agency/offers/${json.offerId}/preview`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Couldn't save the offer.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardContent className="flex flex-wrap items-center gap-2 p-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = step === i;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setStep(i)}
                  className={
                    "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition " +
                    (active
                      ? "border-orbit-deep bg-orbit-deep text-white"
                      : "border-orbit-deep/15 bg-white text-slate-600 hover:bg-orbit-deep/5")
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {i + 1}. {s.title}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {step === 0 && (
          <Section title="Candidate Info" icon={Stethoscope} description="Who are we building this offer for?">
            <Grid>
              <Field label="First name" error={errors.candidateFirstName?.message}>
                <Input {...register("candidateFirstName")} />
              </Field>
              <Field label="Last name" error={errors.candidateLastName?.message}>
                <Input {...register("candidateLastName")} />
              </Field>
              <Field label="Email" error={errors.candidateEmail?.message}>
                <Input type="email" {...register("candidateEmail")} />
              </Field>
              <Field label="Phone">
                <Input {...register("candidatePhone")} />
              </Field>
              <Field label="Role">
                <Input placeholder="RN, MD, Resp Therapist…" {...register("role")} />
              </Field>
              <Field label="Specialty">
                <Input placeholder="ICU, ER, Tele, Cath Lab…" {...register("specialty")} />
              </Field>
              <Field label="License state">
                <Input placeholder="TX, CA, NY…" {...register("licenseState")} />
              </Field>
              <Field label="Years experience">
                <Input type="number" min={0} {...register("yearsExperience")} />
              </Field>
            </Grid>
            <NavRow onNext={() => setStep(1)} />
          </Section>
        )}

        {step === 1 && (
          <Section title="Assignment Info" icon={Building2} description="Where, when, and what's the work?">
            <Grid>
              <Field label="Facility name" error={errors.facilityName?.message}>
                <Input {...register("facilityName")} />
              </Field>
              <Field label="MSP / Client">
                <Input {...register("mspClient")} />
              </Field>
              <Field label="City" error={errors.city?.message}>
                <Input {...register("city")} />
              </Field>
              <Field label="State" error={errors.state?.message}>
                <Input placeholder="TX" {...register("state")} />
              </Field>
              <Field label="Start date">
                <Input type="date" {...register("startDate")} />
              </Field>
              <Field label="Duration (weeks)">
                <Input type="number" min={1} {...register("durationWeeks")} />
              </Field>
              <Field label="Shift">
                <Input placeholder="Day, Night, Rotating, 3x12…" {...register("shift")} />
              </Field>
              <Field label="Specialty">
                <Input placeholder="Override candidate specialty if needed." {...register("specialty")} />
              </Field>
            </Grid>
            <NavRow onBack={() => setStep(0)} onNext={() => setStep(2)} />
          </Section>
        )}

        {step === 2 && (
          <Section title="Compensation" icon={CreditCard} description="Pay, taxable, stipend, and total contract value.">
            <Grid>
              <Field label="Weekly pay (gross)">
                <Input type="number" step="50" min={0} {...register("weeklyPay")} />
              </Field>
              <Field label="Taxable rate / hr">
                <Input type="number" step="0.5" min={0} {...register("taxableRate")} />
              </Field>
              <Field label="Stipend / wk">
                <Input type="number" step="50" min={0} {...register("stipend")} />
              </Field>
              <Field label="Total contract value (estimated)">
                <Input
                  readOnly
                  value={totalContract ? formatCurrency(totalContract) : "Auto-calculated"}
                  className="bg-orbit-deep/[0.04]"
                />
              </Field>
            </Grid>
            <NavRow onBack={() => setStep(1)} onNext={() => setStep(3)} />
          </Section>
        )}

        {step === 3 && (
          <Section title="Add Value" icon={Sparkles} description="Toggle mobility support to lift acceptance.">
            <div className="grid gap-3 md:grid-cols-2">
              {PERKS.map((p) => {
                const Icon = p.icon;
                const checked = !!values[p.key];
                return (
                  <label
                    key={p.key}
                    className={
                      "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition " +
                      (checked
                        ? "border-orbit-deep/30 bg-orbit-deep/5"
                        : "border-orbit-deep/10 bg-white hover:bg-orbit-deep/[0.02]")
                    }
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-orbit-deep ring-1 ring-orbit-deep/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-orbit-deep">{p.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{p.description}</span>
                    </span>
                    <Switch
                      checked={checked}
                      onCheckedChange={(v) => setValue(p.key, v as never)}
                    />
                  </label>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="submit" disabled={submitting} size="lg">
                <Wand2 className="h-4 w-4" />
                {submitting ? "Generating…" : "Generate enhanced offer"}
              </Button>
            </div>
          </Section>
        )}
      </div>

      <aside className="space-y-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-orbit-red">Live preview</div>
            <h3 className="mt-2 text-lg font-semibold text-orbit-deep">
              {values.candidateFirstName || "Clinician"} {values.candidateLastName || ""}
            </h3>
            <div className="text-xs text-slate-500">
              {values.specialty || values.role || "Specialty"} ·{" "}
              {values.city ? `${values.city}, ${values.state || ""}` : "Location"}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Stat label="Weekly Pay" value={values.weeklyPay ? formatCurrency(Number(values.weeklyPay)) : "—"} />
              <Stat label="Duration" value={values.durationWeeks ? `${values.durationWeeks} wks` : "—"} />
              <Stat label="Total Value" value={totalContract ? formatCurrency(totalContract) : "—"} />
              <Stat label="Mobility" value={`${PERKS.filter((p) => values[p.key]).length}/7`} />
            </div>
            <ul className="mt-5 space-y-2 text-xs">
              {PERKS.filter((p) => values[p.key]).slice(0, 5).map((p) => (
                <li key={p.key} className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {p.label}
                </li>
              ))}
              {PERKS.filter((p) => values[p.key]).length === 0 && (
                <li className="text-slate-500">Toggle perks to lift candidate confidence.</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orbit-red" />
              <h4 className="text-sm font-semibold text-orbit-deep">What happens next</h4>
            </div>
            <ol className="mt-3 space-y-2 text-xs text-slate-600">
              <li>1. Offer is saved to your agency.</li>
              <li>2. AI generates summary, SMS, email, and close strategy.</li>
              <li>3. You can preview, send, copy link, or download PDF.</li>
            </ol>
          </CardContent>
        </Card>
      </aside>
    </form>
  );
}

function Section({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orbit-deep/5 text-orbit-deep">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-orbit-deep">{title}</h3>
            {description && <p className="text-xs text-slate-500">{description}</p>}
          </div>
        </div>
        <div className="mt-5">{children}</div>
      </CardContent>
    </Card>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {error && <span className="text-xs text-orbit-red">{error}</span>}
    </label>
  );
}

function NavRow({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <div className="mt-6 flex items-center justify-between">
      {onBack ? (
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
      ) : (
        <span />
      )}
      {onNext && (
        <Button type="button" onClick={onNext}>
          Continue
        </Button>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-orbit-deep/10 bg-orbit-deep/[0.02] p-3">
      <div className="text-[0.65rem] font-medium uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-orbit-deep">{value}</div>
    </div>
  );
}
