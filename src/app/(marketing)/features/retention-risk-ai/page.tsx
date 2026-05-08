import { MarketingTemplatePage } from "@/components/marketing/page-template";
import { pageContent } from "@/lib/marketing-content";

export default function RetentionRiskFeaturePage() {
  const content = pageContent.retentionRisk;
  return <MarketingTemplatePage title={content.title} subtitle={content.subtitle} bullets={content.bullets} />;
}
