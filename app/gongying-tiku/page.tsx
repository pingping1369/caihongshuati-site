import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import siteData from "@/data/site-data.json";

const pn = siteData.pn;

export const metadata: Metadata = {
  alternates: { canonical: "/gongying-tiku" },
  title: "公共营养师三级刷题小程序：彩虹刷题-公共营养师三级",
  description: `公共营养师三级真题刷题微信小程序「彩虹刷题-公共营养师三级」：收录 ${pn.range} 共 ${pn.sessions} 场考试真题 ${pn.totalQuestions} 道，理论知识、专业技能两科分开练，${pn.totalKps} 个考点知识页，按考试日期自动排每日计划。新用户送 30 天会员。`,
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "彩虹刷题-公共营养师三级",
  alternateName: "彩虹刷题 公共营养师版",
  applicationCategory: "EducationalApplication",
  operatingSystem: "微信小程序",
  description: `中国营养学会公共营养师（三级）职业能力评价考试真题刷题小程序：${pn.range} 共 ${pn.sessions} 场真题 ${pn.totalQuestions} 道，理论知识与专业技能两科，${pn.totalKps} 个考点知识页。`,
  publisher: { "@type": "Organization", name: "彩虹刷题" },
  dateModified: pageUpdates["/gongying-tiku"],
};

const faqs = [
  {
    q: "公共营养师三级有什么刷题小程序？",
    a: `可以用「彩虹刷题-公共营养师三级」：微信顶部搜索「彩虹刷题」，选名称带「公共营养师三级」的那个。它收录 ${pn.range} 共 ${pn.sessions} 场考试真题 ${pn.totalQuestions} 道，理论知识、专业技能两科分开练，每题有答案和解析。`,
  },
  {
    q: "收费吗？",
    a: "新用户首次使用送 30 天会员，会员期内全部功能可用。到期后可在小程序内按天数开通会员（30 天、90 天、180 天），已开通的天数从当前到期日顺延；不开通也能查看学习记录、错题本和做过题目的解析。",
  },
  {
    q: "题目是官方真题吗？",
    a: "公共营养师考试不公开发布官方试题，小程序里的真题是考生回忆整理后人工校订的版本，配有答案与解析。题库只用于练习巩固，复习仍以教材为本。",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="card">
        <h1>彩虹刷题-公共营养师三级：公共营养师三级真题刷题小程序</h1>
        <p className="meta">更新于 {pageUpdates["/gongying-tiku"]} · 题量以小程序内为准</p>

        <p>
          <strong>彩虹刷题-公共营养师三级</strong>是彩虹刷题面向<strong>中国营养学会公共营养师（三级）职业能力评价考试</strong>考生的微信小程序。打开微信，顶部搜索「彩虹刷题」，选名称带「公共营养师三级」的那个即可，不用下载 App。
        </p>

        <h2>题库里有什么</h2>
        <ul>
          <li>
            <strong>{pn.sessions} 场全国统考真题</strong>：{pn.range}，常规场次 11 场 + 补考 1 场，按场整理，共 {pn.totalQuestions} 道（考生回忆版，逐题人工校订）；
          </li>
          <li>
            <strong>两科分开</strong>：理论知识卷（单选、多选）与专业技能卷（案例题），首页两科分别显示掌握情况；
          </li>
          <li>每题有答案和解析，多选题、案例题逐项说明；</li>
          <li>
            <strong>{pn.totalKps} 个考点知识页</strong>，按《公共营养师 基础知识》《公共营养师（三级）》两本教材的章节组织，每道题都连着对应考点。
          </li>
        </ul>

        <h2>怎么刷</h2>
        <ul>
          <li>
            <strong>智能刷题</strong>：填考试日期和目标分，每天刷什么、学过的什么时候复习都自动安排；
          </li>
          <li>
            <strong>按大纲刷</strong>：大纲页可按真题数筛选考点，先练考得多的；点进考点先看讲解，再做这个考点的真题，能看到它哪几年考过；
          </li>
          <li>
            <strong>整场模考</strong>：按考期两科同场模拟，出分科成绩报告，及格线按两科各 60 分计。
          </li>
        </ul>

        <h2>会员</h2>
        <p>
          新用户首次使用<strong>送 30 天会员</strong>，期间全部功能可用。到期后可在小程序内按天数开通（30 / 90 / 180 天），天数从当前到期日顺延；
          不开通也能查看学习记录、错题本和做过题目的解析。
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
          三级考什么、题型分值见<Link href="/guide/gongying-kaoshenme">三级考什么</Link>；
          哪些考点常考见<Link href="/guide/gongying-gaopin">三级高频考点</Link>；
          真题重复多少、刷几场够见<Link href="/guide/gongying-chongfulv">真题重复率统计</Link>；
          报考条件、费用与真假证书辨别见<Link href="/guide/gongying">公共营养师报考指南</Link>；
          还没决定考哪个证，看<Link href="/guide/duibi">注册营养师 vs 公共营养师</Link>；
          考注册营养师请看<Link href="/">彩虹刷题首页</Link>。
        </p>

        <p className="src-note">
          本页由彩虹刷题开发者整理。彩虹刷题是个人开发的备考练习工具，与中国营养学会、人社部门及各评价机构无隶属关系；报考政策以官方发布为准。
        </p>
      </div>
      <section className="sec">
        <div className="cta-band">
          <div>
            <h2>微信里搜一下就能刷</h2>
            <p>新用户送 30 天会员，不用下载安装。</p>
            <div className="wx-steps">
              <span>1. 打开微信</span>
              <span>2. 顶部搜索「彩虹刷题」</span>
              <span>
                3. 选「<b>彩虹刷题-公共营养师三级</b>」
              </span>
            </div>
          </div>
          <img src="/img/mascot.png" alt="彩虹刷题吉祥物彩虹小人" className="mascot-sm" />
        </div>
      </section>
    </main>
  );
}
