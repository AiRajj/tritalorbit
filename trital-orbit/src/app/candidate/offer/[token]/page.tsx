"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Home, Plane, Car, MapPin, Award, Shield, Users,
  CheckCircle2, Phone, Mail, MessageSquare, AlertTriangle, Clock, Heart, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/lib/utils";

const perkConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  FLIGHT: { icon: Plane, color: "text-sky-600", bg: "bg-sky-50 border-sky-200" },
  HOUSING: { icon: Home, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  CAR_RENTAL: { icon: Car, color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
  RELOCATION: { icon: MapPin, color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  FIRST_WEEK: { icon: Award, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  EMERGENCY_HOUSING: { icon: Shield, color: "text-red-600", bg: "bg-red-50 border-red-200" },
  LOYALTY: { icon: Users, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200" },
};

export default function CandidateOfferPage() {
  const params = useParams();
  const token = params.token as string;
  const [offer, setOffer] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    fetch("/api/offers/by-token/" + token)
      .then((r) => r.json())
      .then((d) => { setOffer(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const handleAccept = async () => {
    if (!offer?.id) return;
    try {
      await fetch("/api/offers/" + offer.id as string, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ACCEPTED" }),
      });
      setAccepted(true);
      toast.success("Offer accepted! Your recruiter will contact you shortly.");
    } catch {
      toast.error("Failed. Please contact your recruiter directly.");
    }
  };

  const requestSupport = async (type: string) => {
    if (!offer?.id) return;
    try {
      await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: offer.id,
          needsHousing: type === "HOUSING",
          needsFlight: type === "FLIGHT",
          needsCar: type === "CAR",
        }),
      });
      toast.success("Support requested! Concierge team will reach out within 2 hours.");
    } catch {
      toast.error("Request submitted. Your recruiter will follow up.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orbit-gradient flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="font-bold text-xl">T</span>
          </div>
          <p className="text-white/75">Loading your offer...</p>
        </div>
      </div>
    );
  }

  if (!offer || (offer as { error?: string }).error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <AlertTriangle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-orbit-dark mb-2">Offer Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">This offer link may have expired. Please contact your recruiter.</p>
          <a href="tel:+18005551234"><Button><Phone className="h-4 w-4 mr-2" />Call Your Recruiter</Button></a>
        </div>
      </div>
    );
  }

  const firstName = (offer.candidateName as string)?.split(" ")[0] ?? "there";
  const perks = (offer.perks as Array<Record<string, unknown>>) ?? [];
  const enabledPerks = perks.filter((p) => p.isEnabled);
  const isAccepted = accepted || offer.status === "ACCEPTED";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-orbit-gradient text-white pb-6">
        <div className="max-w-lg mx-auto px-4 pt-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <span className="font-bold text-sm">T</span>
            </div>
            <span className="text-sm font-semibold text-white/80">Powered by TRITAL Orbit™</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Hi, {firstName}!</h1>
          <p className="text-white/80 text-sm mb-5">Your personalized assignment offer is ready.</p>
          {isAccepted ? (
            <Badge className="bg-emerald-500 text-white border-0 px-4 py-1.5 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4 mr-1.5 inline" />Offer Accepted
            </Badge>
          ) : (
            <Badge className="bg-white/15 text-white border-white/20 px-4 py-1.5 text-sm">
              <Clock className="h-4 w-4 mr-1.5 inline" />Awaiting Your Decision
            </Badge>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-4 pb-28">
        {typeof offer.aiValueStatement === "string" && (
          <Card className="border-orbit-blue shadow-orbit-lg bg-orbit-blue text-white">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{offer.aiValueStatement}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-orbit">
          <CardContent className="p-5">
            <h2 className="font-bold text-orbit-dark text-lg mb-4">Your Assignment</h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Facility</span>
                <span className="font-semibold text-orbit-dark text-sm">{offer.facilityName as string}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Location</span>
                <span className="font-semibold text-orbit-dark text-sm">{offer.facilityCity as string}, {offer.facilityState as string}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Role</span>
                <span className="font-semibold text-orbit-dark text-sm">{(offer.candidateRole as string) ?? "Healthcare Professional"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Start Date</span>
                <span className="font-semibold text-orbit-dark text-sm">{offer.startDate ? formatDate(offer.startDate as string) : "Flexible"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Duration</span>
                <span className="font-semibold text-orbit-dark text-sm">{offer.duration ? `${offer.duration} weeks` : "TBD"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-orbit bg-gradient-to-br from-orbit-dark to-orbit-blue text-white">
          <CardContent className="p-5">
            <h2 className="font-bold mb-4">Your Compensation</h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Gross Weekly Pay</span>
                <span className="text-2xl font-bold">{formatCurrency(offer.weeklyPay as number)}</span>
              </div>
              {Boolean(offer.stipend) && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Weekly Stipend</span>
                  <span className="font-semibold">{formatCurrency(offer.stipend as number)}</span>
                </div>
              )}
              {Boolean(offer.totalContractValue) && (
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <span className="text-white/70 text-sm">Total Contract Value</span>
                  <span className="text-xl font-bold text-orbit-red">{formatCurrency(offer.totalContractValue as number)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {enabledPerks.length > 0 && (
          <Card className="shadow-orbit">
            <CardContent className="p-5">
              <h2 className="font-bold text-orbit-dark text-lg mb-4">
                {"What's Included "}
                <Badge className="bg-orbit-blue text-white border-0 text-xs">{enabledPerks.length} perks</Badge>
              </h2>
              <div className="space-y-3">
                {enabledPerks.map((perk, i) => {
                  const config = perkConfig[perk.type as string] ?? { icon: Star, color: "text-slate-600", bg: "bg-slate-50 border-slate-200" };
                  const Icon = config.icon;
                  return (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${config.bg}`}>
                      <Icon className={`h-5 w-5 ${config.color} flex-shrink-0`} />
                      <div>
                        <p className="font-semibold text-sm text-orbit-dark">{perk.title as string}</p>
                        <p className="text-xs text-slate-500">{perk.description as string}</p>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-auto" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-orbit">
          <CardContent className="p-5">
            <h2 className="font-bold text-orbit-dark text-lg mb-4">Request Support</h2>
            <div className="space-y-3">
              {[
                { type: "HOUSING", icon: Home, title: "Request Housing Support", desc: "Verified housing near the facility", cls: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700" },
                { type: "FLIGHT", icon: Plane, title: "Request Travel Support", desc: "Flight booking assistance", cls: "bg-sky-50 border-sky-200 hover:bg-sky-100 text-sky-700" },
                { type: "CAR", icon: Car, title: "Request Car Rental", desc: "Vehicle for assignment duration", cls: "bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700" },
              ].map((item) => (
                <button key={item.type} onClick={() => requestSupport(item.type)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors text-left ${item.cls}`}>
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs opacity-75">{item.desc}</p>
                  </div>
                  <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-orbit">
          <h3 className="font-semibold text-orbit-dark mb-3 text-sm">Your Support Team</h3>
          <div className="space-y-2">
            <a href="tel:+18005551234" className="flex items-center gap-3 text-sm text-slate-600 hover:text-orbit-blue">
              <Phone className="h-4 w-4 text-orbit-blue" />Call Your Recruiter: 1-800-555-1234
            </a>
            <a href="mailto:support@tritalorbit.com" className="flex items-center gap-3 text-sm text-slate-600 hover:text-orbit-blue">
              <Mail className="h-4 w-4 text-orbit-blue" />support@tritalorbit.com
            </a>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <MessageSquare className="h-4 w-4" />Text support 7am-10pm EST
            </div>
          </div>
        </div>
      </div>

      {!isAccepted ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-orbit-xl">
          <div className="max-w-lg mx-auto">
            <Button className="w-full bg-orbit-gradient text-white h-14 text-base font-semibold" onClick={handleAccept}>
              <CheckCircle2 className="h-5 w-5 mr-2" />Accept This Offer
            </Button>
            <p className="text-xs text-slate-400 text-center mt-2">Your recruiter will confirm next steps within 24 hours.</p>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white p-4">
          <div className="max-w-lg mx-auto text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">Offer Accepted! Recruiter will contact you within 24 hours.</span>
          </div>
        </div>
      )}
    </div>
  );
}
