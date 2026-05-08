import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://orbit.tritalcare.com"),
  title: {
    default: "TRITAL Orbit™ — Healthcare Workforce Mobility Infrastructure",
    template: "%s · TRITAL Orbit™",
  },
  description:
    "Win more clinicians. Reduce backouts. Improve assignment readiness. TRITAL Orbit embeds housing, travel, relocation, and AI-powered offer optimization into the staffing offer-to-start workflow.",
  keywords: [
    "healthcare staffing",
    "clinician mobility",
    "offer optimization",
    "travel nursing",
    "MSP",
    "VMS",
    "TRITAL Care",
    "TRITAL Orbit",
  ],
  openGraph: {
    title: "TRITAL Orbit™",
    description:
      "Healthcare Workforce Mobility Infrastructure. Win clinicians without raising pay rates.",
    siteName: "TRITAL Orbit",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
