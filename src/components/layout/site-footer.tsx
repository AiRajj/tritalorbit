import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">TRITAL Orbit™</h3>
          <p className="mt-2 text-sm text-slate-600">
            Healthcare Workforce Mobility Infrastructure for agencies, MSPs, and clinicians.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Platform</h4>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            <Link href="/platform" className="block hover:text-slate-900">
              Platform Overview
            </Link>
            <Link href="/pricing" className="block hover:text-slate-900">
              Pricing
            </Link>
            <Link href="/demo" className="block hover:text-slate-900">
              Request Demo
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Solutions</h4>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            <Link href="/solutions/agencies" className="block hover:text-slate-900">
              Agencies
            </Link>
            <Link href="/solutions/msps" className="block hover:text-slate-900">
              MSPs
            </Link>
            <Link href="/solutions/clinicians" className="block hover:text-slate-900">
              Clinicians
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Legal</h4>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            <Link href="/privacy" className="block hover:text-slate-900">
              Privacy
            </Link>
            <Link href="/terms" className="block hover:text-slate-900">
              Terms
            </Link>
            <Link href="/contact" className="block hover:text-slate-900">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
