import Link from "next/link";
import { OrbitWordmark } from "@/components/brand/logo";

const SECTIONS = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Offer Boost Builder", href: "/features/offer-boost-builder" },
      { label: "Assignment Launch", href: "/features/assignment-launch-dashboard" },
      { label: "Retention Risk AI", href: "/features/retention-risk-ai" },
      { label: "Mobility Concierge", href: "/features/mobility-concierge" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Agencies", href: "/solutions/agencies" },
      { label: "For MSPs", href: "/solutions/msps" },
      { label: "For Clinicians", href: "/solutions/clinicians" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book a demo", href: "/demo" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-orbit-deep/10 bg-orbit-mist">
      <div className="container-wide py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <OrbitWordmark size="lg" />
            <p className="mt-4 max-w-sm text-sm text-slate-600">
              Healthcare Workforce Mobility Infrastructure. Win more clinicians, reduce backouts,
              and improve assignment readiness — without raising pay rates.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-orbit-deep/10">SOC 2 aligned</span>
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-orbit-deep/10">HIPAA-aware</span>
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-orbit-deep/10">Joint Commission-aligned</span>
            </div>
          </div>

          <div className="grid gap-8 md:col-span-8 md:grid-cols-3">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{s.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-slate-700 transition-colors hover:text-orbit-deep"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-orbit-deep/10 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TOPTAL Care Inc. TRITAL Orbit™ is a sub-brand of TRITAL Care®.
          </p>
          <p className="text-xs text-slate-500">
            Built for healthcare staffing leaders. Made in Houston, TX.
          </p>
        </div>
      </div>
    </footer>
  );
}
