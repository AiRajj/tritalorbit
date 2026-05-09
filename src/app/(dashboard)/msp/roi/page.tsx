"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RoiPayload = {
  metrics: {
    offerAcceptanceRate: number;
    backoutRate: number;
    firstDayShowRate: number;
    estimatedSavings: number;
  };
  aiSummary: { summary: string; bullets: string[] };
};

export default function MspRoiPage() {
  const [payload, setPayload] = useState<RoiPayload | null>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/msp/roi");
      if (!response.ok) return;
      setPayload((await response.json()) as RoiPayload);
    }
    void load();
  }, []);

  return (
    <div className="space-y-6">
      <section className="orbit-dark-panel rounded-2xl p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">MSP Executive ROI</p>
        <h1 className="mt-2 text-3xl font-semibold">Board-level mobility and readiness performance</h1>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-slate-500">Offer acceptance</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {payload ? `${Math.round(payload.metrics.offerAcceptanceRate * 100)}%` : "--"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-slate-500">Backout rate</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {payload ? `${Math.round(payload.metrics.backoutRate * 100)}%` : "--"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-slate-500">First-day show rate</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {payload ? `${Math.round(payload.metrics.firstDayShowRate * 100)}%` : "--"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-slate-500">Estimated savings</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {payload ? `$${payload.metrics.estimatedSavings.toLocaleString()}` : "--"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI executive summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>{payload?.aiSummary.summary ?? "Loading summary..."}</p>
          {payload?.aiSummary.bullets.map((item) => (
            <p key={item}>• {item}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
