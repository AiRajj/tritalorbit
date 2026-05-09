"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type StoryStep = {
  title: string;
  detail: string;
  signal: string;
};

export function PersonaDemoStory({
  persona,
  title,
  summary,
  steps,
  outcomes,
  cta
}: {
  persona: string;
  title: string;
  summary: string;
  steps: StoryStep[];
  outcomes: string[];
  cta: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="orbit-dark-panel rounded-2xl p-8 text-white"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-100">{persona} walkthrough</p>
        <h1 className="mt-2 text-4xl font-bold">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-100">{summary}</p>
      </motion.div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.08 * index }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Step {index + 1}: {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <p>{step.detail}</p>
                <p className="rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
                  Demo signal: {step.signal}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Narrative outcomes to call out in demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          {outcomes.map((outcome) => (
            <p key={outcome} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-orbit-blue" />
              <span>{outcome}</span>
            </p>
          ))}
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button asChild size="lg">
          <Link href={cta.href}>
            {cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
