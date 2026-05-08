"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  BrainCircuit,
  AlertTriangle,
  TrendingDown,
  Eye,
  Bell,
  Shield,
  Activity,
  BarChart3,
  Zap,
  MessageCircle,
  Target,
  Gauge,
  Users,
  Clock,
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

export default function RetentionRiskAIPage() {
  const signals = [
    { icon: MessageCircle, title: "Communication Patterns", desc: "Declining response times, reduced engagement, or unusual communication patterns trigger early warnings." },
    { icon: Clock, title: "Timeline Delays", desc: "Missed milestones, housing hesitation, or credential submission delays indicate potential risk." },
    { icon: Activity, title: "Behavioral Signals", desc: "App engagement, document submission patterns, and concierge interaction frequency reveal clinician sentiment." },
    { icon: Target, title: "Market Factors", desc: "Competing offers, pay rate fluctuations, and geographic preferences create environmental risk factors." },
  ];

  const capabilities = [
    { icon: BrainCircuit, title: "Predictive Risk Scoring", desc: "Machine learning models analyze 40+ signals to generate a risk score for every active placement. Updated in real-time." },
    { icon: AlertTriangle, title: "Early Warning System", desc: "Alerts trigger 7-14 days before a potential backout, giving your team time to intervene and retain the clinician." },
    { icon: Zap, title: "Automated Interventions", desc: "Configurable workflows automatically trigger concierge outreach, manager notifications, or offer adjustments based on risk levels." },
    { icon: Eye, title: "Risk Dashboard", desc: "Portfolio-level view of all active assignments with risk scoring, trend analysis, and intervention tracking." },
    { icon: BarChart3, title: "Outcome Analytics", desc: "Track intervention success rates, backout reduction metrics, and ROI per intervention type." },
    { icon: Shield, title: "Continuous Learning", desc: "Models improve with every outcome. Your risk predictions become more accurate over time as the system learns from your data." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/5 via-[#0B3C5D]/5 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 mb-6">
                  <BrainCircuit className="h-3.5 w-3.5 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">Retention Risk AI</span>
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F2937] leading-[1.1]">
                Predict backouts <span className="text-purple-600">before they happen</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 leading-relaxed">
                AI-powered risk detection continuously monitors behavioral signals, communication patterns, and assignment factors to identify clinicians at risk of backing out — days before it happens.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
                <Link href="/demo"><Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/20 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
              </motion.div>
            </div>
            {/* Risk Dashboard Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-bold text-[#1F2937]">Retention Risk Monitor</span>
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-3.5 w-3.5 text-purple-600" />
                    <span className="text-xs text-purple-600 font-medium">AI Active</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Mitchell", loc: "Austin, TX", risk: 12, level: "Low", color: "emerald" },
                    { name: "James Rodriguez", loc: "Denver, CO", risk: 45, level: "Medium", color: "amber" },
                    { name: "Emily Chen", loc: "Phoenix, AZ", risk: 78, level: "High", color: "red" },
                    { name: "Michael Torres", loc: "Seattle, WA", risk: 23, level: "Low", color: "emerald" },
                  ].map((c) => (
                    <div key={c.name} className="rounded-xl bg-gray-50 p-3 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-gray-500">{c.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#1F2937] truncate">{c.name}</p>
                        <p className="text-[10px] text-gray-400">{c.loc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", c.color === "emerald" ? "bg-emerald-500" : c.color === "amber" ? "bg-amber-500" : "bg-red-500")} style={{ width: `${c.risk}%` }} />
                          </div>
                          <span className={cn("text-[10px] font-bold", c.color === "emerald" ? "text-emerald-600" : c.color === "amber" ? "text-amber-600" : "text-red-600")}>{c.risk}%</span>
                        </div>
                        <span className={cn("text-[9px] font-medium", c.color === "emerald" ? "text-emerald-600" : c.color === "amber" ? "text-amber-600" : "text-red-600")}>{c.level} Risk</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-red-50 border border-red-100 p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-xs font-semibold text-red-700">Action Required</span>
                  </div>
                  <p className="text-[11px] text-red-600 mt-1">Emily Chen shows declining engagement. Concierge outreach recommended.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Risk Signals */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">What the AI Monitors</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Over 40 behavioral and contextual signals are continuously analyzed to predict backout risk.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {signals.map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimatedSection key={s.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                        <Icon className="h-6 w-6 text-purple-600" />
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

      {/* Capabilities */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">AI Capabilities</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <AnimatedSection key={cap.title} delay={i * 0.08}>
                  <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-lg hover:border-purple-200 transition-all h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors mb-4">
                      <Icon className="h-6 w-6 text-purple-600" />
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

      {/* Impact */}
      <section className="py-20 lg:py-32 bg-[#0B3C5D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Proven Impact</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { value: "60%", label: "Fewer Backouts", desc: "Early detection and intervention prevents the majority of potential backouts" },
              { value: "7-14 days", label: "Early Warning", desc: "Risk alerts trigger 1-2 weeks before a potential backout event" },
              { value: "$1.2M+", label: "Annual Savings", desc: "Average savings from prevented backouts and improved retention" },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Stop Losing Clinicians to Preventable Backouts</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">See how Retention Risk AI can help you predict and prevent backouts before they happen.</p>
            <div className="mt-10">
              <Link href="/demo"><Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8">Request Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
