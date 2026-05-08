"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Card className="shadow-orbit-lg border-slate-200">
      <CardContent className="p-8">
        <Link href="/login" className="flex items-center gap-1 text-sm text-slate-500 hover:text-orbit-blue mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-orbit-dark mb-2">Check your email</h2>
            <p className="text-slate-500 text-sm mb-6">
              If that email is registered, you'll receive a password reset link within a few minutes.
            </p>
            <Link href="/login">
              <Button variant="outline" className="w-full">Return to Sign In</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="w-12 h-12 bg-orbit-blue/10 rounded-xl flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-orbit-blue" />
              </div>
              <h1 className="text-2xl font-bold text-orbit-dark mb-1">Reset your password</h1>
              <p className="text-slate-500 text-sm">Enter your email and we'll send you a reset link.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} className="mt-1" placeholder="you@agency.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Send Reset Link
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
}
