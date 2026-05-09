"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type InternalOffer = {
  id: string;
  label: string;
};

type ExternalOffer = {
  id: string;
  label: string;
};

function toggle(id: string, values: string[], setter: (next: string[]) => void) {
  if (values.includes(id)) {
    setter(values.filter((value) => value !== id));
  } else {
    setter([...values, id]);
  }
}

export function OfferComparisonRunner({
  candidateId,
  internalOffers,
  externalOffers
}: {
  candidateId?: string;
  internalOffers: InternalOffer[];
  externalOffers: ExternalOffer[];
}) {
  const router = useRouter();
  const [selectedInternal, setSelectedInternal] = useState<string[]>([]);
  const [selectedExternal, setSelectedExternal] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function runComparison() {
    setLoading(true);

    const payload = {
      candidateId,
      internalOfferIds: selectedInternal,
      externalOfferIds: selectedExternal,
      primaryOfferId: selectedInternal[0]
    };

    const response = await fetch("/api/offer-comparisons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to run comparison");
      return;
    }

    toast.success("Comparison generated");
    router.refresh();
  }

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <Label>Internal offers</Label>
        <div className="mt-2 grid gap-2 text-sm text-slate-700">
          {internalOffers.map((offer) => (
            <label key={offer.id} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedInternal.includes(offer.id)}
                onChange={() => toggle(offer.id, selectedInternal, setSelectedInternal)}
              />
              {offer.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label>External offers</Label>
        <div className="mt-2 grid gap-2 text-sm text-slate-700">
          {externalOffers.map((offer) => (
            <label key={offer.id} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedExternal.includes(offer.id)}
                onChange={() => toggle(offer.id, selectedExternal, setSelectedExternal)}
              />
              {offer.label}
            </label>
          ))}
        </div>
      </div>

      <Button onClick={runComparison} disabled={loading}>
        {loading ? "Analyzing..." : "Run Multi-Offer Comparison"}
      </Button>
    </div>
  );
}
