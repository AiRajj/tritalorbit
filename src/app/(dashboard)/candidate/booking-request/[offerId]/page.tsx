"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import {
  Plane, Home, Car, Calendar, DollarSign, MapPin, Send,
  Loader2, CheckCircle2, Shield,
} from "lucide-react"

const bookingFormSchema = z.object({
  needFlight: z.boolean().default(false),
  needHousing: z.boolean().default(false),
  needCar: z.boolean().default(false),
  moveDate: z.string().min(1, "Move date is required"),
  budgetMin: z.number().min(0, "Budget minimum required"),
  budgetMax: z.number().min(0, "Budget maximum required"),
  preferredLocation: z.string().optional(),
  notes: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

export default function CandidateBookingRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema) as any,
    defaultValues: {
      needFlight: false,
      needHousing: false,
      needCar: false,
      moveDate: "",
      budgetMin: 0,
      budgetMax: 0,
      preferredLocation: "",
      notes: "",
    },
  })

  const onSubmit = async (values: BookingFormValues) => {
    setIsSubmitting(true)
    try {
      await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      setSubmitted(true)
      toast.success("Booking request submitted!", { description: "Your concierge will be in touch within 24 hours." })
    } catch {
      toast.error("Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B3C5D]/5 to-[#F8FAFC] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="max-w-md w-full text-center shadow-lg">
            <CardContent className="pt-10 pb-8 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mx-auto">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-[#1F2937]">Request Submitted!</h2>
              <p className="text-sm text-muted-foreground">
                Your mobility concierge will review your request and reach out within 24 hours to help get everything arranged.
              </p>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 pt-4">
                <Shield className="h-3 w-3" />
                Powered by TRITAL Orbit&trade;
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B3C5D]/5 to-[#F8FAFC]">
      <div className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/80 text-white py-8">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Booking Request</h1>
          <p className="text-white/70 mt-1">Tell us what you need and we&apos;ll take care of the rest</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 -mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Service Toggles */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg">What do you need?</CardTitle>
                  <CardDescription>Toggle the services you&apos;d like assistance with</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "needFlight" as const, label: "Flight", desc: "Book round-trip travel to your assignment", icon: Plane, color: "text-blue-600 bg-blue-50 border-blue-200" },
                    { name: "needHousing" as const, label: "Housing", desc: "Find furnished housing near your facility", icon: Home, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                    { name: "needCar" as const, label: "Car Rental", desc: "Weekly car rental during your assignment", icon: Car, color: "text-purple-600 bg-purple-50 border-purple-200" },
                  ].map((svc, i) => (
                    <FormField key={svc.name} control={form.control} name={svc.name} render={({ field }) => (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <div
                          className={`flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                            field.value ? svc.color + " shadow-sm" : "border-slate-200 hover:border-slate-300"
                          }`}
                          onClick={() => field.onChange(!field.value)}
                        >
                          <div className={`flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${field.value ? "bg-white/80" : "bg-slate-50"}`}>
                            <svc.icon className={`h-5 w-5 ${field.value ? svc.color.split(" ")[0] : "text-slate-400"}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{svc.label}</p>
                            <p className="text-xs text-muted-foreground">{svc.desc}</p>
                          </div>
                          <Switch checked={field.value} onCheckedChange={field.onChange} onClick={(e) => e.stopPropagation()} />
                        </div>
                      </motion.div>
                    )} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="moveDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Move / Arrival Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="date" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="budgetMin" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Min ($)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" min={0} step={100} className="pl-10" value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="budgetMax" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Max ($)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" min={0} step={100} className="pl-10" value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="preferredLocation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Location <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., Near downtown Portland" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any special requirements or preferences..." rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>
            </motion.div>

            <Button type="submit" className="w-full h-12 text-base bg-[#0B3C5D]" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Submitting...</>
              ) : (
                <><Send className="h-5 w-5 mr-2" />Submit Booking Request</>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
