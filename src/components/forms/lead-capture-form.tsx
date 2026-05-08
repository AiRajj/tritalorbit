"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function LeadCaptureForm({ type = "LEAD" }: { type?: "LEAD" | "CONTACT" | "PRICING" }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      role: formData.get("role"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      type,
    };

    setLoading(true);
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Unable to submit right now.");
      return;
    }

    toast.success("Thanks. Your request has been received.");
    event.currentTarget.reset();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="firstName" placeholder="First name" required />
        <Input name="lastName" placeholder="Last name" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="email" type="email" placeholder="Work email" required />
        <Input name="phone" placeholder="Phone" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="company" placeholder="Company" />
        <Input name="role" placeholder="Role" />
      </div>
      <Textarea name="message" placeholder="What outcomes are you targeting?" rows={4} />
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
