import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, AlertTriangle, Target, MessageSquare } from "lucide-react";

export const metadata = { title: "Retention Risk AI" };

export default function RetentionRiskAIPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-orbit-dark to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/15 text-white border-white/20">
              <Brain className="h-3.5 w-3.5 mr-1.5" />Retention Risk AI
            </Badge>
            <h1 className="text-5xl font-bold mb-6">Predict Backouts Before They Happen</h1>
            <p className="text-xl text-white/80 mb-8">
              Our AI analyzes 12+ behavioral signals in real time to score every candidate&apos;s backout risk from 0–100, with specific action recommendations for your recruiters.
            </p>
            <Link href="/demo"><Button size="lg" className="bg-orbit-red hover:bg-red-700 text-white">See Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orbit-dark mb-4">12 Signals. One Risk Score.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Did candidate view the offer?",
              "Time elapsed since offer was sent",
              "Has housing been requested?",
              "Has travel been requested?",
              "Days remaining until start date",
              "Weekly pay vs market average",
              "Location difficulty score",
              "Candidate engagement score",
              "Number of unanswered messages",
              "Current offer status",
              "Historical acceptance patterns",
              "Assignment complexity factors",
            ].map((signal, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <div className="w-6 h-6 rounded-full bg-orbit-blue text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                <span className="text-slate-700">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: AlertTriangle, title: "Four-Level Risk Classification", desc: "Low, Medium, High, and Critical — with clear thresholds and visual indicators in every dashboard view." },
              { icon: Target, title: "Recruiter Action Plans", desc: "Each risk score comes with a specific suggested action — not generic advice. What to do, and when." },
              { icon: MessageSquare, title: "Ready-to-Send SMS Scripts", desc: "AI-generated SMS pitches and phone call openers tailored to each candidate's risk profile." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-orbit">
                <div className="w-12 h-12 rounded-2xl bg-orbit-red/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-orbit-red" />
                </div>
                <h3 className="font-bold text-orbit-dark mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
