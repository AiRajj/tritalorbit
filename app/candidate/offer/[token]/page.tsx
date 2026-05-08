import { CandidateOfferHub } from "@/components/candidate/candidate-offer-hub";

export default async function CandidateOfferPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <CandidateOfferHub token={token} />;
}
