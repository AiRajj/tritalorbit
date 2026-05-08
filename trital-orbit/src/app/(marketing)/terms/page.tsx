import React from "react";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Badge className="mb-4 bg-blue-50 text-orbit-blue border-blue-100">Legal</Badge>
          <h1 className="text-4xl font-bold text-orbit-dark mb-4">Terms of Service</h1>
          <p className="text-slate-500">Last updated: May 1, 2026</p>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "1. Acceptance of Terms",
              content: "By accessing or using TRITAL Orbit™ (\"the Platform\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform. These terms apply to all users, including agency owners, recruiters, clinicians, vendors, and administrators.",
            },
            {
              title: "2. Platform License",
              content: "Subject to your compliance with these Terms, TRITAL Care Inc. grants you a limited, non-exclusive, non-transferable license to access and use the Platform for your internal business purposes. You may not sublicense, resell, or redistribute access to the Platform.",
            },
            {
              title: "3. User Accounts",
              content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use. We reserve the right to suspend accounts that violate these terms.",
            },
            {
              title: "4. Acceptable Use",
              content: "You agree not to use the Platform for unlawful purposes, to transmit spam or malware, to attempt to gain unauthorized access to any system, to scrape or harvest data without permission, or to interfere with the Platform's operation. Violations may result in immediate account termination.",
            },
            {
              title: "5. Healthcare Compliance",
              content: "Users are responsible for ensuring their use of the Platform complies with applicable healthcare laws and regulations, including HIPAA where applicable. We offer BAAs for covered entities. Users must not upload protected health information (PHI) without executing a BAA with TRITAL Care Inc.",
            },
            {
              title: "6. Payment Terms",
              content: "Subscription fees are billed monthly or annually as selected. All fees are non-refundable except as required by law. We reserve the right to modify pricing with 30 days notice. Accounts with overdue payments may be suspended after a 7-day grace period.",
            },
            {
              title: "7. Intellectual Property",
              content: "The Platform, including all AI-generated content, software, trademarks, and content, is the property of TRITAL Care Inc. Your data remains your property. You grant us a license to use your data to provide and improve the Platform.",
            },
            {
              title: "8. Limitation of Liability",
              content: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRITAL CARE INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM.",
            },
            {
              title: "9. Contact",
              content: "For questions about these Terms, contact legal@tritalorbit.com or write to TRITAL Care Inc., Legal Department, Dallas, TX.",
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
