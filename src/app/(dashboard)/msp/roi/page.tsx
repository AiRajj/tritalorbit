"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RoiPayload = {
  metrics: {
    offerAcceptanceRate: number;
    backoutRate: number;
    firstDayShowRate: number;
    estimatedSavings: number;
    timeToReadyDays: number;
    mobilityUtilizationRate: number;
  };
  supplierRankings: Array<{ supplier: string; readinessScore: number; backoutRate: number; savings: number }>;
  readinessByWeek: Array<{ week: string; readiness: number; showUp: number }>;
  activeRisks: string[];
  aiSummary: { summary: string; bullets: string[] };
};

function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div className="h-2 rounded-full bg-orbit-gradient" style={{ width: `${value}%` }} />
    </div>
  );
}

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Offer acceptance", payload ? `${Math.round(payload.metrics.offerAcceptanceRate * 100)}%` : "--"],
          ["Backout rate", payload ? `${Math.round(payload.metrics.backoutRate * 100)}%` : "--"],
          ["First-day show rate", payload ? `${Math.round(payload.metrics.firstDayShowRate * 100)}%` : "--"],
          ["Time to ready", payload ? `${payload.metrics.timeToReadyDays.toFixed(1)} days` : "--"],
          [
            "Mobility utilization",
            payload ? `${Math.round(payload.metrics.mobilityUtilizationRate * 100)}%` : "--"
          ],
          [
            "Estimated savings",
            payload ? `$${payload.metrics.estimatedSavings.toLocaleString()}` : "--"
          ]
        ].map(([label, value], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.04 * index }}
          >
            <Card>
              <CardContent className="p-5">
                <p className="text-xs uppercase text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Supplier ranking snapshot</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-2 pr-4">Supplier</th>
                  <th className="pb-2 pr-4">Readiness</th>
                  <th className="pb-2 pr-4">Backout</th>
                  <th className="pb-2">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {payload?.supplierRankings.map((row) => (
                  <tr key={row.supplier}>
                    <td className="py-3 pr-4 font-medium">{row.supplier}</td>
                    <td className="py-3 pr-4">{row.readinessScore}</td>
                    <td className="py-3 pr-4">{Math.round(row.backoutRate * 100)}%</td>
                    <td className="py-3">${row.savings.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active risk feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            {payload?.activeRisks.map((risk) => <p key={risk}>• {risk}</p>) ?? <p>Loading...</p>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Readiness trend by week</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          {payload?.readinessByWeek.map((row) => (
            <div key={row.week} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500">
                <span>{row.week}</span>
                <span>Readiness {row.readiness}% / Show-up {row.showUp}%</span>
              </div>
              <MiniBar value={row.readiness} />
            </div>
          )) ?? <p>Loading trend data...</p>}
        </CardContent>
      </Card>

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
