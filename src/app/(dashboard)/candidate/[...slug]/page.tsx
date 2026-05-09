import { notFound } from "next/navigation";
import { ModulePage } from "@/components/dashboard/module-page";
import { candidatePhase2Pages } from "@/lib/phase2-dashboard-pages";

export default async function CandidatePhaseTwoRoutes({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");

  if (slug[0] === "mobility-request" && slug[1]) {
    return (
      <ModulePage
        label="Mobility Request"
        title={`Mobility request ${slug[1].slice(0, 8)} status`}
        description="Monitor vendor activity, shortlist quality, and decision workflow for this assignment-linked request."
        stats={[
          { label: "Bids received", value: "6" },
          { label: "Best value score", value: "91%" }
        ]}
        workflows={["Review bid packages", "Request better pricing", "Accept best-fit bid"]}
        actions={[
          { label: "Back to requests", href: "/candidate/travel-marketplace" },
          { label: "View bids", href: "/candidate/mobility-bids" }
        ]}
      />
    );
  }

  if (slug[0] === "mobility-bids" && slug[1]) {
    return (
      <ModulePage
        label="Mobility Bid Detail"
        title={`Bid ${slug[1].slice(0, 8)} comparison`}
        description="Inspect price structure, cancellation terms, and concierge recommendation context before acceptance."
        stats={[
          { label: "Bid score", value: "89" },
          { label: "Estimated savings", value: "$274" }
        ]}
        workflows={["Compare alternatives", "Ask vendor clarifications", "Accept or decline"]}
      />
    );
  }

  if (slug[0] === "first-week" && slug[1]) {
    return (
      <ModulePage
        label="First Week Plan"
        title={`Assignment ${slug[1].slice(0, 8)} survival plan`}
        description="Checklist, local guidance, and emergency contacts for first-day execution confidence."
        stats={[
          { label: "Checklist", value: "9/12" },
          { label: "Confidence", value: "86/100" }
        ]}
        workflows={["Complete pre-arrival tasks", "Review facility guidance", "Confirm transportation plan"]}
      />
    );
  }

  if (slug[0] === "relocation-assistant" && slug[1]) {
    return (
      <ModulePage
        label="Relocation Plan"
        title={`Relocation assistant for assignment ${slug[1].slice(0, 8)}`}
        description="AI-guided timeline, housing recommendations, and mobility preparation actions."
        stats={[
          { label: "Plan completeness", value: "93%" },
          { label: "Risk level", value: "Low" }
        ]}
        workflows={["Review move timeline", "Confirm housing and commute", "Track next actions"]}
      />
    );
  }

  if (slug[0] === "compare-offers" && slug[1]) {
    return (
      <ModulePage
        label="Multi-Offer Comparison Engine™"
        title={slug[1] === "new" ? "Create a new offer comparison" : `Comparison ${slug[1].slice(0, 8)} report`}
        description="Compare total assignment value across pay, cost-of-living, mobility support, and risk profile."
        stats={[
          { label: "Best overall confidence", value: "90%" },
          { label: "Lifestyle delta", value: "+14%" }
        ]}
        workflows={["Add internal/external offers", "Run AI value scoring", "Share plain-language recommendation"]}
      />
    );
  }

  const page = candidatePhase2Pages[path];
  if (!page) {
    notFound();
  }

  return <ModulePage {...page} />;
}
