import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "TRITAL Orbit™ — Healthcare Workforce Mobility Infrastructure",
  description:
    "Win more clinicians. Reduce backouts. Improve assignment readiness. The enterprise platform that turns every assignment into a better life decision.",
  keywords: [
    "healthcare staffing",
    "workforce mobility",
    "travel nursing",
    "clinician retention",
    "staffing platform",
    "healthcare SaaS",
  ],
  authors: [{ name: "TRITAL Care" }],
  openGraph: {
    title: "TRITAL Orbit™ — Healthcare Workforce Mobility Infrastructure",
    description:
      "Win more clinicians. Reduce backouts. Improve assignment readiness.",
    type: "website",
    siteName: "TRITAL Orbit™",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              color: "#1F2937",
            },
          }}
        />
      </body>
    </html>
  )
}
