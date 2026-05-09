"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrbitPlusPage() {
  const [loading, setLoading] = useState<"monthly" | "annual" | null>(null);

  async function upgrade(annual: boolean) {
    const key = annual ? "annual" : "monthly";
    setLoading(key);

    const [checkoutRes, subRes] = await Promise.all([
      fetch("/api/billing/orbit-plus-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ annual })
      }),
      fetch("/api/candidate/orbit-plus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ annual })
      })
    ]);

    setLoading(null);
    if (!checkoutRes.ok || !subRes.ok) {
      toast.error("Unable to activate Orbit Plus right now.");
      return;
    }

    toast.success(`Orbit Plus ${annual ? "annual" : "monthly"} activated.`);
  }

  return (
    <div className="space-y-6">
      <section className="orbit-dark-panel rounded-2xl p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Orbit Plus</p>
        <h1 className="mt-2 text-3xl font-semibold">Priority support for assignment success</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-100">
          Unlock premium housing deals, priority concierge, emergency mobility support, and rewards multipliers.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold text-slate-900">$14.99</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Priority vendor bids</li>
              <li>• Premium housing options</li>
              <li>• Priority concierge routing</li>
            </ul>
            <Button onClick={() => upgrade(false)} disabled={loading !== null} className="w-full">
              {loading === "monthly" ? "Activating..." : "Activate Monthly"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Annual plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold text-slate-900">$149</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Everything in monthly plan</li>
              <li>• Rewards multiplier-ready perks</li>
              <li>• Annual savings and priority escalations</li>
            </ul>
            <Button onClick={() => upgrade(true)} disabled={loading !== null} className="w-full">
              {loading === "annual" ? "Activating..." : "Activate Annual"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
