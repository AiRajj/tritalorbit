"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Zap,
  ShieldCheck,
  BarChart3,
  Headset,
  BrainCircuit,
  CheckCircle2,
  Star,
  Clock,
  Target,
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

export default function AgenciesPage() {
  const painPoints = [
    { icon: DollarSign, title: "Competing on Pay Alone", desc: "When pay rate is your only lever, margins shrink and clinician loyalty disappears. You need a differentiated offer." },
    { icon: TrendingDown, title: "High Backout Rates", desc: "Up to 40% of accepted offers fall through. Each backout costs $8,000+ in sourcing, credentialing, and lost revenue." },
    { icon: Clock, title: "Slow Time-to-Fill", desc: "Manual logistics coordination delays assignments. Clinicians lose confidence when housing and travel are uncertain." },
    { icon: Users, title: "Clinician Churn", desc: "Without mobility support, clinicians choose competitors or exit travel nursing entirely. Retention is an afterthought." },
  ];

  const features = [
    { icon: Zap, title: "Offer Boost Builder", desc: "Differentiate every offer with curated housing, travel, and car rental packages. Win clinicians without raising pay rates." },
    { icon: BrainCircuit, title: "Retention Risk AI", desc: "Predictive models identify at-risk clinicians before they back out. Automated workflows trigger concierge intervention." },
    { icon: Headset, title: "Dedicated Concierge", desc: "Every clinician gets white-glove support from offer acceptance to first day. Housing, travel, and local orientation handled." },
    { icon: BarChart3, title: "Performance Analytics", desc: "Track acceptance rates, backout trends, time-to-ready, and ROI per offer. Data-driven decisions improve every placement." },
    { icon: ShieldCheck, title: "Compliance Tracking", desc: "Automated credential and license monitoring. Assignment readiness checklists ensure nothing falls through the cracks." },
    { icon: Target, title: "Competitive Intelligence", desc: "Market-level data on mobility offerings helps you position offers competitively across every geography and specialty." },
  ];

  const metrics = [
    { value: "3x", label: "Higher Offer Acceptance", color: "text-emerald-600" },
    { value: "60%", label: "Fewer Backouts", color: "text-blue-600" },
    { value: "$2.4M", label: "Annual Savings (avg)", color: "text-purple-600" },
    { value: "48hr", label: "Avg Time-to-Ready", color: "text-[#E63946]" },
  ];

  const testimonials = [
    { quote: "TRITAL Orbit transformed our placement process. We went from a 35% backout rate to under 12% in just three months. The mobility packages make our offers impossible to refuse.", author: "VP of Recruitment", company: "National Healthcare Staffing Agency", rating: 5 },
    { quote: "The ROI was immediate. We saved over $1.8M in backout costs in the first quarter alone. Our clinicians are happier, our clients are happier, and our recruiters finally have a competitive edge.", author: "Chief Operating Officer", company: "Regional Travel Nursing Agency", rating: 5 },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#0B3C5D]/5 via-[#E63946]/3 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0B3C5D]/10 bg-[#0B3C5D]/5 px-4 py-1.5 mb-6">
                <Building2 className="h-3.5 w-3.5 text-[#0B3C5D]" />
                <span className="text-xs font-semibold text-[#0B3C5D]">For Staffing Agencies</span>
              </div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2937] leading-[1.1]">
              Win clinicians without raising <span className="text-[#E63946]">pay rates</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
              TRITAL Orbit gives staffing agencies a competitive advantage beyond compensation. Turn every offer into a complete life-decision package with housing, travel, and concierge support.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
              <Link href="/demo">
                <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/20 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="h-12 px-8">View Pricing</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">The Challenge</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Why Agencies Are Losing Clinicians</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {painPoints.map((pain, i) => {
              const Icon = pain.icon;
              return (
                <AnimatedSection key={pain.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                        <Icon className="h-6 w-6 text-[#E63946]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F2937]">{pain.title}</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{pain.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">The Solution</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Everything Agencies Need to Win</h2>
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

      {/* ROI Metrics */}
      <section className="py-20 lg:py-32 bg-[#0B3C5D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">ROI</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Results That Speak for Themselves</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <AnimatedSection key={m.label} delay={i * 0.1}>
                <div className="text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                  <p className={cn("text-4xl lg:text-5xl font-bold", m.color)}>{m.value}</p>
                  <p className="text-base font-semibold text-white mt-2">{m.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">What Agency Leaders Say</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-gray-200/80 bg-white p-8 hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-[#1F2937]">{t.author}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.company}</p>
                  </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Ready to Win More Clinicians?</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">See how TRITAL Orbit helps agencies increase acceptance rates by 3x and reduce backouts by 60%.</p>
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
