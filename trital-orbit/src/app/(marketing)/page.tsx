"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Zap, Home, Car, Plane, Users,
  TrendingUp, Shield, Brain, BarChart3, Building2, Star,
  ChevronRight, Play, Award, Activity, Clock, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "43%", label: "Increase in Offer Acceptance", icon: TrendingUp },
  { value: "67%", label: "Reduction in Backout Rate", icon: Target },
  { value: "2.4x", label: "Faster Assignment Readiness", icon: Clock },
  { value: "89%", label: "Clinician Satisfaction Score", icon: Star },
];

const painPoints = [
  {
    pain: "Clinicians decline offers due to housing uncertainty",
    solution: "Embedded verified housing options tied to every assignment city",
    icon: Home,
  },
  {
    pain: "Travel logistics cause last-minute backouts",
    solution: "Flight, car rental, and relocation support built into the offer",
    icon: Plane,
  },
  {
    pain: "Recruiters can't predict who will back out",
    solution: "AI Retention Risk Engine scores every candidate 0–100",
    icon: Brain,
  },
  {
    pain: "Offers look the same across every agency",
    solution: "Offer Boost Builder creates differentiated, value-rich offers in seconds",
    icon: Zap,
  },
];

const features = [
  {
    icon: Zap,
    title: "Offer Boost Builder",
    description: "AI-enhanced offers with value statements, SMS pitches, email scripts, and recruiter talking points. Generated in under 30 seconds.",
    color: "bg-blue-50 text-orbit-blue",
    href: "/features/offer-boost-builder",
  },
  {
    icon: Brain,
    title: "Retention Risk AI",
    description: "Predict backouts before they happen. Our AI analyzes 12+ behavioral signals to score candidate risk from 0–100 with specific action recommendations.",
    color: "bg-red-50 text-orbit-red",
    href: "/features/retention-risk-ai",
  },
  {
    icon: Activity,
    title: "Assignment Launch Dashboard",
    description: "Track every candidate from offer acceptance to day one. Housing, travel, documents, and readiness status in a single command center.",
    color: "bg-emerald-50 text-emerald-600",
    href: "/features/assignment-launch-dashboard",
  },
  {
    icon: Home,
    title: "Mobility Concierge",
    description: "Housing, flights, car rentals, and relocation support embedded directly into every assignment offer. Managed by your concierge team.",
    color: "bg-purple-50 text-purple-600",
    href: "/features/mobility-concierge",
  },
];

const audiences = [
  {
    role: "Staffing Agencies",
    title: "Win More Clinicians Without Increasing Pay Rates",
    points: [
      "Differentiate every offer with mobility perks",
      "Reduce backout rate by up to 67%",
      "Track assignment readiness from offer to day 1",
      "AI-generated recruiter talking points and SMS pitches",
    ],
    cta: "Explore Agency Solution",
    href: "/solutions/agencies",
    icon: Building2,
    color: "from-orbit-blue to-orbit-blue-light",
  },
  {
    role: "MSPs & Staffing Partners",
    title: "Prove Your Suppliers Deliver—With Data",
    points: [
      "Real-time supplier performance dashboards",
      "Acceptance rate, backout rate, time-to-ready metrics",
      "AI-generated executive summaries",
      "Exportable PDF and CSV reports for stakeholders",
    ],
    cta: "Explore MSP Solution",
    href: "/solutions/msps",
    icon: BarChart3,
    color: "from-slate-700 to-slate-800",
  },
  {
    role: "Clinicians & Travelers",
    title: "Every Assignment Becomes a Better Life Decision",
    points: [
      "Personalized mobile offer hub with all perks visible",
      "Verified housing options near your facility",
      "Flight, car rental, and move support in one place",
      "Concierge support from offer acceptance to day 1",
    ],
    cta: "Explore Clinician Solution",
    href: "/solutions/clinicians",
    icon: Users,
    color: "from-orbit-red to-red-700",
  },
];

const testimonials = [
  {
    quote: "TRITAL Orbit changed how we think about offers. We're not just competing on pay anymore — we're competing on the entire assignment experience. Our acceptance rate went from 52% to 78% in 90 days.",
    author: "Sarah Mitchell",
    title: "VP of Talent Acquisition",
    company: "PrimeStaff Healthcare",
    avatar: "SM",
  },
  {
    quote: "The Retention Risk AI is incredible. It flagged three backouts before they happened last quarter. That's revenue we kept. Our recruiters now have a daily action list instead of firefighting.",
    author: "James Okafor",
    title: "Director of Operations",
    company: "MedForce Staffing",
    avatar: "JO",
  },
  {
    quote: "Our clinicians love the offer portal. They can see housing options, flight support, and car rental — all tied to their specific assignment. We've had zero housing-related backouts since going live.",
    author: "Dr. Priya Nair",
    title: "Chief Nursing Officer",
    company: "HealthBridge MSP",
    avatar: "PN",
  },
];

