export interface PreAnalysis {
  inputType: "url" | "message" | "number";
  rawInput: string;
  url?: {
    protocol: string;
    hostname: string;
    domain: string;
    tld: string;
    pathname: string;
    isShortened: boolean;
    hasValidProtocol: boolean;
    suspiciousPatterns: string[];
  };
  number?: {
    digits: number;
    countryCode: string;
    digitCount: number;
    isInternational: boolean;
    suspiciousPatterns: string[];
  };
  message?: {
    hasUrgencyLanguage: boolean;
    hasSuspiciousLinks: boolean;
    asksForSensitiveInfo: boolean;
    hasGrammarIssues: boolean;
    urgencyKeywords: string[];
    suspiciousUrlCount: number;
    suspiciousPatterns: string[];
  };
  digitCount: number;
  scamScore: number;
}

const SHORTENER_DOMAINS = new Set([
  "bit.ly", "tinyurl.com", "goo.gl", "ow.ly", "is.gd", "buff.ly",
  "tiny.cc", "tr.im", "shorturl.at", "rb.gy", "bl.ink", "cutt.ly",
  "short.link", "v.gd", "t.co", "cli.gs", "cur.lv", "qr.ae",
  "adf.ly", "bc.vc", "j.gs", "migre.me", "po.st", "q.gs",
  "shorte.st", "shrinke.me", "shrinkurl.in", "u.to", "x.co", "yourls.org",
]);

const URGENCY_KEYWORDS = [
  "urgent", "immediately", "act now", "limited time", "expires",
  "suspended", "blocked", "locked", "final warning", "legal action",
  "click here", "confirm now", "verify now", "update your",
  "won", "winner", "prize", "congratulations",
  "عاجل", "فوراً", "آخر فرصة", "مبروك", "فزت", "جائزة",
  "مجمّد", "معلق", "بلاغ", "إنذار", "محظور",
];

const SENSITIVE_INFO_PATTERNS = [
  /password/i, /credit.?card/i, /cvv/i, /ssn/i, /national.?id/i,
  /bank.?account/i, /pin.?code/i, /otp/i, /login.?details/i,
  /verify.?identity/i, /confirm.?details/i,
  /رقم.?بطاقة/i, /كلمة.?السر/i, /رمز.?التحقق/i, /حساب.?بنكي/i,
  /الرقم.?الوطني/i, /بطاقة.?الائتمان/i,
];

const SUSPICIOUS_TLDS = new Set([
  ".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".top", ".club",
  ".loan", ".download", ".review", ".work", ".date", ".men",
  ".win", ".bid", ".trade", ".webcam", ".science", ".party",
]);

const TYPOSQUAT_DOMAINS: [string, string][] = [
  ["go0gle", "google"], ["g00gle", "google"], ["googie", "google"],
  ["amaz0n", "amazon"], ["amazoon", "amazon"], ["arnazon", "amazon"],
  ["paypa1", "paypal"], ["paypai", "paypal"],
  ["faceb00k", "facebook"], ["faceboook", "facebook"],
  ["whatsapp", "whatsapp"], ["whatsap", "whatsapp"],
  ["instagr4m", "instagram"], ["instagran", "instagram"],
  ["netfIix", "netflix"], ["netf1ix", "netflix"],
  ["appIe", "apple"], ["app1e", "apple"],
  ["micr0soft", "microsoft"], ["mlcrosoft", "microsoft"],
];

export function preAnalyze(input: string): PreAnalysis {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, "");
  const isUrl =
    /^https?:\/\//i.test(trimmed) ||
    (/^[a-zA-Z0-9][-a-zA-Z0-9]*\.[a-zA-Z]{2,}/.test(trimmed) && !/^\+?\d/.test(trimmed));

  if (isUrl) return analyzeUrlInput(trimmed, digits);
  if (/^\+?\d[\d\s\-().]{4,}$/.test(trimmed)) return analyzeNumberInput(trimmed, digits);
  return analyzeMessageInput(trimmed, digits);
}

