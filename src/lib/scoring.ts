import { PreAnalysis } from "./analyzer";

export interface ScamAnalysis {
  isScam: boolean;
  confidence: number;
  reasons: string[];
  safetyTips: string[];
}

export function computeFinalScore(
  pre: PreAnalysis,
  llmResult: { isScam: boolean; confidence: number; reasons: string[] } | null
): ScamAnalysis {
  const ruleScore = pre.scamScore;
  const llmScore = llmResult?.confidence ?? 50;
  const llmIsScam = llmResult?.isScam ?? false;

  const finalConfidence = Math.round(ruleScore * 0.4 + llmScore * 0.6);
  const isScam = finalConfidence >= 50;

  const reasons = buildReasons(pre, llmResult, ruleScore, llmIsScam);
  const safetyTips = buildSafetyTips(pre);

  return { isScam, confidence: finalConfidence, reasons, safetyTips };
}

function buildReasons(
  pre: PreAnalysis,
  llm: { reasons: string[] } | null,
  ruleScore: number,
  llmIsScam: boolean
): string[] {
  const allReasons: string[] = [];

  if (pre.url?.suspiciousPatterns) {
    allReasons.push(...pre.url.suspiciousPatterns.slice(0, 3));
  }
  if (pre.number?.suspiciousPatterns) {
    allReasons.push(...pre.number.suspiciousPatterns.slice(0, 3));
  }
  if (pre.message?.suspiciousPatterns) {
    allReasons.push(...pre.message.suspiciousPatterns.slice(0, 3));
  }

  if (llm?.reasons) {
    const uniqueLlm = llm.reasons.filter((r) => !allReasons.includes(r)).slice(0, 2);
    allReasons.push(...uniqueLlm);
  }

  return allReasons.slice(0, 5);
}

function buildSafetyTips(pre: PreAnalysis): string[] {
  const tips: string[] = [];

  if (pre.inputType === "url") {
    tips.push("Never click links from unknown senders");
    tips.push("Verify the domain is the official website before entering data");
    tips.push("Use a VPN to protect your browsing activity");
    if (pre.url?.isShortened) tips.push("Expand shortened URLs before visiting them");
    if (!pre.url?.hasValidProtocol) tips.push("Only enter sensitive data on HTTPS websites");
  }

  if (pre.inputType === "number") {
    tips.push("Block unknown numbers and report them as spam");
    tips.push("Never share OTPs or verification codes over the phone");
    tips.push("Register your number with the national Do Not Call registry");
    if (!pre.number?.isInternational) {
      tips.push("Be wary of international calls without verified context");
    }
  }

  if (pre.inputType === "message") {
    tips.push("Never click links in unsolicited messages");
    tips.push("Verify urgent claims by contacting the organization directly");
    tips.push("Enable two-factor authentication on all accounts");
    if (pre.message?.asksForSensitiveInfo) {
      tips.push("Legitimate companies never ask for passwords or OTPs via message");
    }
    if (pre.message?.hasUrgencyLanguage) {
      tips.push("Scammers create false urgency — stop and verify before acting");
    }
  }

  tips.push("Report scam attempts to the relevant authorities");
  tips.push("Keep your devices and software up to date");
  tips.push("Educate family members about common scam tactics");

  return [...new Set(tips)].slice(0, 6);
}
