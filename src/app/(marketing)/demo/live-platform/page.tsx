"use client";

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

export default function LivePlatformDemoPage() {
  const [mode, setMode] = useState<"live" | "compact">("live");
  const metrics = useMemo(() => demoMetrics[mode], [mode]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="orbit-dark-panel rounded-2xl p-8 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Realistic AI Demo World</p>
        <h1 className="mt-2 text-4xl font-bold">Live platform simulation control</h1>
        <p className="mt-3 max-w-3xl text-slate-100">
          Toggle between full investor demo scale and compact sandbox mode without requiring external API keys.
        </p>
        <div className="mt-5 flex gap-2">
          <Button variant={mode === "live" ? "default" : "outline"} onClick={() => setMode("live")}>
            Live-scale dataset
          </Button>
          <Button variant={mode === "compact" ? "default" : "outline"} onClick={() => setMode("compact")}>
            Compact dataset
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(metrics).map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">{label.replace(/([A-Z])/g, " $1")}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

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
