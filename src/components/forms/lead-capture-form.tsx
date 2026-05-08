"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function LeadCaptureForm({ source = "WEBSITE" }: { source?: "PRICING" | "CONTACT" | "WEBSITE" }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);

    const payload = {
      source,
      name: formData.get("name"),
      workEmail: formData.get("workEmail"),
      company: formData.get("company"),
      teamSize: formData.get("teamSize"),
      message: formData.get("message")
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to submit lead");
      return;
    }

    toast.success("Thanks! Your request has been received.");
  }

  return (
    <form
      action={onSubmit}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-premium sm:grid-cols-2"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="workEmail">Work Email</Label>
        <Input id="workEmail" name="workEmail" type="email" required />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" required />
      </div>
      <div>
        <Label htmlFor="teamSize">Team Size</Label>
        <Input id="teamSize" name="teamSize" placeholder="e.g. 51-200" />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message">How can TRITAL Orbit help?</Label>
        <Textarea id="message" name="message" placeholder="Tell us your current backout or readiness challenges." />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Get in touch"}
        </Button>
      </div>
    </form>
  );
}
