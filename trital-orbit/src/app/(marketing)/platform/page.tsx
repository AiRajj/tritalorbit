import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, Brain, Home, BarChart3, Users, Shield, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Platform Overview",
};

const modules = [
  {
    icon: Zap,
    title: "Offer Boost Builder",
    desc: "Build AI-enhanced offers with value statements, SMS pitches, email scripts, recruiter talking points, and PDF-ready summaries in under 2 minutes.",
    href: "/features/offer-boost-builder",
    color: "bg-orbit-blue text-white",
  },
  {
    icon: Brain,
    title: "Retention Risk AI",
    desc: "Analyze 12+ behavioral signals to predict backout risk from 0–100 with specific action recommendations for every candidate.",
    href: "/features/retention-risk-ai",
    color: "bg-orbit-red text-white",
  },
  {
    icon: BarChart3,
    title: "Assignment Launch Dashboard",
    desc: "Track every candidate from offer acceptance to day one — housing, travel, documents, and readiness status in one view.",
    href: "/features/assignment-launch-dashboard",
    color: "bg-emerald-600 text-white",
  },
  {
    icon: Home,
    title: "Mobility Concierge",
    desc: "Housing, flights, car rentals, and relocation support embedded into every assignment offer, managed by your concierge team.",
    href: "/features/mobility-concierge",
    color: "bg-purple-600 text-white",
  },
  {
    icon: Users,
    title: "Candidate Offer Portal",
    desc: "Mobile-first personalized offer hub where clinicians accept offers, request support, and track their assignment details.",
    href: "/solutions/clinicians",
    color: "bg-amber-600 text-white",
  },
  {
    icon: BarChart3,
    title: "MSP Reporting Suite",
    desc: "Real-time supplier performance dashboards with AI-generated executive summaries, exportable as PDF and CSV.",
    href: "/solutions/msps",
    color: "bg-slate-700 text-white",
  },
];

export default function PlatformPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-orbit-dark to-orbit-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/15 text-white border-white/20">Full Platform Overview</Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Every Tool Your Team Needs to Win More Clinicians
          </h1>
          <p className="text-xl text-white/75 max-w-3xl mx-auto mb-10">
            TRITAL Orbit™ is a complete Healthcare Workforce Mobility Infrastructure platform — built end-to-end to increase offer acceptance, reduce backouts, and improve assignment readiness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="xl" className="bg-orbit-red hover:bg-red-700 text-white">
                Book a Demo <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="xl" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-orbit-dark mb-4">Platform Modules</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Six integrated modules that work together across your entire offer-to-start workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, i) => (
              <Link key={i} href={module.href}>
                <Card className="hover:shadow-orbit-xl transition-all cursor-pointer group h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-2xl ${module.color} flex items-center justify-center mb-4`}>
                      <module.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-orbit-dark mb-2 group-hover:text-orbit-blue transition-colors">{module.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{module.desc}</p>
                    <div className="flex items-center text-orbit-blue text-sm font-medium">
                      Learn more <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-orbit-dark mb-4">Enterprise-Grade. Clinician-Tested.</h2>
          <p className="text-xl text-slate-500 mb-10">
            TRITAL Orbit™ is built on the same infrastructure trusted by Fortune-level healthcare staffing companies.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "SOC 2 Type II certified security practices",
              "HIPAA-ready architecture with BAA available",
              "99.9% uptime SLA on Enterprise plans",
              "256-bit AES encryption at rest and in transit",
              "Role-based access control across all modules",
              "Full audit logging for compliance",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-left p-3 bg-white rounded-xl border border-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-orbit-gradient text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Offer Process?</h2>
          <p className="text-white/75 mb-8">14-day free trial. No credit card required.</p>
          <Link href="/demo">
            <Button size="xl" className="bg-orbit-red hover:bg-red-700 text-white">
              Book a Demo <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
