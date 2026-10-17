import type { MetadataRoute } from "next";
import { allPaths } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths.map((p) => ({ url: `${siteUrl}${p}` }));
}
