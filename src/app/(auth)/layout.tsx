import Link from "next/link";
import { OrbitWordmark } from "@/components/brand/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-orbit-hero text-white md:flex md:flex-col md:justify-between md:p-12">
        <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.08] [background-size:48px_48px]" />
        <div aria-hidden className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-orbit-red/15 blur-3xl" />
        <Link href="/" className="relative z-10 inline-flex">
          <OrbitWordmark size="md" dark />
        </Link>
        <div className="relative z-10 max-w-md">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/70">
            Healthcare Workforce Mobility
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight">
            Win more clinicians.
            <br />
            Without raising pay rates.
          </h2>
          <p className="mt-4 text-sm text-white/70">
            One operating system for offers, mobility, concierge, risk, and readiness.
          </p>
        </div>
        <div className="relative z-10 text-xs text-white/55">
          © {new Date().getFullYear()} TOPTAL Care Inc. · TRITAL Orbit™ is a sub-brand of TRITAL Care®
        </div>
      </div>

      <div className="flex flex-col justify-center bg-orbit-mist px-6 py-16 md:px-12">
        <div className="md:hidden">
          <Link href="/">
            <OrbitWordmark size="md" />
          </Link>
        </div>
        <div className="mt-8 md:mt-0">{children}</div>
      </div>
    </div>
  );
}
