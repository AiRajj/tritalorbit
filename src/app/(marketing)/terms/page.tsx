"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

export default function TermsPage() {
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
            <FileText className="mx-auto h-12 w-12 text-[#E63946]" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Terms of Service
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
                <h2 className="text-2xl font-bold text-[#1F2937]">1. Acceptance of Terms</h2>
                <p>
                  These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (whether individually or on behalf of an entity, &ldquo;you&rdquo; or &ldquo;your&rdquo;) and TRITAL, Inc. (&ldquo;TRITAL,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your access to and use of the TRITAL Orbit&trade; platform, including any associated websites, applications, APIs, and services (collectively, the &ldquo;Service&rdquo;).
                </p>
                <p>
                  By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not access or use the Service. If you are accepting these Terms on behalf of an organization, you represent and warrant that you have the authority to bind that organization.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">2. Description of Service</h2>
                <p>
                  TRITAL Orbit&trade; is a software-as-a-service (SaaS) platform designed for the healthcare staffing industry. The Service provides tools for:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Offer creation and enhancement (Offer Boost Builder)</li>
                  <li>Assignment onboarding management (Assignment Launch Dashboard)</li>
                  <li>Predictive retention analytics (Retention Risk AI)</li>
                  <li>Mobility and relocation support (Mobility Concierge)</li>
                  <li>Vendor marketplace for housing, travel, and transportation services</li>
                  <li>Reporting and analytics for managed service providers</li>
                </ul>
                <p>
                  The specific features available to you depend on your subscription plan as described on our pricing page and in your Order Form.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">3. Account Registration and Security</h2>
                <p>
                  3.1. To access the Service, you must create an account by providing accurate, current, and complete information. You agree to update your information as necessary to keep it accurate.
                </p>
                <p>
                  3.2. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately at{" "}
                  <a href="mailto:security@tritalorbit.com" className="text-[#0B3C5D] hover:underline">
                    security@tritalorbit.com
                  </a>{" "}
                  of any unauthorized use of your account.
                </p>
                <p>
                  3.3. You must not share your account credentials with unauthorized individuals. Each user must have their own unique account. We reserve the right to suspend or terminate accounts that violate this provision.
                </p>
                <p>
                  3.4. You are responsible for ensuring that your users comply with these Terms. You will be liable for any breach of these Terms by your authorized users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">4. Subscription Plans and Billing</h2>
                <p>
                  4.1. <strong>Subscription Plans.</strong> The Service is offered under various subscription plans as described on our pricing page. Your access to specific features is determined by your chosen plan and any applicable Order Form.
                </p>
                <p>
                  4.2. <strong>Fees.</strong> You agree to pay all fees associated with your subscription plan. Fees are due in advance on a monthly or annual basis, depending on your billing cycle. All fees are quoted in U.S. dollars unless otherwise specified.
                </p>
                <p>
                  4.3. <strong>Payment.</strong> Payment is due upon invoice. We accept credit cards, ACH transfers, and wire transfers. Late payments may accrue interest at the rate of 1.5% per month or the maximum rate permitted by law, whichever is less.
                </p>
                <p>
                  4.4. <strong>Taxes.</strong> All fees are exclusive of applicable taxes. You are responsible for all taxes, levies, or duties imposed by taxing authorities, excluding taxes based on TRITAL&apos;s income.
                </p>
                <p>
                  4.5. <strong>Price Changes.</strong> We may adjust pricing upon 30 days&apos; written notice. Price changes take effect at the start of your next billing cycle. If you do not agree to a price change, you may cancel your subscription before the change takes effect.
                </p>
                <p>
                  4.6. <strong>Refunds.</strong> Fees are non-refundable except as expressly provided in these Terms or required by applicable law. If we materially breach these Terms and fail to cure such breach within 30 days of written notice, you may be entitled to a pro-rata refund of prepaid fees.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">5. Free Trials</h2>
                <p>
                  5.1. We may offer free trial periods for certain subscription plans. During the trial period, you will have access to the features included in the applicable plan.
                </p>
                <p>
                  5.2. At the end of the trial period, your account will automatically convert to a paid subscription unless you cancel before the trial expires. We will notify you before the trial ends.
                </p>
                <p>
                  5.3. We reserve the right to limit, modify, or discontinue free trials at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">6. Your Data</h2>
                <p>
                  6.1. <strong>Ownership.</strong> You retain all rights, title, and interest in and to the data you submit to the Service (&ldquo;Customer Data&rdquo;). These Terms do not grant us any ownership rights to Customer Data.
                </p>
                <p>
                  6.2. <strong>License.</strong> You grant us a limited, non-exclusive, worldwide license to use, process, and display Customer Data solely as necessary to provide and improve the Service, in accordance with our Privacy Policy.
                </p>
                <p>
                  6.3. <strong>Anonymized Data.</strong> We may create anonymized, aggregated data derived from Customer Data (&ldquo;Anonymized Data&rdquo;) that does not identify you or any individual. We own all rights to Anonymized Data and may use it for any lawful purpose, including product improvement and industry benchmarking.
                </p>
                <p>
                  6.4. <strong>Data Protection.</strong> We will implement and maintain appropriate technical and organizational measures to protect Customer Data in accordance with our Privacy Policy and applicable data protection laws.
                </p>
                <p>
                  6.5. <strong>Data Export.</strong> Upon request, we will provide you with a copy of your Customer Data in a standard machine-readable format. After termination of your account, we will retain Customer Data for 30 days to allow for export, after which it will be deleted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">7. HIPAA Compliance</h2>
                <p>
                  7.1. To the extent that your use of the Service involves protected health information (PHI) as defined under HIPAA, the parties agree to execute a Business Associate Agreement (BAA) as required by HIPAA.
                </p>
                <p>
                  7.2. TRITAL will comply with all applicable HIPAA requirements in its capacity as a Business Associate, including the implementation of required safeguards and breach notification procedures.
                </p>
                <p>
                  7.3. You represent and warrant that you have obtained all necessary consents and authorizations required to provide PHI to us for processing through the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">8. Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Use the Service in violation of any applicable law, regulation, or third-party rights</li>
                  <li>Upload, transmit, or store any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable</li>
                  <li>Attempt to gain unauthorized access to the Service, other user accounts, or related systems</li>
                  <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                  <li>Reverse engineer, decompile, or disassemble any portion of the Service</li>
                  <li>Use the Service to develop a competing product or service</li>
                  <li>Share, resell, or sublicense access to the Service without our written consent</li>
                  <li>Use automated means (bots, scrapers, etc.) to access the Service except through our official APIs</li>
                  <li>Remove, alter, or obscure any proprietary notices on the Service</li>
                  <li>Transmit viruses, malware, or any other malicious code</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">9. Intellectual Property</h2>
                <p>
                  9.1. <strong>Our IP.</strong> The Service, including all software, algorithms, designs, text, graphics, interfaces, and trademarks, is owned by TRITAL and protected by intellectual property laws. &ldquo;TRITAL,&rdquo; &ldquo;TRITAL Orbit,&rdquo; and the TRITAL logo are trademarks of TRITAL, Inc.
                </p>
                <p>
                  9.2. <strong>Limited License.</strong> Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Service during your subscription term for your internal business purposes.
                </p>
                <p>
                  9.3. <strong>Feedback.</strong> If you provide us with suggestions, ideas, or feedback (&ldquo;Feedback&rdquo;), you grant us an unrestricted, irrevocable, worldwide, royalty-free license to use, modify, and incorporate such Feedback into the Service without obligation to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">10. Third-Party Services</h2>
                <p>
                  10.1. The Service may integrate with or link to third-party services, including ATS systems, CRM platforms, payment processors, and vendor services. Your use of third-party services is governed by their respective terms and privacy policies.
                </p>
                <p>
                  10.2. We do not endorse, warrant, or assume responsibility for any third-party services. Any dealings between you and third-party providers are solely between you and such providers.
                </p>
                <p>
                  10.3. When using the Vendor Marketplace, you acknowledge that bookings for housing, travel, and transportation are contracts between you and the respective vendor. TRITAL facilitates these transactions but is not a party to such contracts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">11. Service Level Agreement</h2>
                <p>
                  11.1. We commit to maintaining 99.9% uptime for the Service, measured monthly, excluding scheduled maintenance windows.
                </p>
                <p>
                  11.2. Scheduled maintenance will be communicated at least 48 hours in advance and will be performed during off-peak hours when possible.
                </p>
                <p>
                  11.3. If we fail to meet the 99.9% uptime commitment, you may be eligible for service credits as described in your Order Form or our SLA documentation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">12. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR AVAILABILITY.
                </p>
                <p>
                  WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. AI-POWERED FEATURES, INCLUDING RISK SCORING AND OFFER OPTIMIZATION, ARE PROVIDED AS DECISION-SUPPORT TOOLS AND SHOULD NOT BE RELIED UPON AS THE SOLE BASIS FOR BUSINESS DECISIONS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">13. Limitation of Liability</h2>
                <p>
                  13.1. TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRITAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE SERVICE.
                </p>
                <p>
                  13.2. TRITAL&apos;S TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO TRITAL IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </p>
                <p>
                  13.3. THE LIMITATIONS IN THIS SECTION APPLY REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE) AND EVEN IF TRITAL HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">14. Indemnification</h2>
                <p>
                  14.1. <strong>Your Indemnification.</strong> You agree to indemnify, defend, and hold harmless TRITAL and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from: (a) your use of the Service; (b) your breach of these Terms; (c) your violation of applicable laws; or (d) Customer Data.
                </p>
                <p>
                  14.2. <strong>Our Indemnification.</strong> TRITAL will indemnify, defend, and hold you harmless from any third-party claim that the Service infringes a valid U.S. patent, copyright, or trade secret, provided that you promptly notify us and cooperate in the defense.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">15. Term and Termination</h2>
                <p>
                  15.1. <strong>Term.</strong> These Terms commence when you first access the Service and continue until terminated. Your subscription term is specified in your Order Form or account settings.
                </p>
                <p>
                  15.2. <strong>Termination by You.</strong> You may cancel your subscription at any time through your account settings or by contacting support. Cancellation takes effect at the end of your current billing cycle.
                </p>
                <p>
                  15.3. <strong>Termination by Us.</strong> We may terminate or suspend your access to the Service if you breach these Terms, fail to pay fees, or if required by law. We will provide reasonable notice when possible.
                </p>
                <p>
                  15.4. <strong>Effect of Termination.</strong> Upon termination, your right to use the Service ceases immediately. You may export your Customer Data within 30 days. Sections that by their nature should survive termination will survive, including Sections 6, 9, 12-14, and 16-18.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">16. Governing Law and Dispute Resolution</h2>
                <p>
                  16.1. These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles.
                </p>
                <p>
                  16.2. Any dispute arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.
                </p>
                <p>
                  16.3. The arbitration shall be conducted in Austin, Texas. The arbitrator&apos;s decision shall be final and binding. Judgment on the award may be entered in any court of competent jurisdiction.
                </p>
                <p>
                  16.4. Notwithstanding the above, either party may seek injunctive or equitable relief in any court of competent jurisdiction for the protection of intellectual property rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">17. General Provisions</h2>
                <p>
                  17.1. <strong>Entire Agreement.</strong> These Terms, together with any Order Forms and our Privacy Policy, constitute the entire agreement between you and TRITAL regarding the Service and supersede all prior agreements.
                </p>
                <p>
                  17.2. <strong>Severability.</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
                </p>
                <p>
                  17.3. <strong>Waiver.</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision or any other provision.
                </p>
                <p>
                  17.4. <strong>Assignment.</strong> You may not assign or transfer these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of substantially all of our assets.
                </p>
                <p>
                  17.5. <strong>Force Majeure.</strong> Neither party shall be liable for delays or failures in performance caused by circumstances beyond its reasonable control, including natural disasters, acts of government, pandemic, or internet service disruptions.
                </p>
                <p>
                  17.6. <strong>Notices.</strong> Notices under these Terms shall be sent to the email address associated with your account (for notices to you) or to legal@tritalorbit.com (for notices to us).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">18. Changes to Terms</h2>
                <p>
                  We may modify these Terms from time to time. We will notify you of material changes at least 30 days before they take effect by posting the updated Terms on our website and sending an email notification. Your continued use of the Service after the effective date constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#1F2937]">19. Contact Information</h2>
                <p>
                  For questions about these Terms, please contact us:
                </p>
                <div className="mt-4 rounded-lg border border-[#1F2937]/10 bg-white p-6">
                  <p className="font-semibold text-[#1F2937]">TRITAL, Inc.</p>
                  <p>Legal Department</p>
                  <p>100 Innovation Drive, Suite 400</p>
                  <p>Austin, TX 78701</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a href="mailto:legal@tritalorbit.com" className="text-[#0B3C5D] hover:underline">
                      legal@tritalorbit.com
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
              Have questions about our terms?
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
