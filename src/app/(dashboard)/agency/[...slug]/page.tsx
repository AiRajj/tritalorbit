import { notFound } from "next/navigation";
import { ModulePage } from "@/components/dashboard/module-page";
import { agencyPhase2Pages } from "@/lib/phase2-dashboard-pages";

export default async function AgencyPhaseTwoRoutes({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");

  if (slug[0] === "mobility" && slug[1] === "requests" && slug[2]) {
    return (
      <ModulePage
        label="Agency Mobility Request"
        title={`Request ${slug[2].slice(0, 8)} review`}
        description="Approve sponsor credits, shortlist bids, and clear assignment-level mobility blockers."
        stats={[
          { label: "Candidate readiness impact", value: "+23 pts" },
          { label: "Open blockers", value: "2" }
        ]}
        workflows={["Review bid quality", "Approve payment responsibility", "Confirm booking decision"]}
      />
    );
  }

  if (slug[0] === "offer-war-room" && slug[1]) {
    return (
      <ModulePage
        label="Offer War Room™"
        title={`Offer ${slug[1].slice(0, 8)} intelligence`}
        description="Close probability and mobility friction analytics with AI-guided recruiter actions."
        stats={[
          { label: "Close probability", value: "68%" },
          { label: "Urgency score", value: "82" }
        ]}
        workflows={["Send SMS/email scripts", "Log recruiter outreach", "Mark completion and re-score"]}
      />
    );
  }

  if (slug[0] === "offer-intelligence" && slug[1] && slug[1] !== "compare") {
    return (
      <ModulePage
        label="Offer Intelligence"
        title={`Comparison ${slug[1].slice(0, 8)} insights`}
        description="Deep comparison intelligence with candidate-facing explanation and recruiter save strategy."
        stats={[
          { label: "Best offer confidence", value: "87%" },
          { label: "Risk delta", value: "-18%" }
        ]}
        workflows={["Validate comparison assumptions", "Share narrative with candidate", "Launch recovery actions"]}
      />
    );
  }

  const mappedPath = slug[0] === "mobility" ? "mobility" : path;
  const page = agencyPhase2Pages[mappedPath];
  if (!page) {
    notFound();
  }

  return <ModulePage {...page} />;
}
