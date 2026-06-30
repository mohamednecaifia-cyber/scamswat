import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Link Scanner - Check Suspicious URLs for Phishing & Malware",
  description: "Free AI-powered link scanner. Paste any URL to instantly detect phishing, typosquatting, malware, and scam websites. Protect your personal data from online threats.",
  openGraph: {
    title: "AI Link Scanner | ScamSwat",
    description: "Free AI-powered link scanner. Detect phishing and malicious URLs instantly.",
  },
};

export default function LinkCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
