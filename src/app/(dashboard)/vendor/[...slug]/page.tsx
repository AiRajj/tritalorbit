import { notFound } from "next/navigation";
import { ModulePage } from "@/components/dashboard/module-page";
import { vendorPhase2Pages } from "@/lib/phase2-dashboard-pages";

export default async function VendorPhaseTwoRoutes({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");

  if (slug[0] === "bid-center" && slug[1]) {
    return (
      <ModulePage
        label="Bid Center"
        title={`Request ${slug[1].slice(0, 8)} bid workspace`}
        description="Submit bids with structured pricing, package details, and confidence drivers."
        stats={[
          { label: "Bid rank projection", value: "#2" },
          { label: "Expected conversion", value: "31%" }
        ]}
        workflows={["Review request", "Submit package", "Monitor shortlist status"]}
      />
    );
  }

  const mappedPath =
    slug[0] === "my-bids" ||
    slug[0] === "performance" ||
    slug[0] === "bookings" ||
    slug[0] === "payouts" ||
    slug[0] === "travel-agency" ||
    slug[0] === "register" ||
    slug[0] === "housing"
      ? slug[0] === "housing"
        ? "housing/dashboard"
        : slug[0] === "travel-agency" || (slug[0] === "register" && slug[1] === "travel-agency")
          ? "travel-agency/dashboard"
          : slug[0] === "register" && slug[1] === "housing"
            ? "housing/dashboard"
          : "bid-center"
      : path;

  const page = vendorPhase2Pages[mappedPath];
  if (!page) {
    notFound();
  }

  return <ModulePage {...page} />;
}
