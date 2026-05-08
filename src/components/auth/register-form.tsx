"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
  role: z.enum([
    "AGENCY_OWNER",
    "RECRUITER",
    "CONCIERGE_MANAGER",
    "CANDIDATE",
    "VENDOR",
    "LANDLORD",
    "MSP_VIEWER",
  ]),
  agencyName: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const ROLE_HOME: Record<string, string> = {
  AGENCY_OWNER: "/agency",
  RECRUITER: "/recruiter",
  CONCIERGE_MANAGER: "/concierge",
  MSP_VIEWER: "/msp",
  CANDIDATE: "/candidate",
  VENDOR: "/vendor",
  LANDLORD: "/vendor",
};

export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = React.useState<FormValues["role"]>("AGENCY_OWNER");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "AGENCY_OWNER" },
  });

  const onSubmit = async (data: FormValues) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      toast.error(json?.error ?? "Couldn't create account.");
      return;
    }
    const signInRes = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signInRes && !signInRes.error) {
      toast.success("Welcome to Orbit.");
      router.replace(ROLE_HOME[data.role] ?? "/");
      router.refresh();
    } else {
      router.replace("/login");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" autoComplete="name" {...register("name")} />
        {errors.name && <p className="text-xs text-orbit-red">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-orbit-red">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" autoComplete="new-password" {...register("password")} />
        {errors.password && <p className="text-xs text-orbit-red">{errors.password.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>I am</Label>
        <Select
          value={role}
          onValueChange={(v) => {
            setRole(v as FormValues["role"]);
            setValue("role", v as FormValues["role"]);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AGENCY_OWNER">Agency Owner</SelectItem>
            <SelectItem value="RECRUITER">Recruiter</SelectItem>
            <SelectItem value="CONCIERGE_MANAGER">Concierge Manager</SelectItem>
            <SelectItem value="CANDIDATE">Clinician / Candidate</SelectItem>
            <SelectItem value="VENDOR">Vendor</SelectItem>
            <SelectItem value="LANDLORD">Landlord</SelectItem>
            <SelectItem value="MSP_VIEWER">MSP Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {role === "AGENCY_OWNER" && (
        <div className="space-y-1.5">
          <Label htmlFor="agencyName">Agency name</Label>
          <Input id="agencyName" {...register("agencyName")} />
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
