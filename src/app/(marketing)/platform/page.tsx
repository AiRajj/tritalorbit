"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Zap,
  LayoutDashboard,
  BrainCircuit,
  Headset,
  Home,
  Plane,
  Car,
  ShieldCheck,
  Users,
  BarChart3,
  Layers,
  Workflow,
  Globe,
  Lock,
  Database,
  RefreshCw,
  MessageSquare,
  FileText,
  Server,
  Plug,
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

export default function PlatformPage() {
  const coreModules = [
    { icon: Zap, title: "Offer Boost Builder", desc: "Create competitive, mobility-enhanced offers that differentiate from pay-only packages. AI recommends optimal housing, travel, and concierge bundles.", href: "/features/offer-boost-builder", color: "from-rose-500 to-rose-600" },
    { icon: LayoutDashboard, title: "Assignment Launch Dashboard", desc: "Real-time visibility into every assignment from acceptance to first day. Track housing, travel, credentialing, and readiness milestones.", href: "/features/assignment-launch-dashboard", color: "from-blue-500 to-blue-600" },
    { icon: BrainCircuit, title: "Retention Risk AI", desc: "Predictive analytics identify clinicians at risk of backing out. Automated intervention workflows trigger concierge outreach.", href: "/features/retention-risk-ai", color: "from-purple-500 to-purple-600" },
    { icon: Headset, title: "Mobility Concierge", desc: "Dedicated concierge support for every clinician. Housing, travel, car rental, and local orientation managed end-to-end.", href: "/features/mobility-concierge", color: "from-emerald-500 to-emerald-600" },
  ];

  const capabilities = [
    { icon: Home, title: "Housing Management", desc: "Furnished housing marketplace with quality-verified listings across all 50 states." },
    { icon: Plane, title: "Travel Coordination", desc: "End-to-end travel booking, itinerary management, and ground transportation." },
    { icon: Car, title: "Vehicle Services", desc: "Car rental partnerships with pre-negotiated corporate rates at assignment locations." },
    { icon: Users, title: "Clinician Portal", desc: "Self-service portal for clinicians to view assignments, track logistics, and communicate." },
    { icon: BarChart3, title: "Analytics & Reporting", desc: "Comprehensive dashboards for acceptance rates, backout analysis, and ROI tracking." },
    { icon: ShieldCheck, title: "Compliance Engine", desc: "Automated compliance tracking for licensing, credentialing, and regulatory requirements." },
    { icon: MessageSquare, title: "Communication Hub", desc: "Unified messaging between agencies, concierge teams, and clinicians." },
    { icon: FileText, title: "Document Management", desc: "Secure document storage for contracts, credentials, and assignment materials." },
    { icon: RefreshCw, title: "Workflow Automation", desc: "Configurable workflows for offer creation, assignment launch, and concierge tasks." },
  ];

  const integrations = [
    { category: "ATS & CRM", items: ["Bullhorn", "Salesforce", "Custom ATS via API"] },
    { category: "VMS Platforms", items: ["SAP Fieldglass", "Beeline", "VNDLY"] },
    { category: "Credentialing", items: ["Modio", "Silversheet", "Custom systems"] },
    { category: "Communication", items: ["Email (SMTP/API)", "SMS (Twilio)", "In-app messaging"] },
    { category: "Housing Providers", items: ["Furnished Finder", "AirBnB for Work", "Direct providers"] },
    { category: "Travel", items: ["Sabre GDS", "Corporate travel APIs", "Ground transport"] },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#0B3C5D]/5 via-[#E63946]/3 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">Platform</p>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2937] max-w-4xl mx-auto leading-[1.1]">
            The Complete Workforce Mobility Platform
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            TRITAL Orbit unifies offer management, mobility logistics, concierge services, and AI-powered intelligence into a single platform purpose-built for healthcare staffing.
          </motion.p>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">Architecture</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Product Architecture</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Four core modules work together to create a seamless workforce mobility experience.</p>
          </AnimatedSection>

          {/* Architecture Diagram */}
          <AnimatedSection>
            <div className="relative rounded-3xl border border-gray-200/80 bg-white p-8 lg:p-12 shadow-sm">
              <div className="grid lg:grid-cols-4 gap-6">
                {coreModules.map((mod, i) => {
                  const Icon = mod.icon;
                  return (
                    <Link key={mod.title} href={mod.href} className="group">
                      <div className="relative rounded-2xl border border-gray-200/80 bg-gray-50/50 p-6 hover:shadow-lg hover:border-[#0B3C5D]/20 transition-all h-full">
                        <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md mb-4", mod.color)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#1F2937] group-hover:text-[#0B3C5D] transition-colors">{mod.title}</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{mod.desc}</p>
                        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0B3C5D] opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {/* Connecting Layer */}
              <div className="mt-6 rounded-xl bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 p-4 text-center">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Layers className="h-5 w-5 text-white/60" />
                  <span className="text-sm font-semibold text-white">Unified Data Layer</span>
                  <span className="text-white/30">|</span>
                  <Workflow className="h-5 w-5 text-white/60" />
                  <span className="text-sm font-semibold text-white">Workflow Engine</span>
                  <span className="text-white/30">|</span>
                  <Globe className="h-5 w-5 text-white/60" />
                  <span className="text-sm font-semibold text-white">API Gateway</span>
                  <span className="text-white/30">|</span>
                  <Lock className="h-5 w-5 text-white/60" />
                  <span className="text-sm font-semibold text-white">Security Layer</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Everything You Need</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Comprehensive capabilities that cover every aspect of clinician mobility and assignment management.</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <AnimatedSection key={cap.title} delay={i * 0.05}>
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-md hover:border-[#0B3C5D]/10 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
                        <Icon className="h-5 w-5 text-[#0B3C5D]" />
                      </div>
                      <h3 className="text-base font-bold text-[#1F2937]">{cap.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{cap.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-[#0B3C5D] uppercase tracking-wider mb-3">Integrations</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Connects to Your Stack</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">TRITAL Orbit integrates seamlessly with the tools and platforms you already use.</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((group, i) => (
              <AnimatedSection key={group.category} delay={i * 0.05}>
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Plug className="h-5 w-5 text-[#0B3C5D]" />
                    <h3 className="text-base font-bold text-[#1F2937]">{group.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0B3C5D]/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Built for Enterprise</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Server, title: "99.9% Uptime SLA", desc: "Multi-region deployment with automatic failover" },
              { icon: Lock, title: "SOC 2 Aligned", desc: "Enterprise security controls and audit trails" },
              { icon: Database, title: "Data Encryption", desc: "AES-256 encryption at rest and TLS 1.3 in transit" },
              { icon: Globe, title: "REST & GraphQL APIs", desc: "Full API access for custom integrations" },
            ].map((spec, i) => {
              const Icon = spec.icon;
              return (
                <AnimatedSection key={spec.title} delay={i * 0.1}>
                  <div className="text-center rounded-2xl border border-gray-200/80 bg-white p-6 hover:shadow-md transition-shadow">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/5 mb-3">
                      <Icon className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <h3 className="text-base font-bold text-[#1F2937]">{spec.title}</h3>
                    <p className="text-sm text-gray-500 mt-1.5">{spec.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">See the Platform in Action</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">Request a personalized demo and discover how TRITAL Orbit can transform your staffing operations.</p>
            <div className="mt-10">
              <Link href="/demo">
                <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8 text-sm font-semibold">
                  Request Demo <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
