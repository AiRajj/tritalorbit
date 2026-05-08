import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/marketing/sections";

export type FeatureShellProps = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  modules: { icon: LucideIcon; title: string; detail: string }[];
  preview?: { title: string; rows: { label: string; value: string }[]; footnote?: string };
};

export function FeatureShell({ tag, title, description, bullets, modules, preview }: FeatureShellProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-orbit-hero text-white">
        <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.1] [background-size:48px_48px]" />
        <div className="container-wide relative grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <Badge variant="inverse">{tag}</Badge>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-xl text-white/80">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/demo">Book demo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/5 text-white border-white/15 hover:bg-white/10">
                <Link href="/platform">See platform</Link>
              </Button>
            </div>
            <ul className="mt-10 grid max-w-xl gap-2 text-sm text-white/85">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          {preview && (
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-orbit-ink/70 p-6 backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">{preview.title}</div>
                <div className="mt-4 space-y-3">
                  {preview.rows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3">
                      <span className="text-xs uppercase tracking-wider text-white/55">{r.label}</span>
                      <span className="text-sm font-semibold text-white">{r.value}</span>
                    </div>
                  ))}
                </div>
                {preview.footnote && (
                  <p className="mt-4 text-xs text-white/55">{preview.footnote}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What's inside"
            title="Modular by design. Production-ready out of the box."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Card key={m.title} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orbit-deep/5 text-orbit-deep">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-orbit-deep">{m.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{m.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
