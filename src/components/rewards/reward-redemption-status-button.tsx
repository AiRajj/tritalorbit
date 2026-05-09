"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function RewardRedemptionStatusButton({
  redemptionId,
  status,
  label
}: {
  redemptionId: string;
  status: "APPROVED" | "FULFILLED" | "REJECTED" | "CANCELLED";
  label: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onUpdate() {
    setLoading(true);
    const response = await fetch("/api/rewards/redemptions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ redemptionId, status })
    });
    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to update redemption");
      return;
    }

    toast.success(`Redemption updated to ${status}`);
    router.refresh();
  }

  return (
    <Button size="sm" variant="outline" onClick={onUpdate} disabled={loading}>
      {loading ? "Updating..." : label}
    </Button>
  );
}
