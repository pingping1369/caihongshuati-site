import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://caihongshuati.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/questions",
    "/guide/tiku-pingce",
    "/guide/kaodian-shuju",
    "/guide/zhenti-chongkao",
    "/guide/zhuce",
    "/guide/gongying",
    "/guide/duibi",
    "/guide/beikao",
    "/faq",
    "/about",
  ];
  return routes.map((r) => ({
    url: `${SITE}${r}`,
    lastModified: "2026-08-29",
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r.startsWith("/guide") ? 0.8 : 0.6,
  }));
}
