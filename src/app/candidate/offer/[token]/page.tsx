import { notFound } from "next/navigation";

import { CandidateOfferActions } from "@/components/candidate/candidate-offer-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCandidateHousingOptions,
  getCarOptions,
  getOfferByToken,
  getTravelOptions,
} from "@/lib/dashboard-data";
import { formatCurrency } from "@/lib/utils";

import { OfferViewTracker } from "./tracker";

export default async function CandidateOfferPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const offer = await getOfferByToken(token);

  if (!offer) {
    notFound();
  }

  const [housingOptions, travelOptions, carOptions] = await Promise.all([
    getCandidateHousingOptions(offer.assignment.city, offer.assignment.state),
    getTravelOptions(offer.candidateId),
    getCarOptions(offer.candidateId),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      <OfferViewTracker token={token} offerId={offer.id} />
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="rounded-2xl bg-gradient-to-r from-[#0B3C5D] to-[#1F2937] p-6 text-white">
          <p className="text-sm text-blue-200">Powered by TRITAL Orbit™</p>
          <h1 className="mt-2 text-2xl font-semibold">Welcome {offer.candidate.fullName.split(" ")[0]}</h1>
          <p className="mt-1 text-blue-100">Your assignment offer is ready for review.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <p><span className="text-slate-500">Weekly Pay:</span> <strong>{formatCurrency(offer.weeklyPay)}</strong></p>
            <p><span className="text-slate-500">Contract Value:</span> <strong>{formatCurrency(offer.estimatedContractValue)}</strong></p>
            <p><span className="text-slate-500">Duration:</span> {offer.assignment.durationWeeks} weeks</p>
            <p><span className="text-slate-500">Facility:</span> {offer.assignment.facilityName}</p>
            <p><span className="text-slate-500">Location:</span> {offer.assignment.city}, {offer.assignment.state}</p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader><CardTitle className="text-base">Travel support</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">
              {travelOptions.length ? `${travelOptions.length} options available` : "Options will be curated by concierge on request."}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Housing options</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">
              {housingOptions.length ? `${housingOptions.length} verified options found` : "No verified units matched yet."}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Car rental</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">
              {carOptions.length ? `${carOptions.length} transportation options ready` : "Car options can be requested from concierge."}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Move Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            {[
              "Confirm housing preferences",
              "Select travel support option",
              "Upload required documents",
              "Review first-week readiness guidance",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 px-3 py-2">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <CandidateOfferActions token={token} offerId={offer.id} />
      </div>
    </main>
  );
}
