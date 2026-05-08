"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/leads", {
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

  const contactInfo = [
    { icon: Mail, title: "Email", detail: "hello@tritalorbit.com", desc: "Reach our team directly" },
    { icon: Phone, title: "Phone", detail: "+1 (800) 555-0199", desc: "Mon-Fri, 8am-6pm CT" },
    { icon: MapPin, title: "Office", detail: "Austin, TX", desc: "United States" },
    { icon: Clock, title: "Response Time", detail: "< 4 hours", desc: "During business hours" },
  ];

  if (submitted) {
    return (
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2937]">Message Sent!</h1>
            <p className="mt-4 text-lg text-gray-500">Thank you for reaching out. Our team will get back to you within 4 business hours.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#0B3C5D]/5 via-[#E63946]/3 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F2937]">
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Have a question about TRITAL Orbit? Want to learn how we can help your agency? We would love to hear from you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B3C5D]/5">
                    <Icon className="h-5 w-5 text-[#0B3C5D]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1F2937]">{info.title}</h3>
                    <p className="text-sm font-medium text-[#0B3C5D] mt-0.5">{info.detail}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{info.desc}</p>
                  </div>
                </div>
              );
            })}
            {/* Map Placeholder */}
            <div className="rounded-2xl border border-gray-200/80 bg-gray-100 overflow-hidden h-48 flex items-center justify-center mt-8">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">Austin, Texas</p>
                <p className="text-xs text-gray-300">Map view available soon</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200/80 bg-white shadow-xl p-8 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-[#0B3C5D]" />
                <h2 className="text-lg font-bold text-[#1F2937]">Send Us a Message</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="How can we help you?" rows={5} />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-md shadow-[#E63946]/20">
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending...</>
                ) : (
                  <>Send Message <ArrowRight className="h-4 w-4 ml-1" /></>
                )}
              </Button>
              <p className="text-xs text-center text-gray-400">By submitting, you agree to our <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
