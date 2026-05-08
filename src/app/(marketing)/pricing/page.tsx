"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  Shield,
  Zap,
  Crown,
  HelpCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: typeof Zap;
  highlighted: boolean;
  features: string[];
  cta: string;
  ctaHref: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$499",
    period: "/mo",
    description: "For small agencies getting started with offer enhancement.",
    icon: Zap,
    highlighted: false,
    features: [
      "Up to 25 active offers",
      "5 user accounts",
      "Basic AI recommendations",
      "Email support",
      "Offer Boost Builder",
      "Basic reporting",
      "Standard integrations",
    ],
    cta: "Start Free Trial",
    ctaHref: "/demo",
  },
  {
    name: "Professional",
    price: "$1,299",
    period: "/mo",
    description: "For growing agencies that need the full assignment lifecycle.",
    icon: Crown,
    highlighted: true,
    features: [
      "Up to 100 active offers",
      "25 user accounts",
      "Full AI suite",
      "Priority support",
      "Offer Boost Builder",
      "Assignment Launch Dashboard",
      "Retention Risk AI",
      "Mobility Concierge",
      "Advanced reporting",
      "All integrations",
    ],
    cta: "Start Free Trial",
    ctaHref: "/demo",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large agencies and MSPs requiring unlimited scale.",
    icon: Shield,
    highlighted: false,
    features: [
      "Unlimited active offers",
      "Unlimited user accounts",
      "Custom AI models",
      "Dedicated support manager",
      "All modules included",
      "MSP reporting suite",
      "Vendor Marketplace access",
      "SSO / SAML",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    ctaHref: "/contact",
  },
];

const comparisonFeatures = [
  { category: "Core", features: [
    { name: "Offer Boost Builder", starter: true, professional: true, enterprise: true },
    { name: "Assignment Launch Dashboard", starter: false, professional: true, enterprise: true },
    { name: "Retention Risk AI", starter: false, professional: true, enterprise: true },
    { name: "Mobility Concierge", starter: false, professional: true, enterprise: true },
    { name: "Vendor Marketplace", starter: false, professional: false, enterprise: true },
    { name: "MSP Reporting", starter: false, professional: false, enterprise: true },
  ]},
  { category: "AI & Analytics", features: [
    { name: "Basic AI Recommendations", starter: true, professional: true, enterprise: true },
    { name: "Predictive Risk Scoring", starter: false, professional: true, enterprise: true },
    { name: "Market Benchmarking", starter: false, professional: true, enterprise: true },
    { name: "Custom AI Models", starter: false, professional: false, enterprise: true },
    { name: "Advanced Analytics", starter: false, professional: true, enterprise: true },
  ]},
  { category: "Support & Security", features: [
    { name: "Email Support", starter: true, professional: true, enterprise: true },
    { name: "Priority Support", starter: false, professional: true, enterprise: true },
    { name: "Dedicated Account Manager", starter: false, professional: false, enterprise: true },
    { name: "SSO / SAML", starter: false, professional: false, enterprise: true },
    { name: "SLA Guarantee", starter: false, professional: false, enterprise: true },
    { name: "HIPAA Compliance", starter: true, professional: true, enterprise: true },
  ]},
];

