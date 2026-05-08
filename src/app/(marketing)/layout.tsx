import type { Metadata } from "next";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";

export const metadata: Metadata = {
  title: {
    default: "TRITAL Orbit - Healthcare Workforce Mobility Infrastructure",
    template: "%s | TRITAL Orbit",
  },
  description:
    "Win more clinicians. Reduce backouts. Improve assignment readiness. TRITAL Orbit is the healthcare workforce mobility infrastructure platform.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </>
  );
}
