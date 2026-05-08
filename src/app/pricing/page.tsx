import Link from "next/link";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Growth",
    price: "$2,500 / month",
    detail: "For emerging agencies building offer-to-start workflows.",
  },
  {
    name: "Scale",
    price: "$6,000 / month",
    detail: "For multi-team agencies with concierge operations and AI reporting.",
  },
  {
    name: "Enterprise",
    price: "Custom",
    detail: "For MSP ecosystems and high-volume staffing organizations.",
  },
];

export default function PricingPage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">Pricing</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Stripe-ready subscription architecture with role-based access and enterprise controls.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.name === "Scale" ? "border-[#0B3C5D]" : ""}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.detail}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-[#0B3C5D]">{tier.price}</p>
                <Link href="/demo" className="mt-4 inline-block">
                  <Button size="sm">Talk to sales</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Request pricing alignment call</CardTitle>
            <CardDescription>
              We tailor implementation around your placements, agency structure, and MSP requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadCaptureForm type="PRICING" />
          </CardContent>
        </Card>
      </section>
    </PublicPageShell>
  );
}
