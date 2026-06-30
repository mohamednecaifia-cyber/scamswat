import { Shield } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Tools: [
    { href: "/link-checker", label: "Link Checker" },
    { href: "/message-analyzer", label: "Message Analyzer" },
    { href: "/number-lookup", label: "Number Lookup" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/blog/whatsapp-scam-protection", label: "WhatsApp Safety" },
    { href: "/blog/protecting-elderly-from-scams", label: "Elderly Protection" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-safety" />
              <span className="text-lg font-bold">
                Scam<span className="text-safety">Swat</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              AI-powered scam detection tools to protect you from online fraud, phishing, and digital threats.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-zinc-300 mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} ScamSwat. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Protecting users from online scams, one check at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
