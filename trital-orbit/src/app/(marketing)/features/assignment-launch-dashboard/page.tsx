import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, CheckCircle2, Home, Plane, FileText, Calendar } from "lucide-react";

export const metadata = { title: "Assignment Launch Dashboard" };

export default function AssignmentLaunchPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/15 text-white border-white/20">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />Assignment Launch Dashboard
            </Badge>
            <h1 className="text-5xl font-bold mb-6">Track Every Candidate from Offer Acceptance to Day One</h1>
            <p className="text-xl text-white/80 mb-8">
              Stop chasing clinicians the week before their start date. See housing, travel, documents, and readiness status for every active assignment in one command center.
            </p>
            <Link href="/demo"><Button size="lg" className="bg-white text-emerald-800 hover:bg-white/90 font-semibold">Book a Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Home, title: "Housing Status", desc: "See exactly where every candidate stands on housing — confirmed, in progress, or not started." },
              { icon: Plane, title: "Travel Status", desc: "Track flight and transportation status for every incoming assignment." },
              { icon: FileText, title: "Document Status", desc: "Know which candidates still need documents uploaded, verified, or re-submitted." },
              { icon: Calendar, title: "Days to Start", desc: "Countdown to start date with color-coded urgency indicators for every at-risk candidate." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-orbit-dark mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/demo"><Button size="lg" className="bg-orbit-blue hover:bg-orbit-blue-light text-white">See the Dashboard Live <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
