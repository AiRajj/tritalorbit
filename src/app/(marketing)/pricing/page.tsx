import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingTiers } from "@/lib/marketing-content";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900">Pricing</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Flexible enterprise plans for healthcare staffing agencies, concierge operations, and MSP networks.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card key={tier.name}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{tier.price}</p>
              <p className="text-sm text-slate-600">{tier.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-700">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">Request a pricing proposal</h2>
        <div className="mt-4">
          <LeadCaptureForm source="PRICING" />
        </div>
      </div>
    </section>
  );
}
