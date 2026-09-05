import type { MetadataRoute } from "next";
import pageUpdates from "@/data/page-updates.json";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://caihongshuati.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // 手工记录实质内容更新；不要使用构建时间伪造全站每日更新。
  return Object.entries(pageUpdates).map(([route, lastModified]) => ({
    url: new URL(route, SITE).href,
    lastModified,
  }));
}
