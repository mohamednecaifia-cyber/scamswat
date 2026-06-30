import Link from "next/link";
import { Shield, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-danger" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-zinc-300 mb-2">Page Not Found</p>
        <p className="text-zinc-500 mb-8">
          This page doesn&apos;t exist or has been moved. Use the tools below to stay protected.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-safety hover:bg-emerald-600 text-navy font-semibold rounded-xl transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/link-checker"
            className="inline-flex items-center gap-2 px-6 py-3 glass hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Check a Link
          </Link>
        </div>
      </div>
    </div>
  );
}
