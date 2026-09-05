import type { Metadata } from "next";
import Link from "next/link";
import MockExam, { MockData } from "@/components/MockExam";
import WxCta from "@/components/WxCta";
import mock from "@/data/mock-2026.json";

const data = mock as MockData;

export const metadata: Metadata = {
  alternates: { canonical: "/moni/2026" },
  title: "2026 注册营养师考试模拟题：100 题在线做，答一题看一题解析",
  description:
    "按 2017-2025 九年回忆版真题的考点考频（近三年加权）出的 2026 注册营养师模拟卷：100 道单选，前 64 题单题、后 12 组案例题，逐题解析并标注考点考查年份，做完给出模拟分和各模块正确率。",
  keywords: ["注册营养师模拟题", "注册营养师模拟考试", "2026注册营养师", "注册营养师押题", "注册营养师在线做题"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "2026 注册营养师考试模拟卷（100 题）",
  about: "注册营养师水平评价考试",
  educationalLevel: "职业资格",
  numberOfQuestions: data.meta.total,
  dateModified: data.meta.updated,
  author: { "@type": "Organization", name: "彩虹题伴" },
};

export default function Page() {
  return (
    <main className="sec wrap mk-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mk-hero">
        <span className="kicker">2026 模拟卷</span>
        <h1>2026 注册营养师考试模拟题</h1>
        <p className="lede">
          {data.meta.total} 道单选题，考点按九年真题考频选出、题目全新命制。答一题看一题解析，做完出模拟分。
        </p>
        <p className="meta">
          更新于 {data.meta.updated} · 考试日 {data.meta.examDate} · 建议用时 {data.meta.minutes} 分钟
        </p>
      </div>

      <MockExam data={data} />

      <div className="card article mk-method">
        <h2>这套题是怎么出的</h2>
        <p>
          <strong>考点从数据里来。</strong>把 2017-2025 九年共 1735 道回忆版真题逐题标注考点后，按考查频次排序（近三年加权），再按四大模块在真题中的实际占比分配题量——最后落到 {data.meta.total} 题、87 个考点。这些考点大多近九年反复出现，其中「食物中毒」「慢性肾脏病营养治疗」「婴幼儿辅食」等年年在考。
        </p>
        <p>
          <strong>题目是新的，不是原题。</strong>每道题依据考点内容与历年真题的考法重新命制，换角度、换场景、换数据，避免背答案；案例题沿用真实考试「一段背景配 3 问」的形式。
        </p>
        <p>
          <strong>能押中多少，先用往年验证。</strong>用同一套方法回测：只用 2023 年及以前的数据选题去对 2024 年真题、只用 2024 年及以前的数据去对 2025 年真题，模拟卷中约六成题目的考点在当年真题中直接出现，按章节口径超过 95%。考试每年从 600 多个考点中抽约 165 个，没有任何一套题能全部押中，把做错的考点补掉才是这套卷的用法。
        </p>
        <p>
          做完想系统补考点：<Link href="/guide/kaodian-shuju">考点分布数据</Link>列出了 46 个年年考的核心考点，<Link href="/guide/zhenti-chongkao">真题重考率</Link>解释了为什么倒序刷近三年真题最划算。
        </p>
        <p className="src-note">
          本卷为彩虹题伴自命题模拟题，非官方真题；考点统计基于考生回忆版真题（中国营养学会不公布官方真题），考试范围以官方考纲为准。分数仅用于自我估计，不构成任何合格判定。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
