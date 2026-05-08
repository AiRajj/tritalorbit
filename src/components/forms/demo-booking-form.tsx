"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function DemoBookingForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);

    const payload = {
      name: formData.get("name"),
      workEmail: formData.get("workEmail"),
      company: formData.get("company"),
      role: formData.get("role"),
      monthlyPlacements: formData.get("monthlyPlacements"),
      painPoint: formData.get("painPoint")
    };

    const response = await fetch("/api/demo-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to book demo");
      return;
    }

    toast.success("Demo request submitted. Our team will contact you shortly.");
  }

  return (
    <form action={onSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-premium">
      <div>
        <Label htmlFor="name">Full Name</Label>
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
        <Label htmlFor="role">Role</Label>
        <Input id="role" name="role" required />
      </div>
      <div>
        <Label htmlFor="monthlyPlacements">Monthly Placements</Label>
        <Input id="monthlyPlacements" name="monthlyPlacements" type="number" min="0" />
      </div>
      <div>
        <Label htmlFor="painPoint">Primary Pain Point</Label>
        <Textarea id="painPoint" name="painPoint" rows={4} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Book my demo"}
      </Button>
    </form>
  );
}
