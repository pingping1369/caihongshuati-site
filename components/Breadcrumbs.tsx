"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { crumbsFor } from "@/lib/site-nav";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://caihongshuati.com";

/* 面包屑：可见导航 + BreadcrumbList 结构化数据，告诉搜索引擎与 AI 当前页属于哪门考试。层级来自 lib/site-nav.ts。 */
export default function Breadcrumbs() {
  const crumbs = crumbsFor(usePathname() || "/");
  if (!crumbs.length) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: new URL(c.href, SITE).href,
    })),
  };
  return (
    <nav className="wrap crumbs" aria-label="面包屑">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol>
        {crumbs.map((c, i) => (
          <li key={c.href}>
            {i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
