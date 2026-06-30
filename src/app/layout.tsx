import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    default: "ScamSwat - AI-Powered Scam Detection & Protection",
    template: "%s | ScamSwat",
  },
  description: "Free AI-powered scam detection tools. Check suspicious links, messages, and phone numbers instantly. Protect yourself from online fraud.",
  keywords: ["scam detector", "phishing checker", "fraud detection", "link scanner", "cybersecurity", "scam protection"],
  openGraph: {
    title: "ScamSwat - AI-Powered Scam Detection",
    description: "Protect yourself from online scams with AI-powered analysis.",
    type: "website",
    siteName: "ScamSwat",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-navy text-zinc-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
