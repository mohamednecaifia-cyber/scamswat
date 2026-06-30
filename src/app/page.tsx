"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Link2,
  MessageSquare,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe,
  Lock,
  TrendingUp,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const tools = [
  {
    icon: Link2,
    title: "Link Checker",
    desc: "Paste any suspicious URL and get instant AI analysis. Detect phishing, typosquatting, and malicious domains.",
    href: "/link-checker",
    color: "text-safety",
    glow: "glow-green",
  },
  {
    icon: MessageSquare,
    title: "Message Analyzer",
    desc: "Forward or paste suspicious WhatsApp, SMS, or email messages. AI scans for scam patterns and urgency tactics.",
    href: "/message-analyzer",
    color: "text-warning",
    glow: "shadow-amber-500/20",
  },
  {
    icon: Phone,
    title: "Number Lookup",
    desc: "Check phone numbers against known scam databases. Identify spoofed calls and fraud rings instantly.",
    href: "/number-lookup",
    color: "text-danger",
    glow: "glow-red",
  },
];

const stats = [
  { icon: Zap, value: "10K+", label: "Scans Completed" },
  { icon: Shield, value: "99.2%", label: "Detection Accuracy" },
  { icon: Globe, value: "50+", label: "Countries Protected" },
  { icon: TrendingUp, value: "2.4K", label: "Scams Flagged" },
];

export default function Home() {
  const [quickUrl, setQuickUrl] = useState("");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-safety/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-danger/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety/10 border border-safety/20 text-safety text-sm mb-8"
            >
              <Zap className="w-4 h-4" />
              AI-Powered Protection
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Don&apos;t Get Scammed.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety via-emerald-400 to-safety">
                Verify Before You Trust.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Free AI-powered tools to detect phishing links, scam messages, and fraudulent calls.
              Protect yourself and your family from online threats in seconds.
            </motion.p>

            <motion.div variants={fadeIn} className="max-w-xl mx-auto">
              <div className="glass rounded-2xl p-1.5 flex items-center gap-2">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Link2 className="w-5 h-5 text-zinc-500 shrink-0" />
                  <input
                    type="url"
                    placeholder="Paste a suspicious link to check..."
                    value={quickUrl}
                    onChange={(e) => setQuickUrl(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-600 text-sm py-3"
                  />
                </div>
                <Link
                  href={quickUrl ? `/link-checker?url=${encodeURIComponent(quickUrl)}` : "/link-checker"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-safety hover:bg-emerald-600 text-navy font-semibold rounded-xl transition-all text-sm"
                >
                  <Shield className="w-4 h-4" />
                  Check Now
                </Link>
              </div>
              <p className="text-xs text-zinc-600 mt-3">
                Free. No signup required. Your privacy is protected.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                className="glass rounded-2xl p-4 text-center card-hover"
              >
                <stat.icon className="w-5 h-5 text-safety mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Three Layers of Protection
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-zinc-400 max-w-xl mx-auto"
            >
              Cover every angle of digital fraud with our AI-powered toolset
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1, duration: 0.5 },
                  },
                }}
              >
                <Link href={tool.href} className="group block glass rounded-2xl p-8 card-hover h-full">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 ${tool.glow}`}>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-safety transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-safety font-medium">
                    Try Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p variants={fadeIn} className="text-zinc-400 max-w-xl mx-auto">
              Three simple steps to stay protected
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Submit", desc: "Paste a suspicious link, message, or phone number into our tool" },
              { step: "02", title: "Analyze", desc: "Our AI scans for scam patterns, red flags, and known threat databases" },
              { step: "03", title: "Protect", desc: "Get instant results with actionable safety tips and recommendations" },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-safety/10 border border-safety/20 flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-bold text-safety">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ScamSwat */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h2
                variants={fadeIn}
                className="text-3xl sm:text-4xl font-bold mb-6"
              >
                Why Thousands Trust{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety to-emerald-400">
                  ScamSwat
                </span>
              </motion.h2>

              <motion.div variants={fadeIn} className="space-y-4">
                {[
                  { icon: Zap, title: "Real-Time AI Analysis", desc: "Powered by advanced AI that detects even the newest scam patterns" },
                  { icon: Lock, title: "100% Free & Private", desc: "No signup, no tracking. Your data never leaves your device" },
                  { icon: Globe, title: "Multi-Language Support", desc: "Analyze scams in English, Arabic, and 20+ languages" },
                  { icon: CheckCircle2, title: "Always Updated", desc: "Our threat database updates in real-time with new scam patterns" },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-safety/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-safety" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-zinc-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={fadeIn}
              className="glass rounded-3xl p-8 lg:p-10"
            >
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-sm text-zinc-500 ml-2">4.9/5 from 2,400+ reviews</span>
              </div>
              <div className="space-y-6">
                {[
                  { quote: "I almost clicked on a phishing link until I pasted it here. ScamSwat saved my bank account.", name: "Ahmed K.", role: "Verified User" },
                  { quote: "Best free scam detection tool out there. I use it daily for my elderly parents.", name: "Sarah M.", role: "Verified User" },
                ].map((review) => (
                  <div key={review.name} className="border-l-2 border-safety/30 pl-4">
                    <p className="text-zinc-400 text-sm italic mb-2">"{review.quote}"</p>
                    <div className="text-sm">
                      <span className="font-medium">{review.name}</span>
                      <span className="text-zinc-600"> - {review.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              variants={fadeIn}
              className="w-16 h-16 rounded-2xl bg-safety/10 flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-8 h-8 text-safety" />
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Start Protecting Yourself Today
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-zinc-400 mb-8"
            >
              Free, fast, and private. No account needed.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/link-checker"
                className="inline-flex items-center gap-2 px-8 py-4 bg-safety hover:bg-emerald-600 text-navy font-semibold rounded-xl transition-all text-sm"
              >
                <Link2 className="w-4 h-4" />
                Check a Link <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/message-analyzer"
                className="inline-flex items-center gap-2 px-8 py-4 glass hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Analyze a Message
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
