import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#18181b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "1px",
            lineHeight: 1,
          }}
        >
          VV
        </span>
      </div>
    ),
    { ...size }
  );
}
