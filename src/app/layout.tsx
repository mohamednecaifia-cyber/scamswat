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

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://scamswat.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ScamSwat - AI-Powered Scam Detection & Protection",
    template: "%s | ScamSwat",
  },
  description: "Free AI-powered scam detection tools. Check suspicious links, messages, and phone numbers instantly. Protect yourself from online fraud.",
  keywords: ["scam detector", "phishing checker", "fraud detection", "link scanner", "cybersecurity", "scam protection", "AI security", "online safety"],
  openGraph: {
    title: "ScamSwat - AI-Powered Scam Detection",
    description: "Protect yourself from online scams with AI-powered analysis.",
    type: "website",
    siteName: "ScamSwat",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScamSwat - AI-Powered Scam Detection",
    description: "Free AI-powered tools to detect phishing, scam messages, and fraudulent calls.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  alternates: {
    canonical: siteUrl,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ScamSwat",
              url: siteUrl,
              description: "Free AI-powered scam detection tools. Check suspicious links, messages, and phone numbers instantly.",
              applicationCategory: "SecurityApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "ScamSwat",
              },
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
