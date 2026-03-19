// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cityrometickets.com";

  const staticPages = [
    "",
    "/tour",
    "/about-us",
    "/contact",
    "/blog/first-time-rome",
    "/blog/rome-travel-tips",
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}