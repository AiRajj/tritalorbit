import { CheckCircle2, Shield, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  bid: {
    id: string;
    vendorName: string;
    packageName: string;
    totalPrice: number;
    estimatedSavings: number | null;
    status: string;
    bidType: string;
    conciergeRecommended: boolean;
    bidScore: number | null;
    cancellationPolicy: string | null;
    refundability: string | null;
    housingDistanceToFacility: number | null;
    airlineName: string | null;
    flightNumber: string | null;
    departureTime: Date | null;
    arrivalTime: Date | null;
    stops: number | null;
    hotelName: string | null;
    nightlyRate: number | null;
    carRentalCompany: string | null;
    carClass: string | null;
    housingAddress: string | null;
    monthlyCost: number | null;
  };
  actions?: React.ReactNode;
};

export function BidCard({ bid, actions }: Props) {
  const isWinning = bid.status === "ACCEPTED";
  return (
    <Card className={isWinning ? "border-emerald-300 ring-1 ring-emerald-200" : ""}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <div>
          <p className="text-sm font-medium text-slate-900">{bid.packageName}</p>
          <p className="text-xs text-slate-500">{bid.vendorName} • {bid.bidType.replace(/_/g, " ")}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {bid.conciergeRecommended ? (
            <Badge>
              <Star className="mr-1 h-3 w-3" /> Concierge pick
            </Badge>
          ) : null}
          {bid.bidScore !== null ? (
            <span className="text-xs text-slate-500">Score {bid.bidScore}</span>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-700">
        <div className="flex items-baseline justify-between">
          <span className="text-xs uppercase tracking-wide text-slate-500">Total</span>
          <span className="text-lg font-semibold text-slate-900">${bid.totalPrice.toLocaleString()}</span>
        </div>
        {bid.estimatedSavings ? (
          <p className="text-xs text-emerald-700">Estimated savings ${bid.estimatedSavings.toLocaleString()}</p>
        ) : null}
        {bid.bidType === "FLIGHT" && bid.airlineName ? (
          <div className="rounded-md bg-slate-50 p-2 text-xs">
            <p>{bid.airlineName} {bid.flightNumber}</p>
            {bid.departureTime && bid.arrivalTime ? (
              <p>{bid.departureTime.toLocaleString()} → {bid.arrivalTime.toLocaleString()}</p>
            ) : null}
            <p>{(bid.stops ?? 0) === 0 ? "Nonstop" : `${bid.stops} stop`}</p>
          </div>
        ) : null}
        {bid.bidType === "HOUSING" && bid.housingAddress ? (
          <div className="rounded-md bg-slate-50 p-2 text-xs">
            <p>{bid.housingAddress}</p>
            {bid.monthlyCost ? <p>${bid.monthlyCost.toLocaleString()} / month</p> : null}
            {bid.housingDistanceToFacility !== null ? (
              <p>{bid.housingDistanceToFacility} miles to facility</p>
            ) : null}
          </div>
        ) : null}
        {bid.bidType === "CAR_RENTAL" && bid.carRentalCompany ? (
          <div className="rounded-md bg-slate-50 p-2 text-xs">
            <p>{bid.carRentalCompany} {bid.carClass}</p>
          </div>
        ) : null}
        {bid.bidType === "HOTEL" && bid.hotelName ? (
          <div className="rounded-md bg-slate-50 p-2 text-xs">
            <p>{bid.hotelName}</p>
            {bid.nightlyRate ? <p>${bid.nightlyRate}/night</p> : null}
          </div>
        ) : null}
        {bid.cancellationPolicy ? (
          <p className="flex items-start gap-1 text-xs text-slate-500">
            <Shield className="mt-0.5 h-3 w-3" /> {bid.cancellationPolicy}
          </p>
        ) : null}
        {isWinning ? (
          <p className="flex items-center gap-1 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-3 w-3" /> Accepted — booking in flight
          </p>
        ) : null}
        {actions ? <div className="pt-2">{actions}</div> : null}
      </CardContent>
    </Card>
  );
}
