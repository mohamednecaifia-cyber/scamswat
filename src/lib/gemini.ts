export type { ScamAnalysis } from "./scoring";

export async function analyzeLink(url: string) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: url, type: "url" }),
  });
  if (!response.ok) throw new Error("API error");
  return response.json();
}

export async function analyzeMessage(message: string) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: message, type: "message" }),
  });
  if (!response.ok) throw new Error("API error");
  return response.json();
}

export async function analyzeNumber(number: string) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: number, type: "number" }),
  });
  if (!response.ok) throw new Error("API error");
  return response.json();
}
