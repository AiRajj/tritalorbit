"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function OfferPreviewActions({ offerId, token }: { offerId: string; token: string }) {
  const [sending, setSending] = useState(false);

  async function sendOffer() {
    setSending(true);
    const res = await fetch(`/api/offers/${offerId}/send`, {
      method: "POST",
    });
    setSending(false);

    if (!res.ok) {
      toast.error("Failed to send offer.");
      return;
    }

    toast.success("Offer sent to candidate portal.");
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={sendOffer} disabled={sending}>
        {sending ? "Sending..." : "Send to Candidate"}
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}/candidate/offer/${token}`);
          toast.success("Candidate link copied.");
        }}
      >
        Copy Link
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          window.print();
        }}
      >
        Download PDF
      </Button>
      <a href="/agency/offers/create">
        <Button variant="ghost">Edit Offer</Button>
      </a>
    </div>
  );
}
