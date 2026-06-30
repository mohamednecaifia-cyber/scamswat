import { ArrowLeft, Calendar, Clock, User, Shield, AlertTriangle, Link2, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Scam Awareness & Protection Tips",
  description: "Stay informed about the latest scam tactics, phishing techniques, and cybersecurity best practices. Protect yourself from online fraud.",
};

const blogPosts = [
  {
    slug: "top-scams-2026",
    title: "Top 10 Scams Targeting You in 2026 (And How to Avoid Them)",
    excerpt: "AI voice cloning, deepfake video calls, and crypto phishing are the biggest threats this year. Here's exactly what to watch for.",
    date: "2026-06-15",
    readTime: "8 min",
    author: "ScamSwat Team",
    category: "Trending",
    icon: AlertTriangle,
    categoryColor: "text-danger",
  },
  {
    slug: "phishing-link-detection",
    title: "How to Spot a Phishing Link in 5 Seconds",
    excerpt: "Most phishing links have telltale signs. Learn the visual cues and use our free AI scanner to verify suspicious URLs instantly.",
    date: "2026-06-10",
    readTime: "5 min",
    author: "ScamSwat Team",
    category: "Guides",
    icon: Link2,
    categoryColor: "text-safety",
  },
  {
    slug: "whatsapp-scam-protection",
    title: "WhatsApp Scams Are Getting Smarter: Here's Your Shield",
    excerpt: "From fake family emergencies to job offer traps, WhatsApp scams are evolving. Protect your conversations with these strategies.",
    date: "2026-06-05",
    readTime: "6 min",
    author: "ScamSwat Team",
    category: "Guides",
    icon: Shield,
    categoryColor: "text-warning",
  },
  {
    slug: "number-spoofing-guide",
    title: "Caller ID Spoofing: Why That Local Number Is Probably a Scam",
    excerpt: "Scammers fake caller IDs to look like your bank or a local business. Here's how number spoofing works and how to fight back.",
    date: "2026-05-28",
    readTime: "7 min",
    author: "ScamSwat Team",
    category: "Guides",
    icon: Phone,
    categoryColor: "text-danger",
  },
  {
    slug: "ai-scam-trends",
    title: "AI Scams Surged 1,210%: What You Need to Know",
    excerpt: "Deepfakes, voice cloning, and AI-generated phishing emails are the new frontier of fraud. Stay ahead of the curve.",
    date: "2026-05-20",
    readTime: "10 min",
    author: "ScamSwat Team",
    category: "Trending",
    icon: AlertTriangle,
    categoryColor: "text-danger",
  },
  {
    slug: "protecting-elderly-from-scams",
    title: "How to Protect Your Elderly Parents from Online Scams",
    excerpt: "Senior citizens lose billions to scams yearly. A practical guide to setting up digital defenses for your loved ones.",
    date: "2026-05-15",
    readTime: "6 min",
    author: "ScamSwat Team",
    category: "Guides",
    icon: Shield,
    categoryColor: "text-safety",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Scam Awareness Blog</h1>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Stay informed with the latest scam trends, protection guides, and cybersecurity tips.
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <post.icon className={`w-6 h-6 ${post.categoryColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-medium ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-zinc-600">{post.date}</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-600">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold group-hover:text-safety transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-zinc-600">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
