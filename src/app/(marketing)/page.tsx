"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Home,
  Plane,
  Car,
  Headset,
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Users,
  Zap,
  CheckCircle2,
  BarChart3,
  Lock,
  Server,
  KeyRound,
  Activity,
  ChevronRight,
  Sparkles,
  Target,
  Eye,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────── Dashboard Preview Mockup ───────── */
function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
      className="relative mx-auto max-w-4xl mt-16 lg:mt-20"
    >
      <div className="absolute -inset-4 bg-gradient-to-b from-[#0B3C5D]/20 via-[#E63946]/10 to-transparent rounded-3xl blur-2xl" />
      <div className="relative rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-gray-900/10 overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 mx-8">
            <div className="h-6 bg-gray-200/60 rounded-md max-w-xs mx-auto flex items-center justify-center">
              <span className="text-[10px] text-gray-400 font-medium">app.tritalorbit.com/dashboard</span>
            </div>
          </div>
        </div>
        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-3 hidden md:block space-y-2">
            {["Dashboard", "Offers", "Assignments", "Clinicians", "Analytics", "Concierge"].map(
              (item, i) => (
                <div
                  key={item}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium",
                    i === 0
                      ? "bg-[#0B3C5D] text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  {item}
                </div>
              )
            )}
          </div>
          {/* Main Area */}
          <div className="col-span-12 md:col-span-9 space-y-4">
            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Active Offers", value: "247", change: "+12%", up: true },
                { label: "Acceptance Rate", value: "78%", change: "+23%", up: true },
                { label: "Backout Rate", value: "8%", change: "-61%", up: false },
                { label: "Time to Ready", value: "48h", change: "-33%", up: false },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-gray-100 bg-white p-3"
                >
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{kpi.label}</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-xl font-bold text-[#1F2937]">{kpi.value}</span>
                    <span
                      className={cn(
                        "text-[10px] font-semibold mb-0.5",
                        kpi.label === "Backout Rate" || kpi.label === "Time to Ready"
                          ? "text-emerald-600"
                          : kpi.up
                          ? "text-emerald-600"
                          : "text-red-500"
                      )}
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Chart Area */}
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-700">Offer Performance</span>
                <div className="flex gap-3">
                  {["7D", "30D", "90D"].map((t, i) => (
                    <span
                      key={t}
                      className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-md cursor-pointer",
                        i === 1 ? "bg-[#0B3C5D] text-white" : "text-gray-400 hover:text-gray-600"
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="h-28 flex items-end gap-1.5">
                {[35, 42, 28, 55, 48, 62, 58, 71, 65, 78, 82, 88, 75, 92, 85, 95].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.04 }}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-[#0B3C5D] to-[#0B3C5D]/60"
                    />
                  )
                )}
              </div>
            </div>
            {/* Recent Activity */}
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <span className="text-xs font-semibold text-gray-700">Recent Assignments</span>
              <div className="mt-3 space-y-2">
                {[
                  { name: "Sarah M.", loc: "Austin, TX", status: "Ready", color: "bg-emerald-500" },
                  { name: "James K.", loc: "Denver, CO", status: "In Transit", color: "bg-blue-500" },
                  { name: "Lisa P.", loc: "Phoenix, AZ", status: "Housing Confirmed", color: "bg-amber-500" },
                ].map((row) => (
                  <div key={row.name} className="flex items-center justify-between py-1.5 border-t border-gray-50 first:border-0">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-[9px] font-semibold text-gray-500">
                          {row.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-gray-700">{row.name}</p>
                        <p className="text-[9px] text-gray-400">{row.loc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={cn("h-1.5 w-1.5 rounded-full", row.color)} />
                      <span className="text-[10px] font-medium text-gray-500">{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────── Hero Section ───────── */
function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#0B3C5D]/5 via-[#E63946]/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0B3C5D]/10 bg-[#0B3C5D]/5 px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#E63946]" />
            <span className="text-xs font-semibold text-[#0B3C5D]">
              Healthcare Workforce Mobility Infrastructure
            </span>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#1F2937] max-w-4xl mx-auto leading-[1.1]"
        >
          Win more clinicians.{" "}
          <span className="text-[#E63946]">Reduce backouts.</span>{" "}
          Improve assignment readiness.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          We help healthcare staffing companies win and keep clinicians without increasing pay rates by turning every assignment into a better life decision.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/demo">
            <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/20 hover:shadow-xl hover:shadow-[#E63946]/30 transition-all h-12 px-8 text-sm font-semibold">
              Request Demo
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <Link href="/platform">
            <Button variant="outline" size="lg" className="h-12 px-8 text-sm font-semibold border-gray-200 hover:border-gray-300">
              See How It Works
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </motion.div>
        <DashboardPreview />
      </div>
    </section>
  );
}

/* ───────── Pain Section ───────── */
function PainSection() {
  const stats = [
    {
      icon: TrendingDown,
      value: "40%",
      label: "Backout Rates",
      detail: "Nearly half of clinician placements fall through before start date",
      color: "text-[#E63946]",
      bg: "bg-red-50",
    },
    {
      icon: DollarSign,
      value: "$8K+",
      label: "Per Backout Cost",
      detail: "Direct and indirect costs per failed placement including sourcing, credentialing, and lost revenue",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Clock,
      value: "72 hrs",
      label: "Avg Relocation Stress",
      detail: "Clinicians spend 72+ hours navigating housing, travel, and logistics for each assignment",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const painPoints = [
    {
      title: "For Agencies",
      points: [
        "Competing on pay rates alone is unsustainable",
        "High backout rates erode margins and client trust",
        "No visibility into clinician assignment readiness",
      ],
    },
    {
      title: "For MSPs",
      points: [
        "Inconsistent supplier performance metrics",
        "No standardized mobility or readiness benchmarks",
        "Compliance gaps across supplier networks",
      ],
    },
    {
      title: "For Clinicians",
      points: [
        "Relocation logistics are overwhelming and time-consuming",
        "Lack of transparency in assignment support",
        "Housing and travel uncertainty drives backouts",
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight">
            The Hidden Cost of Losing Clinicians
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Healthcare staffing is broken. Clinicians accept offers then back out because the logistics of relocating feel impossible.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-gray-200/80 bg-white p-8 text-center hover:shadow-lg transition-shadow">
                  <div className={cn("inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-4", stat.bg)}>
                    <Icon className={cn("h-7 w-7", stat.color)} />
                  </div>
                  <p className={cn("text-5xl font-bold", stat.color)}>{stat.value}</p>
                  <p className="text-lg font-semibold text-[#1F2937] mt-2">{stat.label}</p>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{stat.detail}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {painPoints.map((group, i) => (
            <AnimatedSection key={group.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6">
                <h3 className="text-lg font-bold text-[#1F2937] mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E63946] shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Solution Overview ───────── */
function SolutionSection() {
  const solutions = [
    { icon: Home, title: "Housing", desc: "Furnished housing sourced and booked before day one. No stress, no searching.", color: "from-blue-500 to-blue-600" },
    { icon: Plane, title: "Travel", desc: "Flights, ground transport, and logistics coordinated end-to-end.", color: "from-indigo-500 to-indigo-600" },
    { icon: Car, title: "Car Rental", desc: "Vehicle arrangements pre-configured for every assignment location.", color: "from-violet-500 to-violet-600" },
    { icon: Headset, title: "Concierge", desc: "Dedicated mobility concierge for every clinician, from offer to assignment.", color: "from-emerald-500 to-emerald-600" },
    { icon: BrainCircuit, title: "AI Optimization", desc: "Machine learning models optimize offer competitiveness and predict outcomes.", color: "from-amber-500 to-amber-600" },
    { icon: ShieldCheck, title: "Retention Intelligence", desc: "Proactive risk detection identifies and prevents potential backouts.", color: "from-rose-500 to-rose-600" },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">
            The Solution
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight">
            One Platform. Every Mobility Need.
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            TRITAL Orbit consolidates every aspect of clinician mobility into a single, intelligent platform.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <AnimatedSection key={sol.title} delay={i * 0.08}>
                <div className="group relative rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-xl hover:border-[#0B3C5D]/20 transition-all duration-300">
                  <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md mb-4", sol.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#0B3C5D] transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{sol.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Workflow Section ───────── */
function WorkflowSection() {
  const steps = [
    { num: "01", title: "Create Offer", desc: "Build a competitive offer with pay, location, and assignment details.", icon: Target },
    { num: "02", title: "Boost with Mobility", desc: "Add housing, travel, car rental, and concierge packages to the offer.", icon: Zap },
    { num: "03", title: "Candidate Accepts", desc: "Clinician receives a complete life-decision package, not just a pay rate.", icon: UserCheck },
    { num: "04", title: "Concierge Fulfills", desc: "Dedicated concierge books housing, travel, and handles all logistics.", icon: Headset },
    { num: "05", title: "Assignment Ready", desc: "Clinician arrives prepared, supported, and ready to work on day one.", icon: CheckCircle2 },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#0B3C5D] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63946]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            From Offer to First Day — Seamlessly
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Five simple steps transform how you place clinicians and eliminate the chaos of assignment logistics.
          </p>
        </AnimatedSection>

        <div className="mt-16 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.num} delay={i * 0.1}>
                  <div className="text-center relative">
                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm mb-4 mx-auto">
                      <Icon className="h-6 w-6 text-white" />
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#E63946] flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">{step.num}</span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-white/50 mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── KPI Section ───────── */
function KPISection() {
  const kpis = [
    { value: "3x", label: "Higher Acceptance Rate", desc: "Mobility-boosted offers win more clinicians than pay-only packages", icon: TrendingUp, color: "text-emerald-600" },
    { value: "60%", label: "Fewer Backouts", desc: "Proactive concierge support dramatically reduces placement failures", icon: TrendingDown, color: "text-blue-600" },
    { value: "48hr", label: "Faster Time-to-Ready", desc: "From acceptance to assignment-ready in under two days", icon: Clock, color: "text-purple-600" },
    { value: "92%", label: "First Day Show Rate", desc: "Clinicians arrive on day one, prepared and ready to work", icon: Users, color: "text-[#E63946]" },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">
            Results
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight">
            Measurable Impact
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Our customers see transformative results within the first 90 days of deployment.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <AnimatedSection key={kpi.label} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-gray-200/80 bg-white p-8 text-center hover:shadow-lg hover:border-[#0B3C5D]/20 transition-all group">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-[#0B3C5D]/5 transition-colors mb-4">
                    <Icon className={cn("h-6 w-6", kpi.color)} />
                  </div>
                  <p className={cn("text-4xl lg:text-5xl font-bold", kpi.color)}>{kpi.value}</p>
                  <p className="text-base font-semibold text-[#1F2937] mt-2">{kpi.label}</p>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{kpi.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── AI Section ───────── */
function AISection() {
  const aiFeatures = [
    {
      icon: Zap,
      title: "Offer Boost AI",
      desc: "Analyzes market data, clinician preferences, and historical patterns to recommend the optimal mobility package for every offer. Maximize acceptance without increasing pay rates.",
    },
    {
      icon: Eye,
      title: "Retention Risk AI",
      desc: "Continuously monitors behavioral signals, communication patterns, and assignment factors to predict backout risk before it happens. Intervene early, retain more clinicians.",
    },
    {
      icon: Activity,
      title: "Readiness AI",
      desc: "Tracks every milestone from acceptance to first day. Automatically identifies bottlenecks in housing, credentialing, travel, and logistics. Ensures on-time arrival.",
    },
    {
      icon: Headset,
      title: "Concierge AI",
      desc: "Powers intelligent routing of concierge tasks, automates routine logistics, and ensures every clinician receives timely, personalized support throughout their assignment.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0B3C5D]/10 bg-[#0B3C5D]/5 px-4 py-1.5 mb-6">
            <BrainCircuit className="h-3.5 w-3.5 text-[#0B3C5D]" />
            <span className="text-xs font-semibold text-[#0B3C5D]">Powered by AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight">
            AI-Powered Workforce Intelligence
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Four AI engines work together to optimize every aspect of clinician placement and mobility.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {aiFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <div className="group rounded-2xl border border-gray-200/80 bg-white p-8 hover:shadow-xl hover:border-[#0B3C5D]/20 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 text-white shadow-md">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#0B3C5D] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Trust Section ───────── */
function TrustSection() {
  const badges = [
    { icon: ShieldCheck, title: "SOC 2 Aligned", desc: "Enterprise-grade security controls and audit trails" },
    { icon: Lock, title: "HIPAA-Aware", desc: "Built with healthcare data privacy requirements in mind" },
    { icon: KeyRound, title: "Enterprise SSO Ready", desc: "SAML 2.0 and OIDC single sign-on support" },
    { icon: Server, title: "99.9% Uptime", desc: "Highly available infrastructure with redundant systems" },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">
            Trust & Security
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Your data is protected by industry-leading security practices and compliance frameworks.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <AnimatedSection key={badge.title} delay={i * 0.1}>
                <div className="text-center rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-md transition-shadow">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/5 mb-3">
                    <Icon className="h-6 w-6 text-[#0B3C5D]" />
                  </div>
                  <h3 className="text-base font-bold text-[#1F2937]">{badge.title}</h3>
                  <p className="text-sm text-gray-500 mt-1.5">{badge.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Final CTA Section ───────── */
function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D] to-[#0a3350] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E63946]/10 rounded-full blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Ready to Transform Your Staffing Operations?
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
            Join the healthcare staffing companies that are winning more clinicians, reducing backouts, and improving assignment readiness with TRITAL Orbit.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8 text-sm font-semibold"
              >
                Schedule a Demo
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-sm font-semibold"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ───────── Page ───────── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainSection />
      <SolutionSection />
      <WorkflowSection />
      <KPISection />
      <AISection />
      <TrustSection />
      <CTASection />
    </>
  );
}
