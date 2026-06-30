import { NextRequest, NextResponse } from "next/server";
import { preAnalyze } from "@/lib/analyzer";
import { buildUrlPrompt, buildMessagePrompt, buildNumberPrompt } from "@/lib/prompts";
import { computeFinalScore } from "@/lib/scoring";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

const SYSTEM_CORE =
  "You are a STRICT text analysis assistant. You ONLY analyze the EXACT text provided. " +
  "You NEVER invent, hallucinate, or reference anything outside the given text. " +
  "Your analysis is limited SOLELY to the input.";

export async function POST(request: NextRequest) {
  try {
    const { prompt, type = "message" } = await request.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const pre = preAnalyze(prompt);

    let llmResult: { isScam: boolean; confidence: number; reasons: string[] } | null = null;

    if (GROQ_API_KEY) {
      try {
        const promptContent =
          type === "url"
            ? buildUrlPrompt(prompt, pre)
            : type === "number"
              ? buildNumberPrompt(prompt, pre)
              : buildMessagePrompt(prompt, pre);

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
                { role: "system", content: SYSTEM_CORE },
                { role: "user", content: promptContent },
              ],
              temperature: 0.1,
              max_tokens: 500,
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const text = result?.choices?.[0]?.message?.content || "";
          const cleaned = text.replace(/```json?/gi, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          llmResult = {
            isScam: Boolean(parsed.isScam),
            confidence: Math.min(100, Math.max(0, Number(parsed.confidence) || 50)),
            reasons: Array.isArray(parsed.reasons) ? parsed.reasons.slice(0, 5) : [],
          };
        }
      } catch {
        // llmResult stays null -> pure rule-based
      }
    }

    return NextResponse.json(computeFinalScore(pre, llmResult));
  } catch {
    const fallback = preAnalyze("unknown");
    return NextResponse.json(computeFinalScore(fallback, null));
  }
}
