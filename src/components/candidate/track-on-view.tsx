"use client";
import * as React from "react";

export function CandidateTrackOnView({ token }: { token: string }) {
  React.useEffect(() => {
    fetch("/api/candidate/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, event: "viewed" }),
    }).catch(() => {});
  }, [token]);
  return null;
}
