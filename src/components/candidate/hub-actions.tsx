"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CandidateHubActions({
  token,
  offerId,
  isResponded,
  alreadyAccepted,
}: {
  token: string;
  offerId: string;
  isResponded: boolean;
  alreadyAccepted: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState<string | null>(null);

  const track = (event: "clickedHousing" | "clickedTravel" | "clickedCar" | "askedRecruiter") => {
    fetch("/api/candidate/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, event }),
    }).catch(() => {});
  };

  const onAccept = async () => {
    setPending("accept");
    try {
      const res = await fetch("/api/candidate/respond", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, decision: "ACCEPTED" }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error("Failed");
      toast.success("Offer accepted", { description: "Your concierge will reach out within 24h." });
      router.refresh();
    } catch {
      toast.error("Couldn't accept offer.");
    } finally {
      setPending(null);
    }
  };

  if (isResponded) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 className="h-4 w-4" />
          {alreadyAccepted ? "You've accepted this offer." : "Response recorded."}
        </div>
        <p className="mt-1 text-xs">
          {alreadyAccepted
            ? "Your concierge team is now activating housing, travel, and Day-1 readiness."
            : "Your recruiter has been notified."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={onAccept}
        disabled={pending !== null}
        className="w-full"
        variant="default"
        size="xl"
      >
        {pending === "accept" ? "Accepting…" : "Accept this offer"}
      </Button>

      <div className="grid gap-2 md:grid-cols-3">
        <Button asChild variant="outline" onClick={() => track("clickedTravel")}>
          <Link href={`/candidate/booking-request/${offerId}?need=flight`}>Request travel</Link>
        </Button>
        <Button asChild variant="outline" onClick={() => track("clickedHousing")}>
          <Link href={`/candidate/booking-request/${offerId}?need=housing`}>Request housing</Link>
        </Button>
        <Button asChild variant="outline" onClick={() => track("clickedCar")}>
          <Link href={`/candidate/booking-request/${offerId}?need=car`}>Request car</Link>
        </Button>
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          track("askedRecruiter");
          toast.success("Got it — your recruiter will reach out shortly.");
        }}
        className="w-full"
      >
        <MessageSquare className="h-4 w-4" /> Ask recruiter a question
      </Button>
    </div>
  );
}
