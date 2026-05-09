import { PersonaDemoStory } from "@/components/marketing/persona-demo-story";

export default function VendorStoryPage() {
  return (
    <PersonaDemoStory
      persona="Vendor Partner"
      title="From verified request intake to predictable payout"
      summary="This partner demo follows a travel/housing vendor through bid submission, shortlist win, booking confirmation, and payout visibility."
      steps={[
        {
          title: "Receive verified assignment demand",
          detail:
            "Vendor sees assignment-backed mobility requests with timeline, budget context, and service requirements.",
          signal: "Higher-intent demand quality than unverified marketplace leads"
        },
        {
          title: "Submit competitive structured bid",
          detail:
            "Vendor provides transparent package pricing, availability details, service notes, and cancellation terms.",
          signal: "Bid scoring combines price, fit, risk, and response-time performance"
        },
        {
          title: "Track booking and payout operations",
          detail:
            "Accepted bids convert to booking records with payment responsibility, dispute controls, and payout readiness monitoring.",
          signal: "Operational confidence improves through verification + dispute workflow"
        }
      ]}
      outcomes={[
        "Vendors win through quality and speed, not opaque lead marketplaces.",
        "Chargeback and fulfillment risk are reduced with assignment verification.",
        "Partner portals create scalable repeatable revenue workflows."
      ]}
      cta={{ label: "Open vendor bid center", href: "/vendor/bid-center" }}
    />
  );
}
