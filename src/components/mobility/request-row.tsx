import Link from "next/link";
import { Plane, Home, Car, Hotel, Sparkles, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TYPE_META = {
  FLIGHT: { icon: Plane, label: "Flight" },
  HOUSING: { icon: Home, label: "Housing" },
  CAR_RENTAL: { icon: Car, label: "Car rental" },
  HOTEL: { icon: Hotel, label: "Hotel" },
  FULL_RELOCATION_PACKAGE: { icon: Sparkles, label: "Full relocation" }
} as const;

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline",
  OPEN_FOR_BIDS: "default",
  REVIEWING: "secondary",
  BID_ACCEPTED: "secondary",
  EXPIRED: "outline",
  CANCELLED: "outline",
  COMPLETED: "secondary"
};

const URGENCY_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  LOW: "outline",
  MEDIUM: "secondary",
  HIGH: "default",
  CRITICAL: "destructive"
};

type Props = {
  href: string;
  request: {
    id: string;
    candidateName: string;
    destinationCity: string;
    destinationState: string;
    facilityName: string | null;
    requestType: keyof typeof TYPE_META;
    status: string;
    bidCount: number;
    moveDate: Date | null;
    budgetMax: number | null;
    urgencyLevel: string;
    createdAt: Date;
  };
};

export function MobilityRequestRow({ href, request }: Props) {
  const meta = TYPE_META[request.requestType];
  const Icon = meta.icon;

  return (
    <Link
      href={href}
      className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orbit-blue/50 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-orbit-blue/10 p-2 text-orbit-blue">
            <Icon className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-slate-900">{request.candidateName}</p>
            <p className="text-xs text-slate-500">
              {meta.label} • {request.destinationCity}, {request.destinationState}
              {request.facilityName ? ` · ${request.facilityName}` : ""}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
              {request.moveDate ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Move {request.moveDate.toLocaleDateString()}
                </span>
              ) : null}
              {request.budgetMax ? <span>Budget ≤ ${request.budgetMax.toLocaleString()}</span> : null}
              <span>{request.bidCount} bid{request.bidCount === 1 ? "" : "s"}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant={STATUS_VARIANT[request.status] ?? "secondary"}>{request.status.replace(/_/g, " ")}</Badge>
          <Badge variant={URGENCY_VARIANT[request.urgencyLevel] ?? "secondary"}>{request.urgencyLevel}</Badge>
        </div>
      </div>
    </Link>
  );
}
