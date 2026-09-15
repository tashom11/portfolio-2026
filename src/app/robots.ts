import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexingEnabled } from "@/utils/environment";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${getSiteUrl()}/sitemap.xml` };
}
