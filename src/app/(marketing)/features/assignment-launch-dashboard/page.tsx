"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Home,
  Plane,
  FileCheck,
  Users,
  Activity,
  BarChart3,
  Bell,
  Milestone,
  Gauge,
  Calendar,
  CircleDot,
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

export default function AssignmentLaunchDashboardPage() {
  const features = [
    { icon: Gauge, title: "Readiness Scoring", desc: "Real-time readiness score for every assignment. See at a glance which clinicians are on track and which need attention." },
    { icon: Milestone, title: "Milestone Tracking", desc: "Automated tracking of every milestone from offer acceptance to first day: housing, travel, credentialing, orientation." },
    { icon: AlertTriangle, title: "Risk Alerts", desc: "Proactive alerts when milestones fall behind schedule. Automatic escalation to concierge team for intervention." },
    { icon: Activity, title: "Real-Time Status", desc: "Live status updates on housing confirmation, travel booking, credential verification, and clinician communication." },
    { icon: Bell, title: "Smart Notifications", desc: "Configurable notifications for milestone completions, delays, risk escalations, and clinician responses." },
    { icon: BarChart3, title: "Performance Analytics", desc: "Track time-to-ready, bottleneck analysis, concierge efficiency, and assignment completion rates over time." },
  ];

  const milestones = [
    { label: "Offer Accepted", status: "complete", icon: CheckCircle2 },
    { label: "Housing Confirmed", status: "complete", icon: Home },
    { label: "Travel Booked", status: "complete", icon: Plane },
    { label: "Credentials Verified", status: "active", icon: FileCheck },
    { label: "Orientation Scheduled", status: "pending", icon: Calendar },
    { label: "Assignment Ready", status: "pending", icon: Users },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/5 via-[#0B3C5D]/5 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 mb-6">
                  <LayoutDashboard className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700">Assignment Launch Dashboard</span>
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F2937] leading-[1.1]">
                Complete visibility from <span className="text-[#0B3C5D]">offer to first day</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 leading-relaxed">
                Track every assignment milestone in real time. Know exactly where every clinician is in their preparation journey, identify bottlenecks before they become backouts, and ensure on-time arrival.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
                <Link href="/demo"><Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/20 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
              </motion.div>
            </div>
            {/* Dashboard Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-bold text-[#1F2937]">Assignment Launch Tracker</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                </div>
                {/* Readiness Score */}
                <div className="rounded-xl bg-[#0B3C5D]/5 p-4 mb-4 border border-[#0B3C5D]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#0B3C5D]">Overall Readiness</span>
                    <span className="text-lg font-bold text-[#0B3C5D]">72%</span>
                  </div>
                  <div className="h-3 bg-[#0B3C5D]/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/70 rounded-full" />
                  </div>
                </div>
                {/* Milestones */}
                <div className="space-y-2">
                  {milestones.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.label} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5", m.status === "active" ? "bg-blue-50 border border-blue-100" : "bg-gray-50/50")}>
                        <div className={cn("h-6 w-6 rounded-full flex items-center justify-center", m.status === "complete" ? "bg-emerald-100" : m.status === "active" ? "bg-blue-100" : "bg-gray-100")}>
                          {m.status === "complete" ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          ) : m.status === "active" ? (
                            <CircleDot className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                          ) : (
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                          )}
                        </div>
                        <span className={cn("text-xs font-medium flex-1", m.status === "complete" ? "text-emerald-700" : m.status === "active" ? "text-blue-700" : "text-gray-400")}>
                          {m.label}
                        </span>
                        <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", m.status === "complete" ? "bg-emerald-100 text-emerald-700" : m.status === "active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-400")}>
                          {m.status === "complete" ? "Done" : m.status === "active" ? "In Progress" : "Pending"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Dashboard Capabilities</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Everything you need to manage assignments from acceptance to first day.</p>
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
                    <h3 className="text-lg font-bold text-[#1F2937]">{feat.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{feat.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Never Lose Visibility Again</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">See how the Assignment Launch Dashboard keeps every assignment on track from offer to first day.</p>
            <div className="mt-10">
              <Link href="/demo"><Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
