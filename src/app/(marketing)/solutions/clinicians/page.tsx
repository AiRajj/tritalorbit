"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Home,
  Plane,
  Car,
  MapPin,
  Heart,
  Shield,
  Smartphone,
  Clock,
  Star,
  Users,
  Headphones,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const supports = [
  {
    icon: Home,
    title: "Housing Made Easy",
    description:
      "Browse verified, furnished housing options near your facility. Filter by budget, pet-friendly, amenities, and move-in date.",
  },
  {
    icon: Plane,
    title: "Travel Arranged",
    description:
      "Flights, trains, or driving — we help coordinate your travel to and from assignments with the best rates available.",
  },
  {
    icon: Car,
    title: "Transportation Covered",
    description:
      "Rental cars, rideshare credits, or transit passes — get reliable transportation sorted before you arrive.",
  },
  {
    icon: MapPin,
    title: "City Guides",
    description:
      "Moving to a new city? Get curated guides on neighborhoods, grocery stores, gyms, and must-know local info.",
  },
];

const steps = [
  {
    step: "1",
    title: "Accept Your Assignment",
    description:
      "Review your enhanced offer with all the perks and benefits included — housing, travel, transportation, and more.",
  },
  {
    step: "2",
    title: "Your Concierge Reaches Out",
    description:
      "A dedicated mobility concierge contacts you to understand your preferences and start coordinating your move.",
  },
  {
    step: "3",
    title: "Everything Gets Arranged",
    description:
      "Housing is booked, travel is arranged, transportation is set up — all you have to do is review and approve.",
  },
  {
    step: "4",
    title: "Arrive and Thrive",
    description:
      "Show up to your assignment with everything in place. Your concierge stays available throughout your assignment.",
  },
];

const trustPoints = [
  {
    icon: Shield,
    title: "Verified Vendors",
    description: "Every housing and travel provider in our network is vetted and reviewed.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Your concierge is always a call or message away — day or night.",
  },
  {
    icon: Star,
    title: "Clinician Rated",
    description: "See ratings and reviews from other travel clinicians before you book.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with other clinicians in your area for tips and friendship.",
  },
];

export default function CliniciansPage() {
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
              For Clinicians
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Every Assignment Should Be a{" "}
              <span className="text-[#E63946]">Better Life Decision</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              Travel assignments are about more than work — they&apos;re about
              living well in a new city. Orbit ensures every move is smooth,
              supported, and stress-free.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white" asChild>
                <Link href="/demo">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/platform">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile-first support */}
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
              <Smartphone className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Everything You Need, Right From Your Phone
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Manage your move, track your assignments, and connect with your
              concierge — all mobile-first.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supports.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E63946]/10">
                      <item.icon className="h-6 w-6 text-[#E63946]" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-[#1F2937]/10 bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
              <Clock className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              How It Works for You
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              From offer acceptance to your first day — a seamless experience.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-[#0B3C5D] to-[#E63946] lg:left-1/2 lg:block" />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`flex flex-col gap-6 lg:flex-row lg:items-center ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 lg:text-right">
                    {i % 2 === 0 && (
                      <div className={`lg:pr-12 ${i % 2 === 1 ? "lg:pl-12 lg:pr-0 lg:text-left" : ""}`}>
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0B3C5D] text-lg font-bold text-white">
                          {step.step}
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-[#1F2937]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[#1F2937]/70">{step.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:block">
                    <div className="h-4 w-4 rounded-full border-4 border-[#0B3C5D] bg-white" />
                  </div>
                  <div className="flex-1">
                    {i % 2 === 1 && (
                      <div className="lg:pl-12">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E63946] text-lg font-bold text-white">
                          {step.step}
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-[#1F2937]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[#1F2937]/70">{step.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E63946]/10">
              <Heart className="h-6 w-6 text-[#E63946]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Built on Trust
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Your safety, comfort, and peace of mind are our top priorities.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full text-center transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
                      <point.icon className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <CardTitle className="text-lg">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinician Stats */}
      <section className="bg-[#0B3C5D] py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Clinicians Love Orbit
            </h2>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "4.9/5", label: "Average Rating" },
              { value: "10K+", label: "Clinicians Supported" },
              { value: "98%", label: "Would Recommend" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
              >
                <div className="text-4xl font-bold text-[#E63946]">{stat.value}</div>
                <div className="mt-2 text-lg text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Ready for a Better Assignment Experience?
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Ask your recruiter about TRITAL Orbit&trade; or get started today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90" asChild>
                <Link href="/demo">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
