"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);

    const payload = {
      name: formData.get("name"),
      workEmail: formData.get("workEmail"),
      company: formData.get("company"),
      message: formData.get("message")
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to send message");
      return;
    }

    toast.success("Message sent. We will follow up soon.");
  }

  return (
    <form action={onSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-premium">
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
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
