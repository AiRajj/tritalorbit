"use client";

import { useEffect } from "react";

export function OfferViewTracker({ token, offerId }: { token: string; offerId: string }) {
  useEffect(() => {
    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, offerId, action: "OFFER_VIEWED" }),
    }).catch(() => undefined);
  }, [token, offerId]);

  return null;
}
