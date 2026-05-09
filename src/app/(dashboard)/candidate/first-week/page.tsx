"use client";

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
          guides.map((guide) => (
            <Card key={guide.id}>
              <CardHeader>
                <CardTitle className="text-base">Guide {guide.id.slice(0, 8)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <p>Confidence score: {guide.firstWeekConfidenceScore}/100</p>
                <p>{guide.firstDayInstructions ?? 'No instructions added yet.'}</p>
                <p>Checklist items: {guide.checklistItems.length}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
