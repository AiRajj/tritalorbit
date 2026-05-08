"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-orbit-hero" />
      <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.18] [background-size:48px_48px]" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-orbit-red/10 blur-3xl" />

      <div className="container-wide relative z-10 grid gap-12 pt-24 pb-32 md:grid-cols-12 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-orbit-red" />
            Healthcare Workforce Mobility Infrastructure
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
            Win more clinicians.{" "}
            <span className="text-gradient-on-dark">Reduce backouts.</span>{" "}
            Without raising pay rates.
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-white/80">
            TRITAL Orbit™ embeds housing, travel, relocation, transportation, and AI offer
            optimization directly into the staffing offer-to-start workflow — turning every
            assignment into a better life decision, not just a better weekly number.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/demo" className="group">
                Book a 30-min walkthrough
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 text-white border-white/15 hover:bg-white/10">
              <Link href="/platform">See the platform</Link>
            </Button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-6">
            <Stat label="Faster acceptance" value="2.3×" />
            <Stat label="Fewer backouts" value="–41%" />
            <Stat label="Day-1 readiness" value="92%" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-5"
        >
          <HeroPanel />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/60">{label}</div>
    </div>
  );
}

function HeroPanel() {
  return (
    <div className="relative">
      <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-orbit-red/30 to-orbit-deep/0 blur-xl" aria-hidden />
      <div className="relative rounded-[24px] border border-white/10 bg-orbit-ink/70 p-2 shadow-elevate backdrop-blur-xl">
        <div className="rounded-[18px] border border-white/5 bg-gradient-to-br from-orbit-deep/30 via-orbit-ink to-orbit-ink p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-white/50">Live offer</div>
              <div className="mt-1 text-base font-semibold text-white">ICU RN — Houston, TX</div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Boosted
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-white">
            <Field label="Weekly Pay" value="$2,640" />
            <Field label="Duration" value="13 weeks" />
            <Field label="Total Value" value="$36,840" />
            <Field label="Confidence" value="92 / 100" accent />
          </div>

          <div className="mt-6 space-y-2">
            <Perk title="Housing locked" detail="2-bd, 1.4mi from facility" />
            <Perk title="Flight + ground transport" detail="IAH → facility shuttle" />
            <Perk title="Day-1 readiness call" detail="Scheduled 72h before start" />
          </div>

          <div className="mt-6 rounded-xl border border-orbit-red/20 bg-orbit-red/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-orbit-red">AI Close Strategy</div>
            <p className="mt-1 text-sm text-white/85">
              Lead with mobility — housing is already pre-vetted. Anchor on lifestyle, not pay.
              Aim to confirm verbally within 24h.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 text-xs text-white/55">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          SOC 2 aligned · HIPAA-aware · Audit-ready
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
      <div className="text-[0.65rem] font-medium uppercase tracking-wider text-white/45">{label}</div>
      <div className={accent ? "mt-1 text-sm font-semibold text-orbit-red" : "mt-1 text-sm font-semibold text-white"}>{value}</div>
    </div>
  );
}

function Perk({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <div>
        <div className="text-sm font-medium text-white">{title}</div>
        <div className="text-xs text-white/55">{detail}</div>
      </div>
    </div>
  );
}
