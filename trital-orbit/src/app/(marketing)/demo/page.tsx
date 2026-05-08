"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Calendar, Clock, Video, ArrowRight, Building2, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const demoSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name required"),
  role: z.string().min(1, "Role required"),
  teamSize: z.string().min(1, "Team size required"),
  useCase: z.string().optional(),
  message: z.string().optional(),
  preferredTime: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoSchema>;

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-orbit-dark mb-4">Demo Request Received!</h1>
          <p className="text-xl text-slate-500 mb-6">
            Thank you for your interest in TRITAL Orbit™. Our team will reach out within 2 business hours to schedule your personalized demo.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8">
            <h3 className="font-semibold text-orbit-dark mb-3">What to expect in your demo:</h3>
            <ul className="space-y-2">
              {[
                "Live walkthrough of the Offer Boost Builder",
                "See the Retention Risk AI score your candidates",
                "Tour the Assignment Launch Dashboard",
                "Q&A with a product specialist",
                "Custom pricing for your team size",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-slate-400">Check your inbox for a calendar confirmation link.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-blue-50 text-orbit-blue border-blue-100">Book a Demo</Badge>
            <h1 className="text-5xl font-bold text-orbit-dark mb-4">
              See TRITAL Orbit™ in Action
            </h1>
            <p className="text-xl text-slate-500">
              Get a personalized 30-minute demo with a product specialist. We'll show you exactly how to increase your offer acceptance rate and reduce backouts.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <Card className="p-8 shadow-orbit-lg">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold text-orbit-dark mb-6">Request Your Demo</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" {...register("firstName")} className="mt-1" placeholder="Sarah" />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" {...register("lastName")} className="mt-1" placeholder="Mitchell" />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Work Email *</Label>
                      <Input id="email" type="email" {...register("email")} className="mt-1" placeholder="sarah@agency.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" {...register("phone")} className="mt-1" placeholder="+1 (555) 000-0000" />
                    </div>

                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input id="company" {...register("company")} className="mt-1" placeholder="PrimeStaff Healthcare" />
                      {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="role">Your Role *</Label>
                      <Select onValueChange={(v) => setValue("role", v)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CEO/Owner">CEO / Owner</SelectItem>
                          <SelectItem value="VP of Operations">VP of Operations</SelectItem>
                          <SelectItem value="Director of Recruiting">Director of Recruiting</SelectItem>
                          <SelectItem value="Recruiter">Recruiter</SelectItem>
                          <SelectItem value="MSP Manager">MSP Program Manager</SelectItem>
                          <SelectItem value="Technology Lead">Technology Lead</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="teamSize">Recruiting Team Size *</Label>
                      <Select onValueChange={(v) => setValue("teamSize", v)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1–5 recruiters</SelectItem>
                          <SelectItem value="6-15">6–15 recruiters</SelectItem>
                          <SelectItem value="16-50">16–50 recruiters</SelectItem>
                          <SelectItem value="51-100">51–100 recruiters</SelectItem>
                          <SelectItem value="100+">100+ recruiters</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.teamSize && <p className="text-red-500 text-xs mt-1">{errors.teamSize.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="preferredTime">Preferred Demo Time</Label>
                      <Select onValueChange={(v) => setValue("preferredTime", v)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9am–12pm EST)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12pm–5pm EST)</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Anything specific you'd like to see?</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className="mt-1"
                        placeholder="e.g. We're focused on reducing backout rate and improving housing support for travel nurses..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-orbit-red hover:bg-red-700 text-white" size="lg" loading={loading}>
                      Book My Demo
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>

                    <p className="text-xs text-slate-400 text-center">
                      By submitting, you agree to our{" "}
                      <a href="/privacy" className="text-orbit-blue hover:underline">Privacy Policy</a> and{" "}
                      <a href="/terms" className="text-orbit-blue hover:underline">Terms of Service</a>.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* What to expect */}
            <div>
              <h2 className="text-2xl font-bold text-orbit-dark mb-6">What You'll See in Your Demo</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Offer Boost Builder Live Demo",
                    desc: "Watch us build a complete, AI-enhanced offer with value statements, SMS pitch, email script, and PDF in under 2 minutes.",
                  },
                  {
                    icon: Building2,
                    title: "Assignment Launch Dashboard",
                    desc: "See how your team tracks housing, travel, documents, and readiness across every active assignment.",
                  },
                  {
                    icon: Users,
                    title: "Retention Risk AI in Action",
                    desc: "We'll run real-time risk scoring on example candidates and show you the AI-generated recruiter action plans.",
                  },
                  {
                    icon: Calendar,
                    title: "Candidate Offer Portal",
                    desc: "See exactly what your clinicians see — a personalized mobile-first hub with all their assignment perks.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orbit-blue/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-orbit-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-orbit-dark mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-orbit-blue/5 rounded-2xl p-6 border border-orbit-blue/10">
                <div className="flex items-center gap-3 mb-3">
                  <Video className="h-5 w-5 text-orbit-blue" />
                  <span className="font-semibold text-orbit-dark">30-Minute Demo</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {[
                    "Live platform walkthrough",
                    "Custom demo using your agency's use case",
                    "Q&A with a product specialist",
                    "Custom pricing proposal",
                    "No obligation or pressure",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
