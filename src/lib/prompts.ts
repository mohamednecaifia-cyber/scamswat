import { PreAnalysis } from "./analyzer";

export function buildUrlPrompt(url: string, pre: PreAnalysis): string {
  return `Analyze this URL for scam indicators: "${url}"

STRICT RULES — you MUST follow EVERY rule:
1. You ONLY analyze the URL above — nothing else.
2. You NEVER invent or hallucinate any detail not present in the URL.
3. You NEVER generate example URLs, domains, or scenarios.
4. The URL has already been pre-analyzed by a deterministic engine with these facts:
   - Protocol: ${pre.url?.protocol || "none"}
   - Domain: ${pre.url?.hostname || "unknown"}
   - TLD: ${pre.url?.tld || "unknown"}
   - URL shortener: ${pre.url?.isShortened ? "YES" : "NO"}
   - HTTPS enabled: ${pre.url?.hasValidProtocol ? "YES" : "NO"}
   - Suspicious patterns detected: ${pre.url?.suspiciousPatterns.join(", ") || "none"}
5. Your job is ONLY to add semantic analysis: does the intent/presentation look deceptive?

Return valid JSON ONLY:
{"isScam":true|false,"confidence":0-100,"reasons":["..."],"safetyTips":["..."]}`;
}

export function buildMessagePrompt(message: string, pre: PreAnalysis): string {
  return `Analyze this message for scam indicators: "${message.slice(0, 2000)}"

STRICT RULES — you MUST follow EVERY rule:
1. You ONLY analyze the message above — nothing else.
2. You NEVER invent or hallucinate any detail not present in the message.
3. You NEVER generate example messages, names, or scenarios.
4. The message has already been pre-analyzed by a deterministic engine with these facts:
   - Urgency language: ${pre.message?.hasUrgencyLanguage ? "YES" : "NO"}
   - Suspicious links: ${pre.message?.hasSuspiciousLinks ? "YES (" + pre.message.suspiciousUrlCount + " found)" : "NO"}
   - Requests sensitive info: ${pre.message?.asksForSensitiveInfo ? "YES" : "NO"}
   - Suspicious patterns: ${pre.message?.suspiciousPatterns.join(", ") || "none"}
5. Your job is ONLY to add semantic analysis: tone, persuasion tactics, sender impersonation clues.

Return valid JSON ONLY:
{"isScam":true|false,"confidence":0-100,"reasons":["..."],"safetyTips":["..."]}`;
}

export function buildNumberPrompt(number: string, pre: PreAnalysis): string {
  return `Analyze this phone number for scam indicators: "${number}"

STRICT RULES — you MUST follow EVERY rule:
1. You ONLY analyze the number above — nothing else.
2. You NEVER invent or hallucinate any detail not present in the number.
3. You NEVER generate example numbers, area codes, or scenarios.
4. The number has already been pre-analyzed by a deterministic engine with these facts:
   - Digit count: ${pre.number?.digitCount || 0}
   - Country code: ${pre.number?.countryCode || "none provided"}
   - International format: ${pre.number?.isInternational ? "YES" : "NO"}
   - Suspicious patterns: ${pre.number?.suspiciousPatterns.join(", ") || "none"}
5. Your job is ONLY to assess common scam number patterns based on format.

Return valid JSON ONLY:
{"isScam":true|false,"confidence":0-100,"reasons":["..."],"safetyTips":["..."]}`;
}
