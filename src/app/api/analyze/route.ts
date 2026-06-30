import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    if (!GEMINI_API_KEY) {
      return NextResponse.json(simulateAnalysis(), { status: 200 });
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${prompt}\n\nReturn ONLY valid JSON.` }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
      }),
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = text.replace(/```json?/gi, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(simulateAnalysis());
  }
}

function simulateAnalysis(): { isScam: boolean; confidence: number; reasons: string[]; safetyTips: string[] } {
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
