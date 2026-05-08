"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Copy, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OfferPreviewActions({
  offerId,
  portalPath,
}: {
  offerId: string;
  portalPath: string;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState<"send" | "copy" | "pdf" | null>(null);

  const url = typeof window !== "undefined" ? `${window.location.origin}${portalPath}` : portalPath;

  const onSend = async () => {
    setPending("send");
    try {
      const res = await fetch(`/api/offers/${offerId}/send`, { method: "POST" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error("Failed");
      toast.success("Offer sent", { description: "Candidate hub URL is now active." });
      router.refresh();
    } catch {
      toast.error("Couldn't send offer.");
    } finally {
      setPending(null);
    }
  };

  const onCopy = async () => {
    setPending("copy");
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Candidate hub link copied");
    } catch {
      toast.error("Clipboard unavailable.");
    } finally {
      setPending(null);
    }
  };

  const onPdf = async () => {
    setPending("pdf");
    try {
      window.print();
      toast.message("Print-to-PDF opened");
    } finally {
      setPending(null);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={onCopy} disabled={pending !== null}>
        <Copy className="h-4 w-4" /> Copy link
      </Button>
      <Button variant="outline" onClick={onPdf} disabled={pending !== null}>
        <Download className="h-4 w-4" /> PDF
      </Button>
      <Button onClick={onSend} disabled={pending !== null}>
        <Send className="h-4 w-4" /> {pending === "send" ? "Sending…" : "Send to candidate"}
      </Button>
    </>
  );
}
