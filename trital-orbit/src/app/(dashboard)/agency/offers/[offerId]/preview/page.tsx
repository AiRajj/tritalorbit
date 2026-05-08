"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home, Plane, Car, MapPin, Award, Shield, Users, Brain,
  ChevronLeft, Copy, Download, Send, Edit, ExternalLink,
  CheckCircle2, Clock, AlertTriangle, DollarSign, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/lib/utils";

const perkIcons: Record<string, React.ElementType> = {
  FLIGHT: Plane,
  HOUSING: Home,
  CAR_RENTAL: Car,
  RELOCATION: MapPin,
  FIRST_WEEK: Award,
  EMERGENCY_HOUSING: Shield,
  LOYALTY: Users,
};

const perkColors: Record<string, string> = {
  FLIGHT: "bg-sky-50 text-sky-700 border-sky-200",
  HOUSING: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CAR_RENTAL: "bg-purple-50 text-purple-700 border-purple-200",
  RELOCATION: "bg-orange-50 text-orange-700 border-orange-200",
  FIRST_WEEK: "bg-amber-50 text-amber-700 border-amber-200",
  EMERGENCY_HOUSING: "bg-red-50 text-red-700 border-red-200",
  LOYALTY: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

interface Offer {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string | null;
  candidateRole: string | null;
  candidateSpecialty: string | null;
  facilityName: string;
  facilityCity: string;
  facilityState: string;
  startDate: string | null;
  duration: number | null;
  shiftType: string | null;
  weeklyPay: number | null;
  taxableRate: number | null;
  stipend: number | null;
  totalContractValue: number | null;
  mspClient: string | null;
  status: string;
  token: string;
  sentAt: string | null;
  viewedAt: string | null;
  acceptedAt: string | null;
  aiEnhancedSummary: string | null;
  aiValueStatement: string | null;
  aiRecruiterTalkingPoints: string | null;
  aiSMSPitch: string | null;
  aiEmailPitch: string | null;
  aiCloseStrategy: string | null;
  candidateConfidenceScore: number | null;
  perks: Array<{ id: string; type: string; title: string; description: string | null; isEnabled: boolean }>;
  retentionRisks: Array<{ score: number; riskLevel: string; reasoning: string | null }>;
}

export default function OfferPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const offerId = params.offerId as string;
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(`/api/offers/${offerId}`)
      .then((r) => r.json())
      .then((d) => {
        setOffer(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [offerId]);

  const sendOffer = async () => {
    setSending(true);
    try {
      await fetch(`/api/offers/${offerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "SENT",
          sentAt: new Date().toISOString(),
        }),
      });
      setOffer((prev) => prev ? { ...prev, status: "SENT", sentAt: new Date().toISOString() } : prev);
      toast.success("Offer sent to candidate successfully!");
    } catch {
      toast.error("Failed to send offer");
    } finally {
      setSending(false);
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/candidate/offer/${offer?.token}`;
    navigator.clipboard.writeText(url);
    toast.success("Candidate link copied!");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center py-20">
        <AlertTriangle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-500">Offer not found</h2>
        <Link href="/agency/offers">
          <Button className="mt-4" variant="outline">Back to Offers</Button>
        </Link>
      </div>
    );
  }

  const riskData = offer.retentionRisks?.[0];
  const enabledPerks = offer.perks?.filter((p) => p.isEnabled) ?? [];
  const candidateUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/candidate/offer/${offer.token}`;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/agency/offers">
          <Button variant="ghost" size="icon-sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-orbit-dark">Offer Preview</h1>
            <StatusBadge status={offer.status} size="md" />
          </div>
          <p className="text-slate-500 text-sm">{offer.candidateName} · {offer.facilityName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/agency/offers/${offerId}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={copyLink}>
            <Copy className="h-4 w-4 mr-1" /> Copy Link
          </Button>
          <Button
            className="bg-orbit-blue hover:bg-orbit-blue-light text-white"
            size="sm"
            onClick={sendOffer}
            loading={sending}
            disabled={offer.status === "ACCEPTED" || offer.status === "DECLINED"}
          >
            <Send className="h-4 w-4 mr-1" />
            {offer.status === "SENT" ? "Resend" : "Send to Candidate"}
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-orbit">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <span className="text-xs text-slate-500 font-medium">Weekly Pay</span>
          </div>
          <div className="text-2xl font-bold text-orbit-dark">{formatCurrency(offer.weeklyPay)}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-orbit">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-orbit-blue" />
            <span className="text-xs text-slate-500 font-medium">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-orbit-dark">{formatCurrency(offer.totalContractValue)}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-orbit">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-xs text-slate-500 font-medium">Start Date</span>
          </div>
          <div className="text-2xl font-bold text-orbit-dark">
            {offer.startDate ? formatDate(offer.startDate) : "TBD"}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-orbit">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-purple-500" />
            <span className="text-xs text-slate-500 font-medium">Confidence</span>
          </div>
          <div className="text-2xl font-bold text-orbit-dark">
            {offer.candidateConfidenceScore ? `${offer.candidateConfidenceScore}%` : "—"}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Offer Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Candidate</p>
                  <p className="font-semibold text-orbit-dark">{offer.candidateName}</p>
                  <p className="text-sm text-slate-500">{offer.candidateRole} {offer.candidateSpecialty ? `· ${offer.candidateSpecialty}` : ""}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Facility</p>
                  <p className="font-semibold text-orbit-dark">{offer.facilityName}</p>
                  <p className="text-sm text-slate-500">{offer.facilityCity}, {offer.facilityState}</p>
                </div>
              </div>
              <Separator />
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Duration</p>
                  <p className="font-medium text-orbit-dark">{offer.duration ? `${offer.duration} weeks` : "TBD"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Shift</p>
                  <p className="font-medium text-orbit-dark">{offer.shiftType ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">MSP / Client</p>
                  <p className="font-medium text-orbit-dark">{offer.mspClient ?? "—"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Perks */}
          {enabledPerks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Included Mobility Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {enabledPerks.map((perk) => {
                    const Icon = perkIcons[perk.type] ?? Award;
                    const colorClass = perkColors[perk.type] ?? "bg-slate-50 text-slate-600 border-slate-200";
                    return (
                      <div key={perk.id} className={`flex items-start gap-3 p-3 rounded-xl border ${colorClass}`}>
                        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">{perk.title}</p>
                          <p className="text-xs opacity-75">{perk.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Generated Content */}
          {offer.aiEnhancedSummary && (
            <Card className="border-orbit-blue/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-orbit-blue" />
                  <CardTitle>AI-Enhanced Offer Content</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {offer.aiEnhancedSummary && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Enhanced Summary</p>
                    <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-4">{offer.aiEnhancedSummary}</p>
                  </div>
                )}
                {offer.aiValueStatement && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Value Statement</p>
                    <p className="text-sm font-medium text-orbit-blue bg-orbit-blue/5 rounded-xl p-4 border border-orbit-blue/10">{offer.aiValueStatement}</p>
                  </div>
                )}
                {offer.aiSMSPitch && (
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">SMS Pitch</p>
                      <p className="text-sm text-emerald-700 bg-emerald-50 rounded-xl p-4 font-mono border border-emerald-200">{offer.aiSMSPitch}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => { navigator.clipboard.writeText(offer.aiSMSPitch!); toast.success("SMS copied!"); }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
                {offer.aiCloseStrategy && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Close Strategy</p>
                    <p className="text-sm text-purple-700 bg-purple-50 rounded-xl p-4 border border-purple-200">{offer.aiCloseStrategy}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Risk Score */}
          {riskData && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-base">Retention Risk</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl font-bold text-orbit-dark">{riskData.score}</span>
                  <RiskBadge score={riskData.score} level={riskData.riskLevel as any} showScore={false} size="md" />
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      riskData.score >= 75 ? "bg-red-500" :
                      riskData.score >= 50 ? "bg-orange-500" :
                      riskData.score >= 25 ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${riskData.score}%` }}
                  />
                </div>
                {riskData.reasoning && (
                  <p className="text-xs text-slate-500 leading-relaxed">{riskData.reasoning}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Candidate Link */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Candidate Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 mb-3">Share this link with the candidate to view their personalized offer hub.</p>
              <div className="bg-slate-50 rounded-lg p-2.5 border text-xs font-mono text-slate-600 break-all mb-3">
                /candidate/offer/{offer.token}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={copyLink}>
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
                <Link href={`/candidate/offer/${offer.token}`} target="_blank">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Offer Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Created", time: offer.sentAt, done: true },
                { label: "Sent to Candidate", time: offer.sentAt, done: !!offer.sentAt },
                { label: "Viewed by Candidate", time: offer.viewedAt, done: !!offer.viewedAt },
                { label: "Decision", time: offer.acceptedAt, done: !!offer.acceptedAt },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.done ? "bg-emerald-500" : "bg-slate-200"
                  }`}>
                    <CheckCircle2 className={`h-3 w-3 ${item.done ? "text-white" : "text-slate-400"}`} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${item.done ? "text-orbit-dark" : "text-slate-400"}`}>{item.label}</p>
                    {item.time && <p className="text-xs text-slate-400">{formatDate(item.time)}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
