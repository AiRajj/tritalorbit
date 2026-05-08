import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AuthSessionProvider } from "@/components/providers/session-provider";
import { ToasterProvider } from "@/components/providers/toaster-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRITAL Orbit™ | Healthcare Workforce Mobility Infrastructure",
  description:
    "Win more clinicians. Reduce backouts. Improve assignment readiness with TRITAL Orbit™.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthSessionProvider>
          {children}
          <ToasterProvider />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
