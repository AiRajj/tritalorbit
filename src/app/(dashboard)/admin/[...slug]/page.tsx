import { notFound } from "next/navigation";
import { ModulePage } from "@/components/dashboard/module-page";
import { adminPhase2Pages } from "@/lib/phase2-dashboard-pages";

export default async function AdminPhaseTwoRoutes({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = adminPhase2Pages[path];

  if (!page) {
    notFound();
  }

  return <ModulePage {...page} />;
}
