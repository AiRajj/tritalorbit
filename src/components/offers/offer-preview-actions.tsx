"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function OfferPreviewActions({ offerId, token }: { offerId: string; token: string }) {
  const [sending, setSending] = useState(false);

  async function sendToCandidate() {
    setSending(true);
    const response = await fetch(`/api/offers/${offerId}/send`, { method: "POST" });
    setSending(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to send offer");
      return;
    }

    toast.success("Offer sent to candidate");
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}/candidate/offer/${token}`);
    toast.success("Candidate link copied");
  }

  function downloadPdf() {
    window.open(`/api/exports/pdf?offerId=${offerId}`, "_blank");
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={sendToCandidate} disabled={sending}>
        {sending ? "Sending..." : "Send to Candidate"}
      </Button>
      <Button variant="outline" onClick={copyLink}>
        Copy Link
      </Button>
      <Button variant="outline" onClick={downloadPdf}>
        Download PDF
      </Button>
      <Button variant="secondary" asChild>
        <a href={`/agency/offers/create?edit=${offerId}`}>Edit Offer</a>
      </Button>
    </div>
  );
}
