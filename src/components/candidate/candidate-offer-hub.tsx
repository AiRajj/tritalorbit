"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OfferHubProps = {
  token: string;
  offerId: string;
  candidateName: string;
  weeklyPay: number;
  durationWeeks: number;
  location: string;
  facilityName: string;
  perks: { name: string; enabled: boolean }[];
  housingOptions: Array<{ id: string; title: string; monthlyCost: number }>;
  travelOptions: Array<{ id: string; providerName: string; estimatedCost: number }>;
  carOptions: Array<{ id: string; providerName: string; weeklyCost: number }>;
};

async function track(token: string, event: string) {
  await fetch(`/api/candidate/offers/${token}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event })
  });
}

export function CandidateOfferHub(props: OfferHubProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void track(props.token, "viewed_offer");
  }, [props.token]);

  async function acceptOffer() {
    setLoading(true);
    await track(props.token, "accepted_offer");
    setLoading(false);
    toast.success("Offer accepted. Your recruiter has been notified.");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Hi {props.candidateName}, your assignment offer is ready</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p><span className="font-medium">Facility:</span> {props.facilityName}</p>
          <p><span className="font-medium">Location:</span> {props.location}</p>
          <p><span className="font-medium">Weekly Pay:</span> ${props.weeklyPay.toLocaleString()}</p>
          <p><span className="font-medium">Duration:</span> {props.durationWeeks} weeks</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Powered by TRITAL Orbit™</p>
          <p className="text-xs text-slate-500">Support contact: support@tritalorbit.com</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Included mobility support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-slate-700">
          {props.perks.filter((perk) => perk.enabled).map((perk) => (
            <p key={perk.name}>• {perk.name}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Housing options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          {props.housingOptions.length > 0 ? (
            props.housingOptions.map((option) => (
              <div key={option.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-medium">{option.title}</p>
                <p>${option.monthlyCost.toLocaleString()} / month</p>
              </div>
            ))
          ) : (
            <p>No verified housing options published yet.</p>
          )}
          <Button variant="outline" onClick={() => track(props.token, "clicked_housing")}>Request Housing Support</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Travel and transportation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          {props.travelOptions.map((option) => (
            <p key={option.id}>• {option.providerName} from ${option.estimatedCost}</p>
          ))}
          {props.carOptions.map((option) => (
            <p key={option.id}>• {option.providerName} from ${option.weeklyCost}/week</p>
          ))}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => track(props.token, "clicked_travel")}>Request Travel Support</Button>
            <Button variant="outline" onClick={() => track(props.token, "requested_support")}>Request Car Support</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Move checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-slate-700">
          <p>• Confirm assignment acceptance</p>
          <p>• Finalize housing and travel</p>
          <p>• Upload compliance documents</p>
          <p>• Confirm first-week readiness call</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button onClick={acceptOffer} disabled={loading}>{loading ? "Processing..." : "Accept Offer"}</Button>
        <Button variant="outline" asChild>
          <a href={`/candidate/offer/${props.token}/request-mobility`}>Request Housing/Travel Support</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="mailto:support@tritalorbit.com">Ask the Orbit Concierge</a>
        </Button>
      </div>
    </div>
  );
}
