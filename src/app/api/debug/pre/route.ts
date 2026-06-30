import { NextRequest, NextResponse } from "next/server";
import { preAnalyze } from "@/lib/analyzer";
import { computeFinalScore } from "@/lib/scoring";
import { buildUrlPrompt, buildMessagePrompt, buildNumberPrompt } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  const { prompt, type = "message" } = await request.json();
  const pre = preAnalyze(prompt || "test");

  const promptContent =
    type === "url"
      ? buildUrlPrompt(prompt, pre)
      : type === "number"
        ? buildNumberPrompt(prompt, pre)
        : buildMessagePrompt(prompt, pre);

  return NextResponse.json({
    pre,
    llmPrompt: promptContent,
    final: computeFinalScore(pre, null),
  });
}
