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
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  message: z.string().min(10, "Tell us a little about what you need"),
});
type FormValues = z.infer<typeof schema>;

export function ContactForm({ source }: { source?: string }) {
  const [done, setDone] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, source: source ?? "contact" }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      toast.success("Thanks — we'll be in touch.");
      setDone(true);
      reset();
    } catch {
      toast.error("Couldn't send. Please try again.");
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-emerald-800">Message received.</h3>
        <p className="mt-2 text-sm text-emerald-700">A team member will reply within one business hour.</p>
      </div>
    );
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Name" error={errors.name?.message}>
        <Input {...register("name")} />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <Input type="email" {...register("email")} />
      </Field>
      <Field label="Company">
        <Input {...register("company")} />
      </Field>
      <Field label="Phone">
        <Input {...register("phone")} />
      </Field>
      <Field label="Your role" className="md:col-span-2">
        <Input {...register("role")} />
      </Field>
      <Field label="How can we help?" className="md:col-span-2" error={errors.message?.message}>
        <Textarea rows={5} {...register("message")} />
      </Field>
      <div className="md:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
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
