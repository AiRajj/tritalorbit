"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SelectBidButton({ requestId, bidId }: { requestId: string; bidId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSelect() {
    setLoading(true);
    const response = await fetch(`/api/mobility-exchange/requests/${requestId}/select-bid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bidId })
    });
    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to select bid");
      return;
    }

    toast.success("Travel bid selected");
    router.refresh();
  }

  return (
    <Button size="sm" onClick={onSelect} disabled={loading}>
      {loading ? "Selecting..." : "Select Bid"}
    </Button>
  );
}
