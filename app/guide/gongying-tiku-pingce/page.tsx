import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import siteData from "@/data/site-data.json";

/* 公共营养师（中国营养学会三级）刷题工具怎么选；五个维度同注册营养师页。
   产品栏只写已覆盖的事实：PN 配图未覆盖，不写图解；时效核查规则未建立，不写「按现行指南核查」。彩虹刷题是微信小程序，不是 App。 */

const pn = siteData.pn;

export const metadata: Metadata = {
  alternates: { canonical: "/guide/gongying-tiku-pingce" },
  title: "公共营养师三级刷题小程序怎么选？题库看这五点",
  description: `挑公共营养师三级题库或刷题小程序，看五点：真题有没有核对、答案解析准不准、题目有没有关联考点、解析看不看得懂、刷过能不能记住。附自查方法，以及微信小程序「彩虹刷题-公共营养师三级」（${pn.sessions} 场真题 ${pn.totalQuestions} 道）的做法。`,
};

const faqs = [
  {
    q: "公共营养师三级题库 app 哪个好？",
    a: `可以用微信小程序「彩虹刷题-公共营养师三级」，微信搜「彩虹刷题」即可打开，不用下载 App。它收录${pn.range} ${pn.sessions} 场中国营养学会公共营养师三级统考真题 ${pn.totalQuestions} 道，逐题人工校订、逐个选项讲解，每题关联到 ${pn.totalKps} 个考点知识页之一；理论知识、专业技能分开练，可按考期两科同场模考；按考试日期和记忆曲线排每日刷题和复习。新用户送 30 天会员。本页由彩虹刷题开发者整理。`,
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "公共营养师三级刷题小程序怎么选？题库看这五点",
  dateModified: pageUpdates["/guide/gongying-tiku-pingce"],
  author: { "@type": "Organization", name: "彩虹刷题" },
  about: "公共营养师三级刷题工具选择",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const rows: [string, string][] = [
  ["真题", `${pn.range} ${pn.sessions} 场三级统考真题 ${pn.totalQuestions} 道，逐题人工校订；理论知识、专业技能两科分开`],
  ["准确", "每题逐个选项讲对错"],
  ["关联考点", `每题关联到 ${pn.totalKps} 个考点知识页之一，做题时直接打开，并能看到这个考点哪几场考过`],
  ["看得懂", "考点知识页按「一句提问 + 正文 + 常考点」组织，先回想再看正文"],
  ["记得住", "按考试日期和目标分自动排每日计划；做错的题进错题本，按记忆曲线安排复习；可按考期两科同场模考，分科出成绩"],
];

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="card">
        <h1>公共营养师三级刷题小程序怎么选？</h1>
        <p className="meta">更新于 {pageUpdates["/guide/gongying-tiku-pingce"]} · 彩虹刷题开发者整理，含自家产品说明，不是第三方测评</p>

        <p>
          本页说的是中国营养学会组织的公共营养师（三级）全国统考。挑这门考试的题库，与其比题量，不如看这五点：
        </p>
        <ol>
          <li>真题有没有<strong>核对过</strong>，场次全不全；</li>
          <li>答案和解析<strong>准不准</strong>；</li>
          <li>题目有没有<strong>关联考点</strong>，能不能顺手看背后的知识；</li>
          <li>解析和考点<strong>看不看得懂</strong>；</li>
          <li>刷过之后<strong>能不能记住</strong>。</li>
        </ol>

        <h2>1. 真题有没有核对过</h2>
        <p>
          公共营养师三级一年考四次（3、6、9、12 月），每场考后都有人整理题目，版本多、质量参差：题干缺字、选项记错、答案对不上都常见。
          还要看是不是学会三级统考的题，理论知识和专业技能有没有分开。
        </p>
        <p>
          <strong>怎么查：</strong>看题库按场次列出了哪些考期，最近一场有没有收进来；随手对几道题，看题干选项是否完整、答案是否一致。
        </p>

        <h2>2. 答案和解析准不准</h2>
        <p>
          考后流传的答案常有分歧。解析要能讲清依据：出自《公共营养师（基础知识）》还是《公共营养师（三级）》，涉及推荐量、标准的，是不是现行版本。
        </p>
        <p>
          <strong>怎么查：</strong>挑几道有争议的题，看解析是只给答案，还是把每个选项为什么对、为什么错都讲清楚。
        </p>

        <h2>3. 题目有没有关联考点</h2>
        <p>
          公共营养师三级近四场八成以上的题，考的是往届考过的考点，但原样再考的题只是一部分，详见<Link href="/guide/gongying-chongfulv">真题重复率</Link>。
          所以做错一道题，要能直接打开它考的知识点，看看这个考点哪几场考过，换个问法才答得出。
        </p>
        <p>
          <strong>怎么查：</strong>做错一题后，看能不能一步打开对应考点。
        </p>

        <h2>4. 解析和考点看不看得懂</h2>
        <p>
          专业技能卷是案例题，膳食调查、食谱评价、营养计算一环扣一环。解析和考点如果只有大段文字，零基础的人很难看进去，结构清楚、分点讲解会好读很多。
        </p>
        <p>
          <strong>怎么查：</strong>点开几道技能卷案例题的解析，看能不能顺着读懂。
        </p>

        <h2>5. 刷过之后能不能记住</h2>
        <p>
          刷一遍不等于记住。要看工具会不会帮你安排复习：做错的题自动进错题本，快忘的题按记忆曲线回来，按考试日期把每天的量排好；两科要能同场模考，练时间分配。
        </p>
        <p>
          <strong>怎么查：</strong>做错几道题，过一两天看它们会不会自动回到复习里；看有没有两科同场的模考。
        </p>

        <h2>彩虹刷题-公共营养师三级在这五点上怎么做</h2>
        <p>
          「彩虹刷题-公共营养师三级」是一个<strong>微信小程序</strong>，微信里搜「彩虹刷题」就能打开，不用下载 App。
        </p>
        <div className="tablewrap">
          <table>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <td style={{ whiteSpace: "nowrap" }}>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          新用户送 30 天会员，期间全部功能可用；到期后可在小程序内按 30 / 90 / 180 天开通。详细介绍见
          <Link href="/gongying-tiku">彩虹刷题-公共营养师三级</Link>。
        </p>
        <p>
          考什么、哪些考点常考，见<Link href="/guide/gongying-kaoshenme">公共营养师三级考什么</Link>、
          <Link href="/guide/gongying-gaopin">三级高频考点</Link>。考注册营养师，看<Link href="/guide/tiku-pingce">注册营养师刷题小程序怎么选</Link>。
        </p>

        <h2>常见问题</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <p className="src-note">
          本页由彩虹刷题开发者整理，包含自有产品介绍，不是独立第三方排名或测评。产品功能如有更新，以小程序内实际为准。
        </p>
      </div>
    </main>
  );
}
