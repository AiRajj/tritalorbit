import { notFound } from "next/navigation";
import { CloudPage } from "@/components/marketing/cloud-page";
import { phase2MarketingPages } from "@/lib/phase2-marketing-pages";

export default async function PhaseTwoMarketingPage({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = phase2MarketingPages[key];
  if (!page) {
    notFound();
  }

  return <CloudPage {...page} />;
}
