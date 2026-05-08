import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Privacy" };

export default function Page() {
  return (
    <section className="container-tight py-20 md:py-28">
      <Badge>Privacy</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-orbit-deep md:text-4xl">
        Privacy at TRITAL Orbit
      </h1>
      <p className="mt-4 text-slate-600">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>

      <div className="mt-10 space-y-8 text-slate-700">
        <Block title="1. Our posture">
          TRITAL Orbit operates HIPAA-aware workflows with field-level audit logs and SOC 2 aligned data
          controls. We treat clinician PII and offer-related data with the same rigor we apply to credentialing
          and licensure.
        </Block>
        <Block title="2. Data we process">
          <ul className="list-disc space-y-1 pl-5">
            <li>Account data: name, email, role, agency association.</li>
            <li>Offer data: assignment, compensation, mobility perks, candidate engagement.</li>
            <li>Mobility data: housing, travel, transportation, concierge requests.</li>
            <li>System telemetry: request logs, audit trails, AI usage records.</li>
          </ul>
        </Block>
        <Block title="3. How we use data">
          To operate the platform, deliver mobility services, generate AI artifacts, and maintain audit-ready
          records. We do not sell or rent personal data. We never use customer data to train third-party models.
        </Block>
        <Block title="4. Data sharing">
          Sub-processors are limited to infrastructure, transactional email, payments, and AI providers. Each is
          bound by a data processing agreement.
        </Block>
        <Block title="5. Your rights">
          Customers and clinicians may request data access, correction, export, or deletion at any time by emailing{" "}
          <a href="mailto:privacy@tritalcare.com" className="font-medium text-orbit-deep underline-offset-2 hover:underline">
            privacy@tritalcare.com
          </a>
          .
        </Block>
        <Block title="6. Security">
          Encryption in transit and at rest, field-level audit logs, role-based access control, MFA support, and
          SAML/SCIM available on Enterprise plans.
        </Block>
        <Block title="7. Contact">
          Questions?{" "}
          <a href="mailto:privacy@tritalcare.com" className="font-medium text-orbit-deep underline-offset-2 hover:underline">
            privacy@tritalcare.com
          </a>
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
