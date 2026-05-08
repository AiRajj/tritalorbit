"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Building2, User, Stethoscope, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const roleOptions = [
  { id: "AGENCY_OWNER", label: "Staffing Agency", icon: Building2, description: "Manage clinician placements" },
  { id: "RECRUITER", label: "Recruiter", icon: User, description: "Recruit and place clinicians" },
  { id: "CANDIDATE", label: "Clinician", icon: Stethoscope, description: "Find travel assignments" },
  { id: "VENDOR", label: "Vendor / Landlord", icon: Truck, description: "Provide housing or services" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!name || !email || !password || !selectedRole) {
        toast.error("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      toast.success("Account created successfully! Redirecting to login...")
      setTimeout(() => router.push("/login"), 1500)
    } catch {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0B3C5D] via-[#0d4a73] to-[#0B3C5D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-10 w-80 h-80 bg-[#E63946] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-lg bg-[#E63946] flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">TRITAL Orbit™</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Join the Future of<br />Healthcare Mobility
            </h1>

            <p className="text-blue-100 text-lg mb-12 max-w-md">
              Whether you&apos;re a staffing agency, recruiter, clinician, or vendor —
              TRITAL Orbit helps you deliver better outcomes.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3x", label: "Higher acceptance" },
                { value: "60%", label: "Fewer backouts" },
                { value: "48hr", label: "Faster readiness" },
                { value: "92%", label: "Show-up rate" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
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
            <span className="text-[#0B3C5D] font-bold text-xl tracking-tight">TRITAL Orbit™</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1F2937]">Create your account</h2>
            <p className="text-gray-500 mt-2">
              {step === 1 ? "Select your role to get started" : "Complete your account details"}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-[#0B3C5D]" : "bg-gray-200"}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-[#0B3C5D]" : "bg-gray-200"}`} />
          </div>

          {step === 1 ? (
            <div className="space-y-3">
              {roleOptions.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id)
                    setStep(2)
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                    selectedRole === role.id
                      ? "border-[#0B3C5D] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0B3C5D]/10 flex items-center justify-center">
                    <role.icon className="w-5 h-5 text-[#0B3C5D]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#1F2937]">{role.label}</div>
                    <div className="text-sm text-gray-500">{role.description}</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-[#1F2937]">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 h-11"
                  required
                />
              </div>

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

              {(selectedRole === "AGENCY_OWNER" || selectedRole === "VENDOR") && (
                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-[#1F2937]">
                    {selectedRole === "VENDOR" ? "Company name" : "Agency name"}
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1.5 h-11"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-[#1F2937]">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-11"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-11 bg-[#0B3C5D] hover:bg-[#0d4a73] text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Create account
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-[#0B3C5D] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#0B3C5D] hover:underline">Privacy Policy</Link>
              </p>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-[#0B3C5D] font-medium hover:text-[#E63946] transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
