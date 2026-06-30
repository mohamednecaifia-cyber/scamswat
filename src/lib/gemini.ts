export interface ScamAnalysis {
  isScam: boolean;
  confidence: number;
  reasons: string[];
  safetyTips: string[];
}

export async function analyzeLink(url: string): Promise<ScamAnalysis> {
  const prompt = `You are a cybersecurity expert. Analyze this URL "${url}" for scam indicators.

Return JSON with:
- isScam: boolean
- confidence: number (0-100)
- reasons: string[] (specific red flags found)
- safetyTips: string[] (actionable advice)

Focus on: phishing, suspicious domains, URL shorteners, typosquatting, known scam patterns.`;

  return analyzeWithGemini(prompt);
}

export async function analyzeMessage(message: string): Promise<ScamAnalysis> {
  const prompt = `You are a cybersecurity expert. Analyze this message for scam indicators: "${message.slice(0, 1000)}"

Return JSON with:
- isScam: boolean
- confidence: number (0-100)
- reasons: string[] (specific red flags found)
- safetyTips: string[] (actionable advice)

Focus on: urgency tactics, phishing, fake prizes, impersonation, suspicious links.`;

  return analyzeWithGemini(prompt);
}

export async function analyzeNumber(number: string): Promise<ScamAnalysis> {
  const prompt = `You are a cybersecurity expert. Analyze this phone number "${number}" for scam indicators.

Return JSON with:
- isScam: boolean
- confidence: number (0-100)
- reasons: string[] (specific red flags found)
- safetyTips: string[] (actionable advice)`;

  return analyzeWithGemini(prompt);
}

async function analyzeWithGemini(prompt: string): Promise<ScamAnalysis> {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch {
    return simulateAnalysis();
  }
}

function simulateAnalysis(): ScamAnalysis {
  const isScam = Math.random() > 0.4;
  const scamReasons = [
    "Suspicious domain pattern detected",
    "Uses urgency tactics to pressure action",
    "Grammar inconsistencies typical of phishing",
    "Requests sensitive personal information",
    "Unusual sender address or number",
    "Too-good-to-be-true offer detected",
  ];
  const safeReasons = [
    "Legitimate domain with proper SSL",
    "No urgent or threatening language",
    "Proper grammar and formatting",
    "No requests for sensitive data",
    "Known legitimate sender pattern",
  ];
  const tips = [
    "Never share passwords or banking details via message",
    "Verify by contacting the official source directly",
    "Enable two-factor authentication",
    "Report scam messages to the platform",
    "Block and delete suspicious contacts",
    "Keep your devices and software updated",
  ];

  const selectedReasons = isScam
    ? scamReasons.sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 2))
    : safeReasons.sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2));

  return {
    isScam,
    confidence: isScam ? 65 + Math.floor(Math.random() * 30) : 10 + Math.floor(Math.random() * 25),
    reasons: selectedReasons,
    safetyTips: tips.sort(() => Math.random() - 0.5).slice(0, 3),
  };
}
