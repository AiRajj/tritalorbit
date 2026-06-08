"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Eye,
  FileText,
  Shield,
  Users,
  CheckCircle2,
  Activity,
  ClipboardCheck,
  TrendingUp,
  Layers,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const valueProps = [
  {
    icon: Eye,
    title: "Complete Visibility",
    description:
      "Real-time dashboards showing workforce readiness status across all suppliers, facilities, and assignments.",
  },
  {
    icon: BarChart3,
    title: "Supplier Performance",
    description:
      "Track supplier fill rates, backout rates, time-to-start, and quality metrics to optimize your supplier mix.",
  },
  {
    icon: Shield,
    title: "Compliance Tracking",
    description:
      "Automated credential verification, license tracking, and compliance monitoring with real-time alerts.",
  },
  {
    icon: Activity,
    title: "Readiness Monitoring",
    description:
      "Know exactly which assignments are on track and which need intervention — before problems escalate.",
  },
];

const reportTypes = [
  {
    title: "Supplier Scorecard",
    description:
      "Comprehensive supplier performance metrics including fill rate, time-to-fill, backout rate, and clinician quality scores.",
    icon: Users,
  },
  {
    title: "Workforce Readiness Report",
    description:
      "Real-time status of all active assignments showing credentialing, housing, travel, and onboarding progress.",
    icon: ClipboardCheck,
  },
  {
    title: "Compliance Dashboard",
    description:
      "License expirations, credential gaps, mandatory training status, and facility-specific requirement tracking.",
    icon: Shield,
  },
  {
    title: "Financial Analytics",
    description:
      "Cost analysis, margin tracking, mobility spend optimization, and budget forecasting by facility and supplier.",
    icon: TrendingUp,
  },
  {
    title: "Retention Analytics",
    description:
      "Assignment completion rates, early termination analysis, risk factor identification, and intervention effectiveness.",
    icon: Activity,
  },
  {
    title: "Custom Reports",
    description:
      "Build custom reports with drag-and-drop builder, schedule automated delivery, and export to any format.",
    icon: FileText,
  },
];

export default function MSPsPage() {
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
              For MSPs
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Complete Visibility Into{" "}
              <span className="text-[#E63946]">Workforce Readiness</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              TRITAL Orbit&trade; gives managed service providers the reporting,
              compliance tracking, and supplier management tools they need to
              ensure every assignment starts on time.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white" asChild>
                <Link href="/demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link href="/platform">Explore Platform</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
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
              Built for MSP Complexity
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Managing multiple suppliers, facilities, and hundreds of
              assignments requires purpose-built tools.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop, i) => (
              <motion.div
                key={prop.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3C5D]/10">
                      <prop.icon className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <CardTitle className="text-lg">{prop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{prop.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="border-y border-[#1F2937]/10 bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
                Your Command Center for Workforce Readiness
              </h2>
              <p className="mt-4 text-lg text-[#1F2937]/70">
                A single dashboard that shows the real-time status of every
                assignment across all suppliers and facilities.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Supplier-level readiness aggregation",
                  "Facility-specific compliance views",
                  "Assignment-level drill-down capability",
                  "Automated alerts for at-risk assignments",
                  "Historical trend analysis",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E63946]" />
                    <span className="text-[#1F2937]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="aspect-[4/3] rounded-2xl border border-[#1F2937]/10 bg-gradient-to-br from-[#0B3C5D]/5 to-[#E63946]/5 p-8">
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[#1F2937]/20">
                  <div className="text-center">
                    <Layers className="mx-auto h-16 w-16 text-[#0B3C5D]/30" />
                    <p className="mt-3 text-sm text-[#1F2937]/40">
                      MSP Dashboard Preview
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Report Types */}
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
              Reporting That Drives Decisions
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Purpose-built reports for every aspect of managed service
              operations.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((report, i) => (
              <motion.div
                key={report.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
                      <report.icon className="h-5 w-5 text-[#0B3C5D]" />
                    </div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{report.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              See the MSP Dashboard in Action
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Schedule a personalized walkthrough of how Orbit can give you
              complete visibility into workforce readiness.
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
