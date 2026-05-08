"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CandidateOfferActions({ token, offerId }: { token: string; offerId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function log(action: string, metadata?: Record<string, unknown>) {
    await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, offerId, action, metadata }),
    });
  }

  async function acceptOffer() {
    setLoading(true);
    await log("OFFER_ACCEPTED");
    setLoading(false);
    toast.success("Offer accepted. Your recruiter has been notified.");
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button onClick={acceptOffer} disabled={loading}>
        {loading ? "Processing..." : "Accept Offer"}
      </Button>
      <Button variant="outline" onClick={() => router.push(`/candidate/booking-request/${offerId}`)}>
        Request Travel Support
      </Button>
      <Button variant="outline" onClick={() => router.push(`/candidate/booking-request/${offerId}`)}>
        Request Housing Support
      </Button>
      <Button variant="outline" onClick={() => router.push(`/candidate/booking-request/${offerId}`)}>
        Request Car Support
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          log("ASKED_RECRUITER_QUESTION");
          toast.success("Your recruiter has been notified.");
        }}
      >
        Ask Recruiter a Question
      </Button>
    </div>
  );
}
