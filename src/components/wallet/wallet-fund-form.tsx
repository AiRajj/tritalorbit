"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WalletFundForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      amount: Number(formData.get("amount")),
      description: formData.get("description"),
      referenceCode: formData.get("referenceCode")
    };

    const response = await fetch("/api/wallet/fund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      toast.error(data.error ?? "Unable to fund wallet");
      return;
    }

    toast.success("Agency wallet funded");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <Label htmlFor="amount">Funding Amount ($)</Label>
        <Input id="amount" name="amount" type="number" min={1} step="0.01" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" defaultValue="Agency wallet funding" required />
      </div>
      <div>
        <Label htmlFor="referenceCode">Reference Code (optional)</Label>
        <Input id="referenceCode" name="referenceCode" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Funding..." : "Fund Wallet"}
      </Button>
    </form>
  );
}
