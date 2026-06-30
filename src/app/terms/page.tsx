import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ScamSwat terms of service. Understand the terms and conditions for using our scam detection tools.",
};

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-400">
          <p>Last updated: June 2026</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">1. Acceptance of Terms</h2>
          <p>By accessing or using ScamSwat, you agree to these terms. If you do not agree, do not use the service.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">2. Service Description</h2>
          <p>ScamSwat provides free AI-powered tools to analyze URLs, messages, and phone numbers for potential scam indicators. Results are provided for informational purposes only and should not be your sole basis for decision-making.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">3. No Guarantee</h2>
          <p>While we strive for high accuracy, ScamSwat does not guarantee 100% detection of all scams or threats. New scam techniques emerge constantly, and our AI may not identify every threat. Always use common sense and multiple sources of verification.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">4. Acceptable Use</h2>
          <p>You agree not to: (a) use the service for any illegal purpose, (b) attempt to reverse-engineer or abuse the AI analysis system, (c) submit malicious content designed to harm the service, or (d) use automated bots to spam the tools.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">5. Disclaimer</h2>
          <p>ScamSwat is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any damages arising from the use or inability to use our service. The tools are meant to assist, not replace, professional security advice.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">6. Changes</h2>
          <p>We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">7. Contact</h2>
          <p>For questions about these terms, please reach out through our GitHub repository.</p>
        </div>
      </div>
    </div>
  );
}
