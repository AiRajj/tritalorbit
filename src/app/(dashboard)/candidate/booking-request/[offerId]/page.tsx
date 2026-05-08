"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Plane,
  Home,
  Car,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Shield,
  Send,
} from "lucide-react";

export default function BookingRequestPage() {
  const { toast } = useToast();
  const [needsFlight, setNeedsFlight] = useState(false);
  const [needsHousing, setNeedsHousing] = useState(false);
  const [needsCar, setNeedsCar] = useState(false);
  const [moveDate, setMoveDate] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          needsFlight,
          needsHousing,
          needsCar,
          moveDate,
          budgetRange,
          preferredLocation,
          notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        toast({
          title: "Request Submitted!",
          description: data.message,
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Toaster />
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7] flex items-center justify-center px-4">
          <Card className="w-full max-w-lg border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
                Request Submitted!
              </h2>
              <p className="text-[#1F2937]/70 mb-6">
                Your mobility support request has been received. Our concierge
                team will begin coordinating your needs within 24 hours.
              </p>

              <div className="space-y-3 text-left bg-[#F8FAFC] rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-[#0B3C5D] text-sm">
                  What happens next:
                </h3>
                <div className="space-y-2">
                  {[
                    "A dedicated concierge will be assigned to your request",
                    "You'll receive options within 24-48 hours",
                    "We'll coordinate all bookings on your behalf",
                    "Confirmation details sent via email and SMS",
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#1F2937]/70"
                    >
                      <ArrowRight className="h-4 w-4 text-[#0B3C5D] shrink-0 mt-0.5" />
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-[#1F2937]/50">
                <Shield className="h-3 w-3" />
                Powered by TRITAL Orbit&trade;
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7]">
        <div className="bg-[#0B3C5D] text-white">
          <div className="mx-auto max-w-2xl px-4 py-6">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
              <Shield className="h-4 w-4" />
              <span>Secure Request</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Request Mobility Support
            </h1>
            <p className="text-white/80 mt-1 text-sm">
              Tell us what you need and our concierge team will handle the rest
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Toggles */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#0B3C5D]">
                  What do you need?
                </CardTitle>
                <CardDescription>
                  Toggle the services you&apos;d like us to coordinate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    needsFlight
                      ? "bg-[#0B3C5D]/5 border-[#0B3C5D]/20"
                      : "border-[#1F2937]/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        needsFlight
                          ? "bg-[#0B3C5D] text-white"
                          : "bg-[#1F2937]/10 text-[#1F2937]/40"
                      }`}
                    >
                      <Plane className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold cursor-pointer">
                        Need a flight?
                      </Label>
                      <p className="text-xs text-[#1F2937]/60">
                        We&apos;ll book round-trip flights for you
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={needsFlight}
                    onCheckedChange={setNeedsFlight}
                  />
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    needsHousing
                      ? "bg-[#0B3C5D]/5 border-[#0B3C5D]/20"
                      : "border-[#1F2937]/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        needsHousing
                          ? "bg-[#0B3C5D] text-white"
                          : "bg-[#1F2937]/10 text-[#1F2937]/40"
                      }`}
                    >
                      <Home className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold cursor-pointer">
                        Need housing?
                      </Label>
                      <p className="text-xs text-[#1F2937]/60">
                        Furnished apartments near your facility
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={needsHousing}
                    onCheckedChange={setNeedsHousing}
                  />
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    needsCar
                      ? "bg-[#0B3C5D]/5 border-[#0B3C5D]/20"
                      : "border-[#1F2937]/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        needsCar
                          ? "bg-[#0B3C5D] text-white"
                          : "bg-[#1F2937]/10 text-[#1F2937]/40"
                      }`}
                    >
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold cursor-pointer">
                        Need a car?
                      </Label>
                      <p className="text-xs text-[#1F2937]/60">
                        Rental car for the duration of your assignment
                      </p>
                    </div>
                  </div>
                  <Switch checked={needsCar} onCheckedChange={setNeedsCar} />
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#0B3C5D]">
                  Details
                </CardTitle>
                <CardDescription>
                  Help us find the best options for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-[#1F2937]/40" />
                    Move Date
                  </Label>
                  <Input
                    type="date"
                    value={moveDate}
                    onChange={(e) => setMoveDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-sm">
                    <DollarSign className="h-3.5 w-3.5 text-[#1F2937]/40" />
                    Budget Range
                  </Label>
                  <Select value={budgetRange} onValueChange={setBudgetRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1000">Under $1,000</SelectItem>
                      <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
                      <SelectItem value="1500-2000">$1,500 - $2,000</SelectItem>
                      <SelectItem value="2000-plus">$2,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-[#1F2937]/40" />
                    Preferred Location
                  </Label>
                  <Input
                    placeholder="e.g. Near Texas Medical Center"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Additional Notes</Label>
                  <Textarea
                    placeholder="Any preferences, requirements, or special requests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full h-12 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Request
                </span>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#1F2937]/50 pb-4">
              <Shield className="h-3 w-3" />
              Powered by TRITAL Orbit&trade; &middot; Secure &middot; Encrypted
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
