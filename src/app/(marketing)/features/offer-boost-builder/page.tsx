"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Zap,
  Home,
  Plane,
  Car,
  Headset,
  TrendingUp,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Layers,
  DollarSign,
  Target,
  Sliders,
  Eye,
  Package,
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

export default function OfferBoostBuilderPage() {
  const capabilities = [
    { icon: Home, title: "Housing Packages", desc: "Add furnished housing options with quality tiers, pet-friendly filters, and proximity scoring to the facility." },
    { icon: Plane, title: "Travel Bundles", desc: "Include round-trip flights, ground transport, and luggage allowances. Pre-negotiated corporate rates keep costs predictable." },
    { icon: Car, title: "Vehicle Add-ons", desc: "Car rental packages with pre-selected vehicles, insurance, and GPS. Ready at the airport or housing location." },
    { icon: Headset, title: "Concierge Services", desc: "White-glove concierge tiers from basic support to premium 24/7 assistance with local orientation and ongoing help." },
    { icon: Sparkles, title: "AI Recommendations", desc: "Machine learning analyzes clinician preferences, market data, and historical outcomes to suggest the optimal boost package." },
    { icon: Sliders, title: "Budget Controls", desc: "Set per-offer or aggregate budgets for mobility packages. Real-time cost tracking ensures you stay within margins." },
  ];

  const benefits = [
    { value: "3x", label: "Higher Acceptance", desc: "Boosted offers see 3x the acceptance rate of pay-only packages" },
    { value: "67%", label: "Cost Efficiency", desc: "Mobility packages cost 67% less than equivalent pay rate increases" },
    { value: "< 5min", label: "Build Time", desc: "Create a fully boosted offer in under 5 minutes with AI assistance" },
    { value: "94%", label: "Clinician Satisfaction", desc: "Clinicians rate boosted offers as significantly more attractive" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-rose-500/5 via-[#0B3C5D]/5 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 mb-6">
                  <Zap className="h-3.5 w-3.5 text-rose-600" />
                  <span className="text-xs font-semibold text-rose-700">Offer Boost Builder</span>
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F2937] leading-[1.1]">
                Make every offer <span className="text-[#E63946]">impossible to refuse</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 leading-relaxed">
                Transform standard pay-rate offers into comprehensive life-decision packages. Add housing, travel, vehicle, and concierge services that differentiate your agency and win clinicians.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
                <Link href="/demo"><Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/20 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
              </motion.div>
            </div>
            {/* Offer Builder Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-[#1F2937]">Offer Boost Builder</span>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">AI Optimized</span>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-[#1F2937]">Housing Package</span>
                      </div>
                      <span className="text-xs font-bold text-blue-600">Premium</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Furnished 1BR, pet-friendly, 2mi from facility</p>
                    <div className="mt-2 h-2 bg-blue-100 rounded-full"><div className="h-full w-4/5 bg-blue-500 rounded-full" /></div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm font-medium text-[#1F2937]">Travel Bundle</span>
                      </div>
                      <span className="text-xs font-bold text-indigo-600">Included</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Round-trip flight + ground transport</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-violet-600" />
                        <span className="text-sm font-medium text-[#1F2937]">Vehicle</span>
                      </div>
                      <span className="text-xs font-bold text-violet-600">Added</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Mid-size SUV, full coverage</p>
                  </div>
                  <div className="rounded-xl bg-[#0B3C5D]/5 p-4 border border-[#0B3C5D]/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0B3C5D]">Boost Score</span>
                      <span className="text-lg font-bold text-[#0B3C5D]">92/100</span>
                    </div>
                    <p className="text-xs text-[#0B3C5D]/60 mt-1">Estimated 3.2x higher acceptance probability</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">What You Can Build</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Every component of the mobility package is configurable, optimizable, and trackable.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <AnimatedSection key={cap.title} delay={i * 0.08}>
                  <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-lg hover:border-[#0B3C5D]/20 transition-all h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/5 group-hover:bg-[#0B3C5D]/10 transition-colors mb-4">
                      <Icon className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937]">{cap.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{cap.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Measurable Results</h2>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Start Building Better Offers</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">See how the Offer Boost Builder can transform your clinician recruitment strategy.</p>
            <div className="mt-10">
              <Link href="/demo"><Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
