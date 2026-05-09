import { notFound } from "next/navigation";
import { ModulePage } from "@/components/dashboard/module-page";
import { mspPhase2Pages } from "@/lib/phase2-dashboard-pages";

export default async function MspPhaseTwoRoutes({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = mspPhase2Pages[path];

  if (!page) {
    notFound();
  }

  return <ModulePage {...page} />;
}