const pricingHighlights = [
  {
    tier: "Starter",
    price: "$299",
    period: "/mo",
    description: "Perfect for emerging agencies",
    features: ["Up to 3 recruiters", "50 offers/month", "Offer Boost Builder", "Basic analytics"],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    tier: "Growth",
    price: "$799",
    period: "/mo",
    description: "For agencies scaling fast",
    features: ["Up to 15 recruiters", "500 offers/month", "Full AI suite", "Concierge module", "MSP reporting"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large agencies & MSPs",
    features: ["Unlimited recruiters", "Unlimited offers", "Dedicated concierge", "Custom integrations", "SLA guarantee"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-orbit-red/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-orbit-blue-lighter/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orbit-blue-light/5 rounded-full blur-3xl" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-white/10 text-white border border-white/20 backdrop-blur-sm px-4 py-1.5 text-sm">
                <Zap className="h-3.5 w-3.5 mr-1.5 text-orbit-red" />
                Healthcare Workforce Mobility Infrastructure
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Win More Clinicians.{" "}
              <span className="text-orbit-red">Reduce Backouts.</span>{" "}
              Improve Assignment Readiness.
            </motion.h1>

            <motion.p
              className="text-xl text-white/75 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              TRITAL Orbit™ embeds housing, travel, relocation, concierge support, and AI-powered offer optimization directly into the staffing workflow — turning every assignment into a better life decision, not just a better weekly number.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/demo">
                <Button size="xl" className="bg-orbit-red hover:bg-red-700 text-white shadow-orbit-xl group">
                  Book a Demo
                  <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/platform">
                <Button
                  size="xl"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm group"
                >
                  <Play className="h-4 w-4 mr-2" />
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.p
              className="mt-6 text-sm text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              No credit card required · 14-day free trial · Setup in under 30 minutes
            </motion.p>
          </div>

          {/* Stats bar */}
          <motion.div
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center bg-white/8 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <stat.icon className="h-6 w-6 text-orbit-red mx-auto mb-3" />
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PAIN / SOLUTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-red-50 text-orbit-red border-red-100">The Problem We Solve</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-orbit-dark mb-4">
              Why Clinicians Back Out — And How We Stop It
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Every backout costs your agency $3,000–$15,000 in lost revenue. Here's what's actually causing them — and our solutions.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((item, i) => (
              <AnimatedSection key={i}>
                <Card className="p-6 hover:shadow-orbit-lg transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-orbit-red" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-orbit-red uppercase tracking-wider">The Pain</span>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{item.pain}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Our Solution</span>
                        </div>
                        <p className="text-orbit-dark font-medium text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-orbit-blue border-blue-100">Core Platform Modules</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-orbit-dark mb-4">
              Everything Your Team Needs in One Platform
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Four integrated modules that work together to eliminate backouts and improve assignment readiness at scale.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <AnimatedSection key={i}>
                <Link href={feature.href}>
                  <Card className="p-8 hover:shadow-orbit-xl transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-0">
                      <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-5`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-orbit-dark mb-3 group-hover:text-orbit-blue transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex items-center text-orbit-blue font-medium text-sm group-hover:gap-2 gap-1 transition-all">
                        Learn more <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE SECTIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-slate-100 text-slate-600 border-slate-200">Built for Every Stakeholder</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-orbit-dark mb-4">
              One Platform. Multiple Wins.
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Whether you're an agency owner, MSP program manager, or travel clinician, TRITAL Orbit™ is built for you.
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {audiences.map((audience, i) => (
              <AnimatedSection key={i}>
                <div className={`rounded-3xl bg-gradient-to-br ${audience.color} p-10 text-white overflow-hidden relative`}>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <audience.icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge className="bg-white/15 text-white border-0">{audience.role}</Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-6 max-w-2xl">{audience.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {audience.points.map((point, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-white/80 flex-shrink-0" />
                          <span className="text-white/90 text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={audience.href}>
                      <Button className="bg-white text-orbit-dark hover:bg-white/90 shadow-lg">
                        {audience.cta}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* AI AUTOMATION */}
      <section className="py-24 bg-orbit-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <Badge className="mb-6 bg-white/15 text-white border-white/20">Powered by AI</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                5 AI Agents Working 24/7 So Your Recruiters Don't Have To
              </h2>
              <p className="text-white/75 text-lg mb-8 leading-relaxed">
                TRITAL Orbit™ includes five purpose-built AI agents that analyze behavior, generate content, predict risk, and automate workflows — all running in the background.
              </p>
              <div className="space-y-4">
                {[
                  { name: "Offer Boost AI", desc: "Generates enhanced offer copy, SMS pitches, and close strategies" },
                  { name: "Retention Risk AI", desc: "Scores candidate backout risk and suggests recruiter actions" },
                  { name: "Assignment Readiness AI", desc: "Tracks housing, travel, documents, and start-date readiness" },
                  { name: "Concierge AI", desc: "Drafts candidate updates and recommends vendor options" },
                  { name: "MSP Reporting AI", desc: "Generates executive-level performance summaries" },
                ].map((agent, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">{agent.name}</span>
                      <span className="text-white/60 text-sm"> — {agent.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-white/60">Retention Risk Engine</span>
                  <Badge className="bg-red-500/20 text-red-300 border-red-400/20">Live</Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Maria Santos, RN", risk: 87, level: "Critical", action: "Call now — 4 days to start, no housing confirmed" },
                    { name: "David Chen, PT", risk: 62, level: "High", action: "Send housing options — viewed offer 3x, no request" },
                    { name: "Lisa Park, CRNA", risk: 23, level: "Low", action: "Housing confirmed, travel booked — on track" },
                  ].map((candidate, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm">{candidate.name}</span>
                        <Badge className={cn(
                          "text-xs font-bold",
                          candidate.level === "Critical" ? "bg-red-500/20 text-red-300 border-red-400/20" :
                          candidate.level === "High" ? "bg-orange-500/20 text-orange-300 border-orange-400/20" :
                          "bg-emerald-500/20 text-emerald-300 border-emerald-400/20"
                        )}>
                          {candidate.level} — {candidate.risk}/100
                        </Badge>
                      </div>
                      <p className="text-xs text-white/60">{candidate.action}</p>
                      <div className="mt-2 bg-white/10 rounded-full h-1.5">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            candidate.risk > 75 ? "bg-red-400" :
                            candidate.risk > 50 ? "bg-orange-400" : "bg-emerald-400"
                          )}
                          style={{ width: `${candidate.risk}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-100">
              <Award className="h-3.5 w-3.5 mr-1.5" />
              Trusted by Healthcare Staffing Leaders
            </Badge>
            <h2 className="text-4xl font-bold text-orbit-dark mb-4">
              The Results Speak for Themselves
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i}>
                <Card className="p-8 hover:shadow-orbit-lg transition-all h-full">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[1,2,3,4,5].map(j => (
                        <Star key={j} className="h-4 w-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orbit-blue flex items-center justify-center text-white text-sm font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-orbit-dark text-sm">{t.author}</div>
                        <div className="text-xs text-slate-500">{t.title}, {t.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY / TRUST */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-orbit-dark mb-3">
              Built with Enterprise-Grade Security
            </h2>
            <p className="text-slate-500">Healthcare data requires the highest standard of security and compliance.</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "SOC 2 Type II", desc: "Certified security practices" },
              { icon: Shield, label: "HIPAA Ready", desc: "Healthcare data compliance" },
              { icon: Shield, label: "256-bit AES", desc: "End-to-end encryption" },
              { icon: Shield, label: "99.9% Uptime", desc: "SLA-backed reliability" },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-orbit-blue hover:text-white transition-all group">
                  <item.icon className="h-8 w-8 text-orbit-blue group-hover:text-white mx-auto mb-3 transition-colors" />
                  <div className="font-bold text-orbit-dark group-hover:text-white text-sm mb-1 transition-colors">{item.label}</div>
                  <div className="text-xs text-slate-500 group-hover:text-white/75 transition-colors">{item.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-orbit-blue border-blue-100">Transparent Pricing</Badge>
            <h2 className="text-4xl font-bold text-orbit-dark mb-4">
              Simple Pricing That Scales With You
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Start with a free trial. No credit card required. Every plan includes full access to core features.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingHighlights.map((plan, i) => (
              <AnimatedSection key={i}>
                <Card className={`p-8 h-full ${plan.highlighted ? "ring-2 ring-orbit-blue shadow-orbit-xl relative" : ""}`}>
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-orbit-blue text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{plan.tier}</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-orbit-dark">{plan.price}</span>
                        {plan.period && <span className="text-slate-500">{plan.period}</span>}
                      </div>
                      <p className="text-slate-500 text-sm mt-1">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-slate-600">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={plan.cta === "Contact Sales" ? "/contact" : "/demo"} className="block">
                      <Button
                        className={`w-full ${plan.highlighted ? "bg-orbit-blue hover:bg-orbit-blue-light text-white" : ""}`}
                        variant={plan.highlighted ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-8">
            <Link href="/pricing">
              <Button variant="ghost" className="text-orbit-blue">
                See full pricing and feature comparison <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-orbit-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Badge className="mb-6 bg-white/10 text-white border-white/20">Get Started Today</Badge>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Ready to Win More Clinicians?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Join hundreds of healthcare staffing agencies using TRITAL Orbit™ to increase offer acceptance, reduce backouts, and improve assignment readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="xl" className="bg-orbit-red hover:bg-red-700 text-white shadow-orbit-xl">
                  Book a Demo
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
