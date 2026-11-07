import type { Metadata } from "next";
import Link from "next/link";
import Analytics from "@/components/Analytics";
import Breadcrumbs from "@/components/Breadcrumbs";
import { exams, common } from "@/lib/site-nav";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://caihongshuati.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "彩虹刷题 - 注册营养师真题图解题库",
    template: "%s - 彩虹刷题",
  },
  description:
    "彩虹刷题是营养师真题刷题微信小程序：注册营养师收录 2017-2026 年真题 1850 道，公共营养师三级收录 12 场真题 1304 道，题目都关联考点、配有图解。三种刷法：智能刷题（按目标分数自动安排每天刷什么、什么时候复习）、按大纲刷真题、真题模拟考试。微信搜「彩虹刷题」即可使用。",
  keywords: [
    "注册营养师", "公共营养师", "营养师题库", "营养师真题",
    "营养师考试", "营养师报考条件", "彩虹刷题",
  ],
  openGraph: {
    title: "彩虹刷题 - 注册营养师真题图解题库",
    description: "会刷真题，事半功倍。营养师历年真题全部关联考点、配有图解；智能刷题、按大纲刷、真题模考三种刷法。新用户送 30 天会员。",
    url: SITE,
    siteName: "彩虹刷题",
    images: ["/img/mascot.png"],
    locale: "zh_CN",
    type: "website",
  },
  // 站长平台所有权验证 meta（域名绑定后由环境变量注入，避免改代码）
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_BAIDU_VERIFICATION
        ? { "baidu-site-verification": process.env.NEXT_PUBLIC_BAIDU_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
      // 头条搜索站长平台（豆包的检索源）
      ...(process.env.NEXT_PUBLIC_BYTEDANCE_VERIFICATION
        ? { "bytedance-verification-code": process.env.NEXT_PUBLIC_BYTEDANCE_VERIFICATION }
        : {}),
    },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "彩虹刷题",
      url: SITE,
      description:
        "彩虹刷题官网：注册营养师、公共营养师三级真题刷题微信小程序的介绍与备考资料。",
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "彩虹刷题",
      url: SITE,
      logo: `${SITE}/img/mascot.png`,
      description:
        "个人开发的营养师备考刷题工具，与中国营养学会没有隶属或授权关系。",
    },
    {
      "@type": "SoftwareApplication",
      name: "彩虹刷题-图解注册营养题库",
      applicationCategory: "EducationalApplication",
      operatingSystem: "微信小程序",
      description:
        "注册营养师真题刷题小程序：收录 2017-2026 年真题 1850 道，每道题都关联考点，真题解析和 864 个考点都配有图解。三种刷法：智能刷题（设好目标分数，每天刷什么、学过的什么时候复习都自动安排）、按大纲刷真题（按真题数量筛选，先练高频考点）、真题模拟考试（按年份整卷模考）。新用户送 30 天会员。",
      publisher: { "@id": `${SITE}/#org` },
      url: SITE,
    },
    {
      "@type": "SoftwareApplication",
      name: "彩虹刷题-公共营养师三级",
      applicationCategory: "EducationalApplication",
      operatingSystem: "微信小程序",
      description:
        "公共营养师三级真题刷题小程序：2024 年 3 月至 2026 年 9 月共 12 场真题 1304 道，理论知识与专业技能两科分开练，每道题都关联考点，435 个考点知识页，考点讲解配有图解。三种刷法：智能刷题、按大纲刷真题、整场模考。新用户送 30 天会员。",
      publisher: { "@id": `${SITE}/#org` },
      url: `${SITE}/gongying-tiku`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <header className="nav">
          <div className="wrap nav-inner">
            <Link href="/" className="brand">
              <img src="/img/mascot.png" alt="彩虹刷题吉祥物" />
              彩虹刷题
            </Link>
            <nav className="nav-links" aria-label="主导航">
              <Link href="/zhuce-yingyangshi">注册营养师</Link>
              <Link href="/gongying-yingyangshi">公共营养师</Link>
              <Link href="/moni/2027">2027 模拟卷</Link>
              <Link href="/faq">常见问题</Link>
            </nav>
          </div>
        </header>
        <Breadcrumbs />
        {children}
        <footer className="footer">
          <div className="wrap">
            <nav className="sitemap" aria-label="网站地图">
              {exams.map((ex) => (
                <div key={ex.key}>
                  <p className="sitemap-h">
                    <Link href={ex.hub}>{ex.name}</Link>
                  </p>
                  <ul>
                    {ex.groups.flatMap((g) => g.pages).map((p) => (
                      <li key={p.href}>
                        <Link href={p.href}>{p.href === "/" || p.href === "/gongying-tiku" ? "刷题小程序" : p.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <p className="sitemap-h">通用</p>
                <ul>
                  {common.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href}>{p.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <div className="footer-inner">
              <span>© {new Date().getFullYear()} 彩虹刷题</span>
              <span className="legal">
                本站为免费备考信息服务。报考政策以中国营养学会官方发布为准，本站内容标注更新日期供参考，不构成报考承诺。
              </span>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
