import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight text-orbit-deep">Create your workspace</h1>
      <p className="mt-2 text-sm text-slate-600">Set up a TRITAL Orbit account in under a minute.</p>
      <div className="mt-8 rounded-2xl border border-orbit-deep/10 bg-white p-6 shadow-elevate">
        <RegisterForm />
      </div>
      <p className="mt-6 text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-orbit-deep underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
