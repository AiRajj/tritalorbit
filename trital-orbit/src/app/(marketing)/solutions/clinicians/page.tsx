import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Plane, Car, Heart, Star } from "lucide-react";

export const metadata = { title: "For Clinicians" };

export default function CliniciansPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-br from-orbit-red to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/15 text-white border-white/20">For Travel Clinicians</Badge>
            <h1 className="text-5xl font-bold mb-6">Every Assignment Becomes a Better Life Decision</h1>
            <p className="text-xl text-white/80 mb-8">
              When your agency uses TRITAL Orbit™, you get a personalized offer hub with housing options, travel support, car rentals, and a dedicated concierge team — all in one place.
            </p>
            <Link href="/demo"><Button size="lg" className="bg-white text-orbit-red hover:bg-white/90 font-semibold">See How It Works <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orbit-dark mb-4">No More Stressful Assignments</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">We handle the logistics so you can focus on what you do best — patient care.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Home, title: "Verified Housing", desc: "Furnished apartments near your facility, pre-screened and verified by our team." },
              { icon: Plane, title: "Travel Support", desc: "Flight booking assistance and travel coordination handled for you." },
              { icon: Car, title: "Car Rental", desc: "Vehicle rental for your entire assignment duration." },
              { icon: Heart, title: "Concierge Team", desc: "A dedicated support team available from offer acceptance through your first week." },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-14 h-14 rounded-2xl bg-orbit-blue/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-orbit-blue" />
                </div>
                <h3 className="font-bold text-orbit-dark mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
