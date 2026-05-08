import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/marketing/sections";

export type SolutionShellProps = {
  audience: string;
  hero: {
    title: string;
    description: string;
    cta?: { label: string; href: string };
  };
  outcomes: { value: string; label: string }[];
  pillars: { icon: LucideIcon; title: string; detail: string }[];
  testimonial?: { quote: string; author: string; where: string };
  closing?: string;
};

export function SolutionShell({ audience, hero, outcomes, pillars, testimonial, closing }: SolutionShellProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-orbit-hero text-white">
        <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.1] [background-size:48px_48px]" />
        <div className="container-wide relative py-24 md:py-32">
          <Badge variant="inverse">For {audience}</Badge>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-white/80">{hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href={hero.cta?.href ?? "/demo"}>
                {hero.cta?.label ?? "Book demo"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 text-white border-white/15 hover:bg-white/10">
              <Link href="/contact">Talk to our team</Link>
            </Button>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {outcomes.map((o) => (
              <div key={o.label}>
                <div className="text-3xl font-semibold tracking-tight text-white">{o.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/60">{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow={`How it works for ${audience.toLowerCase()}`}
            title="Operational wins, in days."
            description="Orbit slots inside your existing pipeline. No VMS change, no system swap."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.title} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orbit-deep/5 text-orbit-deep">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-orbit-deep">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{p.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {testimonial && (
        <section className="section">
          <div className="container-tight">
            <Card>
              <CardContent className="p-10">
                <CheckCircle2 className="h-6 w-6 text-orbit-red" />
                <p className="mt-4 text-2xl font-medium leading-tight tracking-tight text-orbit-deep">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6 text-sm">
                  <div className="font-semibold text-orbit-deep">{testimonial.author}</div>
                  <div className="text-slate-500">{testimonial.where}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="section bg-orbit-mist">
        <div className="container-tight text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-orbit-deep md:text-4xl">
            {closing ?? `Bring Orbit into your ${audience.toLowerCase()} workflow.`}
          </h2>
          <p className="mt-4 text-slate-600">No VMS swap. Live demo in 24 hours.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="default" size="lg">
              <Link href="/demo">Book demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
