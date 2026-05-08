import { PublicPageShell } from "@/components/marketing/public-page-shell";

export default function TermsPage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-600">
          TRITAL Orbit™ is provided to authorized workforce organizations under subscription agreement. Users must
          maintain credential security, comply with applicable employment and privacy requirements, and use the
          platform in good faith for lawful staffing operations. AI outputs are support tools and should be reviewed
          by qualified personnel before final decisions.
        </p>
      </section>
    </PublicPageShell>
  );
}
