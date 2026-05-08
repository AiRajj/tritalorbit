"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const schema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().min(10, "Please provide more detail"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
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

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-blue-50 text-orbit-blue border-blue-100">Contact Us</Badge>
            <h1 className="text-5xl font-bold text-orbit-dark mb-4">Let&apos;s Talk</h1>
            <p className="text-xl text-slate-500">
              Have questions about TRITAL Orbit™? Our team is here to help you win more clinicians and reduce backouts.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              {submitted ? (
                <Card className="p-8 shadow-orbit-lg border-emerald-200 bg-emerald-50">
                  <CardContent className="p-0 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-orbit-dark mb-3">Message Received!</h2>
                    <p className="text-slate-600">
                      Thank you for reaching out. Our team will respond within 1 business day.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="p-8 shadow-orbit-lg">
                  <CardContent className="p-0">
                    <h2 className="text-2xl font-bold text-orbit-dark mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>First Name *</Label>
                          <Input {...register("firstName")} className="mt-1" placeholder="Sarah" />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input {...register("lastName")} className="mt-1" placeholder="Mitchell" />
                          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                        </div>
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input type="email" {...register("email")} className="mt-1" placeholder="sarah@agency.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Phone</Label>
                          <Input type="tel" {...register("phone")} className="mt-1" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div>
                          <Label>Company</Label>
                          <Input {...register("company")} className="mt-1" placeholder="Agency name" />
                        </div>
                      </div>
                      <div>
                        <Label>Message *</Label>
                        <Textarea {...register("message")} className="mt-1" placeholder="How can we help you?" rows={5} />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                      </div>
                      <Button type="submit" className="w-full" size="lg" loading={loading}>
                        Send Message <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-orbit-dark mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", value: "hello@tritalorbit.com" },
                    { icon: Phone, label: "Phone", value: "+1 (800) 555-ORBIT" },
                    { icon: MapPin, label: "Headquarters", value: "Dallas, TX · Remote-first team" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orbit-blue/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-orbit-blue" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{item.label}</p>
                        <p className="font-medium text-orbit-dark">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orbit-blue/5 rounded-2xl p-6 border border-orbit-blue/10">
                <h3 className="font-bold text-orbit-dark mb-3">Prefer to see a demo first?</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Book a 30-minute personalized demo with a product specialist. No obligation, no pressure.
                </p>
                <a href="/demo">
                  <Button className="bg-orbit-blue hover:bg-orbit-blue-light text-white">
                    Book a Demo <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
