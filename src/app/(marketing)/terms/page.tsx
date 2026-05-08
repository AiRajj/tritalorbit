import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Terms" };

export default function Page() {
  return (
    <section className="container-tight py-20 md:py-28">
      <Badge>Terms</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-orbit-deep md:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-slate-600">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>

      <div className="mt-10 space-y-8 text-slate-700">
        <Block title="1. Agreement">
          By accessing TRITAL Orbit, you agree to these terms on behalf of your organization. If you do not have
          authority to bind your organization, you may not use the service.
        </Block>
        <Block title="2. Services">
          TRITAL Orbit provides healthcare workforce mobility infrastructure, including offer optimization, retention
          risk scoring, assignment readiness tracking, and concierge tooling.
        </Block>
        <Block title="3. Subscriptions">
          Plans are billed monthly or annually. Subscription fees are non-refundable except as required by law.
        </Block>
        <Block title="4. Acceptable use">
          You agree not to (a) reverse-engineer the platform, (b) use it to violate applicable laws, (c) use it to
          process restricted PHI without an executed BAA, or (d) abuse the AI agents to produce harmful output.
        </Block>
        <Block title="5. Data">
          You retain ownership of your data. We process it under our Data Processing Addendum and Privacy Policy.
        </Block>
        <Block title="6. Liability">
          To the maximum extent permitted by law, our aggregate liability is limited to the amounts paid in the
          12 months preceding the claim.
        </Block>
        <Block title="7. Termination">
          Either party may terminate for material breach with 30 days notice. Customer data is exportable for 30 days
          after termination.
        </Block>
        <Block title="8. Contact">
          legal@tritalcare.com
        </Block>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-orbit-deep">{title}</h2>
      <div className="mt-3 leading-relaxed">{children}</div>
    </div>
  );
}
