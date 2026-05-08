"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, X, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { Metadata } from "next";

const plans = [
  {
    tier: "Starter",
    monthlyPrice: 299,
    yearlyPrice: 249,
    description: "Perfect for emerging agencies building their staffing practice.",
    color: "border-slate-200",
    features: {
      "Core Platform": {
        "Offer Boost Builder": true,
        "AI Offer Enhancement": true,
        "Candidate Portal": true,
        "Email Pitches & SMS": true,
      },
      "Analytics": {
        "Basic KPI Dashboard": true,
        "Offer Acceptance Tracking": true,
        "Advanced Analytics": false,
        "MSP Reports": false,
      },
      "Mobility Modules": {
        "Housing Directory": true,
        "Travel Support": false,
        "Car Rental": false,
        "Concierge Module": false,
      },
      "Team": {
        "Recruiters": "Up to 3",
        "Offers / Month": "50",
        "Candidates": "Unlimited",
        "Custom Roles": false,
      },
      "Support": {
        "Email Support": true,
        "Chat Support": false,
        "Dedicated CSM": false,
        "SLA Guarantee": false,
      },
    },
  },
  {
    tier: "Growth",
    monthlyPrice: 799,
    yearlyPrice: 666,
    description: "For agencies scaling fast and competing for top clinicians.",
    color: "border-orbit-blue ring-2 ring-orbit-blue",
    highlighted: true,
    features: {
      "Core Platform": {
        "Offer Boost Builder": true,
        "AI Offer Enhancement": true,
        "Candidate Portal": true,
        "Email Pitches & SMS": true,
      },
      "Analytics": {
        "Basic KPI Dashboard": true,
        "Offer Acceptance Tracking": true,
        "Advanced Analytics": true,
        "MSP Reports": true,
      },
      "Mobility Modules": {
        "Housing Directory": true,
        "Travel Support": true,
        "Car Rental": true,
        "Concierge Module": true,
      },
      "Team": {
        "Recruiters": "Up to 15",
        "Offers / Month": "500",
        "Candidates": "Unlimited",
        "Custom Roles": true,
      },
      "Support": {
        "Email Support": true,
        "Chat Support": true,
        "Dedicated CSM": false,
        "SLA Guarantee": false,
      },
    },
  },
  {
    tier: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "For large agencies, MSPs, and enterprise health systems.",
    color: "border-slate-200",
    features: {
      "Core Platform": {
        "Offer Boost Builder": true,
        "AI Offer Enhancement": true,
        "Candidate Portal": true,
        "Email Pitches & SMS": true,
      },
      "Analytics": {
        "Basic KPI Dashboard": true,
        "Offer Acceptance Tracking": true,
        "Advanced Analytics": true,
        "MSP Reports": true,
      },
      "Mobility Modules": {
        "Housing Directory": true,
        "Travel Support": true,
        "Car Rental": true,
        "Concierge Module": true,
      },
      "Team": {
        "Recruiters": "Unlimited",
        "Offers / Month": "Unlimited",
        "Candidates": "Unlimited",
        "Custom Roles": true,
      },
      "Support": {
        "Email Support": true,
        "Chat Support": true,
        "Dedicated CSM": true,
        "SLA Guarantee": "99.9% SLA",
      },
    },
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-blue-50 text-orbit-blue border-blue-100">Transparent Pricing</Badge>
          <h1 className="text-5xl font-bold text-orbit-dark mb-4">
            Simple, Scalable Pricing
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
            No hidden fees. No per-seat pricing traps. Full access to core features on every plan.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? "text-orbit-dark" : "text-slate-400"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm font-medium ${isYearly ? "text-orbit-dark" : "text-slate-400"}`}>
              Yearly
              <Badge className="ml-2 bg-emerald-100 text-emerald-700 border-0">Save 17%</Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card key={plan.tier} className={`relative ${plan.color} ${plan.highlighted ? "shadow-orbit-xl" : ""}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <Badge className="bg-orbit-blue text-white px-4 py-1">
                      <Zap className="h-3 w-3 mr-1" /> Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{plan.tier}</h3>
                    {plan.monthlyPrice ? (
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-5xl font-bold text-orbit-dark">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-slate-500">/mo</span>
                      </div>
                    ) : (
                      <div className="text-5xl font-bold text-orbit-dark mb-1">Custom</div>
                    )}
                    <p className="text-slate-500 text-sm">{plan.description}</p>
                  </div>

                  <Link href={plan.tier === "Enterprise" ? "/contact" : "/demo"}>
                    <Button
                      className={`w-full mb-8 ${plan.highlighted ? "bg-orbit-blue hover:bg-orbit-blue-light text-white" : ""}`}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.tier === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>

                  {Object.entries(plan.features).map(([category, items]) => (
                    <div key={category} className="mb-6">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{category}</h4>
                      <ul className="space-y-2">
                        {Object.entries(items).map(([feature, value]) => (
                          <li key={feature} className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">{feature}</span>
                            {typeof value === "boolean" ? (
                              value ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <X className="h-4 w-4 text-slate-300" />
                              )
                            ) : (
                              <span className="font-medium text-orbit-dark text-xs">{value as string}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-orbit-dark text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Is there a free trial?",
                  a: "Yes. All plans include a 14-day free trial with no credit card required. You get full access to all features during the trial period.",
                },
                {
                  q: "Can I switch plans?",
                  a: "Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately and downgrades take effect at the end of your billing period.",
                },
                {
                  q: "What counts as an 'offer'?",
                  a: "An offer is any offer document created in the Offer Boost Builder and sent to a candidate. Draft offers don't count toward your monthly limit.",
                },
                {
                  q: "Does TRITAL Orbit integrate with our ATS?",
                  a: "We support integrations with Bullhorn, JobDiva, Salesforce Health Cloud, and others via our API. Enterprise plans include custom integrations.",
                },
                {
                  q: "Is TRITAL Orbit HIPAA compliant?",
                  a: "TRITAL Orbit is built with HIPAA-ready architecture. We sign BAAs with Enterprise customers and follow all required safeguards.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-orbit-dark mb-2">{faq.q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orbit-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/75 text-lg mb-8">
            Book a 30-minute demo and see how TRITAL Orbit™ can improve your agency's offer acceptance rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="bg-orbit-red hover:bg-red-700 text-white">
                Book a Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
