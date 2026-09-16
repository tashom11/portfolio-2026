import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { accentColor } from "@/data/theme";

export const alt = `${profile.name}, ${profile.role}, portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background: "#f2f0e9",
        color: "#181815",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
        <strong>{profile.name} <span style={{ color: accentColor }}>®</span></strong>
        <span>{profile.role} · {profile.location}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", fontSize: 104, lineHeight: .88, letterSpacing: "-7px", maxWidth: 1000 }}>
        Des idées aux expériences <span style={{ color: accentColor }}>utiles.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, borderTop: "2px solid #181815", paddingTop: 20 }}>
        <span>{profile.yearsExperience} ans d’expérience</span><span>Portfolio · {new Date().getFullYear()}</span>
      </div>
    </div>,
    size,
  );
}
