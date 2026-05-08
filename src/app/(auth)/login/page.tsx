import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight text-orbit-deep">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-600">Sign in to your TRITAL Orbit workspace.</p>

      <div className="mt-8 rounded-2xl border border-orbit-deep/10 bg-white p-6 shadow-elevate">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-orbit-deep/5" />}>
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-6 text-sm text-slate-600">
        New to Orbit?{" "}
        <Link href="/register" className="font-medium text-orbit-deep underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
      <p className="mt-2 text-sm text-slate-600">
        <Link href="/forgot-password" className="font-medium text-orbit-deep underline-offset-4 hover:underline">
          Forgot password?
        </Link>
      </p>
    </div>
  );
}
