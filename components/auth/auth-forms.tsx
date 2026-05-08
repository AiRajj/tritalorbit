"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select } from "@/components/ui/form-controls";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { notify } = useToast();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
      callbackUrl: params.get("callbackUrl") || undefined
    });
    setLoading(false);
    if (result?.ok) {
      notify({ title: "Welcome back", body: "Routing you to the right TRITAL Orbit workspace." });
      router.push(result.url || "/agency");
      router.refresh();
      return;
    }
    notify({ title: "Login failed", body: "Use a registered account or demo password OrbitDemo!2026." });
  }

  return (
    <Card className="w-full max-w-xl">
      <form onSubmit={submit} className="grid gap-4">
        <Field label="Email"><Input name="email" type="email" required defaultValue="owner@tritalorbit.com" /></Field>
        <Field label="Password"><Input name="password" type="password" required defaultValue="OrbitDemo!2026" /></Field>
        <Button type="submit" size="lg" disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>
      </form>
      <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        Demo accounts: admin, owner, recruiter, concierge, msp, candidate, or vendor @tritalorbit.com. Password:
        <span className="font-bold text-slate-900"> OrbitDemo!2026</span>.
      </div>
    </Card>
  );
}

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { notify } = useToast();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    setLoading(false);
    if (response.ok) {
      notify({ title: "Account created", body: "You can now sign in with your new credentials." });
      router.push("/login");
      return;
    }
    notify({ title: "Registration fallback", body: "Database credentials are required for persistent user creation." });
  }

  return (
    <Card className="w-full max-w-xl">
      <form onSubmit={submit} className="grid gap-4">
        <Field label="Name"><Input name="name" required /></Field>
        <Field label="Email"><Input name="email" type="email" required /></Field>
        <Field label="Password"><Input name="password" type="password" minLength={8} required /></Field>
        <Field label="Role">
          <Select name="role" defaultValue="AGENCY_OWNER">
            <option value="AGENCY_OWNER">Agency Owner</option>
            <option value="RECRUITER">Recruiter</option>
            <option value="CONCIERGE_MANAGER">Concierge Manager</option>
            <option value="MSP_VIEWER">MSP Viewer</option>
            <option value="CANDIDATE">Candidate / Clinician</option>
            <option value="VENDOR">Vendor / Landlord</option>
          </Select>
        </Field>
        <Button type="submit" size="lg" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
      </form>
    </Card>
  );
}

export function ForgotPasswordForm() {
  const { notify } = useToast();
  return (
    <Card className="w-full max-w-xl">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          notify({
            title: "Password reset structure ready",
            body: "Configure Resend credentials to send secure reset links from this flow."
          });
        }}
      >
        <Field label="Email"><Input type="email" required placeholder="you@company.com" /></Field>
        <Button type="submit" size="lg">Send reset instructions</Button>
      </form>
    </Card>
  );
}
