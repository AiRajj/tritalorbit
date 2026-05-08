import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TRITAL Orbit™ — Healthcare Workforce Mobility Infrastructure",
    template: "%s | TRITAL Orbit™",
  },
  description:
    "Win more clinicians. Reduce backouts. Improve assignment readiness. TRITAL Orbit™ embeds housing, travel, relocation, and AI-powered offer optimization directly into the healthcare staffing workflow.",
  keywords: [
    "healthcare staffing",
    "travel nursing",
    "clinician retention",
    "offer acceptance",
    "workforce mobility",
    "healthcare workforce",
    "staffing software",
  ],
  openGraph: {
    title: "TRITAL Orbit™ — Healthcare Workforce Mobility Infrastructure",
    description: "Win more clinicians. Reduce backouts. Improve assignment readiness.",
    type: "website",
    siteName: "TRITAL Orbit™",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRITAL Orbit™",
    description: "Win more clinicians. Reduce backouts. Improve assignment readiness.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
