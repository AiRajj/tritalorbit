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
          <p className="orbit-chip inline-flex text-orbit-blue">Healthcare Workforce Mobility Cloud</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Turn every travel assignment into a supported life decision.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            TRITAL Orbit helps agencies, MSPs, and vendors coordinate travel, housing, relocation, credits, and readiness workflows in one verified operating system.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/demo/live-platform">
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
          className="orbit-dark-panel rounded-2xl p-6 text-white"
        >
          <p className="text-sm font-medium text-cyan-100">Live mobility workflow</p>
          <ol className="mt-4 space-y-3 text-sm text-slate-100">
            <li>1. Recruiter creates enhanced offer package</li>
            <li>2. Candidate reviews compensation + mobility support in one portal</li>
            <li>3. Vendors compete on assignment-verified travel/housing bids</li>
            <li>4. Wallet credits and concierge workflows remove acceptance friction</li>
            <li>5. War Room + MSP dashboards show readiness, risk, and ROI</li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
