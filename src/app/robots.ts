import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/utils/environment";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${getSiteUrl()}/sitemap.xml` };
}
