import { MarketingTemplatePage } from "@/components/marketing/page-template";
import { pageContent } from "@/lib/marketing-content";

export default function AssignmentLaunchFeaturePage() {
  const content = pageContent.assignmentLaunch;
  return <MarketingTemplatePage title={content.title} subtitle={content.subtitle} bullets={content.bullets} />;
}
