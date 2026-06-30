import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const blogPosts: Record<string, { title: string; content: string; date: string; readTime: string; author: string }> = {
  "phishing-link-detection": {
    title: "How to Spot a Phishing Link in 5 Seconds",
    content: `
      Phishing links are the most common entry point for cyber attacks. In 2026, over 3.4 billion phishing emails are sent daily, and a single click can compromise your bank account, social media, or even your identity.

      ## The 5-Second Visual Check

      Before clicking any link, train your eyes to check these five things:

      ### 1. The Domain Name
      Look at the actual domain, not just the display text. Scammers use domains like:
      - amaz0n-security.com (zero instead of 'o')
      - paypaI-verify.com (capital I instead of 'l')
      - google.security-update.com (subdomain trick)

      ### 2. The URL Structure
      Legitimate sites have clean URLs. Scam URLs often have:
      - Random strings of numbers/letters
      - Multiple subdomains
      - Unnecessary redirects (bit.ly, tinyurl without context)

      ### 3. HTTPS (But Don't Trust It Alone)
      Yes, check for the padlock icon. But know this: 74% of phishing sites now use HTTPS too. The padlock means encrypted, not trustworthy.

      ### 4. The Context
      Did you expect this link? A bank that never emails you suddenly asking you to "verify your account" is almost certainly a scam.

      ### 5. Urgency Language
      "Act now!" "Your account will be closed!" "You've won!" — these are scam triggers. Legitimate companies don't pressure you.

      ## Use Our Free Scanner

      Still unsure? Paste any suspicious link into our [AI Link Scanner](/?tool=link-checker) for instant analysis. It checks against thousands of known scam patterns and gives you a safety score in seconds.
    `,
    date: "2026-06-10",
    readTime: "5 min",
    author: "ScamSwat Team",
  },
  "top-scams-2026": {
    title: "Top 10 Scams Targeting You in 2026",
    content: `
      The scam landscape has shifted dramatically. AI-powered attacks have surged 1,210%, and scammers are using tools that would have seemed like science fiction just two years ago.

      ## The Biggest Threats Right Now

      ### 1. AI Voice Cloning
      Scammers clone a family member's voice from 3 seconds of audio and call demanding urgent money transfers.

      ### 2. Deepfake Video Calls
      Fake video calls impersonating CEOs, friends, or romantic interests. The video looks real because it's AI-generated.

      ### 3. Crypto Phishing
      Fake wallet sites, airdrop scams, and "help desk" calls that drain your cryptocurrency.

      ### 4. Job Offer Scams
      Fake job interviews leading to "equipment fee" payments or identity theft via fake onboarding forms.

      ### 5. WhatsApp Hijacking
      Scammers take over accounts via fake verification codes, then message all contacts asking for money.

      ### 6. Package Delivery Scams
      Fake SMS and emails about undelivered packages with links to "confirm your address."

      ### 7. Government Impersonation
      Calls from "police" or "tax authority" saying you have a warrant and need to pay immediately.

      ### 8. Romance Scams
      AI-generated profiles with realistic photos build relationships over weeks then ask for money.

      ### 9. Investment Fraud
      Fake trading platforms showing huge returns. When you try to withdraw, they demand more fees.

      ### 10. QR Code Scams
      Fake QR codes on parking meters, restaurants, and public spaces redirect to phishing sites.

      ## Stay Protected

      Use ScamSwat tools to verify every suspicious link, message, or phone number before engaging.
    `,
    date: "2026-06-15",
    readTime: "8 min",
    author: "ScamSwat Team",
  },
  "whatsapp-scam-protection": {
    title: "WhatsApp Scam Protection: Stay Safe on Messaging Apps",
    content: `
      WhatsApp is the most popular messaging platform in the world, with over 3 billion users. Unfortunately, it's also the most targeted by scammers.

      ## How WhatsApp Scams Work

      ### Account Takeover via Verification Code
      A scammer messages you pretending to be a friend who "accidentally" sent a verification code to your number. They ask you to forward it to them. Once you do, they hijack your account.

      ### Fake Family Emergency
      Scammers pose as a family member using a "new number." They claim to be in trouble and need urgent money transfers. With AI voice cloning, these calls are increasingly convincing.

      ### WhatsApp Gold / WhatsApp Plus
      Fake premium versions of WhatsApp that promise extra features. Downloading them installs malware that steals your messages and contacts.

      ### Fake Job Offers
      Scammers send job offers through WhatsApp groups. They ask for an "application fee" or "equipment deposit" and then disappear.

      ## How to Protect Yourself

      - **Enable two-factor authentication** in WhatsApp Settings > Account > Two-step verification
      - **Never share your verification code** with anyone, even if they claim to be a friend
      - **Verify calls** by calling back on the person's known number
      - **Ignore messages from unknown senders** promising money, prizes, or jobs
      - **Use ScamSwat's Message Analyzer** to check suspicious WhatsApp messages before responding
    `,
    date: "2026-06-12",
    readTime: "6 min",
    author: "ScamSwat Team",
  },
  "number-spoofing-guide": {
    title: "Phone Number Spoofing: How Scammers Fake Caller ID",
    content: `
      Caller ID spoofing is when scammers fake the phone number that appears on your screen. They can make it look like a call is coming from your bank, a government agency, or even your own mother.

      ## How Spoofing Works

      Scammers use VoIP (Voice over IP) technology to change the caller ID information. They can set any number to display, making it nearly impossible to trust caller ID alone.

      ### Common Spoofing Scenarios

      - **Bank Impersonation**: Caller ID shows your bank's real number. Caller claims your account is compromised and asks you to transfer money to a "safe account."
      - **Government Calls**: Caller ID shows a real government number. They claim you owe taxes or have a warrant.
      - **Neighbor Spoofing**: Caller ID shows a local number similar to yours to make you more likely to answer.
      - **CEO Fraud**: Caller ID shows your boss's number. They urgently request a wire transfer or gift cards.

      ## How to Protect Yourself

      - **Hang up and call back** using the official number from the institution's website
      - **Never give personal information** to incoming callers, no matter what caller ID shows
      - **Use ScamSwat's Number Lookup** to check suspicious numbers against known scam reports
      - **Register on the National Do Not Call Registry** to reduce legitimate telemarketing calls
      - **Use call blocking apps** like Nomorobo, Truecaller, or your carrier's spam protection

      ## What to Do If You've Been Spoofed

      If you think your number has been spoofed (people receive calls from your number that you didn't make), contact your phone carrier immediately and file a report with the FCC.
    `,
    date: "2026-06-08",
    readTime: "5 min",
    author: "ScamSwat Team",
  },
  "ai-scam-trends": {
    title: "AI Scam Trends: How Criminals Use Artificial Intelligence",
    content: `
      Artificial intelligence is a double-edged sword. While it powers our scam detection tools, it also enables scammers to launch more sophisticated attacks than ever before.

      ## AI-Powered Scam Techniques

      ### Deepfake Audio
      With just 3 seconds of audio from a social media video, AI can clone a person's voice with 95% accuracy. Scammers use this to call victims pretending to be their children, spouses, or bosses in distress.

      ### Deepfake Video
      Real-time face swapping technology allows scammers to appear as anyone during video calls. Romance scams, CEO fraud, and fake job interviews increasingly use this technique.

      ### AI-Generated Text
      Gone are the days of poorly written scam emails with bad grammar. AI now generates convincing messages that match the tone and style of legitimate companies.

      ### Chatbot Impersonation
      Scammers deploy AI chatbots on fake customer service channels. These bots can hold natural conversations, making fake support interactions seem real.

      ### Automated Voice Calls
      AI-powered robocalls can have natural conversations, responding to your answers intelligently. These are used for everything from fake bank alerts to investment scams.

      ## How AI Also Fights Back

      At ScamSwat, we use the same AI technology to detect scams. Our tools analyze patterns, language, and technical indicators that human eyes might miss. The key is understanding that AI detection must constantly evolve as scammer tactics change.

      ## Stay One Step Ahead

      Always verify unexpected calls and messages through a separate channel. If a family member calls from a "new number" asking for money, hang up and call their old number. If an email looks suspicious, paste it into ScamSwat's Message Analyzer before clicking anything.
    `,
    date: "2026-06-05",
    readTime: "7 min",
    author: "ScamSwat Team",
  },
  "protecting-elderly-from-scams": {
    title: "Protecting Elderly Family Members from Online Scams",
    content: `
      Elderly individuals lose billions of dollars to scams every year. In 2026, the FBI reported that adults over 60 accounted for 44% of all fraud losses, despite being only 22% of the population.

      ## Why Seniors Are Targeted

      - **Trusting nature**: Many seniors grew up in a more trusting era and are less suspicious of strangers
      - **Less tech familiarity**: Unfamiliar with phishing, spoofing, and modern scam techniques
      - **Financial stability**: Often have savings, pensions, or home equity that scammers target
      - **Isolation**: Loneliness makes seniors more vulnerable to romance and friendship scams
      - **Cognitive decline**: Early-stage dementia or memory issues make detection harder

      ## Most Common Scams Targeting Seniors

      ### Grandparent Scam
      Caller pretends to be a grandchild in trouble (arrested, in hospital, stranded) and needs money urgently. AI voice cloning makes this devastatingly convincing.

      ### Tech Support Scam
      Pop-up warning says their computer is infected. Call this number for help. The "technician" demands payment for fake repairs or installs actual malware.

      ### IRS / Government Impersonation
      Caller claims to be from a government agency, saying they owe back taxes or will face arrest. Seniors are more likely to fear authority figures.

      ### Lottery / Sweepstakes Scam
      "You've won a prize!" but they need to pay "fees" or "taxes" first to collect their winnings.

      ## How to Help Your Parents or Grandparents

      - **Install ScamSwat on their phone** and show them how to use the tools
      - **Create a family rule**: Never send money without checking with two family members first
      - **Set up call blocking** on their phone for unknown numbers
      - **Regularly discuss new scam tactics** at family dinners
      - **Encourage them to ask questions** before taking any action
      - **Write down your number** and tell them to call you before ever sending money or gift cards to anyone
    `,
    date: "2026-06-03",
    readTime: "6 min",
    author: "ScamSwat Team",
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts[params.slug];
  if (!post) return {};
  return {
    title: post.title + " | ScamSwat Blog",
    description: post.content.slice(0, 160).replace(/[#*\[\]]/g, "").trim(),
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>
        </header>

        <div className="prose prose-invert prose-zinc max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{line.replace("## ", "")}</h2>;
            }
            if (line.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-semibold mt-8 mb-3">{line.replace("### ", "")}</h3>;
            }
            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
              if (match) {
                return (
                  <div key={i} className="flex gap-2 my-2">
                    <span className="text-safety shrink-0 mt-1">•</span>
                    <div>
                      <strong className="text-zinc-200">{match[1]}</strong>
                      <span className="text-zinc-400">: {match[2]}</span>
                    </div>
                  </div>
                );
              }
            }
            if (line.startsWith("- ")) {
              return (
                <div key={i} className="flex gap-2 my-1 text-zinc-400 ml-4">
                  <span className="text-zinc-600">•</span>
                  <span>{line.replace("- ", "")}</span>
                </div>
              );
            }
            if (line.match(/^\d+\./)) {
              return <div key={i} className="my-1 text-zinc-400 ml-4">{line}</div>;
            }
            if (line.trim() === "") return <div key={i} className="h-4" />;
            return <p key={i} className="text-zinc-400 leading-relaxed my-2">{line}</p>;
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="glass rounded-2xl p-6 text-center">
            <h3 className="font-semibold mb-2">Stay Protected</h3>
            <p className="text-sm text-zinc-500 mb-4">
              Use our free tools to check suspicious links, messages, and numbers.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/link-checker" className="px-4 py-2 bg-safety/10 border border-safety/20 text-safety rounded-xl text-sm hover:bg-safety/20 transition-all">
                Check a Link
              </Link>
              <Link href="/message-analyzer" className="px-4 py-2 bg-warning/10 border border-warning/20 text-warning rounded-xl text-sm hover:bg-warning/20 transition-all">
                Analyze a Message
              </Link>
              <Link href="/number-lookup" className="px-4 py-2 bg-danger/10 border border-danger/20 text-danger rounded-xl text-sm hover:bg-danger/20 transition-all">
                Lookup a Number
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
