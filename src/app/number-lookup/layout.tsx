import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scam Number Lookup - Check Phone Numbers for Fraud",
  description: "Free AI-powered phone number lookup. Check suspicious numbers against scam reports, spam activity, and fraud patterns. Identify spoofed and fraudulent callers instantly.",
  openGraph: {
    title: "Scam Number Lookup | ScamSwat",
    description: "Free AI-powered number lookup. Check phone numbers for scam and spam reports instantly.",
  },
};

export default function NumberLookupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
