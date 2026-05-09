import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">TRITAL Orbit™</h3>
          <p className="mt-2 text-sm text-slate-600">
            Healthcare Workforce Mobility Infrastructure for agencies, MSPs, and clinicians.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">Built for assignment certainty</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Platform</h4>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            <Link href="/healthcare-workforce-mobility-cloud" className="block hover:text-slate-900">
              Mobility Cloud
            </Link>
            <Link href="/mobility-exchange" className="block hover:text-slate-900">
              Mobility Exchange
            </Link>
            <Link href="/demo/live-platform" className="block hover:text-slate-900">
              Live Demo
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Solutions</h4>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            <Link href="/solutions/health-systems" className="block hover:text-slate-900">
              Health Systems
            </Link>
            <Link href="/partners/travel-agencies" className="block hover:text-slate-900">
              Travel Agencies
            </Link>
            <Link href="/partners/housing-providers" className="block hover:text-slate-900">
              Housing Providers
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
            <Link href="/security" className="block hover:text-slate-900">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
