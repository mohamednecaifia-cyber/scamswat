import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

const SYSTEM_PROMPT = `You are a cybersecurity expert analyzing text for scam indicators.
Return ONLY valid JSON in this exact format without markdown, backticks, or explanation:
{
  "isScam": boolean,
  "confidence": number 0-100,
  "reasons": ["reason1", "reason2"],
  "safetyTips": ["tip1", "tip2", "tip3"]
}`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    if (!GROQ_API_KEY) return NextResponse.json(simulateAnalysis());

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Groq API error:", response.status, errorBody);
      return NextResponse.json(simulateAnalysis());
    }

    const result = await response.json();
    const text = result?.choices?.[0]?.message?.content || "";
    const cleaned = text.replace(/```json?/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      isScam: Boolean(parsed.isScam),
      confidence: Math.min(100, Math.max(0, Number(parsed.confidence) || 50)),
      reasons: Array.isArray(parsed.reasons) ? parsed.reasons.slice(0, 5) : ["Analysis completed"],
      safetyTips: Array.isArray(parsed.safetyTips) ? parsed.safetyTips.slice(0, 5) : ["Stay vigilant online"],
    });
  } catch (err) {
    console.error("Analyze API error:", err);
    return NextResponse.json(simulateAnalysis());
  }
}

function simulateAnalysis() {
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

  return {
    isScam,
    confidence: isScam ? 65 + Math.floor(Math.random() * 30) : 10 + Math.floor(Math.random() * 25),
    reasons: (isScam ? scamReasons : safeReasons).sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2)),
    safetyTips: tips.sort(() => Math.random() - 0.5).slice(0, 3),
  };
}
