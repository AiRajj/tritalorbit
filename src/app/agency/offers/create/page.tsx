import { OfferBuilder } from "@/components/offers/offer-builder";
import { PageHeader } from "@/components/dashboard/page-header";

export const metadata = { title: "Create offer" };

export default function CreateOfferPage() {
  return (
    <>
      <PageHeader
        eyebrow="Offer Boost Builder"
        title="Build a boosted offer"
        description="Capture candidate, assignment, and compensation. Toggle mobility perks. Generate the candidate-facing hub in under 5 minutes."
      />
      <OfferBuilder />
    </>
  );
}
