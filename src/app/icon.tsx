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
          background: "#0f172a",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Steam lines */}
        <div
          style={{
            display: "flex",
            gap: 3,
            marginBottom: 1,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 2,
                height: i === 1 ? 5 : 3,
                background: "#94a3b8",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
        {/* Bowl shape with U */}
        <div
          style={{
            width: 22,
            height: 14,
            background: "linear-gradient(135deg, #f97316, #fb923c)",
            borderRadius: "2px 2px 11px 11px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 900,
              color: "#fff",
              fontFamily: "serif",
              lineHeight: 1,
            }}
          >
            U
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
