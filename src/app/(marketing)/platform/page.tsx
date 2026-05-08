import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AISection,
  KpiCards,
  MobilityStack,
  SectionHeading,
  TrustBar,
} from "@/components/marketing/sections";
import {
  ArrowRight,
  CalendarCheck2,
  Compass,
  Gauge,
  LineChart,
  Radar,
  Sparkles,
  Workflow,
} from "lucide-react";

export const metadata = { title: "Platform" };

const PILLARS = [
  {
    icon: Sparkles,
    title: "Offer Boost Builder",
    detail:
      "AI-enhanced offer pages and a candidate hub that turns logistics into a competitive advantage.",
    href: "/features/offer-boost-builder",
  },
  {
    icon: Compass,
    title: "Mobility Concierge",
    detail:
      "A vendor + landlord marketplace and a concierge task board that unifies housing, travel, and transport.",
    href: "/features/mobility-concierge",
  },
  {
    icon: Radar,
    title: "Retention Risk AI",
    detail:
      "A 0–100 risk score, reasoning, suggested action, and a recruiter-ready SMS for every candidate.",
    href: "/features/retention-risk-ai",
  },
  {
    icon: Gauge,
    title: "Assignment Launch Dashboard",
    detail:
      "Track readiness from offer accepted to first day. Housing, travel, documents, first week — one pane.",
    href: "/features/assignment-launch-dashboard",
  },
];

export default function PlatformPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-orbit-hero text-white">
        <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.1] [background-size:48px_48px]" />
        <div className="container-wide relative py-24 md:py-32">
          <Badge variant="inverse">Platform</Badge>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            One operating system for the staffing offer-to-start workflow.
          </h1>
          <p className="mt-5 max-w-2xl text-white/80">
            TRITAL Orbit™ replaces the spreadsheet, the Slack channel, and the ad-hoc landlord lists with a
            single, audit-ready system of record for healthcare workforce mobility.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/demo">
                Book demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 text-white border-white/15 hover:bg-white/10">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section">
        <div className="container-wide">
          <SectionHeading
            eyebrow="The platform, in four pillars"
            title="Designed to be deployed alongside your VMS, not against it."
            description="Drop Orbit into your existing pipeline. Recruiters keep their workflow. Candidates get a premium hub. MSPs get the reporting they actually want."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.title} className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orbit-deep/5 text-orbit-deep">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-orbit-deep">{p.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{p.detail}</p>
                    <Link
                      href={p.href}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-orbit-deep group-hover:text-orbit-red"
                    >
                      Explore <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <MobilityStack />
      <KpiCards />
      <AISection />

      <section className="section bg-white">
        <div className="container-wide grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Architecture"
              title="Enterprise architecture, without the overhead."
              description="Orbit ships with role-based access, audit logs, and field-level data controls. Your security team's checklist is covered before kickoff."
            />
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {[
                "Postgres + Prisma — typed, migration-managed schema.",
                "NextAuth + RBAC — 7 distinct roles, server-enforced.",
                "AI agents — bring-your-own-key or Orbit-managed.",
                "Stripe-ready billing for mobility add-ons and concierge.",
                "Resend-ready transactional email + audit-friendly logs.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orbit-red" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 gap-px bg-orbit-deep/10">
                {[
                  { label: "Data Model", value: "26 entities", icon: Workflow },
                  { label: "AI Agents", value: "5 inbuilt", icon: Sparkles },
                  { label: "Roles", value: "7 granular", icon: Compass },
                  { label: "Reporting", value: "PDF + CSV", icon: LineChart },
                  { label: "Readiness", value: "Live tracker", icon: Gauge },
                  { label: "Audit", value: "Field-level", icon: CalendarCheck2 },
                ].map((cell) => {
                  const Icon = cell.icon;
                  return (
                    <div key={cell.label} className="bg-white p-6">
                      <Icon className="h-5 w-5 text-orbit-red" />
                      <div className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">{cell.label}</div>
                      <div className="mt-1 text-lg font-semibold text-orbit-deep">{cell.value}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
