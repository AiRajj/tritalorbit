"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Building2, ShieldCheck, Stethoscope, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#1F2937] to-[#0B3C5D] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(230,57,70,0.23),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            Healthcare Workforce Mobility Infrastructure
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            Turn every assignment into a better life decision, not just a better weekly number.
          </h1>
          <p className="mt-6 text-lg text-blue-100">
            TRITAL Orbit™ helps healthcare staffing firms win and keep clinicians without increasing pay rates by embedding housing, travel, relocation, and AI-powered offer optimization into every offer-to-start workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demo">
              <Button className="bg-[#E63946] hover:bg-[#d11f2d]">
                Schedule Executive Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/platform">
              <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                Explore Platform
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { label: "Offer acceptance lift", value: "+24%" },
            { label: "Backout reduction", value: "-31%" },
            { label: "Faster readiness", value: "2.8x" },
            { label: "Concierge CSAT", value: "98%" },
          ].map((item) => (
            <Card key={item.label} className="border-white/10 bg-white/10 text-white shadow-none backdrop-blur">
              <CardHeader className="pb-2">
                <CardDescription className="text-blue-100">{item.label}</CardDescription>
                <CardTitle className="text-3xl text-white">{item.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ValuePillarsSection() {
  const cards = [
    {
      icon: <Building2 className="h-5 w-5 text-[#0B3C5D]" />,
      title: "Agency Operating Margin Protection",
      text: "Reduce failed starts and expensive emergency re-placements with proactive mobility support.",
    },
    {
      icon: <Stethoscope className="h-5 w-5 text-[#0B3C5D]" />,
      title: "Clinician Experience Advantage",
      text: "Give clinicians confidence before day one with trusted housing, travel, car, and concierge support.",
    },
    {
      icon: <BrainCircuit className="h-5 w-5 text-[#0B3C5D]" />,
      title: "AI Operational Intelligence",
      text: "Predict retention risk, generate tailored recruiter messaging, and prioritize intervention opportunities.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#0B3C5D]" />,
      title: "Enterprise Governance",
      text: "Role-based controls, audit trails, and enterprise workflows for agencies, MSPs, and vendors.",
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-[#1F2937]">Built for agencies, MSPs, and clinicians</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          One operating system for assignment mobility from offer to first-day show-up.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {cards.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
                  {card.icon}
                </div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  const steps = [
    "Recruiter builds enhanced offer in Offer Boost Builder",
    "Candidate receives personalized assignment hub with mobility support",
    "Booking requests auto-create concierge tasks and vendor recommendations",
    "Readiness + risk AI score highlights intervention opportunities",
    "MSP and leadership dashboards track acceptance, backout, and show-up impact",
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-[#1F2937]">Offer-to-start command workflow</h2>
        <div className="mt-8 space-y-3">
          {steps.map((step, idx) => (
            <div
              key={step}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0B3C5D] text-sm font-bold text-white">
                {idx + 1}
              </span>
              <p className="text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SecurityTrustSection() {
  return (
    <section className="bg-[#1F2937] py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          {
            label: "Security",
            value: "Role-based route protection, audit logging, tokenized candidate links",
          },
          {
            label: "Compliance posture",
            value: "Structured data ownership, activity trails, and enterprise governance model",
          },
          {
            label: "AI control",
            value: "OpenAI-compatible architecture with safe fallback outputs and no key exposure",
          },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-blue-200">{item.label}</p>
            <p className="mt-3 text-sm text-slate-100">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function KpiStrip() {
  const kpis = [
    { label: "Acceptance Rate", value: "76%", icon: TrendingUp },
    { label: "Backout Risk", value: "18%", icon: TrendingUp },
    { label: "Time-to-Ready", value: "6.2 days", icon: TrendingUp },
    { label: "Mobility Utilization", value: "82%", icon: TrendingUp },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader className="space-y-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
              <kpi.icon className="h-4 w-4 text-[#0B3C5D]" />
            </div>
            <CardDescription>{kpi.label}</CardDescription>
            <CardTitle className="text-2xl">{kpi.value}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export function CtaSection() {
  return (
    <section className="bg-gradient-to-r from-[#0B3C5D] to-[#1F2937] py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-blue-200">TRITAL Orbit™</p>
          <h3 className="mt-2 text-3xl font-semibold">Scale clinician retention without raising pay rates.</h3>
        </div>
        <Link href="/demo">
          <Button className="bg-[#E63946] hover:bg-[#d11f2d]">Book a live platform walkthrough</Button>
        </Link>
      </div>
    </section>
  );
}
