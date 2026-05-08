import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Plane, Car, MapPin, CheckCircle2 } from "lucide-react";

export const metadata = { title: "Mobility Concierge" };

export default function MobilityConciergePage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-b from-purple-900 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/15 text-white border-white/20">Mobility Concierge</Badge>
            <h1 className="text-5xl font-bold mb-6">Housing, Travel, and Relocation Built Into Every Offer</h1>
            <p className="text-xl text-white/80 mb-8">
              Embed housing options, flight booking, car rentals, and move support directly into every assignment offer. Your concierge team handles the logistics — candidates just accept and show up.
            </p>
            <Link href="/demo"><Button size="lg" className="bg-white text-purple-900 hover:bg-white/90 font-semibold">Book a Demo <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-orbit-dark mb-6">How It Works</h2>
              <div className="space-y-4">
                {[
                  { step: "1", text: "Candidate accepts their offer in the TRITAL Orbit™ portal" },
                  { step: "2", text: "They select which support they need: housing, flight, or car" },
                  { step: "3", text: "A booking request is automatically created for your concierge team" },
                  { step: "4", text: "AI generates task summaries and next-step recommendations" },
                  { step: "5", text: "Concierge team coordinates with verified vendors and updates the candidate" },
                  { step: "6", text: "Candidate arrives on day one ready and supported" },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orbit-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{step.step}</div>
                    <p className="text-slate-600 pt-1">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-orbit-dark mb-6">Supported Services</h2>
              {[
                { icon: Home, title: "Housing Assistance", desc: "Verified furnished housing options within 10 miles of any facility." },
                { icon: Plane, title: "Flight Booking", desc: "Roundtrip or one-way flights coordinated with your vendor network." },
                { icon: Car, title: "Car Rental", desc: "Vehicle rental for the full assignment duration." },
                { icon: MapPin, title: "Relocation Coordination", desc: "Full move planning from packing to arrival day support." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <item.icon className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orbit-dark text-sm">{item.title}</p>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
