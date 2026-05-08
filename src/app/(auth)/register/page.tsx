"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerSchema } from "@/lib/validations";
import {
  Loader2,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const roleOptions = [
  { value: "AGENCY_OWNER", label: "Agency Owner" },
  { value: "RECRUITER", label: "Recruiter" },
  { value: "CANDIDATE", label: "Candidate" },
  { value: "VENDOR", label: "Vendor" },
] as const;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGlobalError("");
    setErrors({});

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const err of parsed.error.issues) {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setGlobalError(data.error || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setGlobalError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]">
            Account Created!
          </h2>
          <p className="mt-1 text-sm text-[#1F2937]/60">
            Redirecting you to sign in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">
          Create your account
        </h2>
        <p className="mt-1 text-sm text-[#1F2937]/60">
          Get started with TRITAL Orbit™ today
        </p>
      </div>

      {globalError && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#E63946]/20 bg-[#E63946]/5 px-4 py-3 text-sm text-[#E63946]">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-[#1F2937]">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F2937]/40" />
            <Input
              id="name"
              type="text"
              placeholder="John Smith"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={cn("pl-10", errors.name && "border-[#E63946]")}
              disabled={isLoading}
              autoComplete="name"
              autoFocus
            />
          </div>
          {errors.name && (
            <p className="text-xs text-[#E63946]">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#1F2937]">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F2937]/40" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={cn("pl-10", errors.email && "border-[#E63946]")}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-[#E63946]">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-[#1F2937]">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F2937]/40" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className={cn("pl-10", errors.password && "border-[#E63946]")}
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-[#E63946]">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[#1F2937]"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F2937]/40" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className={cn(
                "pl-10",
                errors.confirmPassword && "border-[#E63946]"
              )}
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-[#E63946]">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium text-[#1F2937]">
            Role
          </Label>
          <Select
            value={form.role}
            onValueChange={(value) => updateField("role", value)}
            disabled={isLoading}
          >
            <SelectTrigger
              className={cn(errors.role && "border-[#E63946]")}
            >
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-xs text-[#E63946]">{errors.role}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#1F2937]/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0B3C5D] transition-colors hover:text-[#0B3C5D]/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
