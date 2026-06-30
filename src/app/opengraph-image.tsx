import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-25%",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-20%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.08)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(16, 185, 129, 0.15)",
            marginBottom: 24,
            fontSize: 40,
            lineHeight: 1,
          }}
        >
          🛡
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
            marginBottom: 12,
            display: "flex",
          }}
        >
          Scam
          <span style={{ color: "#10B981" }}>Swat</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#94A3B8",
            fontWeight: 400,
            display: "flex",
          }}
        >
          AI-Powered Scam Detection & Protection
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 18,
              color: "#CBD5E1",
              display: "flex",
            }}
          >
            Link Checker
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 18,
              color: "#CBD5E1",
              display: "flex",
            }}
          >
            Message Analyzer
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 18,
              color: "#CBD5E1",
              display: "flex",
            }}
          >
            Number Lookup
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
