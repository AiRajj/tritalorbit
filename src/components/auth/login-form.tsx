"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});
type FormValues = z.infer<typeof schema>;

const ROLE_HOME: Record<string, string> = {
  SUPER_ADMIN: "/admin",
  AGENCY_OWNER: "/agency",
  RECRUITER: "/recruiter",
  CONCIERGE_MANAGER: "/concierge",
  MSP_VIEWER: "/msp",
  CANDIDATE: "/candidate",
  VENDOR: "/vendor",
  LANDLORD: "/vendor",
};

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const fallback = search.get("from");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (!res || res.error) {
      toast.error("Invalid email or password.");
      return;
    }
    try {
      const r = await fetch("/api/me", { cache: "no-store" });
      const me = (await r.json()) as { role?: string } | null;
      const dest = fallback || ROLE_HOME[me?.role ?? ""] || "/";
      router.replace(dest);
      router.refresh();
    } catch {
      router.replace(fallback || "/");
      router.refresh();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" type="email" autoComplete="email" placeholder="you@yourcompany.com" {...register("email")} />
        {errors.email && <p className="text-xs text-orbit-red">{errors.email.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" autoComplete="current-password" {...register("password")} />
        {errors.password && <p className="text-xs text-orbit-red">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-xs text-slate-500">
        Demo credentials are seeded — try <code className="rounded bg-slate-100 px-1 py-0.5">owner@orbit.demo</code> / <code className="rounded bg-slate-100 px-1 py-0.5">orbit-demo-2026</code>
      </p>
    </form>
  );
}
