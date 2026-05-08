import Link from "next/link";

import { ForgotPasswordForm } from "@/components/auth/auth-forms";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-xl">
        <Link href="/" className="mb-8 block text-center text-xl font-black text-[#0B3C5D]">TRITAL Orbit™</Link>
        <h1 className="mb-3 text-center text-4xl font-black tracking-[-0.04em] text-[#0B3C5D]">Reset password</h1>
        <p className="mb-8 text-center text-slate-600">Resend-ready structure for secure reset emails.</p>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
