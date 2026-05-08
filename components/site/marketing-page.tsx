import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { MotionSection } from "@/components/motion-section";
import { Button } from "@/components/ui/button";
import { Card, GlassCard } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  aiRecommendations,
  brand,
  featureCards,
  marketingPages,
  pricingPlans,
  workflow
} from "@/lib/content";

export function HomePage() {
  return (
    <>
      <Hero />
      <KpiBand />
      <WorkflowVisual />
      <ValueSections />
      <AiAutomation />
      <PricingSection />
      <LeadSection mode="demo" />
    </>
  );
}

export function MarketingPage({ slug }: { slug: string }) {
  const page = marketingPages[slug] ?? marketingPages.platform;
  const isDemo = slug === "demo";
  const isContact = slug === "contact";
  const isPricing = slug === "pricing";

  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(11,60,93,0.18),transparent_36%),linear-gradient(135deg,#F8FAFC_0%,#ffffff_50%,#eef6fb_100%)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <StatusBadge label={page.eyebrow} tone="blue" />
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-0.04em] text-[#0B3C5D] sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{page.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={isDemo ? "#demo-form" : isContact ? "#contact-form" : "/demo"}>
                  {page.primaryCta} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={isPricing ? "/demo" : "/platform"}>{page.secondaryCta}</Link>
              </Button>
            </div>
          </div>
          <Card className="bg-white/90">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#E63946]">Operating outcomes</p>
            <div className="mt-5 grid gap-4">
              {page.bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 rounded-3xl bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <p className="text-sm font-medium leading-6 text-slate-700">{bullet}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
      {isPricing ? <PricingSection /> : <FeatureGrid />}
      <LeadSection mode={isDemo ? "demo" : isContact ? "contact" : "lead"} />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#071f33] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(230,57,70,0.34),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(96,165,250,0.26),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <MotionSection>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#E63946]" />
            {brand.tagline}
          </div>
          <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-[-0.055em] sm:text-7xl">
            Turn every healthcare assignment into a better life decision.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{brand.promise}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/demo">
                Book executive demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
              <Link href="/agency">Open live dashboard</Link>
            </Button>
          </div>
        </MotionSection>
        <MotionSection className="relative">
          <GlassCard className="relative overflow-hidden">
            <div className="absolute right-4 top-4 h-28 w-28 rounded-full bg-[#E63946]/20 blur-2xl" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Offer confidence</p>
                <p className="text-5xl font-black">86%</p>
              </div>
              <StatusBadge label="AI enhanced" tone="red" />
            </div>
            <div className="mt-8 grid gap-4">
              {["Housing assistance included", "Flight support approved", "First-week checklist active"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
                  <span className="text-sm font-semibold">{item}</span>
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl bg-white p-5 text-[#1F2937]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E63946]">Retention Risk AI</p>
              <p className="mt-2 text-2xl font-black">Low risk after concierge handoff</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Candidate viewed housing, requested travel support, and completed 4 of 5 readiness steps.
              </p>
            </div>
          </GlassCard>
        </MotionSection>
      </div>
    </section>
  );
}

function KpiBand() {
  const kpis = [
    ["18%", "acceptance lift target"],
    ["31%", "preventable backout reduction"],
    ["4.6d", "average time-to-ready"],
    ["96%", "first-day show-up visibility"]
  ];
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(([value, label]) => (
          <Card key={label} className="p-6">
            <p className="text-4xl font-black text-[#0B3C5D]">{value}</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">{label}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function WorkflowVisual() {
  return (
    <MotionSection className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <StatusBadge label="Product workflow" tone="blue" />
          <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-[#0B3C5D]">
            One premium workflow from offer creation to first-day readiness.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-6">
          {workflow.map((step, index) => (
            <Card key={step} className="relative min-h-44 overflow-hidden">
              <div className="absolute -right-6 -top-6 grid h-20 w-20 place-items-center rounded-full bg-[#0B3C5D]/5 text-4xl font-black text-[#0B3C5D]/20">
                {index + 1}
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E63946]">Step {index + 1}</p>
              <p className="mt-5 text-lg font-black leading-6 text-slate-900">{step}</p>
            </Card>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function ValueSections() {
  const sections = [
    ["Agency value", "Differentiate assignments with mobility support instead of pay-rate escalation."],
    ["MSP value", "Expose supplier performance, readiness, and mobility utilization in executive-ready reporting."],
    ["Clinician value", "Give the candidate a clear, mobile path for housing, travel, transport, and questions."]
  ];
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        {sections.map(([title, copy]) => (
          <Card key={title} className="border-slate-100">
            <h3 className="text-2xl font-black text-[#0B3C5D]">{title}</h3>
            <p className="mt-4 leading-7 text-slate-600">{copy}</p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/platform">Explore workflow</Link>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
        {featureCards.map((feature) => (
          <Link key={feature.href} href={feature.href}>
            <Card className="h-full transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(11,60,93,0.14)]">
              <feature.icon className="h-8 w-8 text-[#E63946]" />
              <h3 className="mt-5 text-xl font-black text-[#0B3C5D]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.copy}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AiAutomation() {
  return (
    <section className="bg-[#0B3C5D] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <StatusBadge label="AI automation" tone="red" />
          <h2 className="mt-5 text-4xl font-black tracking-[-0.035em]">Five AI agents with professional fallbacks.</h2>
          <p className="mt-5 leading-7 text-slate-200">
            Offer Boost, Retention Risk, Assignment Readiness, Concierge, and MSP Reporting agents use an OpenAI-compatible
            architecture. If no key is configured, Orbit returns polished mock responses without exposing secrets.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {aiRecommendations.map((item) => (
            <GlassCard key={item} className="p-5">
              <LockKeyhole className="h-5 w-5 text-[#E63946]" />
              <p className="mt-4 text-sm font-semibold leading-6">{item}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <StatusBadge label="Stripe-ready pricing" tone="blue" />
          <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-[#0B3C5D]">Commercial structure built for SaaS scale.</h2>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={plan.name === "Orbit Scale" ? "border-[#E63946]/30 ring-4 ring-[#E63946]/10" : ""}>
              <h3 className="text-2xl font-black text-[#0B3C5D]">{plan.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{plan.description}</p>
              <p className="mt-6 text-4xl font-black text-slate-950">{plan.price}</p>
              <div className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <p key={feature} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {feature}
                  </p>
                ))}
              </div>
              <Button asChild className="mt-7 w-full">
                <Link href="/demo">Discuss plan</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadSection({ mode }: { mode: "lead" | "demo" | "contact" }) {
  const id = mode === "demo" ? "demo-form" : mode === "contact" ? "contact-form" : "lead-form";
  return (
    <section id={id} className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <StatusBadge label="Lead capture" tone="red" />
          <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-[#0B3C5D]">
            Ready to make every assignment easier to accept and harder to back out of?
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Submit the form and Orbit saves the request to the database when configured, with a graceful production fallback when
            infrastructure variables are not present.
          </p>
        </div>
        <Card>
          <LeadCaptureForm mode={mode} source={id} />
        </Card>
      </div>
    </section>
  );
}
