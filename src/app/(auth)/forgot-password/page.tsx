"use client";
import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight text-orbit-deep">Reset your password</h1>
      <p className="mt-2 text-sm text-slate-600">
        Enter the email tied to your account and we'll send a recovery link.
      </p>
      <div className="mt-8 rounded-2xl border border-orbit-deep/10 bg-white p-6 shadow-elevate">
        {sent ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            If an account exists for <span className="font-semibold">{email}</span>, a recovery email has been sent.
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await new Promise((r) => setTimeout(r, 700));
              setLoading(false);
              setSent(true);
              toast.success("Recovery email sent (if account exists).");
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        )}
      </div>
      <p className="mt-6 text-sm text-slate-600">
        <Link href="/login" className="font-medium text-orbit-deep underline-offset-4 hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
