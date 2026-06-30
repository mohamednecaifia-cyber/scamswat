import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10B981",
          borderRadius: 8,
        }}
      >
        <div style={{ fontSize: 18, lineHeight: 1, display: "flex" }}>🛡</div>
      </div>
    ),
    { ...size },
  );
}
