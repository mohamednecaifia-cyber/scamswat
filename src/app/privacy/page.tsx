import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ScamSwat privacy policy. Learn how we protect your data and privacy when using our scam detection tools.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-400">
          <p>Last updated: June 2026</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">1. Information We Process</h2>
          <p>When you use ScamSwat tools, the content you submit (URLs, messages, or phone numbers) is processed to provide scam analysis results. We do not require an account, and we do not collect personal information unless you voluntarily provide it (e.g., via contact forms).</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">2. How We Process Data</h2>
          <p>Submitted content is processed using AI analysis and immediately discarded. We do not store the links, messages, or phone numbers you check. Analysis results are generated in real-time and not retained.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">3. Third-Party Services</h2>
          <p>Our AI analysis may use trusted third-party services (such as Google Gemini API) to process your submissions. These services are contractually obligated to not store or use your data beyond providing the analysis. We recommend reviewing their privacy policies for complete transparency.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">4. Cookies</h2>
          <p>We use minimal cookies necessary for site functionality. We do not use tracking cookies or sell your data. If we display advertisements in the future, ad networks may use cookies, and we will update this policy accordingly.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">5. Data Security</h2>
          <p>All data transmitted between your device and our servers is encrypted using HTTPS. We follow industry best practices to protect your information during transmission.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">6. Your Rights</h2>
          <p>You have the right to know what data we process, request correction or deletion, and withdraw consent at any time. Contact us for any privacy-related requests.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">7. Changes to This Policy</h2>
          <p>We may update this policy periodically. Changes will be posted on this page with an updated date.</p>

          <h2 className="text-xl font-semibold text-zinc-200 mt-8">8. Contact</h2>
          <p>For privacy inquiries, please reach out through our GitHub repository.</p>
        </div>
      </div>
    </div>
  );
}
