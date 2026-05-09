import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CloudPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
  kpis?: Array<{ label: string; value: string }>;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CloudPage({
  eyebrow,
  title,
  subtitle,
  bullets,
  kpis = [
    { label: "Backout Reduction", value: "-31%" },
    { label: "Offer Acceptance Lift", value: "+22%" },
    { label: "Faster Readiness", value: "2.4x" }
  ],
  primaryCta = { label: "Book Live Demo", href: "/demo/live-platform" },
  secondaryCta = { label: "Talk to Mobility Expert", href: "/contact" }
}: CloudPageProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-orbit-aurora bg-orbit-grid bg-[size:24px_24px] p-8 text-white shadow-glow">
        <p className="text-xs uppercase tracking-[0.24em] text-white/80">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-white/90">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild size="lg">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">{kpi.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Operational value proposition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            {bullets.map((bullet) => (
              <p key={bullet} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-orbit-blue" />
                <span>{bullet}</span>
              </p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-orbit-blue" />
              Trust + compliance layer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>Verified assignment context for all mobility actions.</p>
            <p>Role-based controls, audit logging, and dispute lifecycle support.</p>
            <p>Graceful AI/API fallback responses for production reliability.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">Request implementation details</h2>
        <p className="mt-2 text-slate-600">Share your use case and we’ll map workflows to your staffing model.</p>
        <div className="mt-4">
          <LeadCaptureForm source="WEBSITE" />
        </div>
      </div>
    </section>
  );
}
