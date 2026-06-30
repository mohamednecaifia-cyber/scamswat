import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Message Analyzer - Detect Phishing & Scam Messages",
  description: "Free AI-powered message analyzer. Paste suspicious WhatsApp, SMS, email, or social media messages to detect phishing, scams, and fraud patterns instantly.",
  openGraph: {
    title: "AI Message Analyzer | ScamSwat",
    description: "Free AI-powered message analyzer. Detect scam messages and phishing attempts instantly.",
  },
};

export default function MessageAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
