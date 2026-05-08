import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B3C5D] to-[#1F2937] px-4">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-[#1F2937]">Create TRITAL Orbit™ account</h1>
        <p className="mt-2 text-sm text-slate-500">Set up role-based platform access.</p>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
