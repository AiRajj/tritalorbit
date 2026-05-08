"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid work email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function DemoForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
      toast.success("Demo request received", {
        description: "We'll respond within 1 business hour, Mon–Sat.",
      });
      setSubmitted(true);
      reset();
    } catch (e) {
      toast.error("Couldn't submit request", {
        description: "Please try again or email info@tritalcare.com.",
      });
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-emerald-800">You're on the list.</h3>
        <p className="mt-2 text-sm text-emerald-700">
          A solution architect will reach out within 1 business hour with calendar options.
        </p>
        <Button className="mt-5" variant="outline" onClick={() => setSubmitted(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Full name" error={errors.name?.message}>
        <Input placeholder="Jane Recruiter" {...register("name")} />
      </Field>
      <Field label="Work email" error={errors.email?.message}>
        <Input type="email" placeholder="jane@youragency.com" {...register("email")} />
      </Field>
      <Field label="Company">
        <Input placeholder="Your agency or MSP" {...register("company")} />
      </Field>
      <Field label="Phone">
        <Input placeholder="(555) 123-4567" {...register("phone")} />
      </Field>
      <Field label="Your role">
        <Input placeholder="VP of Recruiting" {...register("role")} />
      </Field>
      <Field label="Team size">
        <Input placeholder="e.g. 1–10, 11–50, 50+" {...register("teamSize")} />
      </Field>
      <Field label="Preferred time" className="md:col-span-2">
        <Input type="datetime-local" {...register("preferredTime")} />
      </Field>
      <Field label="What you're trying to solve" className="md:col-span-2">
        <Textarea
          rows={4}
          placeholder="e.g. We want to reduce backouts on travel placements during peak season."
          {...register("notes")}
        />
      </Field>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full md:w-auto">
          {isSubmitting ? "Sending…" : "Request a walkthrough"}
        </Button>
        <p className="mt-3 text-xs text-slate-500">
          We respond within 1 business hour, Mon–Sat. Average reply: under 30 minutes.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={"flex flex-col gap-1.5 " + (className ?? "")}>
      <Label>{label}</Label>
      {children}
      {error && <span className="text-xs text-orbit-red">{error}</span>}
    </label>
  );
}
