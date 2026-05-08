import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B3C5D] to-[#1F2937] px-4">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-[#1F2937]">Reset your password</h1>
        <p className="mt-2 text-sm text-slate-500">
          We’ll generate secure reset instructions for your account.
        </p>
        <div className="mt-6">
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}
