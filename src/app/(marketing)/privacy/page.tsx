"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D] to-[#1F2937] py-16 lg:py-20">
        <div className="container relative mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="mx-auto h-12 w-12 text-[#E63946]" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-white/70">
              Last updated: May 1, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg max-w-none text-[#1F2937]/80"
          >
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">1. Introduction</h2>
                <p>
                  TRITAL, Inc. (&ldquo;TRITAL,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the TRITAL Orbit&trade; platform (the &ldquo;Service&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our platform, or otherwise interact with us.
                </p>
                <p>
                  We are committed to protecting the privacy and security of personal information, including protected health information (PHI) as defined under the Health Insurance Portability and Accountability Act (HIPAA). By accessing or using our Service, you agree to this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-[#1F2937]">2.1 Information You Provide</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Account Information:</strong> Name, email address, phone number, company name, job title, and password when you create an account.</li>
                  <li><strong>Profile Information:</strong> Professional credentials, license numbers, certifications, specialties, and work history for clinician users.</li>
                  <li><strong>Payment Information:</strong> Billing address, credit card or payment method details (processed by our PCI-compliant payment processor).</li>
                  <li><strong>Communication Data:</strong> Messages, feedback, support requests, and any other information you provide through our communication channels.</li>
                  <li><strong>Assignment Data:</strong> Information related to staffing assignments, including facility details, housing preferences, travel arrangements, and offer terms.</li>
                </ul>

                <h3 className="mt-6 text-xl font-semibold text-[#1F2937]">2.2 Information Collected Automatically</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Usage Data:</strong> Pages visited, features used, actions taken, time spent on pages, and interaction patterns.</li>
                  <li><strong>Device Information:</strong> IP address, browser type and version, operating system, device identifiers, and screen resolution.</li>
                  <li><strong>Cookies and Tracking:</strong> We use cookies, web beacons, and similar technologies to collect information about your browsing behavior. See Section 7 for details.</li>
                  <li><strong>Log Data:</strong> Server logs including access times, referring URLs, and error logs.</li>
                </ul>

                <h3 className="mt-6 text-xl font-semibold text-[#1F2937]">2.3 Information from Third Parties</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Integration Partners:</strong> Data from ATS, CRM, and HCM systems you connect to the platform.</li>
                  <li><strong>Verification Services:</strong> License verification, background check results, and credential validation data.</li>
                  <li><strong>Analytics Providers:</strong> Aggregated and anonymized analytics data from our service providers.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Service Delivery:</strong> To provide, maintain, and improve the TRITAL Orbit&trade; platform and its features.</li>
                  <li><strong>Assignment Management:</strong> To facilitate staffing assignments, including offer creation, onboarding, housing, travel, and mobility support.</li>
                  <li><strong>AI and Analytics:</strong> To power our AI-driven features including offer optimization, retention risk scoring, and predictive analytics.</li>
                  <li><strong>Communication:</strong> To send you service-related notifications, updates, security alerts, and support messages.</li>
                  <li><strong>Marketing:</strong> To send promotional communications (with your consent) about new features, industry insights, and events.</li>
                  <li><strong>Compliance:</strong> To comply with legal obligations, resolve disputes, and enforce our agreements.</li>
                  <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, and security issues.</li>
                  <li><strong>Product Improvement:</strong> To analyze usage patterns and improve user experience through research and development.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">4. How We Share Your Information</h2>
                <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>With Your Organization:</strong> Information is shared within your agency, MSP, or healthcare organization as necessary for platform functionality.</li>
                  <li><strong>Service Providers:</strong> We engage vetted third-party service providers who process data on our behalf (hosting, analytics, payment processing, communication).</li>
                  <li><strong>Vendor Partners:</strong> When you use our Vendor Marketplace, relevant information is shared with housing, travel, and transportation providers to fulfill bookings.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information when required by law, regulation, legal process, or governmental request.</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as a business asset.</li>
                  <li><strong>With Consent:</strong> We may share information with your explicit consent for purposes not described in this policy.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">5. HIPAA Compliance</h2>
                <p>
                  As a platform serving the healthcare staffing industry, we recognize our responsibilities regarding protected health information (PHI). We maintain the following safeguards:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Business Associate Agreements (BAAs) with all covered entities and subcontractors</li>
                  <li>Administrative, physical, and technical safeguards as required by the HIPAA Security Rule</li>
                  <li>Minimum necessary standard for PHI access and disclosure</li>
                  <li>Breach notification procedures in compliance with the HIPAA Breach Notification Rule</li>
                  <li>Regular risk assessments and security audits</li>
                  <li>Employee training on HIPAA requirements and PHI handling</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">6. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.3 encryption for data in transit</li>
                  <li>SOC 2 Type II certified infrastructure</li>
                  <li>Regular penetration testing and vulnerability assessments</li>
                  <li>Multi-factor authentication (MFA) support</li>
                  <li>Role-based access controls (RBAC)</li>
                  <li>Automated security monitoring and alerting</li>
                  <li>Incident response procedures with 24-hour notification commitment</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">7. Cookies and Tracking Technologies</h2>
                <p>We use the following types of cookies:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Essential Cookies:</strong> Required for platform functionality, authentication, and security. Cannot be disabled.</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with the platform by collecting anonymous usage data.</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings to provide a personalized experience.</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness. These are only set with your consent.</li>
                </ul>
                <p className="mt-4">
                  You can manage cookie preferences through your browser settings or our cookie consent manager. Note that disabling essential cookies may affect platform functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">8. Data Retention</h2>
                <p>
                  We retain your information for as long as your account is active or as needed to provide services. Specific retention periods include:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Account Data:</strong> Retained for the duration of the account plus 30 days after deletion request.</li>
                  <li><strong>Assignment Data:</strong> Retained for 7 years for compliance and audit purposes.</li>
                  <li><strong>Communication Records:</strong> Retained for 3 years.</li>
                  <li><strong>Usage Analytics:</strong> Anonymized and retained indefinitely for product improvement.</li>
                  <li><strong>Financial Records:</strong> Retained for 7 years as required by tax and accounting regulations.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">9. Your Rights and Choices</h2>
                <p>Depending on your jurisdiction, you may have the following rights:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements.</li>
                  <li><strong>Portability:</strong> Request your data in a portable, machine-readable format.</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
                  <li><strong>Restrict Processing:</strong> Request that we limit our use of your information.</li>
                  <li><strong>Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time.</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:privacy@tritalorbit.com" className="text-[#0B3C5D] hover:underline">
                    privacy@tritalorbit.com
                  </a>{" "}
                  or through our platform settings. We will respond to verified requests within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">10. State-Specific Privacy Rights</h2>

                <h3 className="text-xl font-semibold text-[#1F2937]">California (CCPA/CPRA)</h3>
                <p>
                  California residents have additional rights including the right to know, delete, correct, and opt-out of the sale or sharing of personal information. We do not sell personal information. To submit a request, contact us at{" "}
                  <a href="mailto:privacy@tritalorbit.com" className="text-[#0B3C5D] hover:underline">
                    privacy@tritalorbit.com
                  </a>.
                </p>

                <h3 className="mt-4 text-xl font-semibold text-[#1F2937]">Other U.S. States</h3>
                <p>
                  Residents of Virginia, Colorado, Connecticut, Utah, and other states with comprehensive privacy laws may have similar rights. Contact us to exercise your state-specific rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">11. Children&apos;s Privacy</h2>
                <p>
                  Our Service is not directed to children under the age of 18. We do not knowingly collect personal information from children. If we discover that we have collected information from a child, we will promptly delete it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">12. International Data Transfers</h2>
                <p>
                  Our Service is hosted in the United States. If you access our Service from outside the United States, your information will be transferred to and processed in the United States. We implement appropriate safeguards for international data transfers, including Standard Contractual Clauses where applicable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">13. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the &ldquo;Last updated&rdquo; date. For significant changes, we will provide additional notice via email or in-platform notification.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">14. Contact Us</h2>
                <p>
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 rounded-lg border border-[#1F2937]/10 bg-white p-6">
                  <p className="font-semibold text-[#1F2937]">TRITAL, Inc.</p>
                  <p>Privacy Team</p>
                  <p>100 Innovation Drive, Suite 400</p>
                  <p>Austin, TX 78701</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a href="mailto:privacy@tritalorbit.com" className="text-[#0B3C5D] hover:underline">
                      privacy@tritalorbit.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a href="tel:+18889876543" className="text-[#0B3C5D] hover:underline">
                      +1 (888) 987-6543
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-[#1F2937]/60">
              Have questions about our privacy practices?
            </p>
            <Button className="mt-4" variant="outline" asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
