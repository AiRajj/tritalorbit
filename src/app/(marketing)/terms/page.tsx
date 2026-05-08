import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-[#1F2937] mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: January 1, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the TRITAL Orbit platform, website, and related services (collectively, the &ldquo;Services&rdquo;) provided by TRITAL Orbit, Inc. (&ldquo;TRITAL Orbit,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, you may not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">2. Eligibility</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You must be at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or the organization you represent. By using our Services, you represent and warrant that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">3. Account Registration</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              To access certain features of our Services, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">4. Services Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              TRITAL Orbit provides a healthcare workforce mobility infrastructure platform that includes offer management tools, assignment launch dashboards, retention risk analytics, mobility concierge coordination, and related services. The specific features and functionality available to you depend on your subscription plan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">5. Subscription and Payment</h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
              <li><strong>Plans:</strong> Our Services are offered through various subscription plans as described on our pricing page. Features, limits, and pricing may vary by plan.</li>
              <li><strong>Billing:</strong> Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as expressly stated in these Terms.</li>
              <li><strong>Price Changes:</strong> We may modify pricing with 30 days written notice. Continued use after a price change constitutes acceptance of the new pricing.</li>
              <li><strong>Taxes:</strong> All fees are exclusive of taxes. You are responsible for applicable taxes in your jurisdiction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">6. Acceptable Use</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
              <li>Use the Services for any unlawful purpose or in violation of any applicable law or regulation</li>
              <li>Attempt to gain unauthorized access to the Services, other accounts, or computer systems</li>
              <li>Interfere with or disrupt the integrity or performance of the Services</li>
              <li>Upload or transmit malicious code, viruses, or harmful data</li>
              <li>Reverse engineer, decompile, or disassemble any aspect of the Services</li>
              <li>Use the Services to store or transmit infringing, defamatory, or otherwise unlawful material</li>
              <li>Share your account credentials with unauthorized individuals</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">7. Intellectual Property</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              The Services, including all software, content, designs, trademarks, and documentation, are the exclusive property of TRITAL Orbit and are protected by intellectual property laws. Your subscription grants you a limited, non-exclusive, non-transferable license to use the Services during the subscription term. You retain ownership of all data you submit to the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">8. Data Ownership and Privacy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You retain all rights to data you input into the Services (&ldquo;Customer Data&rdquo;). We process Customer Data solely to provide the Services and as described in our Privacy Policy. We will not access, use, or disclose Customer Data except as necessary to provide the Services, prevent or address security or technical issues, or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">9. Service Level Agreement</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              For Enterprise plan customers, we provide a Service Level Agreement (SLA) guaranteeing 99.9% platform uptime, measured monthly. SLA credits will be applied for qualifying downtime as specified in the applicable Enterprise agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">10. Limitation of Liability</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRITAL ORBIT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE OF OUR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNTS PAID BY YOU IN THE TWELVE MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">11. Indemnification</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless TRITAL Orbit, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">12. Termination</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Either party may terminate these Terms at any time. You may cancel your subscription through your account settings. We may suspend or terminate your access if you violate these Terms. Upon termination, your right to use the Services ceases. We will make your Customer Data available for export for 30 days after termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">13. Modifications to Terms</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We may modify these Terms from time to time. We will provide at least 30 days notice of material changes via email or through the platform. Continued use of the Services after changes take effect constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">14. Governing Law</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of the State of Texas, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the state or federal courts located in Travis County, Texas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3">15. Contact Information</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              For questions about these Terms, please contact us:
            </p>
            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-[#1F2937]">TRITAL Orbit, Inc.</p>
              <p className="text-sm text-gray-600 mt-1">Email: legal@tritalorbit.com</p>
              <p className="text-sm text-gray-600">Phone: +1 (800) 555-0199</p>
              <p className="text-sm text-gray-600">Address: Austin, TX, United States</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
