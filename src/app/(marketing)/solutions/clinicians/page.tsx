"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Stethoscope,
  Home,
  Plane,
  Car,
  Headset,
  MapPin,
  Clock,
  Heart,
  Shield,
  Star,
  CheckCircle2,
  Smartphone,
  MessageCircle,
  Calendar,
  FileCheck,
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

export default function CliniciansPage() {
  const struggles = [
    { icon: Home, title: "Housing Uncertainty", desc: "Spending hours searching for short-term furnished housing in unfamiliar cities. Quality varies wildly and scams are common." },
    { icon: Plane, title: "Travel Complexity", desc: "Booking flights, rental cars, and ground transport for each new assignment. Coordinating arrival timing with housing availability." },
    { icon: Clock, title: "Time-Consuming Logistics", desc: "Spending 72+ hours per assignment navigating logistics instead of focusing on patient care and personal preparation." },
    { icon: MapPin, title: "Unfamiliar Locations", desc: "Arriving in a new city with no local knowledge. Finding groceries, pharmacies, gyms, and essential services from scratch." },
  ];

  const support = [
    { icon: Home, title: "Quality Housing, Guaranteed", desc: "Pre-vetted, furnished housing booked and confirmed before you arrive. Every property meets quality and safety standards.", color: "from-blue-500 to-blue-600" },
    { icon: Plane, title: "Seamless Travel", desc: "Flights booked, ground transport arranged, and itinerary delivered. Focus on the assignment, not the airport.", color: "from-indigo-500 to-indigo-600" },
    { icon: Car, title: "Vehicle Ready", desc: "Rental car or vehicle arranged and waiting at your destination. Corporate rates, quality vehicles, and hassle-free pickup.", color: "from-violet-500 to-violet-600" },
    { icon: Headset, title: "Personal Concierge", desc: "A dedicated concierge handles every detail from offer acceptance to first day. One point of contact for everything you need.", color: "from-emerald-500 to-emerald-600" },
    { icon: MapPin, title: "Local Orientation", desc: "Digital welcome guide with local essentials — grocery stores, pharmacies, gyms, restaurants, and facility-specific information.", color: "from-amber-500 to-amber-600" },
    { icon: Smartphone, title: "Mobile App Access", desc: "View your assignment details, housing information, travel itinerary, and concierge chat all from your phone.", color: "from-rose-500 to-rose-600" },
  ];

  const timeline = [
    { step: "01", title: "Accept Your Offer", desc: "Review your complete offer package including mobility benefits. Accept with confidence knowing everything is covered." },
    { step: "02", title: "Concierge Activates", desc: "Your personal concierge begins coordinating housing, travel, and logistics immediately after acceptance." },
    { step: "03", title: "Everything Confirmed", desc: "Housing booked, travel arranged, vehicle ready. You receive a complete itinerary and digital welcome guide." },
    { step: "04", title: "Arrive & Thrive", desc: "Walk into your furnished housing, start your assignment prepared, and focus on what matters — patient care." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/5 via-[#0B3C5D]/5 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 mb-6">
                <Stethoscope className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">For Clinicians</span>
              </div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2937] leading-[1.1]">
              Focus on patients, not <span className="text-emerald-600">logistics</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
              TRITAL Orbit ensures every travel assignment comes with complete mobility support — housing, travel, transportation, and a personal concierge. Arrive prepared, supported, and ready to make a difference.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
              <Link href="/demo">
                <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/20 h-12 px-8">Learn More <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">The Struggle</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Assignment Logistics Shouldn&apos;t Be This Hard</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Clinicians spend an average of 72 hours navigating housing, travel, and relocation logistics for each new assignment.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {struggles.map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimatedSection key={s.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                        <Icon className="h-6 w-6 text-[#E63946]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F2937]">{s.title}</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Provided */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">What You Get</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Complete Assignment Support</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Every aspect of your assignment logistics is handled, so you can focus on patient care.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {support.map((s, i) => {
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

      {/* Assignment Transparency Timeline */}
      <section className="py-20 lg:py-32 bg-[#0B3C5D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">Your Journey</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">From Offer to First Day</h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">Complete transparency into every step of your assignment preparation.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((t, i) => (
              <AnimatedSection key={t.step} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E63946] text-white font-bold text-sm mb-4">{t.step}</div>
                  <h3 className="text-base font-bold text-white">{t.title}</h3>
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">{t.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Clinician Benefits */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Why Clinicians Love TRITAL Orbit</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Less Stress, More Care", desc: "Eliminate the anxiety of finding housing and coordinating travel. Arrive calm and ready." },
              { icon: Shield, title: "Quality Guaranteed", desc: "Every housing option is vetted. Every travel arrangement is confirmed. No surprises." },
              { icon: MessageCircle, title: "24/7 Support", desc: "Your concierge is always available. Questions, changes, or emergencies — one message away." },
              { icon: Calendar, title: "Faster Transitions", desc: "Start new assignments faster with pre-arranged logistics. Less downtime between contracts." },
              { icon: FileCheck, title: "Full Transparency", desc: "Track every milestone in your assignment preparation. Know exactly what is happening and when." },
              { icon: Star, title: "Better Assignments", desc: "Choose assignments based on the complete package, not just pay. Better housing, better experience, better outcomes." },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <AnimatedSection key={b.title} delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-md transition-shadow">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1F2937]">{b.title}</h3>
                      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0B3C5D] to-[#0a3350]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Ready for Better Assignments?</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">Ask your staffing agency about TRITAL Orbit mobility support, or contact us to learn more about how we are transforming the clinician experience.</p>
            <div className="mt-10">
              <Link href="/contact">
                <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8">Contact Us <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
