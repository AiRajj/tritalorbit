"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CandidateOption = {
  id: string;
  name: string;
};

export function RewardsAwardForm({ candidates }: { candidates: CandidateOption[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      candidateId: formData.get("candidateId"),
      type: formData.get("type"),
      points: Number(formData.get("points")),
      description: formData.get("description")
    };

    const response = await fetch("/api/rewards/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to award points");
      return;
    }

    toast.success("Orbit Rewards points awarded");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <Label htmlFor="candidateId">Candidate</Label>
        <select id="candidateId" name="candidateId" className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm" required>
          <option value="">Select candidate</option>
          {candidates.map((candidate) => (
            <option value={candidate.id} key={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="type">Event Type</Label>
          <select id="type" name="type" className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm" defaultValue="ASSIGNMENT_COMPLETED">
            <option value="ASSIGNMENT_COMPLETED">Assignment Completed</option>
            <option value="QUICK_ACCEPTANCE">Quick Acceptance</option>
            <option value="VENDOR_BOOKING">Vendor Booking</option>
            <option value="REFERRAL">Referral</option>
            <option value="BONUS">Bonus</option>
            <option value="MANUAL_ADJUSTMENT">Manual Adjustment</option>
          </select>
        </div>
        <div>
          <Label htmlFor="points">Points</Label>
          <Input id="points" name="points" type="number" min={1} defaultValue={150} required />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" defaultValue="Assignment completion bonus" required />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Awarding..." : "Award Points"}
      </Button>
    </form>
  );
}
