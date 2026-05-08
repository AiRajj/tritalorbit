import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, MessageSquare, Mail, Copy, FileText, CheckCircle2 } from "lucide-react";

export const metadata = { title: "Offer Boost Builder" };

export default function OfferBoostBuilderPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-orbit-dark to-orbit-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/15 text-white border-white/20">
              <Zap className="h-3.5 w-3.5 mr-1.5" />Offer Boost Builder
            </Badge>
            <h1 className="text-5xl font-bold mb-6 leading-tight">Build AI-Enhanced Offers That Close Faster</h1>
            <p className="text-xl text-white/80 mb-8">
              Turn any assignment into a compelling, value-rich offer in under 2 minutes. AI-generated summaries, SMS pitches, email scripts, and recruiter talking points — ready to send immediately.
            </p>
            <div className="flex gap-4">
              <Link href="/demo"><Button size="lg" className="bg-orbit-red hover:bg-red-700 text-white">See It in Action <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
              <Link href="/register"><Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">Start Free Trial</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orbit-dark mb-4">Everything Generated in One Click</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "Enhanced Offer Summary", desc: "3-4 sentence premium summary highlighting value beyond the pay rate." },
              { icon: MessageSquare, title: "SMS Pitch", desc: "Ready-to-send text message under 160 characters optimized for response." },
              { icon: Mail, title: "Email Pitch", desc: "Professional 3-paragraph email with subject line and personalized close." },
              { icon: Copy, title: "Recruiter Talking Points", desc: "3 specific phone call talking points tailored to the assignment and candidate." },
              { icon: FileText, title: "Close Strategy", desc: "AI-generated closing strategy specific to this candidate's risk profile." },
              { icon: Zap, title: "Candidate Value Statement", desc: "1-2 sentence statement that speaks to life quality, not just the weekly rate." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-orbit-blue/10 flex items-center justify-center mb-3">
                  <item.icon className="h-5 w-5 text-orbit-blue" />
                </div>
                <h3 className="font-bold text-orbit-dark mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-orbit-blue/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-orbit-dark mb-4">Add Mobility Perks That Clinicians Actually Value</h2>
          <p className="text-slate-500 mb-8">Toggle on housing, flight, car rental, relocation, and loyalty perks to embed them in every offer. Each perk displays in the candidate portal automatically.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {["Flight Support", "Housing Assistance", "Car Rental", "Relocation", "First Week Ready", "Emergency Housing", "Loyalty Rewards", "Concierge Support"].map((perk, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-orbit-dark flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                {perk}
              </div>
            ))}
          </div>
          <Link href="/demo"><Button size="lg" className="bg-orbit-blue hover:bg-orbit-blue-light text-white">Book a Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
        </div>
      </section>
    </div>
  );
}
