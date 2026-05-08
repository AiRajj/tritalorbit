import { PublicPageShell } from "@/components/marketing/public-page-shell";

export default function PrivacyPage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-600">
          TRITAL Orbit™ processes staffing workflow data on behalf of agency and MSP customers. We implement role-
          based controls, audit logging, and secure data handling patterns. Customer data is never sold. Platform
          operators may configure retention windows, export controls, and access boundaries aligned to internal
          policies and applicable regulations.
        </p>
      </section>
    </PublicPageShell>
  );
}
