"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const roles = [
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Agency Owner", value: "AGENCY_OWNER" },
  { label: "Recruiter", value: "RECRUITER" },
  { label: "Concierge Manager", value: "CONCIERGE_MANAGER" },
  { label: "MSP Viewer", value: "MSP_VIEWER" },
  { label: "Candidate / Clinician", value: "CANDIDATE" },
  { label: "Vendor / Landlord", value: "VENDOR_LANDLORD" },
];

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      toast.error(data.error ?? "Registration failed");
      return;
    }

    toast.success("Account created. You can log in now.");
    window.location.href = "/login";
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input name="name" placeholder="Full name" required />
      <Input name="email" type="email" placeholder="Work email" required />
      <Input name="password" type="password" placeholder="Password (8+ chars)" required />
      <select
        name="role"
        className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
        defaultValue="AGENCY_OWNER"
      >
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
