import { notFound } from "next/navigation";

import { MarketingPage } from "@/components/site/marketing-page";
import { SiteFooter, SiteHeader } from "@/components/site/shell";
import { marketingPages } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(marketingPages).map((slug) => ({ slug: slug.split("/") }));
}

export default async function CatchAllMarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  if (!marketingPages[key]) notFound();
  return (
    <>
      <SiteHeader />
      <MarketingPage slug={key} />
      <SiteFooter />
    </>
  );
}
