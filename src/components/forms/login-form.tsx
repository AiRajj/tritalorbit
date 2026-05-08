"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      callbackUrl: searchParams.get("callbackUrl") ?? undefined,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Invalid login credentials.");
      return;
    }

    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) {
      window.location.href = callbackUrl;
      return;
    }

    const session = (await fetch("/api/auth/session").then((res) => res.json())) as {
      user?: { role?: string };
    };
    const role = session.user?.role;
    const roleDestination: Record<string, string> = {
      SUPER_ADMIN: "/admin",
      AGENCY_OWNER: "/agency",
      RECRUITER: "/recruiter",
      CONCIERGE_MANAGER: "/concierge",
      MSP_VIEWER: "/msp",
      CANDIDATE: "/candidate",
      VENDOR_LANDLORD: "/vendor",
    };

    window.location.href = roleDestination[role ?? ""] ?? "/";
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input name="email" type="email" placeholder="Work email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
