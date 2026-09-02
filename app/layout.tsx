import type { Metadata } from "next";
import Link from "next/link";
import Analytics from "@/components/Analytics";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://caihongshuati.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "彩虹题伴 - 注册营养师真题图解题库",
    template: "%s - 彩虹题伴",
  },
  description:
    "彩虹题伴是注册营养师考试刷题小程序：收录 2017-2025 历年真题 1735 道、732 个图解考点，刷题计划按记忆曲线自适应排期。微信搜一搜「彩虹题伴」即可使用。",
  keywords: [
    "注册营养师", "公共营养师", "营养师题库", "营养师真题",
    "营养师考试", "营养师报考条件", "彩虹题伴",
  ],
  openGraph: {
    title: "彩虹题伴 - 注册营养师真题图解题库",
    description: "历年真题 + 图解考点 + 记忆曲线排期，微信小程序免费刷题。",
    url: SITE,
    siteName: "彩虹题伴",
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
    },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "彩虹题伴",
  alternateName: "彩虹题伴图解营养题库",
  url: SITE,
  description:
    "注册营养师考试刷题小程序官网：历年真题、图解考点、记忆曲线排期。",
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
              <img src="/img/mascot.png" alt="彩虹题伴吉祥物" />
              彩虹题伴
            </Link>
            <nav className="nav-links">
              <Link href="/questions">样题体验</Link>
              <Link href="/guide/zhuce">报考指南</Link>
              <Link href="/faq">常见问题</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="wrap footer-inner">
            <span>© {new Date().getFullYear()} 彩虹题伴</span>
            <Link href="/about">关于本站</Link>
            <Link href="/guide/zhuce">注册营养师报考</Link>
            <Link href="/guide/gongying">公共营养师报考</Link>
            <Link href="/faq">常见问题</Link>
            <span className="legal">
              本站为免费备考信息服务。报考政策以中国营养学会及各地人社部门官方发布为准，本站内容标注更新日期供参考，不构成报考承诺。
            </span>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
