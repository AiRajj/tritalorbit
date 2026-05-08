"use client";
import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Building2,
  CalendarCheck2,
  Car,
  CheckCircle2,
  Compass,
  CreditCard,
  FileSearch,
  Gauge,
  Home,
  Lock,
  PlaneTakeoff,
  Radar,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-orbit-deep/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-orbit-deep">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-orbit-deep md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-balance text-base text-slate-600 md:text-lg">{description}</p>}
    </div>
  );
}

// ----------------------- Trust Bar -----------------------------------
export function TrustBar() {
  const items = [
    "SOC 2 aligned",
    "HIPAA-aware",
    "Joint Commission-aligned",
    "MSP / VMS ready",
    "Field-level audit logs",
    "Role-based access",
  ];
  return (
    <div className="border-y border-orbit-deep/10 bg-white/60">
      <div className="container-wide flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 text-xs font-medium uppercase tracking-wider text-slate-500">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-orbit-deep" /> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ----------------------- KPI Cards -----------------------------------
export function KpiCards() {
  const kpis = [
    { label: "Higher offer acceptance", value: "+34%", trend: "vs. baseline" },
    { label: "Backout reduction", value: "–41%", trend: "vs. last quarter" },
    { label: "Time-to-ready", value: "11d → 4d", trend: "median" },
    { label: "First-day show-up", value: "98%", trend: "across pilots" },
  ];
  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Outcomes our customers see"
          title="Measurable wins, embedded in the offer."
          description="Mobility isn't a perk. When it lives inside the offer, every metric on the staffing P&L moves."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                    <TrendingUp className="h-3.5 w-3.5 text-orbit-red" /> {k.trend}
                  </div>
                  <div className="mt-3 text-3xl font-semibold tracking-tight text-gradient-orbit">{k.value}</div>
                  <div className="mt-1 text-sm text-slate-700">{k.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------- Workflow ------------------------------------
export function WorkflowSection() {
  const steps = [
    {
      icon: Workflow,
      title: "Build the boosted offer",
      detail: "Recruiter opens Offer Boost Builder, toggles mobility perks, AI generates copy, SMS, email, close strategy.",
    },
    {
      icon: PlaneTakeoff,
      title: "Send a candidate hub link",
      detail: "Candidate gets a mobile-first portal with travel, housing, transportation, and a confidence score.",
    },
    {
      icon: Compass,
      title: "Concierge handles logistics",
      detail: "Booking requests turn into concierge tasks — vendors and landlords are matched and confirmed.",
    },
    {
      icon: CalendarCheck2,
      title: "Launch the assignment",
      detail: "Readiness dashboard tracks housing, travel, documents, and Day-1 risk down to the candidate.",
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="The orbit workflow"
          title="From offer sent to first day, on one rail."
          description="Recruiters, concierge, candidates, and MSPs all see the same source of truth."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orbit-deep/5 text-orbit-deep">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-orbit-red">
                      Step {i + 1}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-orbit-deep">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{s.detail}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------- Pain → Solution -----------------------------
export function PainSolution() {
  const rows = [
    { pain: "Offers ignored or unviewed", fix: "Personalized hub + AI follow-ups" },
    { pain: "Backouts in the final 7 days", fix: "Risk score with concrete next action" },
    { pain: "Housing scrambles before Day 1", fix: "Vendor + landlord marketplace tied to facility" },
    { pain: "Travel chaos for the candidate", fix: "Booking requests → concierge task board" },
    { pain: "Pay-rate war with competitors", fix: "Lifestyle-led packaging that protects margin" },
    { pain: "MSP scorecards that punish suppliers", fix: "Reporting that proves performance" },
  ];

  return (
    <section className="section bg-orbit-mist">
      <div className="container-wide">
        <SectionHeading
          eyebrow="What changes on day one"
          title="Stop losing offers to logistics."
          description="If the candidate can't picture their first week, they walk. Orbit hands you a complete picture, packaged inside the offer."
        />
        <div className="mt-12 overflow-hidden rounded-2xl border border-orbit-deep/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-orbit-deep/5 text-left text-xs font-semibold uppercase tracking-wider text-orbit-deep">
              <tr>
                <th className="px-6 py-4">Today</th>
                <th className="px-6 py-4">With TRITAL Orbit™</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orbit-deep/10">
              {rows.map((r) => (
                <tr key={r.pain}>
                  <td className="px-6 py-4 text-slate-600">{r.pain}</td>
                  <td className="px-6 py-4 font-medium text-orbit-deep">
                    <span className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {r.fix}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ----------------------- Audience tabs -------------------------------
export function AudienceCards() {
  const cards = [
    {
      icon: Users,
      tag: "Agencies",
      title: "Win the offer without the bidding war.",
      points: ["Boosted offers with embedded mobility", "Backout-risk early-warning system", "Pipeline that closes 2.3× faster"],
      href: "/solutions/agencies",
    },
    {
      icon: Building2,
      tag: "MSPs",
      title: "Supplier performance you can prove.",
      points: ["Acceptance, backout, and readiness scorecards", "AI-generated executive summaries", "PDF / CSV ready for procurement"],
      href: "/solutions/msps",
    },
    {
      icon: Stethoscope,
      tag: "Clinicians",
      title: "Move with confidence. Day-1 ready.",
      points: ["Mobile-first assignment hub", "Verified housing near the facility", "One concierge for travel + transport"],
      href: "/solutions/clinicians",
    },
  ];
  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeading
          eyebrow="One platform. Three audiences."
          title="Built for both sides of the staffing marketplace."
          description="Every workflow is engineered against the job-to-be-done for that role."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.title} className="group h-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-elevate">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orbit-deep/5 text-orbit-deep">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="accent">For {c.tag}</Badge>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-orbit-deep">{c.title}</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghost" size="sm" className="mt-6 -ml-3">
                    <Link href={c.href}>Explore {c.tag.toLowerCase()} →</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------- AI Section ----------------------------------
export function AISection() {
  const agents = [
    {
      icon: Sparkles,
      name: "Offer Boost Agent",
      desc: "Rewrites offers to lead with mobility, generates SMS, email, and a recruiter close strategy.",
    },
    {
      icon: Radar,
      name: "Retention Risk Agent",
      desc: "Scores every candidate 0–100 and recommends the next concrete action.",
    },
    {
      icon: Gauge,
      name: "Assignment Readiness Agent",
      desc: "Tracks housing, travel, documents, first-week — surfaces gaps before they become incidents.",
    },
    {
      icon: Compass,
      name: "Concierge Agent",
      desc: "Summarizes booking requests, drafts candidate updates, recommends vendor options.",
    },
    {
      icon: FileSearch,
      name: "MSP Reporting Agent",
      desc: "Writes executive summaries, scorecards, and watch-out lists for supplier performance.",
    },
  ];
  return (
    <section className="section relative overflow-hidden bg-orbit-ink text-white">
      <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.06] [background-size:48px_48px]" />
      <div aria-hidden className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-orbit-red/10 blur-3xl" />
      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/70">
            <Brain className="h-3.5 w-3.5 text-orbit-red" /> Inbuilt AI
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Five AI agents, one operating system for staffing mobility.
          </h2>
          <p className="mt-4 text-balance text-white/70">
            Every agent is grounded in your data. No prompts, no glue. Bring your own OpenAI key — or run on
            Orbit's curated models.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {agents.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orbit-red/10 text-orbit-red">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm font-semibold">{a.name}</div>
                <p className="mt-2 text-xs text-white/65 leading-relaxed">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------- Mobility Stack ------------------------------
export function MobilityStack() {
  const items = [
    { icon: Home, title: "Housing", detail: "Verified landlords + corporate stays mapped to facility distance." },
    { icon: PlaneTakeoff, title: "Travel", detail: "Flight, ground transport, and arrival logistics — all in-thread." },
    { icon: Car, title: "Transportation", detail: "Car rental and rideshare with stipend-aligned pricing." },
    { icon: Compass, title: "Concierge", detail: "Human-in-the-loop ops board for the messy real-world steps." },
    { icon: Lock, title: "Document Vault", detail: "Field-level audit, expirations, and credential tracking." },
    { icon: CreditCard, title: "Billing", detail: "Stripe-ready invoicing for mobility add-ons and concierge tasks." },
  ];
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="The mobility layer"
          title="Everything a clinician needs between offer and Day 1."
          description="Six modules, one rail. Your team stops Slack-ing logistics and starts shipping placements."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <Card key={i.title} className="h-full">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orbit-deep/5 text-orbit-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-orbit-deep">{i.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{i.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------- Testimonials --------------------------------
export function Testimonials() {
  const quotes = [
    {
      quote: "Backouts dropped 38% in the first quarter. We didn't change pay rates — we changed what was inside the offer.",
      author: "VP Clinical Operations",
      where: "National travel staffing firm",
    },
    {
      quote: "Recruiters used to spend half their day on logistics. Now Orbit's concierge layer does that, and they actually close.",
      author: "Director of Recruiting",
      where: "Regional MSP partner",
    },
    {
      quote: "The candidate-facing hub is the closest thing I've seen to consumer-grade clinical UX.",
      author: "RN, ICU travel clinician",
      where: "13-week assignment, Houston",
    },
  ];
  return (
    <section className="section bg-orbit-mist">
      <div className="container-wide">
        <SectionHeading
          eyebrow="What teams say"
          title="Built with operators. Used by closers."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <Card key={q.author} className="h-full">
              <CardContent className="p-6">
                <svg className="h-6 w-6 text-orbit-red" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v3a4 4 0 01-4 4v2a6 6 0 006-6V7zM21 7h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v3a4 4 0 01-4 4v2a6 6 0 006-6V7z" />
                </svg>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{q.quote}</p>
                <div className="mt-6">
                  <div className="text-sm font-semibold text-orbit-deep">{q.author}</div>
                  <div className="text-xs text-slate-500">{q.where}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------- Final CTA -----------------------------------
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-wide py-24">
        <div className="relative overflow-hidden rounded-3xl border border-orbit-deep/10 bg-orbit-ink p-10 md:p-14">
          <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-orbit-red/15 blur-3xl" />
          <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.06] [background-size:48px_48px]" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <SectionEyebrow>
                <span className="text-white/70">Ready when you are</span>
              </SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Bring mobility into your offer flow.
              </h2>
              <p className="mt-4 text-white/70">
                Most pilots ship in under two product cycles. We bring your data, your vendors, and your MSP
                relationships onto Orbit — without disrupting your VMS.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Button asChild variant="accent" size="lg">
                <Link href="/demo">Book a 30-min walkthrough</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/5 text-white border-white/15 hover:bg-white/10">
                <Link href="/contact">Talk to our team</Link>
              </Button>
              <p className="text-xs text-white/55">No credit card. No VMS swap. Live demo in 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
