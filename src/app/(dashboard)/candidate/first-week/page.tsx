"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Guide = {
  id: string;
  firstWeekConfidenceScore: number;
  firstDayInstructions?: string | null;
  checklistItems: Array<{ id: string; title: string; completed: boolean }>;
};

export default function CandidateFirstWeekPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadGuides() {
    const response = await fetch('/api/first-week/guides');
    if (!response.ok) return;
    const data = (await response.json()) as { guides: Guide[] };
    setGuides(data.guides ?? []);
  }

  useEffect(() => {
    void loadGuides();
  }, []);

  async function createGuide(formData: FormData) {
    setLoading(true);
    const payload = {
      assignmentId: formData.get('assignmentId'),
      candidateId: formData.get('candidateId'),
      agencyId: formData.get('agencyId'),
      firstDayInstructions: formData.get('firstDayInstructions')
    };

    const response = await fetch('/api/first-week/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    if (!response.ok) {
      toast.error('Could not create first-week guide.');
      return;
    }

    toast.success('First-week guide created.');
    await loadGuides();
  }

  return (
    <div className="space-y-6">
      <section className="orbit-dark-panel rounded-2xl p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">First Week Survival Mode</p>
        <h1 className="mt-2 text-3xl font-semibold">Stay assignment-ready before day one</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-100">
          Build checklist-driven onboarding guidance with local logistics, safety notes, and emergency support context.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Guides available</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{guides.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Average confidence</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {guides.length
                ? `${Math.round(guides.reduce((acc, guide) => acc + guide.firstWeekConfidenceScore, 0) / guides.length)} / 100`
                : "--"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Checklist completion</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {guides.length
                ? `${Math.round(
                    (guides.reduce(
                      (acc, guide) => acc + guide.checklistItems.filter((item) => item.completed).length,
                      0
                    ) /
                      Math.max(guides.reduce((acc, guide) => acc + guide.checklistItems.length, 0), 1)) *
                      100
                  )}%`
                : "--"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create first-week guide</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createGuide} className="grid gap-3 md:grid-cols-2">
            <Input name="assignmentId" placeholder="Assignment ID" required />
            <Input name="candidateId" placeholder="Candidate ID" required />
            <Input name="agencyId" placeholder="Agency ID" required />
            <Input name="firstDayInstructions" placeholder="First day instructions" className="md:col-span-2" />
            <Button className="md:col-span-2" disabled={loading}>{loading ? 'Saving...' : 'Save guide'}</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {guides.length === 0 ? (
          <Card>
            <CardContent className="p-5 text-sm text-slate-600">No guides available yet. Create one to start readiness tracking.</CardContent>
          </Card>
        ) : (
          guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: index * 0.04 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Guide {guide.id.slice(0, 8)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-700">
                  <p>Confidence score: {guide.firstWeekConfidenceScore}/100</p>
                  <p>{guide.firstDayInstructions ?? "No instructions added yet."}</p>
                  <p>
                    Checklist items: {guide.checklistItems.filter((item) => item.completed).length}/
                    {guide.checklistItems.length}
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
