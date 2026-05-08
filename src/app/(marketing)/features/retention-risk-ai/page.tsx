"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  AlertTriangle,
  Shield,
  Brain,
  Bell,
  Sparkles,
  Target,
  MessageSquare,
  Phone,
  Gift,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const riskFactors = [
  {
    factor: "Long Gap Between Acceptance & Start",
    weight: "High",
    description: "Assignments with >30 day gap between acceptance and start date show 3x higher backout rates.",
  },
  {
    factor: "Incomplete Housing Arrangement",
    weight: "High",
    description: "Clinicians without confirmed housing within 14 days of start are 4x more likely to back out.",
  },
  {
    factor: "First-Time Traveler",
    weight: "Medium",
    description: "First-time travel clinicians have higher anxiety and require more proactive communication.",
  },
  {
    factor: "Competitive Market Activity",
    weight: "Medium",
    description: "Active competing offers in the same specialty and region increase risk significantly.",
  },
  {
    factor: "Low Communication Engagement",
    weight: "High",
    description: "Clinicians not responding to check-ins within 48 hours are at elevated risk.",
  },
  {
    factor: "Distance from Assignment",
    weight: "Low",
    description: "Greater relocation distance correlates with higher cancellation probability.",
  },
];

const suggestedActions = [
  {
    icon: Phone,
    title: "Personal Check-In Call",
    description: "Schedule a one-on-one call to address concerns, answer questions, and reinforce commitment.",
    risk: "High Risk",
  },
  {
    icon: Gift,
    title: "Offer Enhancement",
    description: "Add a housing upgrade, travel stipend increase, or welcome package to strengthen the offer.",
    risk: "Medium Risk",
  },
  {
    icon: MessageSquare,
    title: "Automated Nurture",
    description: "Trigger a personalized email/SMS sequence with city guides, housing previews, and encouragement.",
    risk: "Low Risk",
  },
];

const alertExamples = [
  {
    severity: "critical",
    clinician: "Dr. Rachel Torres",
    score: 87,
    reason: "No response to last 3 check-ins. Housing not confirmed. Start date in 8 days.",
    action: "Immediate outreach required",
  },
  {
    severity: "high",
    clinician: "James Park, RN",
    score: 72,
    reason: "Competing offer detected in same region. First-time traveler with long gap to start.",
    action: "Offer enhancement recommended",
  },
  {
    severity: "medium",
    clinician: "Lisa Nguyen, PT",
    score: 45,
    reason: "Housing confirmed late. Travel not yet booked. 3 weeks to start date.",
    action: "Check-in call suggested",
  },
];

export default function RetentionRiskPage() {
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
              Retention Risk AI
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Predict and Prevent Backouts{" "}
              <span className="text-[#E63946]">Before They Happen</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              Machine learning models analyze dozens of behavioral and
              situational signals to score assignment risk in real time — and
              recommend exactly what to do about it.
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

      {/* Risk Scoring Methodology */}
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
              <Brain className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              How Risk Scoring Works
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Our AI analyzes multiple behavioral and situational signals to
              generate a comprehensive risk score for every assignment.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                {riskFactors.map((rf, i) => (
                  <motion.div
                    key={rf.factor}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="transition-shadow hover:shadow-md">
                      <CardContent className="flex items-start gap-4 py-4">
                        <div
                          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                            rf.weight === "High"
                              ? "bg-[#E63946]"
                              : rf.weight === "Medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        >
                          {rf.weight[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1F2937]">
                            {rf.factor}
                          </div>
                          <p className="mt-1 text-sm text-[#1F2937]/60">
                            {rf.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Card className="w-full border-[#0B3C5D]/20 bg-gradient-to-br from-[#0B3C5D]/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#0B3C5D]" />
                    Risk Score Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: "Behavioral Signals", pct: 35, color: "bg-[#E63946]" },
                    { label: "Timing Factors", pct: 25, color: "bg-[#0B3C5D]" },
                    { label: "Readiness Status", pct: 20, color: "bg-yellow-500" },
                    { label: "Market Conditions", pct: 12, color: "bg-purple-500" },
                    { label: "Historical Patterns", pct: 8, color: "bg-blue-500" },
                  ].map((component) => (
                    <div key={component.label}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-[#1F2937]/70">{component.label}</span>
                        <span className="font-semibold text-[#1F2937]">
                          {component.pct}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#1F2937]/10">
                        <motion.div
                          className={`h-2 rounded-full ${component.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${component.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real-Time Alerts */}
      <section className="border-y border-[#1F2937]/10 bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E63946]/10">
              <Bell className="h-6 w-6 text-[#E63946]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Real-Time Risk Alerts
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Get notified the moment a risk score crosses a threshold — with
              context and recommended actions.
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {alertExamples.map((alert, i) => (
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
                    alert.severity === "critical"
                      ? "border-l-4 border-l-[#E63946]"
                      : alert.severity === "high"
                        ? "border-l-4 border-l-orange-500"
                        : "border-l-4 border-l-yellow-500"
                  }`}
                >
                  <CardContent className="py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <AlertTriangle
                            className={`h-5 w-5 ${
                              alert.severity === "critical"
                                ? "text-[#E63946]"
                                : alert.severity === "high"
                                  ? "text-orange-500"
                                  : "text-yellow-500"
                            }`}
                          />
                          <span className="font-semibold text-[#1F2937]">
                            {alert.clinician}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                              alert.severity === "critical"
                                ? "bg-[#E63946]"
                                : alert.severity === "high"
                                  ? "bg-orange-500"
                                  : "bg-yellow-500"
                            }`}
                          >
                            Risk: {alert.score}/100
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-[#1F2937]/70">{alert.reason}</p>
                        <p className="mt-2 text-sm font-medium text-[#0B3C5D]">
                          {alert.action}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="shrink-0">
                        Take Action
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Actions */}
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
              <Sparkles className="h-6 w-6 text-[#0B3C5D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">
              AI-Suggested Interventions
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              Not just alerts — actionable recommendations tailored to each risk
              level.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {suggestedActions.map((action, i) => (
              <motion.div
                key={action.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
                        <action.icon className="h-5 w-5 text-[#0B3C5D]" />
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          action.risk === "High Risk"
                            ? "bg-[#E63946]/10 text-[#E63946]"
                            : action.risk === "Medium Risk"
                              ? "bg-yellow-500/10 text-yellow-600"
                              : "bg-blue-500/10 text-blue-600"
                        }`}
                      >
                        {action.risk}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#1F2937]/70">{action.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
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
              Proven Impact
            </h2>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-4">
            {[
              { value: "60%", label: "Fewer Backouts" },
              { value: "94%", label: "Alert Accuracy" },
              { value: "48hrs", label: "Earlier Detection" },
              { value: "$1.2M", label: "Saved per 100 Assignments" },
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
            <Shield className="mx-auto h-12 w-12 text-[#E63946]" />
            <h2 className="mt-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">
              Stop Losing Assignments to Preventable Backouts
            </h2>
            <p className="mt-4 text-lg text-[#1F2937]/70">
              See how Retention Risk AI can protect your placements and save
              revenue.
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
