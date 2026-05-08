"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function DemoBookingForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      company: formData.get("company"),
      role: formData.get("role"),
      teamSize: formData.get("teamSize"),
      monthlyPlacements: formData.get("monthlyPlacements"),
      goals: formData.get("goals"),
      preferredDate: formData.get("preferredDate"),
    };

    setLoading(true);
    const res = await fetch("/api/demo-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Demo request failed. Please retry.");
      return;
    }

    toast.success("Demo request received. We will reach out shortly.");
    event.currentTarget.reset();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input name="fullName" placeholder="Full name" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input type="email" name="email" placeholder="Work email" required />
        <Input name="company" placeholder="Company" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="role" placeholder="Role" />
        <Input name="teamSize" placeholder="Team size" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="monthlyPlacements" placeholder="Monthly placements" />
        <Input type="date" name="preferredDate" />
      </div>
      <Textarea name="goals" placeholder="What does success look like?" rows={4} />
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Book Demo"}
      </Button>
    </form>
  );
}
