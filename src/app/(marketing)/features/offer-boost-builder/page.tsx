"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Sparkles,
  Home,
  Plane,
  Car,
  DollarSign,
  CheckCircle2,
  ToggleRight,
  BarChart3,
  Zap,
  TrendingUp,
  Gift,
  Shield,
  Wifi,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const perks = [
  { id: "housing", icon: Home, label: "Housing Stipend", value: "$2,400/mo", enabled: true },
  { id: "travel", icon: Plane, label: "Travel Package", value: "$800", enabled: true },
  { id: "car", icon: Car, label: "Car Rental", value: "$450/mo", enabled: false },
  { id: "wifi", icon: Wifi, label: "Internet Stipend", value: "$75/mo", enabled: false },
  { id: "wellness", icon: Gift, label: "Wellness Benefit", value: "$200/mo", enabled: true },
  { id: "insurance", icon: Shield, label: "Gap Insurance", value: "$150/mo", enabled: false },
];

const aiFeatures = [
  {
    icon: Sparkles,
    title: "Smart Perk Recommendations",
    description:
      "AI analyzes clinician demographics, assignment location, and market data to recommend the optimal perk mix that maximizes acceptance probability.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Cost Modeling",
    description:
      "Instantly see how each perk impacts your total cost, margin, and predicted acceptance rate — before you send the offer.",
  },
  {
    icon: TrendingUp,
    title: "Market Benchmarking",
    description:
      "Compare your offers against market rates for similar roles, locations, and specialties to ensure competitiveness.",
  },
  {
    icon: Zap,
    title: "One-Click Optimization",
    description:
      "Let AI automatically optimize your perk mix to hit a target acceptance probability within your budget constraints.",
  },
];

export default function OfferBoostBuilderPage() {
  const [toggledPerks, setToggledPerks] = useState<Record<string, boolean>>(
    Object.fromEntries(perks.map((p) => [p.id, p.enabled]))
  );

  const togglePerk = (id: string) => {
    setToggledPerks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activePerks = perks.filter((p) => toggledPerks[p.id]);
  const totalMonthly = activePerks.reduce((sum, p) => {
    const val = p.value.replace(/[^0-9]/g, "");
    return sum + parseInt(val, 10);
  }, 0);

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
              Offer Boost Builder
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build Offers That <span className="text-[#E63946]">Win</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              Transform standard job offers into compelling lifestyle packages
              with AI-powered perk recommendations, real-time cost modeling, and
              one-click optimization.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white" asChild>
                <Link href="/demo">
                  See It In Action <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/platform">Back to Platform</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Toggle Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
              <ToggleRight className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Toggle Perks, See the Impact
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Mix and match benefits to create the perfect offer package.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Available Perks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {perks.map((perk) => (
                    <button
                      key={perk.id}
                      onClick={() => togglePerk(perk.id)}
                      className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition-all ${
                        toggledPerks[perk.id]
                          ? "border-[#0B3C5D] bg-[#0B3C5D]/5"
                          : "border-[#1F2937]/10 hover:border-[#1F2937]/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            toggledPerks[perk.id]
                              ? "bg-[#0B3C5D]/10"
                              : "bg-[#1F2937]/5"
                          }`}
                        >
                          <perk.icon
                            className={`h-5 w-5 ${
                              toggledPerks[perk.id]
                                ? "text-[#0B3C5D]"
                                : "text-[#1F2937]/40"
                            }`}
                          />
                        </div>
                        <div>
                          <div
                            className={`font-medium ${
                              toggledPerks[perk.id]
                                ? "text-[#1F2937]"
                                : "text-[#1F2937]/60"
                            }`}
                          >
                            {perk.label}
                          </div>
                          <div className="text-sm text-[#1F2937]/50">{perk.value}</div>
                        </div>
                      </div>
                      <div
                        className={`flex h-6 w-11 items-center rounded-full px-0.5 transition-colors ${
                          toggledPerks[perk.id] ? "bg-[#0B3C5D]" : "bg-[#1F2937]/20"
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                            toggledPerks[perk.id] ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="border-[#0B3C5D]/20 bg-gradient-to-br from-[#0B3C5D]/5 to-transparent">
                <CardHeader>
                  <CardTitle>Offer Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1F2937]/10 pb-3">
                      <span className="text-[#1F2937]/70">Base Pay Rate</span>
                      <span className="font-semibold text-[#1F2937]">$45/hr</span>
                    </div>
                    {activePerks.map((perk) => (
                      <div
                        key={perk.id}
                        className="flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2 text-[#1F2937]/70">
                          <CheckCircle2 className="h-4 w-4 text-[#E63946]" />
                          {perk.label}
                        </span>
                        <span className="font-medium text-[#1F2937]">{perk.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between border-t border-[#1F2937]/10 pt-3">
                      <span className="font-semibold text-[#1F2937]">
                        Total Package Value
                      </span>
                      <span className="text-xl font-bold text-[#0B3C5D]">
                        ${(45 * 160 + totalMonthly).toLocaleString()}/mo
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E63946]/20 bg-gradient-to-br from-[#E63946]/5 to-transparent">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-[#E63946]" />
                    <span className="font-semibold text-[#1F2937]">AI Prediction</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-[#E63946]">
                      {Math.min(65 + activePerks.length * 6, 97)}%
                    </div>
                    <div className="text-sm text-[#1F2937]/60">
                      Predicted acceptance probability
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-[#1F2937]/10">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-[#E63946] to-[#0B3C5D]"
                        animate={{
                          width: `${Math.min(65 + activePerks.length * 6, 97)}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Features */}
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
              AI-Powered Enhancements
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Let machine learning optimize your offers for maximum impact.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {aiFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
                      <feature.icon className="h-5 w-5 text-[#0B3C5D]" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Before & After Orbit
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              See how offer enhancement transforms your competitive position.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-[#1F2937]/20">
                <CardHeader className="bg-[#1F2937]/5">
                  <CardTitle className="text-center text-[#1F2937]/60">
                    Without Orbit
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {[
                      "Standard pay rate: $45/hr",
                      "No housing support",
                      "No travel assistance",
                      "Basic benefits package",
                      "42% acceptance rate",
                      "Manual offer creation",
                      "No competitive insights",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[#1F2937]/60">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#1F2937]/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-[#0B3C5D]/30 shadow-lg shadow-[#0B3C5D]/10">
                <CardHeader className="bg-gradient-to-r from-[#0B3C5D]/10 to-[#E63946]/10">
                  <CardTitle className="text-center text-[#0B3C5D]">
                    With Orbit
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {[
                      "Competitive pay rate: $45/hr",
                      "Furnished housing included",
                      "Travel package covered",
                      "Enhanced lifestyle benefits",
                      "78% acceptance rate",
                      "AI-optimized offer in seconds",
                      "Real-time market intelligence",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[#1F2937]">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#E63946]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
            <DollarSign className="mx-auto h-12 w-12 text-[#E63946]" />
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Start Building Offers That Win
            </h2>
            <p className="mt-4 text-lg text-white/70">
              See how Offer Boost Builder can increase your acceptance rates and
              reduce time-to-fill.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
    </div>
  );
}
