import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900">Contact TRITAL Orbit™</h1>
      <p className="mt-3 text-slate-600">
        Connect with our team for platform details, enterprise security, integrations, or implementation support.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </section>
  );
}
