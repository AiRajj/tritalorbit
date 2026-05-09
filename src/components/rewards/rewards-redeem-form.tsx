"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RewardsRedeemForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      rewardName: formData.get("rewardName"),
      pointsRedeemed: Number(formData.get("pointsRedeemed")),
      rewardValue: formData.get("rewardValue")
    };

    const response = await fetch("/api/rewards/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to redeem reward");
      return;
    }

    toast.success("Reward redemption requested");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <Label htmlFor="rewardName">Reward</Label>
        <Input id="rewardName" name="rewardName" placeholder="$100 Travel Voucher" required />
      </div>
      <div>
        <Label htmlFor="pointsRedeemed">Points to Redeem</Label>
        <Input id="pointsRedeemed" name="pointsRedeemed" type="number" min={1} required />
      </div>
      <div>
        <Label htmlFor="rewardValue">Reward Value</Label>
        <Input id="rewardValue" name="rewardValue" placeholder="Voucher delivered within 24h" required />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Redeem Reward"}
      </Button>
    </form>
  );
}
