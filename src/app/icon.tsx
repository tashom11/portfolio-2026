import { ImageResponse } from "next/og";

import { accentColor } from "@/data/theme";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 8,
        background: "#181815",
      }}
    >
      <div style={{ width: 33, height: 33, boxSizing: "border-box", border: `7px solid ${accentColor}`, borderRadius: "50%" }} />
      <div style={{ position: "absolute", top: 3, left: 29.5, width: 5, height: 15, background: "#f2f0e9" }} />
      <div style={{ position: "absolute", bottom: 3, left: 29.5, width: 5, height: 15, background: "#f2f0e9" }} />
    </div>,
    size,
  );
}
