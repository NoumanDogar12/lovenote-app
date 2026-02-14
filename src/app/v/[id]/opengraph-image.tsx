import { ImageResponse } from "next/og";
import { getPublishedValentine } from "@/actions/valentines";

export const runtime = "edge";
export const alt = "A Valentine for you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let recipientName = "You";
  try {
    const valentine = await getPublishedValentine(id);
    if (valentine?.recipient_name) {
      recipientName = valentine.recipient_name;
    }
  } catch {
    // Use default
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 30%, #FECDD3 70%, #FDA4AF 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
          }}
        >
          {"💌"}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#9F1239",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            marginBottom: 16,
            opacity: 0.7,
          }}
        >
          Someone sent you a Valentine
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#881337",
            textAlign: "center" as const,
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          Dear {recipientName}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#BE123C",
            marginTop: 24,
            opacity: 0.6,
          }}
        >
          Open to reveal your Valentine
        </div>
        <div
          style={{
            position: "absolute" as const,
            bottom: 30,
            fontSize: 16,
            color: "#E11D48",
            opacity: 0.4,
          }}
        >
          LoveNote
        </div>
      </div>
    ),
    { ...size }
  );
}
