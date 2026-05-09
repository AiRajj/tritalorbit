import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { Button } from "@/components/ui/button";

const pricingTracks = [
  {
    title: "Clinicians",
    price: "Free / Orbit Plus $14.99 monthly",
    description: "Assignment hub, mobility requests, rewards, and optional premium support.",
    href: "/pricing/clinicians"
  },
  {
    title: "Staffing Agencies",
    price: "$299 to enterprise custom",
    description: "Offer intelligence, war room, wallet sponsorship, concierge workflows, and reporting.",
    href: "/pricing/agencies"
  },
  {
    title: "Vendors",
    price: "Free to enterprise partner tiers",
    description: "Bid-center operations, verification, analytics, and API-ready growth paths.",
    href: "/pricing/vendors"
  },
  {
    title: "MSPs / Health Systems",
    price: "Enterprise annual programs",
    description: "Executive ROI reporting, supplier intelligence, and readiness governance dashboards.",
    href: "/pricing/msps"
  }
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="orbit-dark-panel rounded-2xl p-7 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Role-specific pricing</p>
        <h1 className="mt-2 text-4xl font-bold">Pricing built for the healthcare mobility ecosystem</h1>
        <p className="mt-3 max-w-3xl text-slate-100">
          Choose plans aligned to clinician experience, agency scale, partner enablement, and enterprise workforce outcomes.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {pricingTracks.map((track) => (
          <Card key={track.title}>
            <CardHeader>
              <CardTitle>{track.title}</CardTitle>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{track.price}</p>
              <p className="text-sm text-slate-600">{track.description}</p>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href={track.href}>
                  View details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-semibold text-slate-900">Book a tailored pricing walkthrough</h2>
      <p className="mt-3 max-w-2xl text-slate-600">
        Start free, become a verified partner, or request enterprise deployment support.
      </p>
      <div className="mt-4">
        <LeadCaptureForm source="PRICING" />
      </div>
    </section>
  );
}
