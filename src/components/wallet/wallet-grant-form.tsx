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

export function WalletGrantForm({ candidates }: { candidates: CandidateOption[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      candidateId: formData.get("candidateId"),
      amount: Number(formData.get("amount")),
      description: formData.get("description"),
      travelRequestId: formData.get("travelRequestId") || undefined
    };

    const response = await fetch("/api/wallet/grant-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to grant travel credit");
      return;
    }

    toast.success("Travel credit granted to candidate");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <Label htmlFor="candidateId">Candidate</Label>
        <select
          id="candidateId"
          name="candidateId"
          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
          required
        >
          <option value="">Select candidate</option>
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="amount">Credit Amount ($)</Label>
        <Input id="amount" name="amount" type="number" min={1} step="0.01" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" defaultValue="Travel credit grant" required />
      </div>
      <div>
        <Label htmlFor="travelRequestId">Travel Request ID (optional)</Label>
        <Input id="travelRequestId" name="travelRequestId" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Granting..." : "Grant Credit"}
      </Button>
    </form>
  );
}
