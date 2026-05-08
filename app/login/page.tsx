import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/auth-forms";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(11,60,93,0.16),transparent_34%),#F8FAFC] px-4 py-10">
      <div className="w-full max-w-xl">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0B3C5D] font-black text-white">TO</div>
          <span className="text-xl font-black text-[#0B3C5D]">TRITAL Orbit™</span>
        </Link>
        <h1 className="mb-3 text-center text-4xl font-black tracking-[-0.04em] text-[#0B3C5D]">Login to your workspace</h1>
        <p className="mb-8 text-center text-slate-600">Role-based redirects route each user to the right dashboard.</p>
        <Suspense fallback={<div className="rounded-[2rem] bg-white p-8 text-center font-semibold text-slate-600 shadow-xl">Loading secure login...</div>}>
          <LoginForm />
        </Suspense>
        <div className="mt-5 flex justify-center gap-4 text-sm font-semibold">
          <Link href="/register" className="text-[#0B3C5D] hover:text-[#E63946]">Create account</Link>
          <Link href="/forgot-password" className="text-[#0B3C5D] hover:text-[#E63946]">Forgot password</Link>
        </div>
      </div>
    </main>
  );
}
