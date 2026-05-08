import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-[#1F2937] mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: January 1, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">1. Introduction</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              TRITAL Orbit, Inc. (&ldquo;TRITAL Orbit,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website, use our platform, or interact with our services (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">2. Information We Collect</h2>
            <h3 className="text-base font-semibold text-[#1F2937] mt-4 mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
              <li><strong>Account Information:</strong> Name, email address, phone number, company name, job title, and password when you create an account.</li>
              <li><strong>Profile Information:</strong> Professional details, preferences, and any additional information you choose to provide in your user profile.</li>
              <li><strong>Communication Data:</strong> Messages, feedback, and correspondence you send to us through the platform, email, or other channels.</li>
              <li><strong>Transaction Information:</strong> Billing details, payment information, and subscription history when you purchase our Services.</li>
              <li><strong>Form Submissions:</strong> Information you provide when requesting a demo, contacting us, or subscribing to our newsletter.</li>
            </ul>
            <h3 className="text-base font-semibold text-[#1F2937] mt-4 mb-2">2.2 Information We Collect Automatically</h3>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
              <li><strong>Usage Data:</strong> Pages visited, features used, actions taken, time spent, and interaction patterns within our platform.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device identifiers, IP address, and general location data.</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies, web beacons, and similar technologies to enhance your experience and gather analytics data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and manage your account</li>
              <li>Communicate with you about updates, security alerts, and support</li>
              <li>Personalize your experience and deliver relevant content</li>
              <li>Analyze usage patterns to improve platform performance</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Detect, prevent, and address fraud, security issues, or technical problems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">4. Information Sharing and Disclosure</h2>
            <p className="text-sm text-gray-600 leading-relaxed">We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 mt-2">
              <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform, processing payments, or providing customer support.</li>
              <li><strong>Business Partners:</strong> With your consent, we may share information with housing providers, travel partners, and other mobility service providers to fulfill assignment logistics.</li>
              <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process, or to protect our rights and the safety of our users.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">5. Data Security</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your information, including AES-256 encryption at rest, TLS 1.3 encryption in transit, regular security audits, access controls, and monitoring. Our security practices are aligned with SOC 2 standards and we maintain HIPAA-aware data handling procedures for healthcare-related information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">6. Data Retention</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We retain your personal information for as long as necessary to provide our Services, comply with legal obligations, resolve disputes, and enforce our agreements. When you close your account, we will delete or anonymize your information within 90 days, except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">7. Your Rights and Choices</h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations.</li>
              <li><strong>Portability:</strong> Request your data in a portable, machine-readable format.</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">To exercise any of these rights, contact us at privacy@tritalorbit.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">8. Cookies Policy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use essential cookies required for platform functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">10. Changes to This Policy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the &ldquo;Last updated&rdquo; date. Continued use of our Services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">11. Contact Us</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-[#1F2937]">TRITAL Orbit, Inc.</p>
              <p className="text-sm text-gray-600 mt-1">Email: privacy@tritalorbit.com</p>
              <p className="text-sm text-gray-600">Phone: +1 (800) 555-0199</p>
              <p className="text-sm text-gray-600">Address: Austin, TX, United States</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
