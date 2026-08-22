"use client";

import Script from "next/script";

/* Google Analytics 4。
   strategy="afterInteractive"：等页面可交互后才加载——googletagmanager.com 在国内被墙，
   若走同步/预加载会让国内访客白等一次连接超时（实测量级约 30 秒）。放到 afterInteractive
   后，首屏渲染与百度爬虫抓取都不受影响，代价只是极短停留的访客可能统计不到。
   未配 NEXT_PUBLIC_GA_ID 时整块不渲染，本地开发与预览环境干净。 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
