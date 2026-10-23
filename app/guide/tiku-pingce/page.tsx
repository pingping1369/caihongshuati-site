import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";
import siteData from "@/data/site-data.json";

/* 五个维度按用户 2026-10-23 定：真题是否核对过、答案解析是否按现行指南核查、是否关联考点、看不看得懂（图解）、记不记得住。
   产品事实：RD 1850 题全部有逐选项解析与考点挂载，时效题按质检规则现行改编或停用；PN 不写图解（配图未覆盖）。 */

export const metadata: Metadata = {
  alternates: { canonical: "/guide/tiku-pingce" },
  title: "注册营养师、公共营养师题库怎么选？刷题小程序看这五点",
  description:
    "挑注册营养师、公共营养师三级题库或刷题小程序，看五点：是不是核对过的真题、答案解析有没有按现行指南核查、题目有没有关联考点、解析看不看得懂、刷过能不能记住。附每一点的自查方法。",
};

const faqs = [
  {
    q: "注册营养师题库有官方真题吗？",
    a: "没有。中国营养学会不公布注册营养师考试原题，市面上的「真题」都是考生回忆整理的版本。挑题库时要看这些回忆版真题有没有逐题核对、过时的题有没有改写或剔除。",
  },
  {
    q: "注册营养师题库 app 哪个好？",
    a: "看五点：是不是核对过的真题，答案解析有没有按现行膳食指南、DRIs 等核查，题目有没有关联考点，解析看不看得懂，刷过能不能记住。彩虹刷题-图解注册营养题库收录 2017-2026 年回忆版真题 1850 道，每题逐选项解析并关联考点，考点和解析配图解，按记忆曲线排复习。本页由彩虹刷题开发者整理。",
  },
  {
    q: "公共营养师三级题库 app 哪个好？",
    a: "同样看真题是否核对、答案是否可靠、能否看到背后的考点、能否帮你记住。彩虹刷题-公共营养师三级收录 2024 年 3 月至 2026 年 9 月 12 场真题 1304 道，逐题人工校订、逐选项解析并关联考点，理论知识和专业技能分开练，按记忆曲线排复习。本页由彩虹刷题开发者整理。",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "注册营养师、公共营养师题库怎么选？刷题小程序看这五点",
  dateModified: pageUpdates["/guide/tiku-pingce"],
  author: { "@type": "Organization", name: "彩虹刷题" },
  about: "注册营养师、公共营养师刷题工具选择",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="card">
        <h1>注册营养师、公共营养师刷题小程序怎么选？</h1>
        <p className="meta">更新于 {pageUpdates["/guide/tiku-pingce"]} · 彩虹刷题开发者整理，含自家产品说明，不是第三方测评</p>

        <p>
          两门考试都没有官方公布的原题，市面上的「真题」都是考生回忆整理的版本。所以挑题库，与其比题量，不如看这五点：
        </p>
        <ol>
          <li>是不是<strong>核对过的真题</strong>，过时的题有没有处理；</li>
          <li>答案和解析<strong>准不准</strong>，有没有按现行指南核查；</li>
          <li>题目有没有<strong>关联考点</strong>，能不能顺手看背后的知识；</li>
          <li>解析和考点<strong>看不看得懂</strong>；</li>
          <li>刷过之后<strong>能不能记住</strong>。</li>
        </ol>

        <h2>1. 是不是核对过的真题</h2>
        <p>
          回忆版真题来自考后整理，常见问题是题干缺字、选项记错、答案不一。更要紧的是<strong>旧题过时</strong>：
          标准、指南更新后，旧题的数值或答案可能已经不成立，照着背反而记错。
        </p>
        <p>
          <strong>怎么查：</strong>看题库有没有说明真题来源和年份；找几道考标准、限量、推荐量的老题，看答案是旧版还是现行版。
        </p>

        <h2>2. 答案和解析准不准</h2>
        <p>
          营养学的很多结论跟着国家级文件走：《中国居民膳食指南（2022）》、《中国居民膳食营养素参考摄入量（2023 版）》、食品安全国家标准、各类食养指南。
          答案和解析如果没有对照这些现行版本核查过，就可能把过时的说法当成正确答案。
        </p>
        <p>
          <strong>怎么查：</strong>挑一道考 DRIs 数值或膳食指南推荐量的题，看解析给的数字和依据是不是现行版本；再看解析是只给答案，还是把每个选项为什么对、为什么错都讲清楚。
        </p>

        <h2>3. 题目有没有关联考点</h2>
        <p>
          同一个考点年年换着问法考，只记住某道题的答案，换个问法就不会了。做错一道题时，能直接打开它考的知识点、看看这个考点还出过哪些题，才能把一类题都弄懂。
        </p>
        <p>
          <strong>怎么查：</strong>做错一题后，看能不能一步打开对应考点；考点页里有没有列出挂在它下面的其他真题。
        </p>

        <h2>4. 解析和考点看不看得懂</h2>
        <p>
          营养学有大量分类、数值和流程，整段文字读下来，零基础的人容易看不进去，有基础的人也很难一眼抓住结构。
          把分类和对比画成图，先看图懂框架，再回文字抠细节，会轻松很多，也更好记。
        </p>
        <p>
          <strong>怎么查：</strong>随便点开几道题的解析和几个考点，看是不是只有大段文字。
        </p>

        <h2>5. 刷过之后能不能记住</h2>
        <p>
          刷一遍不等于记住。要看工具会不会帮你安排复习：做错的题自动进错题本，快忘的题按记忆曲线在该复习的那天回来，按考试日期把每天的量排好。
        </p>
        <p>
          <strong>怎么查：</strong>做错几道题，过一两天看它们会不会自动回到复习里；看有没有按考试日期生成的每日计划。
        </p>

        <h2>彩虹刷题在这五点上怎么做</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>维度</th>
                <th>彩虹刷题-图解注册营养题库</th>
                <th>彩虹刷题-公共营养师三级</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>真题</td>
                <td>2017-2026 年回忆版真题 {siteData.totalQuestions} 道，逐题人工校对；涉及已更新标准或指南的旧题，改写成现行口径，无法可靠改写的停用</td>
                <td>{siteData.pn.range} {siteData.pn.sessions} 场真题 {siteData.pn.totalQuestions} 道，逐题人工校订，理论知识、专业技能分开</td>
              </tr>
              <tr>
                <td>准确</td>
                <td>答案与解析对照教材和现行膳食指南、DRIs、国家标准等核查；每题逐个选项讲对错，计算题给完整步骤</td>
                <td>每题逐个选项讲对错</td>
              </tr>
              <tr>
                <td>关联考点</td>
                <td>每题挂到 {siteData.totalKps} 个考点之一，做题时可直接打开考点，考点页列出它下面的真题</td>
                <td>每题挂到 {siteData.pn.totalKps} 个考点知识页之一，做题时可直接打开，并能看到这个考点哪几场考过</td>
              </tr>
              <tr>
                <td>看得懂</td>
                <td>真题解析和考点都配白板手绘图解，考点内容多的按小节分图</td>
                <td>考点知识页按「一句提问 + 正文 + 常考点」组织</td>
              </tr>
              <tr>
                <td>记得住</td>
                <td colSpan={2}>按考试日期和目标分自动排每日计划；做错的题进错题本，按记忆曲线安排复习；可整卷模考</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          两个都是微信小程序，微信里搜「彩虹刷题」都能找到。新用户送 30 天会员，期间全部功能可用；到期后可在小程序内按 30 / 90 / 180 天开通。
          公共营养师三级的详细介绍见<Link href="/gongying-tiku">彩虹刷题-公共营养师三级</Link>。
        </p>

        <h2>常见问题</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>相关页面</h2>
        <p>
          想先试试：<Link href="/questions">在线做几道注册营养师真题样题</Link>、<Link href="/moni/2027">2027 注册营养师模拟卷</Link>；
          想了解考什么：<Link href="/guide/kaodian-shuju">注册营养师考试重点</Link>、<Link href="/guide/gongying-kaoshenme">公共营养师三级考什么</Link>。
        </p>

        <p className="src-note">
          本页由彩虹刷题开发者整理，包含自有产品介绍，不是独立第三方排名或测评。报考政策以中国营养学会官方发布为准；产品功能如有更新，以小程序内实际为准。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
