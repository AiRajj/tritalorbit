"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email") }),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Unable to process request right now.");
      return;
    }

    toast.success("If this email exists, reset instructions were generated.");
    event.currentTarget.reset();
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input name="email" type="email" placeholder="Work email" required />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send reset instructions"}
      </Button>
    </form>
  );
}
