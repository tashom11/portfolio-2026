import type { MetadataRoute } from "next";
import { hobbies } from "@/data/hobbies";
import { getSiteUrl } from "@/utils/environment";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/hobbies`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...hobbies.map(({ slug }) => ({
      url: `${siteUrl}/hobbies/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
