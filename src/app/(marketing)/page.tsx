import Link from "next/link";
import { ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { HeroSection } from "@/components/marketing/section-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { kpis, pains, pricingTiers, solutions } from "@/lib/marketing-content";
import { featureHighlights } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">{kpi.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orbit-red">
              <Sparkles className="h-5 w-5" /> Core pains we solve
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            {pains.map((pain) => (
              <p key={pain}>• {pain}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orbit-blue">
              <Workflow className="h-5 w-5" /> Orbit outcomes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            {solutions.map((solution) => (
              <p key={solution}>• {solution}</p>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">AI-powered product modules</h2>
            <p className="mt-2 text-slate-600">Enterprise workflows designed for recruiters, concierge teams, and MSP stakeholders.</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featureHighlights.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <feature.icon className="h-6 w-6 text-orbit-blue" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-600">{feature.description}</p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href={feature.href}>View module</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Card className="bg-orbit-gradient text-white">
          <CardContent className="grid gap-4 p-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold">Security, trust, and enterprise controls</h2>
              <p className="mt-3 max-w-2xl text-white/90">
                Role-based access control, audit logs, and operational transparency built for healthcare staffing ecosystems.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Auth.js-based secure access</p>
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Prisma-backed audit trails</p>
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> API fallback safety for resilient operations</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900">Pricing built for staffing scale</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card key={tier.name}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{tier.price}</p>
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
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900">Request platform access</h2>
        <p className="mt-2 text-slate-600">Share your goals and our team will tailor the right Orbit deployment strategy.</p>
        <div className="mt-5">
          <LeadCaptureForm source="WEBSITE" />
        </div>
      </section>
    </>
  );
}
