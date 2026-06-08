"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Rocket,
  BarChart3,
  Shield,
  Headphones,
  Store,
  FileText,
  ArrowRight,
  Zap,
  CheckCircle2,
  Layers,
  Globe,
  Lock,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const modules = [
  {
    icon: Rocket,
    title: "Offer Boost Builder",
    description:
      "Transform standard job offers into compelling lifestyle packages that win top clinicians.",
    features: [
      "AI-powered perk recommendations",
      "Housing, travel & car rental add-ons",
      "Real-time cost modeling",
      "Side-by-side offer comparison",
    ],
    href: "/features/offer-boost-builder",
  },
  {
    icon: BarChart3,
    title: "Assignment Launch Dashboard",
    description:
      "Track every step from offer acceptance to first day on assignment with full visibility.",
    features: [
      "Readiness status tracking",
      "Automated task checklists",
      "Document verification",
      "AI-driven recommendations",
    ],
    href: "/features/assignment-launch-dashboard",
  },
  {
    icon: Shield,
    title: "Retention Risk AI",
    description:
      "Predict which assignments are at risk of backout and take action before it happens.",
    features: [
      "Predictive risk scoring",
      "Real-time alert system",
      "Behavioral pattern analysis",
      "Suggested intervention actions",
    ],
    href: "/features/retention-risk-ai",
  },
  {
    icon: Headphones,
    title: "Mobility Concierge",
    description:
      "White-glove relocation support that handles housing, travel, and logistics for every clinician.",
    features: [
      "Housing search & booking",
      "Travel arrangement",
      "Transportation coordination",
      "24/7 candidate communication",
    ],
    href: "/features/mobility-concierge",
  },
  {
    icon: Store,
    title: "Vendor Marketplace",
    description:
      "Curated network of vetted housing, travel, and service providers with negotiated rates.",
    features: [
      "Pre-negotiated vendor rates",
      "Quality-verified providers",
      "Instant booking integration",
      "Performance tracking & reviews",
    ],
    href: "/platform",
  },
  {
    icon: FileText,
    title: "MSP Reporting",
    description:
      "Comprehensive reporting suite built for managed service providers and enterprise clients.",
    features: [
      "Supplier performance dashboards",
      "Compliance tracking",
      "Workforce readiness reports",
      "Custom analytics & exports",
    ],
    href: "/solutions/msps",
  },
];

const integrations = [
  { name: "Bullhorn", category: "ATS" },
  { name: "Salesforce", category: "CRM" },
  { name: "SAP SuccessFactors", category: "HCM" },
  { name: "Workday", category: "HCM" },
  { name: "DocuSign", category: "Signatures" },
  { name: "Stripe", category: "Payments" },
  { name: "Slack", category: "Communication" },
  { name: "Microsoft Teams", category: "Communication" },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D] to-[#1F2937] py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              The TRITAL Orbit&trade; Platform
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              One Platform for the Entire{" "}
              <span className="text-[#E63946]">Assignment Lifecycle</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              From offer creation to assignment completion, TRITAL Orbit&trade;
              gives staffing agencies, MSPs, and clinicians the tools they need
              to succeed at every stage.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white" asChild>
                <Link href="/demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Module sections */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Six Powerful Modules, One Unified Platform
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Each module is designed to solve a critical challenge in the
              healthcare staffing lifecycle.
            </p>
          </motion.div>

          <div className="space-y-20">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
                    <mod.icon className="h-6 w-6 text-[#0B3C5D]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">
                    {mod.title}
                  </h3>
                  <p className="mt-3 text-lg text-[#1F2937]/70">
                    {mod.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {mod.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E63946]" />
                        <span className="text-[#1F2937]/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6" variant="outline" asChild>
                    <Link href={mod.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="aspect-[4/3] rounded-2xl border border-[#1F2937]/10 bg-gradient-to-br from-[#0B3C5D]/5 to-[#E63946]/5 p-8">
                    <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[#1F2937]/20">
                      <div className="text-center">
                        <mod.icon className="mx-auto h-16 w-16 text-[#0B3C5D]/30" />
                        <p className="mt-3 text-sm text-[#1F2937]/40">
                          {mod.title} Interface Preview
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-y border-[#1F2937]/10 bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
              <Layers className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Seamless Integrations
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Connect Orbit with the tools you already use.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {integrations.map((integration, i) => (
              <motion.div
                key={integration.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="text-center transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
                      <Globe className="h-6 w-6 text-[#0B3C5D]/60" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <p className="mt-1 text-xs text-[#1F2937]/50">
                      {integration.category}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#1F2937]/60">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>HIPAA Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Ready to Transform Your Staffing Operations?
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Join hundreds of healthcare staffing agencies already using TRITAL
              Orbit&trade; to win more clinicians and retain more assignments.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90" asChild>
                <Link href="/demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
