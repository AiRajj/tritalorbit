"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const roleOptions = [
  "SUPER_ADMIN",
  "AGENCY_OWNER",
  "RECRUITER",
  "CONCIERGE_MANAGER",
  "MSP_VIEWER",
  "CANDIDATE",
  "VENDOR_LANDLORD",
  "TRAVEL_AGENCY_VENDOR",
  "HOUSING_PROVIDER",
  "HOTEL_PARTNER",
  "CAR_RENTAL_PARTNER",
  "RELOCATION_PARTNER",
  "FINANCE_BILLING_ADMIN"
];

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setLoading(true);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role")
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to register");
      return;
    }

    toast.success("Account created. Please login.");
    router.push("/login");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your TRITAL Orbit™ account</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" minLength={8} required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              defaultValue="AGENCY_OWNER"
            >
              {roleOptions.map((role) => (
                <option value={role} key={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <Button className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-orbit-blue hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
