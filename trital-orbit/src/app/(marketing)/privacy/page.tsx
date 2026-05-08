import React from "react";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Badge className="mb-4 bg-blue-50 text-orbit-blue border-blue-100">Legal</Badge>
          <h1 className="text-4xl font-bold text-orbit-dark mb-4">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: May 1, 2026</p>
        </div>

        <div className="prose max-w-none space-y-8">
          {[
            {
              title: "1. Information We Collect",
              content: "TRITAL Orbit™ collects information you provide directly, including name, email address, phone number, company information, and professional credentials. We also collect information about how you use our platform, including log data, usage analytics, and device information.",
            },
            {
              title: "2. How We Use Your Information",
              content: "We use your information to provide, maintain, and improve TRITAL Orbit™ services; communicate with you about your account and platform updates; personalize your experience; and comply with legal obligations. We do not sell your personal information to third parties.",
            },
            {
              title: "3. Healthcare Data",
              content: "TRITAL Orbit™ handles professional healthcare credentials and staffing information. We are committed to HIPAA-ready practices and offer Business Associate Agreements (BAAs) to covered entities. All healthcare data is encrypted at rest and in transit using industry-standard protocols.",
            },
            {
              title: "4. Data Sharing",
              content: "We share your information with service providers who help us operate our platform (such as cloud hosting, email delivery, and payment processing). We require all third-party processors to maintain appropriate security standards. We may disclose information when required by law or to protect our rights.",
            },
            {
              title: "5. Data Retention",
              content: "We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data by contacting us at privacy@tritalorbit.com. Some data may be retained for legal compliance purposes.",
            },
            {
              title: "6. Security",
              content: "We implement industry-standard security measures including 256-bit AES encryption, TLS for data in transit, role-based access controls, and regular security audits. However, no method of transmission over the internet is 100% secure.",
            },
            {
              title: "7. Your Rights",
              content: "You have the right to access, correct, or delete your personal information. You may opt out of marketing communications at any time. California residents have additional rights under CCPA. To exercise your rights, contact privacy@tritalorbit.com.",
            },
            {
              title: "8. Contact Us",
              content: "If you have questions about this Privacy Policy, please contact us at privacy@tritalorbit.com or write to TRITAL Care Inc., Privacy Team, Dallas, TX.",
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-orbit-dark mb-3">{section.title}</h2>
              <p className="text-slate-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
