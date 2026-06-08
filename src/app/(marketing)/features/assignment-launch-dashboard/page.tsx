"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck,
  AlertCircle,
  Sparkles,
  ListChecks,
  Columns3,
  ClipboardCheck,
  Home,
  Plane,
  UserCheck,
  Bell,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const readinessFeatures = [
  {
    icon: ClipboardCheck,
    title: "Automated Checklists",
    description:
      "Every assignment automatically generates a customized checklist based on facility requirements, role type, and state regulations.",
  },
  {
    icon: FileCheck,
    title: "Document Verification",
    description:
      "Upload and track licenses, certifications, background checks, and facility-specific documents with automated expiration alerts.",
  },
  {
    icon: Home,
    title: "Housing Readiness",
    description:
      "Track housing search, booking confirmation, and move-in coordination as part of the unified readiness flow.",
  },
  {
    icon: Plane,
    title: "Travel Coordination",
    description:
      "Monitor travel booking status, itinerary confirmations, and arrival details — all connected to the assignment timeline.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Automated reminders for upcoming deadlines, overdue tasks, and critical path items that need immediate attention.",
  },
  {
    icon: UserCheck,
    title: "Stakeholder Views",
    description:
      "Recruiters, compliance, concierge, and clinicians each see role-specific views of the same assignment data.",
  },
];

const statusColumns = [
  {
    name: "Offer Accepted",
    color: "bg-blue-500",
    description: "Assignment has been accepted. Onboarding process begins.",
    count: 12,
  },
  {
    name: "Credentialing",
    color: "bg-yellow-500",
    description: "Licenses, certifications, and background checks in progress.",
    count: 8,
  },
  {
    name: "Housing & Travel",
    color: "bg-purple-500",
    description: "Housing booked and travel arrangements being coordinated.",
    count: 6,
  },
  {
    name: "Final Review",
    color: "bg-orange-500",
    description: "All items complete. Final review before go-live.",
    count: 4,
  },
  {
    name: "Ready to Start",
    color: "bg-green-500",
    description: "All requirements met. Clinician ready for day one.",
    count: 15,
  },
];

const aiRecommendations = [
  {
    type: "warning",
    message: "Sarah Chen's nursing license expires in 12 days — initiate renewal now to avoid delays.",
    action: "Send Reminder",
  },
  {
    type: "info",
    message: "Housing for Mark Johnson's Phoenix assignment is 80% booked for his start date — book now for best rates.",
    action: "Book Housing",
  },
  {
    type: "success",
    message: "Emily Davis is ahead of schedule — consider moving her start date up by 1 week to fill an urgent need.",
    action: "View Options",
  },
  {
    type: "warning",
    message: "Background check for Jason Lee has been pending for 5 days — follow up with vendor.",
    action: "Contact Vendor",
  },
];

export default function AssignmentLaunchPage() {
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
              Assignment Launch Dashboard
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              From Acceptance to First Day —{" "}
              <span className="text-[#E63946]">
                Nothing Falls Through the Cracks
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              A unified dashboard that tracks every step of the onboarding
              journey — credentialing, housing, travel, compliance — so every
              assignment starts on time.
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

      {/* Readiness Features */}
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
              <ListChecks className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Complete Readiness Tracking
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Every requirement, every document, every milestone — tracked and
              managed in one place.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {readinessFeatures.map((feature, i) => (
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
                    <p className="text-sm text-[#1F2937]/70">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Columns */}
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
              <Columns3 className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Kanban-Style Status Pipeline
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              See every assignment&apos;s progress at a glance with intuitive
              status columns.
            </p>
          </motion.div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {statusColumns.map((col, i) => (
              <motion.div
                key={col.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="min-w-[220px] flex-1"
              >
                <div className="rounded-xl border border-[#1F2937]/10 bg-[#F8FAFC] p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${col.color}`} />
                    <span className="text-sm font-semibold text-[#1F2937]">
                      {col.name}
                    </span>
                    <span className="ml-auto rounded-full bg-[#1F2937]/10 px-2 py-0.5 text-xs font-medium text-[#1F2937]/70">
                      {col.count}
                    </span>
                  </div>
                  <p className="text-xs text-[#1F2937]/50">{col.description}</p>
                  <div className="mt-3 space-y-2">
                    {[1, 2].map((n) => (
                      <div
                        key={n}
                        className="rounded-lg border border-[#1F2937]/10 bg-white p-3"
                      >
                        <div className="h-2.5 w-3/4 rounded bg-[#1F2937]/10" />
                        <div className="mt-2 h-2 w-1/2 rounded bg-[#1F2937]/5" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
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
              <Sparkles className="h-6 w-6 text-[#E63946]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              AI-Driven Recommendations
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Smart suggestions that keep assignments on track and prevent
              delays.
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {aiRecommendations.map((rec, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card
                  className={`transition-shadow hover:shadow-md ${
                    rec.type === "warning"
                      ? "border-l-4 border-l-yellow-500"
                      : rec.type === "success"
                        ? "border-l-4 border-l-green-500"
                        : "border-l-4 border-l-blue-500"
                  }`}
                >
                  <CardContent className="flex items-center gap-4 py-4">
                    {rec.type === "warning" ? (
                      <AlertCircle className="h-5 w-5 shrink-0 text-yellow-500" />
                    ) : rec.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 shrink-0 text-blue-500" />
                    )}
                    <p className="flex-1 text-sm text-[#1F2937]/80">{rec.message}</p>
                    <Button size="sm" variant="outline" className="shrink-0">
                      {rec.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
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
              Results That Speak
            </h2>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "92%", label: "On-Time Assignment Starts" },
              { value: "75%", label: "Reduction in Admin Time" },
              { value: "3x", label: "Faster Onboarding" },
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
            <Zap className="mx-auto h-12 w-12 text-[#E63946]" />
            <h2 className="mt-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Never Miss a Beat on Onboarding
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              See how the Assignment Launch Dashboard can streamline your
              onboarding process.
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
