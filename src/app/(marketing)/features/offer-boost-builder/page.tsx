import { MarketingTemplatePage } from "@/components/marketing/page-template";
import { pageContent } from "@/lib/marketing-content";

export default function OfferBoostFeaturePage() {
  const content = pageContent.offerBoost;
  return <MarketingTemplatePage title={content.title} subtitle={content.subtitle} bullets={content.bullets} />;
}
