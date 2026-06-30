import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ScamReport {
  id?: string;
  type: "link" | "message" | "number";
  content: string;
  is_scam: boolean;
  confidence: number;
  reported_at: string;
}

export async function saveReport(report: Omit<ScamReport, "id" | "reported_at">) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("scam_reports")
    .insert([{ ...report, reported_at: new Date().toISOString() }])
    .select();
  if (error) console.error("Supabase error:", error);
  return data;
}

export async function getRecentReports(limit = 10) {
  if (!supabase) return [];
  const { data } = await supabase
    .from("scam_reports")
    .select("*")
    .order("reported_at", { ascending: false })
    .limit(limit);
  return data || [];
}
