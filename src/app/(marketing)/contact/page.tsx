import { Mail, MessageSquare, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section>
      <div className="container-wide py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Badge>Contact</Badge>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-orbit-deep md:text-4xl">
              We respond fast. We respond honestly.
            </h1>
            <p className="mt-4 text-slate-600">
              Whether you're an agency leader, MSP director, or clinician — your message lands in a real inbox,
              answered by a real human.
            </p>

            <div className="mt-10 space-y-4 text-sm">
              <div className="flex items-center gap-3 rounded-xl border border-orbit-deep/10 bg-white p-4">
                <Phone className="h-5 w-5 text-orbit-red" />
                <span>+1 (832) 303-6622</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-orbit-deep/10 bg-white p-4">
                <Mail className="h-5 w-5 text-orbit-red" />
                <span>info@tritalcare.com</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-orbit-deep/10 bg-white p-4">
                <MessageSquare className="h-5 w-5 text-orbit-red" />
                <span>Text-first support, average reply under 1 business hour.</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-2xl border border-orbit-deep/10 bg-white p-6 md:p-8 shadow-elevate">
              <ContactForm source="contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
