import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";
export const alt = "ScamSwat - AI-Powered Scam Detection & Protection";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, transparent 50%, rgba(239,68,68,0.08) 100%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "rgba(16, 185, 129, 0.15)",
              fontSize: 40,
              lineHeight: 1,
            }}
          >
            🛡
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72, fontWeight: 700, color: "#F8FAFC", letterSpacing: "-0.02em", display: "flex" }}>
              Scam<span style={{ color: "#10B981" }}>Swat</span>
            </div>
            <div style={{ fontSize: 24, color: "#64748B", marginTop: 4, display: "flex" }}>
              Free, AI-powered. Check any link, message, or number.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
