import { redirect } from "next/navigation";

import { LoginForm } from "@/components/forms/login-form";
import { getCurrentSession } from "@/lib/auth";
import { ROLE_HOME, type AppRole } from "@/lib/rbac";

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session?.user?.role) {
    redirect(ROLE_HOME[session.user.role as AppRole] ?? "/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B3C5D] to-[#1F2937] px-4">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-[#1F2937]">Sign in to TRITAL Orbit™</h1>
        <p className="mt-2 text-sm text-slate-500">
          Access enterprise mobility workflows for healthcare staffing.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <div className="mt-4 flex justify-between text-sm text-slate-600">
          <a href="/register" className="text-[#0B3C5D] hover:underline">
            Create account
          </a>
          <a href="/forgot-password" className="text-[#0B3C5D] hover:underline">
            Forgot password?
          </a>
        </div>
      </section>
    </main>
  );
}
