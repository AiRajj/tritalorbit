"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Monitor,
  Users,
  BarChart3,
  Sparkles,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";

const demoTopics = [
  {
    icon: Sparkles,
    title: "Offer Boost Builder",
    description: "See how AI optimizes offers with housing, travel, and lifestyle perks.",
  },
  {
    icon: Monitor,
    title: "Assignment Launch Dashboard",
    description: "Watch the onboarding pipeline in action with real-time tracking.",
  },
  {
    icon: Shield,
    title: "Retention Risk AI",
    description: "Learn how predictive analytics prevent assignment backouts.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description: "Explore the dashboards and reports that drive decisions.",
  },
];

const expectations = [
  "30-minute personalized walkthrough",
  "Custom demo tailored to your use case",
  "ROI analysis for your agency",
  "Live Q&A with a product specialist",
  "No commitment required",
];

type FormState = "idle" | "loading" | "success" | "error";

interface DemoFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  role: string;
  teamSize: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
}

export default function DemoPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<DemoFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    teamSize: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

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
            <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              Book a Demo
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              See TRITAL Orbit&trade; <span className="text-[#E63946]">in Action</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              Schedule a personalized 30-minute demo and see how Orbit can
              transform your staffing operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Side Content */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              {formState === "success" ? (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="py-16 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-bold text-[#1F2937]">
                      Demo Request Submitted!
                    </h3>
                    <p className="mt-3 text-[#1F2937]/70">
                      Thank you for your interest in TRITAL Orbit&trade;. Our team
                      will reach out within 1 business day to confirm your demo
                      session.
                    </p>
                    <Button className="mt-6" asChild>
                      <Link href="/platform">Explore the Platform</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Request Your Demo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Work Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Agency Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="role">Your Role *</Label>
                          <select
                            id="role"
                            name="role"
                            required
                            value={formData.role}
                            onChange={handleChange}
                            className="flex h-10 w-full items-center rounded-md border border-[#1F2937]/20 bg-transparent px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#0B3C5D] focus:ring-offset-2"
                          >
                            <option value="">Select your role</option>
                            <option value="executive">C-Suite / Executive</option>
                            <option value="vp">VP / Director</option>
                            <option value="manager">Manager</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="operations">Operations</option>
                            <option value="it">IT / Technology</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teamSize">Team Size</Label>
                          <select
                            id="teamSize"
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleChange}
                            className="flex h-10 w-full items-center rounded-md border border-[#1F2937]/20 bg-transparent px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#0B3C5D] focus:ring-offset-2"
                          >
                            <option value="">Select team size</option>
                            <option value="1-10">1-10</option>
                            <option value="11-25">11-25</option>
                            <option value="26-50">26-50</option>
                            <option value="51-100">51-100</option>
                            <option value="100+">100+</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="preferredDate">Preferred Date</Label>
                          <Input
                            id="preferredDate"
                            name="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="preferredTime">Preferred Time</Label>
                          <select
                            id="preferredTime"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className="flex h-10 w-full items-center rounded-md border border-[#1F2937]/20 bg-transparent px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#0B3C5D] focus:ring-offset-2"
                          >
                            <option value="">Select a time</option>
                            <option value="9:00 AM">9:00 AM ET</option>
                            <option value="10:00 AM">10:00 AM ET</option>
                            <option value="11:00 AM">11:00 AM ET</option>
                            <option value="12:00 PM">12:00 PM ET</option>
                            <option value="1:00 PM">1:00 PM ET</option>
                            <option value="2:00 PM">2:00 PM ET</option>
                            <option value="3:00 PM">3:00 PM ET</option>
                            <option value="4:00 PM">4:00 PM ET</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Anything specific you&apos;d like to see?
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your current challenges or what features interest you most..."
                          rows={4}
                        />
                      </div>

                      {formState === "error" && (
                        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {errorMessage}
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-[#E63946] hover:bg-[#E63946]/90"
                        disabled={formState === "loading"}
                      >
                        {formState === "loading" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Book My Demo <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Side Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8 lg:col-span-2"
            >
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-[#1F2937]">
                  <Calendar className="h-5 w-5 text-[#0B3C5D]" />
                  What to Expect
                </h3>
                <ul className="mt-4 space-y-3">
                  {expectations.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                      <span className="text-sm text-[#1F2937]/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-[#1F2937]">
                  <Clock className="h-5 w-5 text-[#0B3C5D]" />
                  Key Topics Covered
                </h3>
                <div className="mt-4 space-y-3">
                  {demoTopics.map((topic) => (
                    <Card key={topic.title} className="transition-shadow hover:shadow-sm">
                      <CardContent className="flex items-start gap-3 py-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B3C5D]/10">
                          <topic.icon className="h-4 w-4 text-[#0B3C5D]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#1F2937]">
                            {topic.title}
                          </div>
                          <p className="mt-0.5 text-xs text-[#1F2937]/60">
                            {topic.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="border-[#0B3C5D]/20 bg-gradient-to-br from-[#0B3C5D]/5 to-transparent">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#0B3C5D]" />
                    <span className="font-semibold text-[#1F2937]">
                      Trusted by 500+ Agencies
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#1F2937]/70">
                    Join hundreds of healthcare staffing agencies already using
                    TRITAL Orbit&trade; to transform their operations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
