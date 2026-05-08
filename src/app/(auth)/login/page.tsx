"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!email || !password) {
        toast.error("Please enter your email and password")
        setIsLoading(false)
        return
      }

      const demoAccounts: Record<string, { role: string; redirect: string }> = {
        "admin@tritalorbit.com": { role: "SUPER_ADMIN", redirect: "/admin" },
        "agency@tritalorbit.com": { role: "AGENCY_OWNER", redirect: "/agency" },
        "recruiter@tritalorbit.com": { role: "RECRUITER", redirect: "/recruiter" },
        "candidate@tritalorbit.com": { role: "CANDIDATE", redirect: "/candidate" },
        "concierge@tritalorbit.com": { role: "CONCIERGE_MANAGER", redirect: "/concierge" },
        "vendor@tritalorbit.com": { role: "VENDOR", redirect: "/vendor/dashboard" },
        "msp@tritalorbit.com": { role: "MSP_VIEWER", redirect: "/msp" },
      }

      const account = demoAccounts[email.toLowerCase()]
      if (account) {
        toast.success(`Welcome! Redirecting to ${account.role.replace("_", " ").toLowerCase()} dashboard...`)
        setTimeout(() => router.push(account.redirect), 1000)
      } else {
        toast.success("Login successful! Redirecting...")
        setTimeout(() => router.push("/agency"), 1000)
      }
    } catch {
      toast.error("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0B3C5D] via-[#0d4a73] to-[#0B3C5D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#E63946] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-lg bg-[#E63946] flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                TRITAL Orbit™
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Healthcare Workforce
              <br />
              Mobility Infrastructure
            </h1>

            <p className="text-blue-100 text-lg mb-12 max-w-md">
              Win more clinicians. Reduce backouts. Improve assignment
              readiness. Transform every assignment into a better life
              decision.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span>Enterprise-grade security & compliance</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span>AI-powered offer optimization</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F8FAFC]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-lg bg-[#E63946] flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-[#0B3C5D] font-bold text-xl tracking-tight">
              TRITAL Orbit™
            </span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1F2937]">
              Welcome back
            </h2>
            <p className="text-gray-500 mt-2">
              Sign in to your TRITAL Orbit account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-[#1F2937]">
                Email address
              </Label>
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

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-[#1F2937]">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#0B3C5D] hover:text-[#E63946] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#0B3C5D] hover:bg-[#0d4a73] text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#0B3C5D] font-medium hover:text-[#E63946] transition-colors"
              >
                Request access
              </Link>
            </p>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs font-medium text-[#0B3C5D] mb-2">
              Demo Accounts
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>admin@tritalorbit.com — Super Admin</p>
              <p>agency@tritalorbit.com — Agency Owner</p>
              <p>recruiter@tritalorbit.com — Recruiter</p>
              <p>candidate@tritalorbit.com — Candidate</p>
              <p>concierge@tritalorbit.com — Concierge</p>
              <p>vendor@tritalorbit.com — Vendor</p>
              <p>msp@tritalorbit.com — MSP Viewer</p>
              <p className="text-gray-400 mt-1">Any password works for demo</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
