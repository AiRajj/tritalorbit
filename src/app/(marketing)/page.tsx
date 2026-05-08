"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  TrendingDown,
  Users,
  Eye,
  Sparkles,
  Zap,
  Shield,
  Brain,
  HeartHandshake,
  BarChart3,
  CheckCircle2,
  Lock,
  FileCheck,
  KeyRound,
  ShieldCheck,
  Globe,
  Clock,
  DollarSign,
  Star,
  Building2,
  Laptop,
  Smartphone,
  ChevronRight,
  Target,
  Activity,
  Headphones,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Animation Primitives ─────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Hero Section ─────────────────────────────────────────── */

function HeroSection() {
  const stats = [
    { value: "43%", label: "Fewer Backouts" },
    { value: "2.1x", label: "Faster Time-to-Ready" },
    { value: "89%", label: "Offer Acceptance Rate" },
    { value: "$4,200", label: "Avg Savings Per Assignment" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D]/95 to-[#1F2937]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,57,70,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(11,60,93,0.3),transparent_50%)]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white/80 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
                Healthcare Workforce Mobility Infrastructure
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Win More Clinicians.{" "}
              <span className="text-[#E63946]">Reduce Backouts.</span>{" "}
              Improve Assignment Readiness.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl"
            >
              TRITAL Orbit™ is Healthcare Workforce Mobility Infrastructure —
              embedding housing, travel, and AI-powered offer optimization
              directly into your staffing workflow.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                asChild
                className="rounded-full bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/25 px-8"
              >
                <Link href="/demo">
                  Book a Demo <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white px-8"
              >
                <Link href="/platform">See the Platform</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.12] transition-colors"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-2 gap-3 mt-12 lg:hidden"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Pain / Solution Section ──────────────────────────────── */

function PainSolutionSection() {
  const pains = [
    {
      icon: TrendingDown,
      text: "Clinicians back out because assignments feel like a leap of faith",
    },
    {
      icon: DollarSign,
      text: "Recruiters compete on pay alone — eroding margins",
    },
    {
      icon: Eye,
      text: "MSPs lack visibility into supplier workforce readiness",
    },
  ];

  return (
    <AnimatedSection className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E63946]/10 text-xs font-semibold text-[#E63946] mb-4">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight">
            Healthcare Staffing Has a{" "}
            <span className="text-[#E63946]">$14B Retention Problem</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#E63946]/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 flex items-center justify-center mb-5 group-hover:bg-[#E63946]/20 transition-colors">
                <pain.icon className="w-6 h-6 text-[#E63946]" />
              </div>
              <p className="text-[#1F2937] font-medium leading-relaxed">
                {pain.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0B3C5D]/5 border border-[#0B3C5D]/10">
            <ArrowRight className="w-5 h-5 text-[#0B3C5D]" />
            <span className="text-[#0B3C5D] font-semibold">
              TRITAL Orbit™ transforms every assignment into a supported life
              decision
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Workflow Section ─────────────────────────────────────── */

function WorkflowSection() {
  const steps = [
    {
      step: "01",
      title: "Build Enhanced Offers",
      description:
        "Offer Boost Builder adds housing, travel, and relocation to every offer",
      icon: Sparkles,
    },
    {
      step: "02",
      title: "Send & Track",
      description:
        "Real-time candidate engagement tracking and AI risk scoring",
      icon: BarChart3,
    },
    {
      step: "03",
      title: "Fulfill Mobility",
      description:
        "Concierge team books housing, flights, and transportation",
      icon: HeartHandshake,
    },
    {
      step: "04",
      title: "Launch Assignments",
      description:
        "Track readiness from acceptance to first day",
      icon: Zap,
    },
  ];

  return (
    <AnimatedSection className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B3C5D]/10 text-xs font-semibold text-[#0B3C5D] mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight">
            How TRITAL Orbit™ Works
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#0B3C5D]/20 via-[#0B3C5D]/40 to-[#0B3C5D]/20" />

          {steps.map((step) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              className="relative bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 hover:border-[#0B3C5D]/20 hover:shadow-lg transition-all group text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#0B3C5D] flex items-center justify-center mx-auto mb-5 relative z-10 group-hover:scale-110 transition-transform shadow-lg shadow-[#0B3C5D]/25">
                <step.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs font-bold text-[#0B3C5D]/40 tracking-widest mb-2">
                STEP {step.step}
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── KPI Cards Section ────────────────────────────────────── */

function KPISection() {
  const kpis = [
    {
      icon: TrendingDown,
      value: "43%",
      label: "Backout Reduction",
      color: "text-[#E63946]",
      bg: "bg-[#E63946]/10",
    },
    {
      icon: CheckCircle2,
      value: "89%",
      label: "Offer Acceptance Rate",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Clock,
      value: "2.1x",
      label: "Faster Assignment Readiness",
      color: "text-[#0B3C5D]",
      bg: "bg-[#0B3C5D]/10",
    },
    {
      icon: Users,
      value: "6hrs",
      label: "Recruiter Time Saved / Week",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      icon: Star,
      value: "72",
      label: "Candidate NPS Score",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: DollarSign,
      value: "$4,200",
      label: "Cost Savings Per Placement",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <AnimatedSection className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 mb-4">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight">
            Results That Speak
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {kpis.map((kpi) => (
            <motion.div
              key={kpi.label}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div
                className={`w-11 h-11 rounded-xl ${kpi.bg} flex items-center justify-center mb-4`}
              >
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div className="text-4xl font-bold text-[#1F2937] mb-1">
                {kpi.value}
              </div>
              <div className="text-sm text-gray-500">{kpi.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Audience Sections (Agencies, MSPs, Clinicians) ───────── */

function AudienceSection({
  badge,
  title,
  description,
  features,
  ctaLabel,
  ctaHref,
  icon: Icon,
  gradient,
  reverse,
}: {
  badge: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  icon: React.ElementType;
  gradient: string;
  reverse?: boolean;
}) {
  return (
    <AnimatedSection className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reverse ? "direction-rtl" : ""
          }`}
        >
          <motion.div
            variants={fadeUp}
            className={reverse ? "lg:order-2" : ""}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B3C5D]/10 text-xs font-semibold text-[#0B3C5D] mb-4">
              {badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-lg">
              {description}
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0B3C5D] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#1F2937] font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="rounded-full bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 shadow-lg shadow-[#0B3C5D]/25"
            >
              <Link href={ctaHref}>
                {ctaLabel} <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className={reverse ? "lg:order-1" : ""}
          >
            <div
              className={`rounded-3xl ${gradient} p-px`}
            >
              <div className="rounded-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm p-8 lg:p-12 min-h-[320px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#0B3C5D]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-[#0B3C5D]" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">
                    Platform Preview
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── AI Automation Section ────────────────────────────────── */

function AISection() {
  const agents = [
    {
      icon: Target,
      title: "Offer Boost AI",
      description:
        "Automatically enhances offers with personalized housing, travel, and relocation packages based on assignment location and clinician preferences.",
    },
    {
      icon: Activity,
      title: "Retention Risk AI",
      description:
        "Predicts backout probability in real time using engagement signals, assignment complexity, and historical pattern analysis.",
    },
    {
      icon: CheckCircle2,
      title: "Assignment Readiness AI",
      description:
        "Scores and tracks every step from offer acceptance to day-one arrival — surfacing blockers before they delay start dates.",
    },
    {
      icon: Headphones,
      title: "Concierge AI",
      description:
        "Coordinates housing bookings, flight arrangements, and ground transportation with intelligent vendor matching and cost optimization.",
    },
    {
      icon: PieChart,
      title: "MSP Reporting AI",
      description:
        "Aggregates supplier performance, fill rates, and workforce readiness metrics into executive-ready dashboards.",
    },
  ];

  return (
    <AnimatedSection className="py-24 lg:py-32 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-xs font-semibold text-violet-700 mb-4">
            <Brain className="w-3.5 h-3.5" />
            AI-Powered
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight">
            AI That Actually Helps You Win
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Purpose-built AI agents that automate the operational complexity of
            healthcare workforce mobility.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-violet-100 transition-all ${
                i === agents.length - 1 && agents.length % 3 !== 0
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
                <agent.icon className="w-5 h-5 text-violet-600" />
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-2">
                {agent.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {agent.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Security & Trust Section ─────────────────────────────── */

function SecuritySection() {
  const badges = [
    { icon: ShieldCheck, label: "HIPAA-Aware" },
    { icon: FileCheck, label: "SOC 2 Aligned" },
    { icon: Globe, label: "ISO 27001 Controls" },
  ];

  const features = [
    { icon: KeyRound, label: "Role-based access control" },
    { icon: FileCheck, label: "Comprehensive audit logging" },
    { icon: Lock, label: "End-to-end data encryption" },
    { icon: Shield, label: "SSO-ready authentication" },
  ];

  return (
    <AnimatedSection className="py-24 lg:py-32 bg-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white/80 mb-4">
            <Shield className="w-3.5 h-3.5" />
            Enterprise-Grade
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Enterprise-Grade Security & Compliance
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              variants={fadeUp}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.1] transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <badge.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">{badge.label}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              variants={fadeIn}
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/[0.04] border border-white/5"
            >
              <feature.icon className="w-4 h-4 text-white/60 shrink-0" />
              <span className="text-sm text-white/70">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Final CTA Section ────────────────────────────────────── */

function CTASection() {
  return (
    <AnimatedSection className="py-24 lg:py-32 bg-gradient-to-br from-[#0B3C5D] to-[#1F2937] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,57,70,0.06),transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={fadeUp}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Ready to Transform Your Staffing Workflow?
          </h2>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto"
        >
          Book a demo and see how TRITAL Orbit™ can reduce backouts, improve
          readiness, and help you win more clinicians.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"
            asChild
            className="rounded-full bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/25 px-8"
          >
            <Link href="/demo">
              Book Demo <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white px-8"
          >
            <Link href="#contact">Contact Sales</Link>
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Page Composition ─────────────────────────────────────── */

export default function MarketingHomePage() {
  return (
    <>
      <HeroSection />
      <PainSolutionSection />
      <WorkflowSection />
      <KPISection />

      {/* For Agencies */}
      <AudienceSection
        badge="For Agencies"
        title="Built for Healthcare Staffing Agencies"
        description="Differentiate your agency with mobility-enhanced offers that increase acceptance rates, reduce backouts, and improve clinician satisfaction — without adding operational overhead."
        features={[
          "Embed housing, travel, and relocation into every offer",
          "AI-powered backout risk scoring on every candidate",
          "Assignment readiness tracking from acceptance to day one",
          "White-glove concierge fulfillment — handled for you",
          "Measurable improvements in fill rates and margins",
        ]}
        ctaLabel="See Agency Solution"
        ctaHref="/solutions/agencies"
        icon={Building2}
        gradient="bg-gradient-to-br from-[#0B3C5D]/20 to-[#0B3C5D]/5"
      />

      {/* For MSPs */}
      <div className="bg-[#F8FAFC]">
        <AudienceSection
          badge="For MSPs"
          title="Visibility & Control for Managed Service Programs"
          description="Get real-time visibility into supplier workforce readiness, standardize assignment mobility across your supplier network, and drive measurable performance improvements."
          features={[
            "Unified readiness dashboard across all suppliers",
            "Standardized mobility packages for consistent experiences",
            "Supplier scorecard with fill rate and backout analytics",
            "AI-driven workforce forecasting and risk alerts",
            "Enterprise reporting and compliance tracking",
          ]}
          ctaLabel="See MSP Solution"
          ctaHref="/solutions/msps"
          icon={Laptop}
          gradient="bg-gradient-to-br from-violet-200/40 to-violet-100/20"
          reverse
        />
      </div>

      {/* For Clinicians */}
      <AudienceSection
        badge="For Clinicians"
        title="A Better Assignment Experience, Mobile-First"
        description="Give clinicians the support they actually need — vetted housing, booked travel, local insights, and a concierge team that handles the logistics so they can focus on patient care."
        features={[
          "Mobile-first experience — manage everything from your phone",
          "Vetted housing options matched to assignment location",
          "Flight and ground transport booked automatically",
          "Local area guides and onboarding checklists",
          "Direct line to your dedicated mobility concierge",
        ]}
        ctaLabel="See Clinician Experience"
        ctaHref="/solutions/clinicians"
        icon={Smartphone}
        gradient="bg-gradient-to-br from-emerald-200/40 to-emerald-100/20"
      />

      <AISection />
      <SecuritySection />
      <CTASection />
    </>
  );
}
