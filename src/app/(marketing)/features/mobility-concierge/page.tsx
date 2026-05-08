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
  CheckCircle2,
  Headphones,
  ListChecks,
  MessageSquare,
  Clock,
  Star,
  Shield,
  MapPin,
  CalendarCheck,
  Users,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const services = [
  {
    icon: Home,
    title: "Housing Search & Booking",
    description:
      "Curated, verified housing options near the assignment facility. Furnished apartments, extended stays, and short-term rentals — all pre-vetted for quality and safety.",
    features: [
      "Furnished apartment options",
      "Extended stay hotels",
      "Pet-friendly filtering",
      "Virtual tours available",
      "Lease management",
    ],
  },
  {
    icon: Plane,
    title: "Travel Arrangement",
    description:
      "Complete travel coordination from booking flights to arranging ground transportation at destination. We handle the logistics so clinicians can focus on their work.",
    features: [
      "Flight booking & management",
      "Route optimization",
      "Itinerary management",
      "Rebooking assistance",
      "Multi-city coordination",
    ],
  },
  {
    icon: Car,
    title: "Transportation Booking",
    description:
      "Rental cars, rideshare credits, or public transit passes — whatever transportation solution works best for each clinician and assignment location.",
    features: [
      "Car rental partnerships",
      "Rideshare credit programs",
      "Public transit passes",
      "GPS & route guides",
      "Insurance coordination",
    ],
  },
];

const taskManagement = [
  {
    icon: CalendarCheck,
    title: "Automated Task Creation",
    description:
      "When an assignment is accepted, the system automatically generates a task list for the concierge team based on the clinician's needs and assignment requirements.",
  },
  {
    icon: Clock,
    title: "Timeline Tracking",
    description:
      "Every task has a deadline tied to the assignment start date. Visual timelines show progress and highlight items that need urgent attention.",
  },
  {
    icon: Users,
    title: "Team Assignment",
    description:
      "Tasks are automatically assigned to the right team members — housing specialist, travel coordinator, or general concierge — based on skill and workload.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Built-in quality checks ensure every booking meets minimum standards before confirmation. Vendor ratings and reviews inform all recommendations.",
  },
];

const communicationFeatures = [
  {
    icon: MessageSquare,
    title: "Unified Messaging",
    description: "All clinician communication in one thread — no switching between email, SMS, and phone.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock support for urgent needs — travel changes, housing issues, or questions.",
  },
  {
    icon: Star,
    title: "Personalized Updates",
    description: "Automated but personalized status updates keep clinicians informed without manual effort.",
  },
  {
    icon: MapPin,
    title: "Location Guides",
    description: "Custom city guides with restaurant recommendations, gyms, grocery stores, and local tips.",
  },
];

export default function MobilityConcierge() {
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
              Mobility Concierge
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              White-Glove Mobility Support{" "}
              <span className="text-[#E63946]">for Every Clinician</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              From housing search to move-in day, our concierge platform
              coordinates every detail of clinician relocation — so your team can
              focus on placements, not logistics.
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

      {/* Core Services */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
              <Headphones className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Full-Service Mobility Support
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Housing, travel, and transportation — managed end-to-end.
            </p>
          </motion.div>

          <div className="space-y-16">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E63946]/10">
                    <service.icon className="h-6 w-6 text-[#E63946]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-lg text-[#1F2937]/70">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E63946]" />
                        <span className="text-[#1F2937]/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="aspect-video rounded-2xl border border-[#1F2937]/10 bg-gradient-to-br from-[#0B3C5D]/5 to-[#E63946]/5 p-8">
                    <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[#1F2937]/20">
                      <div className="text-center">
                        <service.icon className="mx-auto h-12 w-12 text-[#0B3C5D]/20" />
                        <p className="mt-3 text-sm text-[#1F2937]/40">
                          {service.title} Interface
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

      {/* Task Management */}
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
              <ListChecks className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Intelligent Task Management
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Automated workflows ensure every step of the relocation process is
              tracked and completed on time.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {taskManagement.map((task, i) => (
              <motion.div
                key={task.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
                      <task.icon className="h-5 w-5 text-[#0B3C5D]" />
                    </div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{task.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Communication */}
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
              <MessageSquare className="h-6 w-6 text-[#E63946]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Seamless Candidate Communication
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Keep clinicians informed and supported throughout their entire
              relocation journey.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {communicationFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full text-center transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
                      <feat.icon className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <CardTitle className="text-lg">{feat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{feat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
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
              Concierge by the Numbers
            </h2>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-4">
            {[
              { value: "4.9/5", label: "Clinician Satisfaction" },
              { value: "2hrs", label: "Avg. Response Time" },
              { value: "95%", label: "First-Contact Resolution" },
              { value: "80%", label: "Time Saved vs. Manual" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-[#E63946]">{stat.value}</div>
                <div className="mt-2 text-white/80">{stat.label}</div>
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
            <Headphones className="mx-auto h-12 w-12 text-[#E63946]" />
            <h2 className="mt-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Give Your Clinicians the Support They Deserve
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              See how the Mobility Concierge can transform the clinician
              experience and boost retention.
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