function analyzeUrlInput(input: string, digits: string): PreAnalysis {
  let urlObj: URL | null = null;
  try {
    const normalized = input.startsWith("http") ? input : `https://${input}`;
    urlObj = new URL(normalized);
  } catch {
    // invalid URL
  }

  const hostname = urlObj?.hostname || input;
  const domain = hostname.replace(/^www\./, "").split(".").slice(0, -1).join(".");
  const tldMatch = hostname.match(/\.[a-z0-9]{2,}$/i);
  const tld = tldMatch?.[0] || "";

  const suspiciousPatterns: string[] = [];
  const isShortened = SHORTENER_DOMAINS.has(hostname.toLowerCase());
  if (isShortened) suspiciousPatterns.push("URL shortener hides real destination");
  if (SUSPICIOUS_TLDS.has(tld.toLowerCase())) suspiciousPatterns.push(`Suspicious top-level domain: ${tld}`);

  for (const [fake, real] of TYPOSQUAT_DOMAINS) {
    if (domain.toLowerCase().includes(fake)) {
      suspiciousPatterns.push(`Typosquatting: "${domain}" impersonates ${real}`);
      break;
    }
  }

  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname))
    suspiciousPatterns.push("IP address used instead of domain name");

  const hasValidProtocol = urlObj?.protocol === "https:";
  if (urlObj && !hasValidProtocol) suspiciousPatterns.push("Missing HTTPS encryption");

  const pathSegments = urlObj?.pathname.split("/").filter(Boolean).length || 0;
  if (pathSegments > 4) suspiciousPatterns.push("Unusually deep URL path structure");

  const scamScore = Math.min(100, suspiciousPatterns.length * 25);

  return {
    inputType: "url",
    rawInput: input,
    url: {
      protocol: urlObj?.protocol || "",
      hostname,
      domain,
      tld,
      pathname: urlObj?.pathname || "",
      isShortened,
      hasValidProtocol: !!hasValidProtocol,
      suspiciousPatterns,
    },
    digitCount: digits.length,
    scamScore,
  };
}

function analyzeNumberInput(input: string, digits: string): PreAnalysis {
  const countryMatch = input.match(/^\+(\d{1,3})/);
  const countryCode = countryMatch?.[1] || "";
  const digitCount = digits.length;

  const suspiciousPatterns: string[] = [];
  const isTooShort = digitCount < 7;
  const isTooLong = digitCount > 15;
  if (isTooShort) suspiciousPatterns.push("Too few digits for a valid phone number");
  if (isTooLong) suspiciousPatterns.push("Too many digits for a valid phone number");
  if (!countryMatch) suspiciousPatterns.push("Missing international country code (+...)");
  if (/^\+?0{2,}/.test(input)) suspiciousPatterns.push("Suspicious number pattern (multiple leading zeros)");

  const invalidLength = isTooShort || isTooLong;
  const scamScore = invalidLength ? 70 : Math.min(100, suspiciousPatterns.length * 50);

  return {
    inputType: "number",
    rawInput: input,
    number: {
      digitCount,
      countryCode,
      digits: digitCount,
      isInternational: !!countryMatch,
      suspiciousPatterns,
    },
    digitCount,
    scamScore,
  };
}

function analyzeMessageInput(input: string, digits: string): PreAnalysis {
  const lower = input.toLowerCase();
  const suspiciousPatterns: string[] = [];

  const urgencyKeywords = URGENCY_KEYWORDS.filter((kw) => lower.includes(kw));
  const hasUrgencyLanguage = urgencyKeywords.length > 0;
  if (hasUrgencyLanguage)
    suspiciousPatterns.push(`Urgency/pressure language detected: ${urgencyKeywords.slice(0, 3).join(", ")}`);

  const urlMatches = input.match(/https?:\/\/[^\s]+/gi) || [];
  const suspiciousUrls = urlMatches.filter((u) => {
    try {
      const host = new URL(u).hostname.toLowerCase();
      return SHORTENER_DOMAINS.has(host) || SUSPICIOUS_TLDS.has("." + host.split(".").pop());
    } catch {
      return true;
    }
  });
  const hasSuspiciousLinks = suspiciousUrls.length > 0;
  if (hasSuspiciousLinks) suspiciousPatterns.push(`Contains ${suspiciousUrls.length} suspicious link(s)`);

  const asksForSensitiveInfo = SENSITIVE_INFO_PATTERNS.some((p) => p.test(input));
  if (asksForSensitiveInfo) suspiciousPatterns.push("Requests sensitive personal/financial information");

  const hasGrammarIssues = /[A-Z]{5,}/.test(input) || (input.match(/!/g) || []).length > 2;
  if (hasGrammarIssues) suspiciousPatterns.push("Unusual formatting (excessive caps/punctuation)");

  const scamScore = Math.min(100,
    (hasUrgencyLanguage ? 30 : 0) +
    (hasSuspiciousLinks ? 30 : 0) +
    (asksForSensitiveInfo ? 25 : 0) +
    (hasGrammarIssues ? 15 : 0)
  );

  return {
    inputType: "message",
    rawInput: input,
    message: {
      hasUrgencyLanguage,
      hasSuspiciousLinks,
      asksForSensitiveInfo,
      hasGrammarIssues,
      urgencyKeywords,
      suspiciousUrlCount: suspiciousUrls.length,
      suspiciousPatterns,
    },
    digitCount: digits.length,
    scamScore,
  };
}
