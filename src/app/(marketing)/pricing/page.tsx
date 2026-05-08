"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Check,
  X,
  HelpCircle,
  Zap,
  Building2,
  Crown,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

const plans = [
  {
    name: "Starter",
    price: "$499",
    period: "/mo",
    desc: "For small agencies getting started with workforce mobility",
    icon: Zap,
    features: [
      { text: "Up to 5 users", included: true },
      { text: "50 offers per month", included: true },
      { text: "Basic mobility support", included: true },
      { text: "Offer Boost Builder", included: true },
      { text: "Email support", included: true },
      { text: "Standard analytics", included: true },
      { text: "Assignment Launch Dashboard", included: false },
      { text: "Retention Risk AI", included: false },
      { text: "Dedicated concierge", included: false },
      { text: "Custom integrations", included: false },
      { text: "SSO / SAML", included: false },
      { text: "SLA guarantee", included: false },
    ],
    cta: "Start Free Trial",
    href: "/demo",
    popular: false,
  },
  {
    name: "Professional",
    price: "$1,499",
    period: "/mo",
    desc: "For growing agencies that need full mobility infrastructure",
    icon: Building2,
    features: [
      { text: "Up to 25 users", included: true },
      { text: "Unlimited offers", included: true },
      { text: "Full concierge services", included: true },
      { text: "Offer Boost Builder", included: true },
      { text: "Priority support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Assignment Launch Dashboard", included: true },
      { text: "Retention Risk AI", included: true },
      { text: "Dedicated concierge", included: true },
      { text: "Standard integrations", included: true },
      { text: "SSO / SAML", included: false },
      { text: "SLA guarantee", included: false },
    ],
    cta: "Start Free Trial",
    href: "/demo",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large agencies and MSPs with complex requirements",
    icon: Crown,
    features: [
      { text: "Unlimited users", included: true },
      { text: "Unlimited offers", included: true },
      { text: "Premium concierge", included: true },
      { text: "Offer Boost Builder", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Enterprise analytics", included: true },
      { text: "Assignment Launch Dashboard", included: true },
      { text: "Retention Risk AI", included: true },
      { text: "Dedicated concierge team", included: true },
      { text: "Custom integrations", included: true },
      { text: "SSO / SAML", included: true },
      { text: "SLA guarantee", included: true },
    ],
    cta: "Contact Sales",
    href: "/demo",
    popular: false,
  },
];

const faqs = [
  {
    q: "How does the free trial work?",
    a: "You get 14 days of full access to the Professional plan with no credit card required. At the end of the trial, you can choose the plan that best fits your needs or continue with a free limited account.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated for the remainder of the billing period.",
  },
  {
    q: "What counts as an 'offer'?",
    a: "An offer is any clinician placement offer that is created and sent through the TRITAL Orbit platform. Draft offers that are not sent do not count toward your monthly limit.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes, annual billing is available at a 20% discount. Contact our sales team for annual pricing details.",
  },
  {
    q: "What integrations are available?",
    a: "Professional plans include integrations with major ATS platforms like Bullhorn and Salesforce. Enterprise plans support custom integrations with any system via our REST and GraphQL APIs.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees for Starter or Professional plans. Enterprise plans may include an implementation fee depending on the complexity of custom integrations and data migration requirements.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#0B3C5D]/5 via-[#E63946]/3 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2937]">
            Simple, transparent pricing
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
            Choose the plan that fits your agency. All plans include a 14-day free trial. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <AnimatedSection key={plan.name} delay={i * 0.1}>
                  <div
                    className={cn(
                      "relative rounded-2xl border p-8 flex flex-col h-full",
                      plan.popular
                        ? "border-[#0B3C5D] bg-white shadow-xl ring-1 ring-[#0B3C5D]/10 scale-[1.02] lg:scale-105"
                        : "border-gray-200/80 bg-white hover:shadow-lg transition-shadow"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="inline-flex items-center rounded-full bg-[#E63946] text-white px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-md shadow-[#E63946]/20">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", plan.popular ? "bg-[#0B3C5D]/10" : "bg-gray-100")}>
                        <Icon className={cn("h-5 w-5", plan.popular ? "text-[#0B3C5D]" : "text-gray-500")} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2937]">{plan.name}</h3>
                    </div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-[#1F2937]">{plan.price}</span>
                      {plan.period && <span className="text-gray-500">{plan.period}</span>}
                    </div>
                    <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
                    <Link href={plan.href} className="block mb-6">
                      <Button
                        className={cn(
                          "w-full h-11",
                          plan.popular
                            ? "bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-md shadow-[#E63946]/20"
                            : plan.name === "Enterprise"
                            ? "bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white"
                            : ""
                        )}
                        variant={!plan.popular && plan.name !== "Enterprise" ? "outline" : "default"}
                      >
                        {plan.cta}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-start gap-2.5">
                          {f.included ? (
                            <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-gray-300 mt-0.5 shrink-0" />
                          )}
                          <span className={cn("text-sm", f.included ? "text-gray-700" : "text-gray-400")}>
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">Frequently Asked Questions</h2>
          </AnimatedSection>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6">
                  <h3 className="text-base font-bold text-[#1F2937] flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-[#0B3C5D] mt-0.5 shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-gray-500 mt-3 ml-8 leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0B3C5D] to-[#0a3350]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Still Have Questions?</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">Our team is happy to walk you through the platform and help you choose the right plan.</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/demo">
                <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-lg shadow-[#E63946]/30 h-12 px-8">
                  Schedule a Demo <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 h-12 px-8">
                  <MessageCircle className="h-4 w-4 mr-2" /> Contact Sales
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
