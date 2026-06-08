"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  AlertTriangle,
  Home,
  Plane,
  Car,
  Star,
  Quote,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const painPoints = [
  {
    icon: DollarSign,
    title: "Pay Rate Pressure",
    description:
      "Competing on pay alone erodes margins and creates a race to the bottom you can't win.",
  },
  {
    icon: AlertTriangle,
    title: "High Backout Rates",
    description:
      "Clinicians accept offers then back out before day one, costing you time, money, and client trust.",
  },
  {
    icon: Users,
    title: "Clinician Churn",
    description:
      "Without ongoing support, clinicians feel unsupported and leave for agencies that provide more.",
  },
  {
    icon: Home,
    title: "Relocation Complexity",
    description:
      "Coordinating housing, travel, and transportation manually is error-prone and time-consuming.",
  },
];

const solutions = [
  {
    icon: TrendingUp,
    title: "Offer Enhancement",
    description:
      "Boost offers with housing stipends, travel packages, and car rentals — without increasing base pay rates. Create lifestyle-driven offers that stand out.",
    metrics: "35% higher acceptance rate",
  },
  {
    icon: Plane,
    title: "Mobility Support",
    description:
      "Automate the entire relocation experience with housing search, travel booking, and transportation coordination from a single dashboard.",
    metrics: "80% less coordination time",
  },
  {
    icon: Shield,
    title: "Risk Scoring",
    description:
      "AI-powered retention risk analysis identifies at-risk assignments before backouts happen, giving you time to intervene and save placements.",
    metrics: "60% fewer backouts",
  },
  {
    icon: Car,
    title: "Vendor Marketplace",
    description:
      "Access pre-negotiated rates on housing, rental cars, and travel through our curated vendor network — pass savings to clinicians or keep margins.",
    metrics: "25% cost savings on mobility",
  },
];

const roiMetrics = [
  { value: "35%", label: "Higher Offer Acceptance", description: "vs. pay-only offers" },
  { value: "60%", label: "Fewer Assignment Backouts", description: "with retention AI" },
  { value: "$2.4M", label: "Average Annual Savings", description: "per 500 placements" },
  { value: "4.8x", label: "Return on Investment", description: "within first year" },
];

export default function AgenciesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D] to-[#1F2937] py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              For Staffing Agencies
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Win More Clinicians{" "}
              <span className="text-[#E63946]">Without Increasing Pay Rates</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              TRITAL Orbit&trade; helps agencies compete on experience, not just
              compensation. Enhance offers, automate mobility, and predict risk —
              all from one platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white" asChild>
                <Link href="/demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/platform">Explore Platform</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              The Challenges You Face Every Day
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Sound familiar? You&apos;re not alone — these are the most common
              pain points in healthcare staffing.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={point.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full border-[#E63946]/20 bg-[#E63946]/5">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#E63946]/10">
                      <point.icon className="h-5 w-5 text-[#E63946]" />
                    </div>
                    <CardTitle className="text-lg">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Orbit Helps */}
      <section className="border-y border-[#1F2937]/10 bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              How TRITAL Orbit&trade; Solves It
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Four powerful capabilities designed specifically for healthcare
              staffing agencies.
            </p>
          </motion.div>

          <div className="space-y-12">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
                    <sol.icon className="h-5 w-5 text-[#0B3C5D]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937]">{sol.title}</h3>
                  <p className="mt-3 text-[#1F2937]/70">{sol.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0B3C5D]/10 px-4 py-1.5 text-sm font-semibold text-[#0B3C5D]">
                    <TrendingUp className="h-4 w-4" />
                    {sol.metrics}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="aspect-video rounded-xl border border-[#1F2937]/10 bg-gradient-to-br from-[#0B3C5D]/5 to-[#E63946]/5 p-6">
                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-[#1F2937]/20">
                      <sol.icon className="h-12 w-12 text-[#0B3C5D]/20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="bg-[#0B3C5D] py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              The ROI Speaks for Itself
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Real results from agencies using TRITAL Orbit&trade;.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roiMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <div className="text-4xl font-bold text-[#E63946]">{metric.value}</div>
                <div className="mt-2 font-semibold text-white">{metric.label}</div>
                <div className="mt-1 text-sm text-white/60">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 bg-gradient-to-br from-[#0B3C5D]/5 to-[#E63946]/5 p-8 lg:p-12">
              <div className="flex justify-center">
                <Quote className="h-10 w-10 text-[#E63946]/40" />
              </div>
              <blockquote className="mt-6 text-center text-xl font-medium text-[#1F2937] lg:text-2xl">
                &ldquo;Since implementing Orbit, our offer acceptance rate jumped
                35% and backouts dropped by more than half. The ROI was obvious
                within the first quarter.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B3C5D] text-lg font-bold text-white">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-[#1F2937]">Sarah Mitchell</div>
                  <div className="text-sm text-[#1F2937]/60">
                    VP of Operations, MedStaff Pro
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#E63946] text-[#E63946]" />
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1F2937]/10 bg-white py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Ready to Win More Clinicians?
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              See how TRITAL Orbit&trade; can transform your agency&apos;s
              competitive advantage in a 30-minute personalized demo.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90" asChild>
                <Link href="/demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
