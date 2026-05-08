import { notFound } from "next/navigation";
import { CandidateOfferHub } from "@/components/candidate/candidate-offer-hub";
import { getCandidateOfferByToken } from "@/lib/services/dashboard-data";

export default async function CandidateOfferPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const offer = await getCandidateOfferByToken(token);

  if (!offer) {
    notFound();
  }

  return (
    <CandidateOfferHub
      token={offer.token}
      offerId={offer.id}
      candidateName={offer.candidate.name}
      weeklyPay={Number(offer.weeklyPay)}
      durationWeeks={offer.assignment.durationWeeks}
      location={`${offer.assignment.city}, ${offer.assignment.state}`}
      facilityName={offer.assignment.facilityName}
      perks={offer.perks}
      housingOptions={offer.assignment.housingOptions.map((option) => ({
        id: option.id,
        title: option.title,
        monthlyCost: Number(option.monthlyCost)
      }))}
      travelOptions={offer.assignment.travelOptions.map((option) => ({
        id: option.id,
        providerName: option.providerName,
        estimatedCost: Number(option.estimatedCost)
      }))}
      carOptions={offer.assignment.carRentalOptions.map((option) => ({
        id: option.id,
        providerName: option.providerName,
        weeklyCost: Number(option.weeklyCost)
      }))}
    />
  );
}
