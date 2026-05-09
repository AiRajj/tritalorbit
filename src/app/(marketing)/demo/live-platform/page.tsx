"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const demoMetrics = {
  live: {
    agencies: 10,
    msps: 3,
    recruiters: 50,
    clinicians: 500,
    assignments: 300,
    mobilityRequests: 80,
    mobilityBids: 200,
    walletCredits: 75
  },
  compact: {
    agencies: 2,
    msps: 1,
    recruiters: 6,
    clinicians: 42,
    assignments: 28,
    mobilityRequests: 9,
    mobilityBids: 21,
    walletCredits: 8
  }
};

const scenarioPlayback = [
  { name: "Clinician comparison", health: 96, status: "Active" },
  { name: "Recruiter save strategy", health: 93, status: "Active" },
  { name: "Vendor bid conversion", health: 91, status: "Active" },
  { name: "MSP ROI reporting", health: 95, status: "Active" },
  { name: "First-week urgent alert", health: 89, status: "Active" }
];

const personaRoutes = [
  { label: "Clinician walkthrough", href: "/demo/clinician-story" },
  { label: "Recruiter walkthrough", href: "/demo/recruiter-story" },
  { label: "Vendor walkthrough", href: "/demo/vendor-story" },
  { label: "MSP walkthrough", href: "/demo/msp-story" }
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div className="h-2 rounded-full bg-orbit-gradient" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function LivePlatformDemoPage() {
  const [mode, setMode] = useState<"live" | "compact">("live");
  const metrics = useMemo(() => demoMetrics[mode], [mode]);
  const densityRows = useMemo(
    () => [
      ["Offer acceptance", mode === "live" ? "73%" : "68%", "+4.2 pts WoW"],
      ["Prevented backouts", mode === "live" ? "64" : "12", "High impact cohorts"],
      ["Readiness completion", mode === "live" ? "86%" : "79%", "Driven by concierge interventions"],
      ["Wallet utilization", mode === "live" ? "81%" : "63%", "Credit adoption improving"]
    ],
    [mode]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="orbit-dark-panel rounded-2xl p-8 text-white"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Realistic AI Demo World</p>
        <h1 className="mt-2 text-4xl font-bold">Live platform simulation control</h1>
        <p className="mt-3 max-w-3xl text-slate-100">
          Investor-grade demo mode with dense, role-specific workflows and polished story playback without requiring
          external API keys.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant={mode === "live" ? "default" : "outline"} onClick={() => setMode("live")}>
            Live-scale dataset
          </Button>
          <Button variant={mode === "compact" ? "default" : "outline"} onClick={() => setMode("compact")}>
            Compact dataset
          </Button>
          {personaRoutes.map((route) => (
            <Button key={route.href} variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
              <Link href={route.href}>{route.label}</Link>
            </Button>
          ))}
        </div>
      </motion.div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(metrics).map(([label, value], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.04 * index }}
          >
            <Card>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">{label.replace(/([A-Z])/g, " $1")}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Scenario playback health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scenarioPlayback.map((scenario) => (
              <div key={scenario.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium text-slate-800">{scenario.name}</p>
                  <p className="text-xs uppercase text-emerald-600">{scenario.status}</p>
                </div>
                <ProgressBar value={scenario.health} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live activity stream</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>• Candidate chose lower pay offer with better value score</p>
            <p>• Recruiter applied $300 flight credit to recover offer</p>
            <p>• Vendor submitted shortlist-winning relocation package</p>
            <p>• MSP report generated with weekly supplier delta</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Data density snapshot</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <th className="pb-2 pr-4">Metric</th>
                <th className="pb-2 pr-4">Current</th>
                <th className="pb-2">Trend signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {densityRows.map((row) => (
                <tr key={row[0]}>
                  <td className="py-3 pr-4 font-medium">{row[0]}</td>
                  <td className="py-3 pr-4">{row[1]}</td>
                  <td className="py-3">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Scenario playback status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>• Clinician comparison scenario: active</p>
          <p>• Recruiter save strategy scenario: active</p>
          <p>• Vendor bid win scenario: active</p>
          <p>• MSP executive reporting scenario: active</p>
          <p>• First-week urgent readiness alert scenario: active</p>
        </CardContent>
      </Card>
    </section>
  );
}
