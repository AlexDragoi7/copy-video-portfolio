import { ImageResponse } from "next/og";
import { siteTitle } from "@/lib/site";

export const alt = siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(60% 60% at 20% 20%, #83c2c9 0%, transparent 70%), radial-gradient(60% 60% at 85% 80%, #ebb66d 0%, transparent 70%), #f0f1ea",
          color: "#23302e",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Strategic Copywriter & Content Writer
        </div>
        <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>
          Copy that drives action
        </div>
        <div style={{ fontSize: 40, marginTop: 40 }}>Alex Dragoi</div>
      </div>
    ),
    size,
  );
}
