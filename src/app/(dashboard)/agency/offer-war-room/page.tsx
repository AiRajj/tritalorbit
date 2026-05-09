"use client";

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

      <div className="grid gap-4 md:grid-cols-2">
        {items.length === 0 ? (
          <Card>
            <CardContent className="p-5 text-sm text-slate-600">No offer intelligence records yet.</CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-base">Insight {item.id.slice(0, 8)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <p>Close probability: {(item.closeProbability * 100).toFixed(0)}%</p>
                <p>Engagement score: {(item.engagementScore * 100).toFixed(0)}%</p>
                <p>Mobility friction: {(item.mobilityFrictionScore * 100).toFixed(0)}%</p>
                <p>{item.recommendedAction ?? 'No action recommendation yet.'}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
