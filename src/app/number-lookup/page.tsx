"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Shield, AlertTriangle, CheckCircle2, ArrowLeft, Copy, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { analyzeNumber, type ScamAnalysis } from "@/lib/gemini";

const defaultNumbers = [
  "+1-800-123-4567",
  "+44-20-7946-0958",
  "+971-50-123-4567",
  "+966-55-123-4567",
];

export default function NumberLookup() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<ScamAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!number.trim()) return;
    setLoading(true);
    setResult(null);
    const analysis = await analyzeNumber(number);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div initial="initial" animate="animate" className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-5">
            <Phone className="w-7 h-7 text-danger" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Scam Number Lookup</h1>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Check phone numbers for scam reports, spam activity, and fraud patterns. Identify spoofed and suspicious callers.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-1.5 flex items-center gap-2 mb-6"
        >
          <div className="flex-1 flex items-center gap-3 px-4">
            <Phone className="w-5 h-5 text-zinc-500 shrink-0" />
            <input
              type="text"
              placeholder="Enter phone number with country code..."
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-600 text-sm py-3.5 font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !number.trim()}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-danger hover:bg-red-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-sm"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {loading ? "Searching..." : "Lookup"}
          </button>
        </motion.form>

        <div className="flex flex-wrap gap-2 mb-10">
          {defaultNumbers.map((s) => (
            <button
              key={s}
              onClick={() => setNumber(s)}
              className="px-3 py-1.5 text-xs text-zinc-500 font-mono bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                <RefreshCw className="w-8 h-8 text-danger animate-spin" />
              </div>
              <p className="text-zinc-400">Searching databases for scam reports...</p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className={`glass rounded-2xl p-8 ${result.isScam ? "glow-red" : "glow-green"}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${result.isScam ? "bg-danger/10" : "bg-safety/10"}`}>
                    {result.isScam ? (
                      <AlertTriangle className="w-7 h-7 text-danger" />
                    ) : (
                      <CheckCircle2 className="w-7 h-7 text-safety" />
                    )}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold mb-1 ${result.isScam ? "text-danger" : "text-safety"}`}>
                      {result.isScam ? "Number Flagged as Scam!" : "No Reports Found"}
                    </h2>
                    <p className="text-zinc-500 text-sm font-mono">{number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${result.isScam ? "bg-danger" : "bg-safety"}`}
                    />
                  </div>
                  <span className={`text-sm font-bold ${result.isScam ? "text-danger" : "text-safety"}`}>
                    {result.confidence}%
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 mb-3">Risk Indicators</h3>
                    <ul className="space-y-2">
                      {result.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 mb-3">Recommended Actions</h3>
                    <ul className="space-y-2">
                      {result.safetyTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <Shield className="w-4 h-4 text-safety shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-sm text-zinc-500">Help others by sharing this lookup tool.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button
                    onClick={() => { setResult(null); setNumber(""); }}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Lookup
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
