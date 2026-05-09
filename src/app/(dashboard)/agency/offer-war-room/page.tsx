"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Item = {
  id: string;
  closeProbability: number;
  engagementScore: number;
  mobilityFrictionScore: number;
  recommendedAction?: string | null;
};

export default function OfferWarRoomPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadItems() {
    const response = await fetch('/api/offer-war-room/intelligence');
    if (!response.ok) return;
    const data = (await response.json()) as { items: Item[] };
    setItems(data.items ?? []);
  }

  useEffect(() => {
    void loadItems();
  }, []);

  async function createItem(formData: FormData) {
    setLoading(true);
    const payload = {
      offerId: formData.get('offerId'),
      candidateId: formData.get('candidateId'),
      assignmentId: formData.get('assignmentId')
    };

    const response = await fetch('/api/offer-war-room/intelligence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    if (!response.ok) {
      toast.error('Unable to create war room insight.');
      return;
    }

    toast.success('War room insight created.');
    await loadItems();
  }

  return (
    <div className="space-y-6">
      <section className="orbit-dark-panel rounded-2xl p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Offer War Room</p>
        <h1 className="mt-2 text-3xl font-semibold">Rescue at-risk offers with AI next-best-actions</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-100">
          Prioritize recruiter effort using close probability, mobility friction, urgency, and engagement signals.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Open intelligence records", String(items.length)],
          ["High-risk (mobility friction > 40%)", String(items.filter((i) => i.mobilityFrictionScore > 0.4).length)],
          ["Strong close probability (>70%)", String(items.filter((i) => i.closeProbability > 0.7).length)],
          ["Needs immediate outreach", String(items.filter((i) => i.engagementScore < 0.6).length)]
        ].map(([label, value], idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: idx * 0.04 }}
          >
            <Card>
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create war room insight</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createItem} className="grid gap-3 md:grid-cols-3">
            <Input name="offerId" placeholder="Offer ID" required />
            <Input name="candidateId" placeholder="Candidate ID" required />
            <Input name="assignmentId" placeholder="Assignment ID" required />
            <Button className="md:col-span-3" disabled={loading}>{loading ? 'Saving...' : 'Add insight'}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guided outreach workflow</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-slate-700 md:grid-cols-3">
          <p className="rounded-md border border-slate-100 bg-slate-50 p-3">
            <span className="font-semibold text-slate-900">1. Detect risk:</span> prioritize by close probability and
            mobility friction.
          </p>
          <p className="rounded-md border border-slate-100 bg-slate-50 p-3">
            <span className="font-semibold text-slate-900">2. Execute play:</span> send AI-guided SMS/email/call +
            sponsor wallet credit.
          </p>
          <p className="rounded-md border border-slate-100 bg-slate-50 p-3">
            <span className="font-semibold text-slate-900">3. Measure impact:</span> track engagement lift and
            acceptance progression.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {items.length === 0 ? (
          <Card>
            <CardContent className="p-5 text-sm text-slate-600">No offer intelligence records yet.</CardContent>
          </Card>
        ) : (
          items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: index * 0.03 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Insight {item.id.slice(0, 8)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-700">
                  <p>Close probability: {(item.closeProbability * 100).toFixed(0)}%</p>
                  <p>Engagement score: {(item.engagementScore * 100).toFixed(0)}%</p>
                  <p>Mobility friction: {(item.mobilityFrictionScore * 100).toFixed(0)}%</p>
                  <p className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600">
                    {item.recommendedAction ?? "No action recommendation yet."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