const faqs = [
  {
    question: "Can I try TRITAL Orbit before committing?",
    answer: "Yes! We offer a 14-day free trial on both Starter and Professional plans. No credit card required. You'll get full access to all features in your chosen plan during the trial period.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, ACH bank transfers, and wire transfers for Enterprise plans. Annual billing is available with a 15% discount on all plans.",
  },
  {
    question: "Is my data secure and HIPAA compliant?",
    answer: "Yes. TRITAL Orbit is built on a SOC 2 Type II compliant infrastructure with full HIPAA compliance. All data is encrypted at rest and in transit. We perform regular security audits and penetration testing.",
  },
  {
    question: "How long does implementation take?",
    answer: "Most agencies are up and running within 1-2 weeks. Our implementation team handles data migration, integration setup, and team training. Enterprise implementations may take 4-6 weeks depending on customization requirements.",
  },
  {
    question: "Do you offer annual billing discounts?",
    answer: "Yes. Annual billing saves you 15% compared to monthly billing. That's $499/mo becomes $424/mo on Starter, and $1,299/mo becomes $1,104/mo on Professional.",
  },
  {
    question: "What integrations are included?",
    answer: "Starter includes standard integrations with popular ATS systems like Bullhorn. Professional adds CRM, communication, and payment integrations. Enterprise includes custom API access and dedicated integration support.",
  },
  {
    question: "Can I add more users beyond my plan limit?",
    answer: "Yes. Additional users can be added at $29/user/month on Starter and $19/user/month on Professional. Enterprise plans include unlimited users.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D] to-[#1F2937] py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Simple, Transparent <span className="text-[#E63946]">Pricing</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              Choose the plan that fits your agency. No hidden fees, no long-term
              contracts. Start with a 14-day free trial.
            </p>
            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span
                className={`text-sm font-medium ${
                  billingPeriod === "monthly" ? "text-white" : "text-white/50"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")
                }
                className={`relative h-7 w-14 rounded-full transition-colors ${
                  billingPeriod === "annual" ? "bg-[#E63946]" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                    billingPeriod === "annual" ? "translate-x-7" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  billingPeriod === "annual" ? "text-white" : "text-white/50"
                }`}
              >
                Annual{" "}
                <span className="rounded-full bg-[#E63946]/20 px-2 py-0.5 text-xs text-[#E63946]">
                  Save 15%
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="-mt-8 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => {
              const displayPrice =
                tier.price === "Custom"
                  ? "Custom"
                  : billingPeriod === "annual"
                    ? `$${Math.round(parseInt(tier.price.replace(/[^0-9]/g, "")) * 0.85).toLocaleString()}`
                    : tier.price;

              return (
                <motion.div
                  key={tier.name}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  <Card
                    className={`relative h-full ${
                      tier.highlighted
                        ? "border-2 border-[#E63946] shadow-xl shadow-[#E63946]/10"
                        : "border border-[#1F2937]/10"
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#E63946] px-4 py-1 text-sm font-semibold text-white">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <div
                        className={`mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                          tier.highlighted
                            ? "bg-[#E63946]/10"
                            : "bg-[#0B3C5D]/10"
                        }`}
                      >
                        <tier.icon
                          className={`h-6 w-6 ${
                            tier.highlighted ? "text-[#E63946]" : "text-[#0B3C5D]"
                          }`}
                        />
                      </div>
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <CardDescription className="mt-1">{tier.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-[#1F2937]">
                          {displayPrice}
                        </span>
                        {tier.period && (
                          <span className="text-[#1F2937]/50">{tier.period}</span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                tier.highlighted ? "text-[#E63946]" : "text-[#0B3C5D]"
                              }`}
                            />
                            <span className="text-sm text-[#1F2937]/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="lg"
                        className={`w-full ${
                          tier.highlighted
                            ? "bg-[#E63946] hover:bg-[#E63946]/90"
                            : ""
                        }`}
                        variant={tier.highlighted ? "default" : "outline"}
                        asChild
                      >
                        <Link href={tier.ctaHref}>
                          {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="border-y border-[#1F2937]/10 bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Feature Comparison
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              See exactly what&apos;s included in each plan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-[#1F2937]/10">
                  <th className="py-4 text-left text-sm font-semibold text-[#1F2937]">
                    Feature
                  </th>
                  <th className="py-4 text-center text-sm font-semibold text-[#1F2937]">
                    Starter
                  </th>
                  <th className="py-4 text-center text-sm font-semibold text-[#E63946]">
                    Professional
                  </th>
                  <th className="py-4 text-center text-sm font-semibold text-[#1F2937]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <>
                    <tr key={category.category}>
                      <td
                        colSpan={4}
                        className="bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#0B3C5D]"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-[#1F2937]/5"
                      >
                        <td className="py-3 text-sm text-[#1F2937]/80">
                          {feature.name}
                        </td>
                        <td className="py-3 text-center">
                          {feature.starter ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-[#1F2937]/20" />
                          )}
                        </td>
                        <td className="bg-[#E63946]/[0.02] py-3 text-center">
                          {feature.professional ? (
                            <Check className="mx-auto h-5 w-5 text-[#E63946]" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-[#1F2937]/20" />
                          )}
                        </td>
                        <td className="py-3 text-center">
                          {feature.enterprise ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-[#1F2937]/20" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
              <HelpCircle className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-[#1F2937]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#1F2937]/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B3C5D] py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="mx-auto h-12 w-12 text-[#E63946]" />
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white" asChild>
                <Link href="/demo">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
