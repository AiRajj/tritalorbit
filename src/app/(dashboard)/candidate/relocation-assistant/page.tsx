"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Plan = {
  id: string;
  destinationCity: string;
  destinationState: string;
  moveTimeline?: string | null;
  risks?: string | null;
};

export default function RelocationAssistantPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadPlans() {
    const response = await fetch('/api/relocation/plans');
    if (!response.ok) return;
    const data = (await response.json()) as { plans: Plan[] };
    setPlans(data.plans ?? []);
  }

  useEffect(() => {
    void loadPlans();
  }, []);

  async function generatePlan(formData: FormData) {
    setLoading(true);
    const payload = {
      assignmentId: formData.get('assignmentId'),
      candidateId: formData.get('candidateId'),
      originCity: formData.get('originCity'),
      originState: formData.get('originState'),
      destinationCity: formData.get('destinationCity'),
      destinationState: formData.get('destinationState'),
      shift: formData.get('shift')
    };

    const response = await fetch('/api/relocation/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    if (!response.ok) {
      toast.error('Unable to generate relocation plan.');
      return;
    }

    toast.success('Relocation plan generated.');
    await loadPlans();
  }

  return (
    <div className="space-y-6">
      <section className="orbit-dark-panel rounded-2xl p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">AI Relocation Assistant</p>
        <h1 className="mt-2 text-3xl font-semibold">Generate a personalized move plan</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-100">
          Build assignment-specific relocation timelines, local orientation guidance, and risk mitigation actions.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Create plan</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={generatePlan} className="grid gap-3 md:grid-cols-2">
            <Input name="assignmentId" placeholder="Assignment ID" required />
            <Input name="candidateId" placeholder="Candidate ID" required />
            <Input name="originCity" placeholder="Origin city" required />
            <Input name="originState" placeholder="Origin state" required />
            <Input name="destinationCity" placeholder="Destination city" required />
            <Input name="destinationState" placeholder="Destination state" required />
            <Input name="shift" placeholder="Shift (optional)" className="md:col-span-2" />
            <Button className="md:col-span-2" disabled={loading}>{loading ? 'Generating...' : 'Generate plan'}</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {plans.length === 0 ? (
          <Card>
            <CardContent className="p-5 text-sm text-slate-600">No relocation plans yet.</CardContent>
          </Card>
        ) : (
          plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle className="text-base">{plan.destinationCity}, {plan.destinationState}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <p>{plan.moveTimeline ?? 'Timeline will appear after plan generation.'}</p>
                <p>Risk notes: {plan.risks ?? 'No major risks detected.'}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
