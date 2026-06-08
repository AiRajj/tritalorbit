import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TRITAL Orbit™ — Healthcare Workforce Mobility Infrastructure",
  description: "Win more clinicians. Reduce backouts. Improve assignment readiness. TRITAL Orbit™ embeds housing, travel, and AI-powered offer optimization into your staffing workflow.",
  keywords: ["healthcare staffing", "workforce mobility", "travel nursing", "staffing SaaS", "TRITAL Orbit"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
