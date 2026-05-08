"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="hero-grid relative overflow-hidden border-b border-slate-200 bg-orbit-soft">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orbit-blue">Healthcare Workforce Mobility Infrastructure</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Win more clinicians. Reduce backouts. Improve assignment readiness.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            TRITAL Orbit™ helps healthcare staffing companies win and keep clinicians without increasing pay rates by turning every assignment into a better life decision.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/demo">
                Book Enterprise Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/platform">Explore Platform</Link>
            </Button>
          </div>
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-orbit-blue" /> Offer optimization AI
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-orbit-blue" /> Integrated housing, travel, and concierge workflows
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-orbit-blue" /> Role-based enterprise dashboards and audit trail
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium"
        >
          <p className="text-sm font-medium text-slate-500">Offer-to-start workflow</p>
          <ol className="mt-4 space-y-3 text-sm text-slate-700">
            <li>1. Recruiter creates enhanced offer package</li>
            <li>2. Candidate reviews compensation + mobility support in one portal</li>
            <li>3. Booking requests auto-route to concierge board</li>
            <li>4. AI risk and readiness scores trigger next-best actions</li>
            <li>5. MSP dashboard receives outcome metrics and executive summary</li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
