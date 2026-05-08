import { Orbit } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D]/95 to-[#1F2937]">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[#E63946]/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#0B3C5D]/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/3 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 shadow-2xl backdrop-blur-xl">
            <Orbit className="h-8 w-8 text-[#F8FAFC]" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-white">
              TRITAL Orbit™
            </h1>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-white/40">
              Staffing Intelligence Platform
            </p>
          </div>
        </div>

        {/* Card container */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.97] p-8 shadow-2xl backdrop-blur-xl">
          {children}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} TRITAL Orbit™. All rights reserved.
        </p>
      </div>
    </div>
  );
}
