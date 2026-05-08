"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Clock,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    companySize: "",
    currentTools: "",
    message: "",
    preferredDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Calendar, text: "Personalized 30-minute walkthrough" },
    { icon: Users, text: "See real use cases for your segment" },
    { icon: Clock, text: "Get up and running in days, not months" },
    { icon: ShieldCheck, text: "No commitment required" },
  ];

  if (submitted) {
    return (
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2937]">Demo Request Received!</h1>
            <p className="mt-4 text-lg text-gray-500">Thank you for your interest in TRITAL Orbit. Our team will reach out within 24 hours to schedule your personalized demo.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#0B3C5D]/5 via-[#E63946]/3 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p className="text-sm font-semibold text-[#E63946] uppercase tracking-wider mb-3">Request a Demo</p>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F2937] leading-[1.1]">
                See TRITAL Orbit in action
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg text-gray-500 leading-relaxed">
                Get a personalized walkthrough of the platform tailored to your specific use case. See how TRITAL Orbit can help you win more clinicians and reduce backouts.
              </motion.p>
              <motion.ul initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 space-y-4">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li key={b.text} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B3C5D]/5">
                        <Icon className="h-5 w-5 text-[#0B3C5D]" />
                      </div>
                      <span className="text-sm font-medium text-[#1F2937]">{b.text}</span>
                    </li>
                  );
                })}
              </motion.ul>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-10 rounded-2xl border border-gray-200/80 bg-gray-50/50 p-6">
                <p className="text-sm font-semibold text-[#1F2937] mb-2">Trusted by healthcare staffing leaders</p>
                <p className="text-xs text-gray-500">Join the agencies and MSPs already transforming clinician placement with TRITAL Orbit. Average time to value: 14 days.</p>
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200/80 bg-white shadow-xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email *</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input id="company" name="company" required value={formData.company} onChange={handleChange} placeholder="Acme Healthcare Staffing" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role *</Label>
                    <select id="role" name="role" required value={formData.role} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">Select role</option>
                      <option value="executive">Executive / C-Suite</option>
                      <option value="vp">VP / Director</option>
                      <option value="manager">Manager</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="operations">Operations</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size *</Label>
                    <select id="companySize" name="companySize" required value={formData.companySize} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentTools">Current Tools / ATS</Label>
                  <Input id="currentTools" name="currentTools" value={formData.currentTools} onChange={handleChange} placeholder="e.g., Bullhorn, Salesforce, Custom ATS" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Demo Date</Label>
                  <Input id="preferredDate" name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Anything else we should know?</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your current challenges or what you hope to achieve..." rows={3} />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-md shadow-[#E63946]/20">
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting...</>
                  ) : (
                    <>Request Demo <ArrowRight className="h-4 w-4 ml-1" /></>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-400">By submitting, you agree to our <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
