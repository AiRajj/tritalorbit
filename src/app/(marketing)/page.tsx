import { Hero } from "@/components/marketing/hero";
import {
  AISection,
  AudienceCards,
  FinalCTA,
  KpiCards,
  MobilityStack,
  PainSolution,
  Testimonials,
  TrustBar,
  WorkflowSection,
} from "@/components/marketing/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <KpiCards />
      <WorkflowSection />
      <PainSolution />
      <AudienceCards />
      <AISection />
      <MobilityStack />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
