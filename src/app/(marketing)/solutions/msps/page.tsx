"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Network,
  BarChart3,
  ShieldCheck,
  Users,
  TrendingUp,
  FileText,
  Layers,
  Eye,
  CheckCircle2,
  PieChart,
  AlertTriangle,
  Gauge,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

export default function MSPsPage() {
  const challenges = [
    { icon: AlertTriangle, title: "Inconsistent Supplier Performance", desc: "No standardized way to measure and compare supplier performance on mobility, readiness, and clinician satisfaction across your network." },
    { icon: Eye, title: "Limited Visibility", desc: "No real-time view into assignment readiness, clinician satisfaction, or backout risk across your supplier ecosystem." },
    { icon: ShieldCheck, title: "Compliance Complexity", desc: "Managing compliance across dozens of suppliers with varying processes, credentialing standards, and documentation practices." },
    { icon: BarChart3, title: "Reporting Gaps", desc: "Unable to provide clients with comprehensive analytics on fill rates, backout trends, and supplier performance metrics." },
  ];

  const features = [
    { icon: Network, title: "Supplier Performance Dashboard", desc: "Unified view of acceptance rates, backout rates, time-to-ready, and clinician satisfaction scores across every supplier in your network." },
    { icon: ShieldCheck, title: "Compliance Reporting", desc: "Automated compliance tracking and reporting for credentialing, licensing, and mobility standards across all suppliers." },
    { icon: BarChart3, title: "Advanced Analytics", desc: "Deep analytics on fill rates, backout trends, cost-per-placement, and mobility utilization. Export-ready reports for client presentations." },
    { icon: Layers, title: "Standardized Mobility", desc: "Enforce consistent mobility standards across your supplier network. Every clinician receives the same quality of housing, travel, and concierge support." },
    { icon: Gauge, title: "Readiness Scoring", desc: "Real-time readiness scores for every assignment. Identify at-risk placements before they become backouts." },
    { icon: Building2, title: "Client Reporting", desc: "White-labeled analytics and reporting dashboards for your healthcare facility clients. Demonstrate value with data." },
  ];

  const benefits = [
    { value: "40%", label: "Improved Fill Rates", desc: "Mobility-enhanced offers from your supplier network fill faster" },
    { value: "85%", label: "Supplier Adoption", desc: "Average supplier adoption rate within first 60 days" },
    { value: "3.2x", label: "Client Satisfaction", desc: "Improvement in client satisfaction scores with standardized mobility" },
    { value: "100%", label: "Compliance Visibility", desc: "Complete visibility into supplier compliance across your network" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#0B3C5D]/5 via-purple-500/3 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 mb-6">
                <Network className="h-3.5 w-3.5 text-purple-600" />
                <span className="text-xs font-semibold text-purple-700">For Managed Service Providers</span>
              </div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2937] leading-[1.1]">
              Standardize mobility across your <span className="text-[#0B3C5D]">supplier network</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
              TRITAL Orbit gives MSPs the visibility, analytics, and standardization tools to drive consistent clinician mobility outcomes across every supplier in their network.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
              <Link href="/demo">
                <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/20 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </Link>
              <Link href="/platform">
                <Button variant="outline" size="lg" className="h-12 px-8">Platform Overview</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">The Challenge</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">MSP Pain Points</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Managing workforce mobility across a diverse supplier network creates unique challenges that traditional tools cannot solve.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {challenges.map((c, i) => {
              const Icon = c.icon;
              return (
                <AnimatedSection key={c.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                        <Icon className="h-6 w-6 text-[#E63946]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F2937]">{c.title}</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">MSP Solutions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Built for Network-Level Management</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <AnimatedSection key={feat.title} delay={i * 0.08}>
                  <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-lg hover:border-[#0B3C5D]/20 transition-all h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/5 group-hover:bg-[#0B3C5D]/10 transition-colors mb-4">
                      <Icon className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#0B3C5D] transition-colors">{feat.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{feat.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32 bg-[#0B3C5D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Measurable Network Impact</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.label} delay={i * 0.1}>
                <div className="text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                  <p className="text-4xl lg:text-5xl font-bold text-white">{b.value}</p>
                  <p className="text-base font-semibold text-white/90 mt-2">{b.label}</p>
                  <p className="text-sm text-white/50 mt-2">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0B3C5D] to-[#0a3350]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Transform Your Supplier Network</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">See how TRITAL Orbit helps MSPs standardize mobility, improve fill rates, and deliver better outcomes for healthcare facility clients.</p>
            <div className="mt-10">
              <Link href="/demo">
                <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8">Schedule a Demo <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
