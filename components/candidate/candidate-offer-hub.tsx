"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BedDouble, Car, CheckCircle2, HelpCircle, Plane, Send } from "lucide-react";

import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { housingOptions } from "@/lib/content";
import { formatCurrency } from "@/lib/utils";

export function CandidateOfferHub({ token }: { token: string }) {
  const [accepted, setAccepted] = useState(false);
  const { notify } = useToast();
  const offerId = token === "demo-token" ? "orbit-demo-offer" : token;

  useEffect(() => {
    void fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "viewed_offer", offerId, token })
    });
  }, [offerId, token]);

  async function track(type: string) {
    await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, offerId, token })
    });
  }

  async function action(type: string, title: string) {
    await track(type);
    if (type === "accepted_offer") setAccepted(true);
    notify({ title, body: "Your recruiter and support team can see this update." });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[2rem] bg-[#0B3C5D] p-6 text-white shadow-2xl">
          <StatusBadge label="Powered by TRITAL Orbit™" tone="red" />
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em]">Maya, your Phoenix ICU assignment is ready to review.</h1>
          <p className="mt-4 leading-7 text-slate-200">
            This hub brings together pay, assignment details, housing, travel, transportation, and the people who can help.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Card><p className="text-sm font-bold text-slate-500">Weekly pay</p><p className="mt-2 text-3xl font-black">{formatCurrency(2680)}</p></Card>
          <Card><p className="text-sm font-bold text-slate-500">Duration</p><p className="mt-2 text-3xl font-black">13 weeks</p></Card>
          <Card><p className="text-sm font-bold text-slate-500">Facility city/state</p><p className="mt-2 text-3xl font-black">Phoenix, AZ</p></Card>
          <Card><p className="text-sm font-bold text-slate-500">Start date</p><p className="mt-2 text-3xl font-black">Jun 3</p></Card>
        </div>

        <div className="mt-5 grid gap-4">
          {[
            { icon: Plane, title: "Travel support", type: "clicked_travel", href: `/candidate/booking-request/${offerId}` },
            { icon: BedDouble, title: "Housing support", type: "clicked_housing", href: "/candidate/housing" },
            { icon: Car, title: "Car support", type: "requested_car", href: `/candidate/booking-request/${offerId}` }
          ].map((item) => (
            <Link key={item.title} href={item.href} onClick={() => track(item.type)}>
              <Card className="flex items-center gap-4 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0B3C5D]/10">
                  <item.icon className="h-6 w-6 text-[#0B3C5D]" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-slate-950">{item.title}</p>
                  <p className="text-sm text-slate-500">Request help or review available options.</p>
                </div>
                <StatusBadge label="Available" tone="green" />
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mt-5">
          <h2 className="text-2xl font-black text-[#0B3C5D]">Verified housing options</h2>
          <div className="mt-4 grid gap-3">
            {housingOptions.map((option) => (
              <div key={option.title} className="rounded-3xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-black text-slate-900">{option.title}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {option.city}, {option.state} - {option.distance} - {option.cost}
                    </p>
                  </div>
                  <StatusBadge label="Verified" tone="green" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-5">
          <h2 className="text-2xl font-black text-[#0B3C5D]">Move checklist</h2>
          <div className="mt-4 grid gap-3">
            {["Review offer", "Choose housing path", "Confirm travel date", "Upload documents", "Complete first-week plan"].map((item, index) => (
              <p key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className={`h-5 w-5 ${index < 2 || accepted ? "text-emerald-600" : "text-slate-300"}`} />
                {item}
              </p>
            ))}
          </div>
        </Card>

        <Card className="mt-5">
          <h2 className="text-xl font-black text-[#0B3C5D]">Trust and support</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Recruiter: Riley Recruiter, riley@agency.com</p>
          <p className="text-sm leading-6 text-slate-600">Support: concierge@tritalorbit.com</p>
        </Card>

        <div className="sticky bottom-0 mt-5 grid gap-3 rounded-t-[2rem] bg-[#F8FAFC]/95 py-4 backdrop-blur">
          <Button onClick={() => action("accepted_offer", "Offer accepted")} size="lg" disabled={accepted}>
            <CheckCircle2 className="h-4 w-4" />
            {accepted ? "Offer Accepted" : "Accept Offer"}
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline">
              <Link href={`/candidate/booking-request/${offerId}`} onClick={() => track("requested_support")}>
                <Send className="h-4 w-4" />
                Request support
              </Link>
            </Button>
            <Button onClick={() => action("asked_question", "Question sent")} variant="outline">
              <HelpCircle className="h-4 w-4" />
              Ask recruiter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
