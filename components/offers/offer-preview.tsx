"use client";

import Link from "next/link";
import { useState } from "react";
import { Copy, Download, Mail, Pencil } from "lucide-react";

import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { housingOptions } from "@/lib/content";
import { formatCurrency } from "@/lib/utils";

export function OfferPreview({ offerId }: { offerId: string }) {
  const [sent, setSent] = useState(false);
  const { notify } = useToast();
  const candidateUrl = `/candidate/offer/${offerId === "orbit-demo-offer" ? "demo-token" : offerId}`;

  async function sendOffer() {
    const response = await fetch(`/api/offers/${offerId}/send`, { method: "POST" });
    setSent(response.ok);
    notify({
      title: "Offer sent to candidate",
      body: "Activity log, offer status, candidate portal URL, and notification record were handled."
    });
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}${candidateUrl}`);
    notify({ title: "Candidate link copied", body: "The tracked assignment hub URL is ready to share." });
  }

  function downloadPdf() {
    const text = "TRITAL Orbit enhanced offer PDF-ready export\n\nPhoenix ICU assignment with mobility support.";
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trital-orbit-offer.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6">
      <Card className="overflow-hidden bg-[#0B3C5D] text-white">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <StatusBadge label={sent ? "Sent" : "Premium offer preview"} tone={sent ? "green" : "red"} />
            <h1 className="mt-5 text-4xl font-black tracking-[-0.04em]">Maya Johnson - Phoenix ICU Assignment</h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-200">
              A high-confidence clinical start with weekly pay, housing support, travel coordination, transportation help, and
              first-week readiness built into the offer.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 text-[#1F2937]">
            <p className="text-sm font-bold text-slate-500">Candidate confidence score</p>
            <p className="mt-2 text-5xl font-black text-[#0B3C5D]">86</p>
          </div>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <p className="text-sm font-bold text-slate-500">Weekly pay</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{formatCurrency(2680)}</p>
        </Card>
        <Card>
          <p className="text-sm font-bold text-slate-500">Total assignment value</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{formatCurrency(34840)}</p>
        </Card>
        <Card>
          <p className="text-sm font-bold text-slate-500">Location</p>
          <p className="mt-2 text-3xl font-black text-slate-950">Phoenix, AZ</p>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {["Housing assistance", "Flight support", "Car rental coordination", "Relocation concierge", "First-week readiness", "Loyalty rewards"].map((perk) => (
          <Card key={perk} className="p-5">
            <StatusBadge label="Included" tone="green" />
            <p className="mt-4 text-lg font-black text-[#0B3C5D]">{perk}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Packaged into the offer as candidate-facing value, not a hidden operational task.</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <SupportBlock title="Housing support" body={`${housingOptions[0].title}, ${housingOptions[0].distance} from facility, ${housingOptions[0].cost}.`} />
        <SupportBlock title="Travel support" body="Flight search, reimbursement explanation, move date planning, and recruiter-approved escalation path." />
        <SupportBlock title="Transportation support" body="Car rental coordination and first-week arrival support are available from the candidate hub." />
      </div>
      <Card>
        <h2 className="text-2xl font-black text-[#0B3C5D]">AI-generated close strategy</h2>
        <p className="mt-4 leading-7 text-slate-600">
          Anchor on certainty: confirm housing timing, remove travel ambiguity, and invite Maya to accept after reviewing the
          mobile assignment hub. Suggested SMS: "Which part should we lock down first: housing, travel, or first-week logistics?"
        </p>
      </Card>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={sendOffer} size="lg">
          <Mail className="h-4 w-4" />
          Send to Candidate
        </Button>
        <Button type="button" onClick={copyLink} size="lg" variant="outline">
          <Copy className="h-4 w-4" />
          Copy Link
        </Button>
        <Button type="button" onClick={downloadPdf} size="lg" variant="outline">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/agency/offers/create">
            <Pencil className="h-4 w-4" />
            Edit Offer
          </Link>
        </Button>
      </div>
    </div>
  );
}

function SupportBlock({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <h3 className="text-xl font-black text-[#0B3C5D]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </Card>
  );
}
