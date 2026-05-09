"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RedeemTarget = {
  requestId: string;
  bidId?: string;
  label: string;
};

export function WalletRedeemForm({ targets }: { targets: RedeemTarget[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const selectedTargetId = String(formData.get("target") ?? "");
    const selectedTarget = targets.find((target) => target.requestId === selectedTargetId);

    const payload = {
      amount: Number(formData.get("amount")),
      description: formData.get("description"),
      travelRequestId: selectedTarget?.requestId,
      travelBidId: selectedTarget?.bidId
    };

    const response = await fetch("/api/wallet/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to redeem wallet credits");
      return;
    }

    toast.success("Wallet redemption submitted");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <Label htmlFor="target">Redeem For</Label>
        <select
          id="target"
          name="target"
          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
        >
          <option value="">General redemption</option>
          {targets.map((target) => (
            <option value={target.requestId} key={target.requestId}>
              {target.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="amount">Amount ($)</Label>
        <Input id="amount" name="amount" type="number" min={1} step="0.01" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" defaultValue="Candidate travel redemption" required />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Redeeming..." : "Redeem Credits"}
      </Button>
    </form>
  );
}
