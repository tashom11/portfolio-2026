import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Portfolio de ${profile.name}`,
    short_name: profile.name,
    start_url: "/",
    display: "standalone",
    background_color: "#f2f0e9",
    theme_color: "#f2f0e9",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
