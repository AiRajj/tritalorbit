"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Headset,
  Home,
  Plane,
  Car,
  MapPin,
  MessageCircle,
  Clock,
  Star,
  CheckCircle2,
  Heart,
  Users,
  Shield,
  Sparkles,
  Phone,
  Globe,
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

export default function MobilityConciergePage() {
  const services = [
    { icon: Home, title: "Housing Coordination", desc: "Pre-vetted furnished housing sourced, compared, and booked. Quality inspections, lease management, and move-in coordination.", color: "from-blue-500 to-blue-600" },
    { icon: Plane, title: "Travel Management", desc: "Flight booking, itinerary management, ground transport coordination, and luggage logistics. Door-to-door travel planning.", color: "from-indigo-500 to-indigo-600" },
    { icon: Car, title: "Vehicle Arrangement", desc: "Rental car selection, booking, and pickup coordination. Corporate rates, insurance options, and GPS-equipped vehicles.", color: "from-violet-500 to-violet-600" },
    { icon: MapPin, title: "Local Orientation", desc: "Digital welcome guide with essential locations, facility-specific information, neighborhood details, and local recommendations.", color: "from-emerald-500 to-emerald-600" },
    { icon: MessageCircle, title: "Ongoing Support", desc: "Continuous communication throughout the assignment. Maintenance requests, travel changes, and any issue resolution.", color: "from-amber-500 to-amber-600" },
    { icon: Shield, title: "Emergency Assistance", desc: "24/7 emergency support for urgent housing issues, travel disruptions, or any critical situation during the assignment.", color: "from-rose-500 to-rose-600" },
  ];

  const tiers = [
    {
      name: "Essential",
      desc: "Core mobility support for every clinician",
      features: ["Housing sourcing and booking", "Travel coordination", "Digital welcome guide", "Email support", "Standard response time"],
    },
    {
      name: "Premium",
      desc: "Enhanced support with dedicated concierge",
      features: ["Everything in Essential", "Dedicated concierge agent", "Priority housing selection", "Ground transport coordination", "Phone and chat support", "4-hour response time"],
      popular: true,
    },
    {
      name: "White Glove",
      desc: "Full-service concierge for critical placements",
      features: ["Everything in Premium", "Named concierge specialist", "Vehicle arrangement", "Local orientation tour", "24/7 phone support", "1-hour response time", "Emergency assistance"],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/5 via-[#0B3C5D]/5 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 mb-6">
                  <Headset className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">Mobility Concierge</span>
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F2937] leading-[1.1]">
                White-glove support for every <span className="text-emerald-600">clinician</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 leading-relaxed">
                Dedicated concierge specialists handle every aspect of clinician mobility — from housing and travel to local orientation and ongoing support. Your clinicians are never alone.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
                <Link href="/demo"><Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/20 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
              </motion.div>
            </div>
            {/* Chat Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xl overflow-hidden">
                <div className="bg-[#0B3C5D] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                      <Headset className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Lisa — Your Concierge</p>
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[10px] text-white/60">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-4 bg-gray-50/50">
                  <div className="flex justify-end">
                    <div className="bg-[#0B3C5D] text-white text-sm rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                      Hi Lisa! I just accepted the Austin assignment. What happens next?
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-white border border-gray-200 text-sm text-gray-700 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%] shadow-sm">
                      Congratulations, Sarah! I have already started coordinating your move. Here is what I am working on:
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-center gap-2 text-xs"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Housing — 3 options shortlisted near Seton Medical</li>
                        <li className="flex items-center gap-2 text-xs"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Flight — Booking DFW → AUS for Nov 12</li>
                        <li className="flex items-center gap-2 text-xs"><Clock className="h-3 w-3 text-amber-500" /> Car rental — Confirming mid-size SUV</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#0B3C5D] text-white text-sm rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                      That is amazing! Can I bring my cat?
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-white border border-gray-200 text-sm text-gray-700 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%] shadow-sm">
                      Absolutely! All 3 housing options are pet-friendly. I will send you details with pet deposits and nearby vet clinics shortly. 🐱
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Concierge Services</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Comprehensive mobility support that covers every aspect of the clinician experience.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimatedSection key={s.title} delay={i * 0.08}>
                  <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-lg hover:border-emerald-200 transition-all h-full">
                    <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md mb-4", s.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937]">{s.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Service Tiers</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Flexible concierge levels to match your budget and clinician needs.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 0.1}>
                <div className={cn("rounded-2xl border p-6 h-full flex flex-col", tier.popular ? "border-[#0B3C5D] bg-[#0B3C5D]/[0.02] shadow-lg ring-1 ring-[#0B3C5D]/10" : "border-gray-200/80 bg-white hover:shadow-md transition-shadow")}>
                  {tier.popular && (
                    <div className="inline-flex self-start items-center rounded-full bg-[#0B3C5D] text-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-3">Most Popular</div>
                  )}
                  <h3 className="text-xl font-bold text-[#1F2937]">{tier.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{tier.desc}</p>
                  <ul className="mt-6 space-y-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Satisfaction */}
      <section className="py-20 lg:py-32 bg-[#0B3C5D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Clinicians Love Their Concierge</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { value: "4.9/5", label: "Average Rating", desc: "Clinician satisfaction with concierge services" },
              { value: "< 2hr", label: "Response Time", desc: "Average time to first meaningful response" },
              { value: "98%", label: "Issue Resolution", desc: "First-contact resolution rate for concierge requests" },
            ].map((m, i) => (
              <AnimatedSection key={m.label} delay={i * 0.1}>
                <div className="text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                  <p className="text-4xl lg:text-5xl font-bold text-white">{m.value}</p>
                  <p className="text-base font-semibold text-white/90 mt-2">{m.label}</p>
                  <p className="text-sm text-white/50 mt-2">{m.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Give Your Clinicians the Support They Deserve</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">See how the Mobility Concierge transforms the clinician experience and drives retention.</p>
            <div className="mt-10">
              <Link href="/demo"><Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
