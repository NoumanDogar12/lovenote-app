import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "LoveNote - Create a Beautiful Valentine Proposal Website";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #9F1239 0%, #BE123C 30%, #E11D48 60%, #FB7185 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Decorative hearts */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 80,
            fontSize: 60,
            opacity: 0.15,
          }}
        >
          {"💕"}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 100,
            fontSize: 50,
            opacity: 0.15,
          }}
        >
          {"💝"}
        </div>
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 150,
            fontSize: 40,
            opacity: 0.1,
          }}
        >
          {"✨"}
        </div>

        {/* Logo / Brand */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            marginBottom: 24,
          }}
        >
          LoveNote
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            textAlign: "center" as const,
            maxWidth: 900,
            lineHeight: 1.15,
            marginBottom: 20,
            textShadow: "0 2px 20px rgba(0,0,0,0.2)",
          }}
        >
          Ask Your Valentine In Style
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center" as const,
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Photos, Messages, Music & Animations - Share a Unique Link
        </div>

        {/* CTA hint */}
        <div
          style={{
            marginTop: 32,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {"💌 Create yours at lovenote-app.vercel.app"}
        </div>
      </div>
    ),
    { ...size }
  );
}
