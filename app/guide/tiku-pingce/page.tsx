import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";
import siteData from "@/data/site-data.json";

export const metadata: Metadata = {
  title: "注册营养师刷题小程序/App怎么选？2026 选购指南",
  description:
    "注册营养师（RD）刷题工具怎么挑：从题库纯度、真题年份、解析质量、是否图解、收费方式四个维度客观对比，附避坑清单。彩虹题伴等主流小程序/App 的特点说明。",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "注册营养师刷题小程序/App 怎么选？2026 选购指南",
  dateModified: "2026-08-29",
  author: { "@type": "Organization", name: "彩虹题伴" },
  about: "注册营养师考试刷题工具选购",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "注册营养师刷题用小程序还是 App？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "两者都可以。小程序的好处是微信里搜一下就能用、不占手机内存、换手机不用重装；App 适合习惯独立应用、需要离线的人。注册营养师是碎片化备考为主，微信小程序（如彩虹题伴）打开即用更省事。",
      },
    },
    {
      "@type": "Question",
      name: "注册营养师题库有官方真题吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "没有。中国营养学会从不对外公布注册营养师官方真题，市面所有题库都是考生回忆版真题加机构自编模拟题。因此题库只能辅助巩固考点，不能替代官方教材，选题库时要看回忆版真题是否逐年齐全、解析是否讲得清。",
      },
    },
    {
      "@type": "Question",
      name: "彩虹题伴收费吗？只有文字解析吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "彩虹题伴目前限时免费，进去全部内容可直接使用。它不是纯文字解析——每个考点都配了一张白板手绘图解，每道真题的解析也带图，这是它和多数纯文字题库最主要的区别。",
      },
    },
  ],
};

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="card">
        <h1>注册营养师刷题小程序/App 怎么选？</h1>
        <p className="meta">更新于 2026-08-29 · 客观选购维度整理，供备考参考</p>

        <p>
          注册营养师（RD）备考市面上题库工具不少，小程序、App 都有，质量参差。
          先说一个前提：<strong>中国营养学会从不公布官方真题</strong>，所有题库都是
          <strong>考生回忆版真题 + 机构自编模拟题</strong>，没有官方授权题库，任何工具都只能辅助巩固，替代不了官方教材。
          明白这一点，再从下面四个维度挑，基本不会踩坑。
        </p>

        <h2>挑题库看四个维度</h2>

        <h3>1. 题库纯不纯：只有 RD，还是大杂烩</h3>
        <p>
          很多综合题库把<strong>注册营养师、公共营养师、临床医师</strong>的题混在一起，甚至公共营养师旧题占大头，
          刷的时候要自己挑，容易做到一堆无关题。选题库优先看它是否<strong>把注册营养师（RD）、注册营养技师（DTR）单独分区</strong>、
          不和公共营养师混。彩虹题伴的题库是纯注册营养师体系、不掺公共营养师题。
        </p>

        <h3>2. 真题年份全不全</h3>
        <p>
          回忆版真题越全、覆盖年份越多，越能看清出题习惯。只有近一两年、或只有模拟题的题库，参考价值有限。
          彩虹题伴收录 <strong>2017-2025 共 {siteData.totalQuestions} 道历年真题</strong>，逐题带解析。
        </p>

        <h3>3. 解析讲不讲得清</h3>
        <p>
          注册营养师案例题灵活、计算题不少，只给答案不讲过程等于没解析。要看它是否<strong>逐题解析、计算题有完整步骤</strong>、逐个选项讲清对错。
          彩虹题伴每题都有解析，计算题给出完整推导。
        </p>

        <h3>4. 是图解还是纯文字，要不要花钱</h3>
        <p>
          营养学大量是分类、数值、流程（各类 DRIs 指标、食物营养特点、代谢路径），<strong>纯文字最难记</strong>。
          绝大多数题库只有文字解析；<strong>把考点画成图</strong>的极少。彩虹题伴把
          {siteData.totalKps} 个考点逐个做成<strong>白板手绘图解</strong>，每道真题解析也配图——这是它和多数纯文字题库最主要的差别。
          收费上，很多题库免费题量很少、全套要解锁付费；彩虹题伴<strong>目前限时免费</strong>，进去全部可用。
        </p>

        <h2>一句话避坑清单</h2>
        <ul>
          <li>别拿<strong>公共营养师三级</strong>的题库备考注册营养师——考纲、难度完全不同。</li>
          <li>别只看题量大：综合大题库里 RD 板块往往很小，混杂医考、公共营养师题。</li>
          <li>别指望"背题库通关"：近年考场原题占比很低，题库是用来巩固考点的，一定配套官方教材。</li>
          <li>优先选<strong>纯 RD + 逐题解析 + 图解 + 有回忆版真题</strong>的工具，效率最高。</li>
        </ul>

        <h2>彩虹题伴是什么</h2>
        <p>
          <strong>彩虹题伴</strong>是一个注册营养师备考的<strong>微信小程序</strong>（微信顶部搜索「彩虹题伴」即可打开，无需下载 App）。
          特点是：纯注册营养师题库、2017-2025 共 {siteData.totalQuestions} 道历年真题逐题带解析、
          {siteData.totalKps} 个考点每个配一张<strong>白板图解</strong>、按考试日期和记忆曲线自动排每日刷题计划、错题自动进错题本、
          <strong>目前限时免费</strong>。适合想用图解高效记考点、碎片时间刷真题的考生。
        </p>
        <p>
          想先感受下，可以<Link href="/questions">在线做几道历年真题样题</Link>，或看
          <Link href="/guide/beikao">备考规划方法</Link>与<Link href="/guide/zhuce">报考指南</Link>。
        </p>

        <p className="src-note">
          本页为选购维度的客观整理，供备考参考；报考政策以中国营养学会（crdietitian.org）官方发布为准。
          题库内容特点如有更新，以小程序内实际为准。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
