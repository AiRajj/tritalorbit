import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, TrendingUp, Target, Zap, Brain, BarChart3 } from "lucide-react";

export const metadata = { title: "For Agencies" };

const outcomes = [
  { stat: "43%", label: "Avg increase in offer acceptance rate" },
  { stat: "67%", label: "Reduction in backout rate" },
  { stat: "$47K", label: "Avg revenue recovered per month" },
  { stat: "2.4x", label: "Faster assignment readiness" },
];

const features = [
  { icon: Zap, title: "Offer Boost Builder", desc: "Create AI-enhanced offers with value statements, SMS pitches, and close strategies in under 2 minutes." },
  { icon: Brain, title: "Retention Risk AI", desc: "Identify high-risk candidates before they back out with our 12-signal AI risk scoring engine." },
  { icon: BarChart3, title: "Assignment Launch Dashboard", desc: "Track housing, travel, documents, and readiness for every candidate in one command center." },
  { icon: Target, title: "Booking Request System", desc: "Candidates request support directly in their offer portal. Concierge tasks created automatically." },
];

export default function AgencySolutionPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-orbit-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/15 text-white border-white/20">For Healthcare Staffing Agencies</Badge>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Win More Clinicians Without Increasing Pay Rates
            </h1>
            <p className="text-xl text-white/80 mb-8">
              TRITAL Orbit™ gives your recruiting team the tools to create differentiated offers, predict backouts before they happen, and deliver a concierge-level experience that clinicians choose over competitors.
            </p>
            <div className="flex gap-4">
              <Link href="/demo"><Button size="lg" className="bg-orbit-red hover:bg-red-700 text-white">Book a Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
              <Link href="/pricing"><Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">See Pricing</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-slate-50">
                <div className="text-4xl font-bold text-orbit-blue mb-2">{item.stat}</div>
                <div className="text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orbit-dark mb-4">Built for Recruiting Teams That Want to Win</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <Card key={i} className="p-6 hover:shadow-orbit-lg transition-all">
                <CardContent className="p-0">
                  <div className="w-12 h-12 rounded-2xl bg-orbit-blue/10 flex items-center justify-center mb-4">
                    <f.icon className="h-6 w-6 text-orbit-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-orbit-dark mb-2">{f.title}</h3>
                  <p className="text-slate-500">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-orbit-gradient text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Increase Your Acceptance Rate?</h2>
          <p className="text-white/75 mb-8">Join agencies averaging 43% improvement in offer acceptance with TRITAL Orbit™.</p>
          <Link href="/demo"><Button size="xl" className="bg-orbit-red hover:bg-red-700 text-white">Book Your Demo <ArrowRight className="h-5 w-5 ml-1" /></Button></Link>
        </div>
      </section>
    </div>
  );
}
