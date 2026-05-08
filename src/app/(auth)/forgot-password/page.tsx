"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!email) {
        toast.error("Please enter your email address")
        setIsLoading(false)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSent(true)
      toast.success("Password reset instructions sent!")
    } catch {
      toast.error("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-lg bg-[#E63946] flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-[#0B3C5D] font-bold text-xl tracking-tight">TRITAL Orbit™</span>
        </div>

        {isSent ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Check your email</h2>
            <p className="text-gray-500 mb-6">
              We&apos;ve sent password reset instructions to <span className="font-medium text-[#1F2937]">{email}</span>
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Didn&apos;t receive the email? Check your spam folder or try again.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => { setIsSent(false); setEmail("") }}
                variant="outline"
                className="w-full h-11"
              >
                Try another email
              </Button>
              <Link href="/login">
                <Button className="w-full h-11 bg-[#0B3C5D] hover:bg-[#0d4a73] text-white">
                  Back to sign in
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-[#0B3C5D]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] text-center mb-2">Reset your password</h2>
            <p className="text-gray-500 text-center mb-8">
              Enter your email and we&apos;ll send you instructions to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-[#1F2937]">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 h-11"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#0B3C5D] hover:bg-[#0d4a73] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send reset instructions"
                )}
              </Button>
            </form>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 hover:text-[#0B3C5D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
