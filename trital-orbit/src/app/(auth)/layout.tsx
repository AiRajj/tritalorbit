import React from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orbit-dark via-orbit-blue to-orbit-blue-light flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-orbit-red/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-orbit-blue-lighter/15 rounded-full blur-3xl" />

        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="text-white font-bold text-xl">
            TRITAL Orbit<span className="text-orbit-red align-super text-sm">™</span>
          </span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
              Healthcare Workforce Mobility Infrastructure
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Win more clinicians. Reduce backouts. Improve assignment readiness.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { stat: "43%", desc: "Average increase in offer acceptance" },
              { stat: "67%", desc: "Average reduction in backout rate" },
              { stat: "2.4x", desc: "Faster assignment readiness" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-3xl font-bold text-orbit-red">{item.stat}</div>
                <div className="text-white/70 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-sm relative z-10">
          © {new Date().getFullYear()} TRITAL Care Inc. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orbit-gradient flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold text-xl text-orbit-dark">
                TRITAL Orbit<span className="text-orbit-red align-super text-sm">™</span>
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
