"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {
  bidId: string;
  paymentResponsibility?: "AGENCY" | "CANDIDATE" | "SHARED" | "WALLET_CREDIT";
  label?: string;
  variant?: "default" | "outline";
};

export function AcceptBidButton({ bidId, paymentResponsibility = "AGENCY", label = "Accept bid", variant = "default" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onAccept() {
    setLoading(true);
    const response = await fetch(`/api/mobility/bids/${bidId}/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentResponsibility })
    });
    setLoading(false);

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: "Unable to accept bid" }));
      toast.error(err.error ?? "Unable to accept bid");
      return;
    }

    toast.success("Bid accepted. Booking confirmation generated.");
    router.refresh();
  }

  return (
    <Button onClick={onAccept} disabled={loading} variant={variant} size="sm" className="w-full">
      {loading ? "Accepting..." : label}
    </Button>
  );
}
