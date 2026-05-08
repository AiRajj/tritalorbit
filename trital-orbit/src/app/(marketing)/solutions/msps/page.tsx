import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Shield, FileText } from "lucide-react";

export const metadata = { title: "For MSPs" };

export default function MSPSolutionPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">For MSP Program Managers</Badge>
            <h1 className="text-5xl font-bold mb-6">Prove Your Suppliers Deliver — With Data</h1>
            <p className="text-xl text-white/75 mb-8">
              TRITAL Orbit™ gives MSP teams real-time visibility into supplier performance, acceptance rates, backout trends, and assignment readiness — with AI-generated executive summaries.
            </p>
            <Link href="/demo"><Button size="lg" className="bg-orbit-blue hover:bg-orbit-blue-light text-white">Book a Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-orbit-dark text-center mb-12">Everything an MSP Needs in One Dashboard</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: BarChart3, title: "Supplier Performance Dashboard", desc: "Track acceptance rate, backout rate, time-to-ready, and mobility utilization per supplier — in real time." },
              { icon: TrendingUp, title: "AI Executive Summaries", desc: "One-click AI-generated performance summaries ready for leadership reporting and supplier reviews." },
              { icon: FileText, title: "Export-Ready Reports", desc: "Download PDF and CSV reports for any date range, filtered by agency, specialty, or location." },
              { icon: Shield, title: "Compliance & Audit Trail", desc: "Full audit logging and role-based access ensures your MSP data stays compliant and secure." },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-orbit-blue/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="h-6 w-6 text-orbit-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-orbit-dark mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
