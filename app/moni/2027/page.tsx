import type { Metadata } from "next";
import Link from "next/link";
import MockExam, { MockData } from "@/components/MockExam";
import WxCta from "@/components/WxCta";
import mock from "@/data/mock-2027.json";

const data = mock as MockData;

export const metadata: Metadata = {
  alternates: { canonical: "/moni/2027" },
  title: "2027 注册营养师考试模拟题：100 题在线做，答一题看一题解析",
  description:
    "按 2017-2026 十年回忆版真题的考点考频（近年加权）出的 2027 注册营养师模拟卷：100 道单选，前 64 题单题、后 12 组案例题，逐题解析并标注考点考查年份，做完给出模拟分和各模块正确率。",
  keywords: ["注册营养师模拟题", "注册营养师模拟考试", "2027注册营养师", "注册营养师押题", "注册营养师在线做题"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "2027 注册营养师考试模拟卷（100 题）",
  about: "注册营养师水平评价考试",
  educationalLevel: "职业资格",
  numberOfQuestions: data.meta.total,
  dateModified: data.meta.updated,
  author: { "@type": "Organization", name: "彩虹刷题" },
};

export default function Page() {
  return (
    <main className="sec wrap mk-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mk-hero">
        <span className="kicker">2027 模拟卷</span>
        <h1>2027 注册营养师考试模拟题</h1>
        <p className="lede">
          {data.meta.total} 道单选题，考点按十年真题考频选出、题目全新命制。答一题看一题解析，做完出模拟分。
        </p>
        <p className="meta">
          更新于 {data.meta.updated} · 考试日期以官方通知为准 · 建议用时 {data.meta.minutes} 分钟
        </p>
      </div>

      <MockExam data={data} />

      <div className="card article mk-method">
        <h2>这套题是怎么出的</h2>
        <p>
          <strong>考点从数据里来。</strong>把 2017-2026 十年共 1850 道回忆版真题逐题标注考点后，按考查频次排序，越近的年份权重越大（每往前一年权重乘 0.7），再按四大模块在真题中的实际占比分配题量——最后落到 {data.meta.total} 题、89 个考点。其中「婴幼儿辅食」「慢性肾脏病营养治疗」「妊娠期糖尿病」「痛风」「常见细菌性食源性疾病」等近年反复出现的考点分到了案例题。
        </p>
        <p>
          <strong>另加 6 道新政题。</strong>新标准、新指南没有往年考频，按考频选不出来，但真题里新文件进卷很快：2026 年按 GB 28050—2025 考了营养声称，还考了当年发布的食品安全事故流行病学调查规范，2025 年考了当年发布的《中国食物与营养发展纲要（2025—2030 年）》两道。所以在各自模块内替换了 6 道考频最低的单题，换成营养标签与标签通则新版、婴幼儿谷类辅助食品、特殊医学用途配方食品、2026 年版食养指南和国民健康“十五五”规划，解析里标为“新政题”。更多新政考点见 <Link href="/guide/xinzheng-redian">2027 新政押题</Link>。
        </p>
        <p>
          <strong>题目是新的，不是原题。</strong>每道题依据考点内容与历年真题的考法重新命制，换角度、换场景、换数据，避免背答案；案例题沿用真实考试「一段背景配 3 问」的形式。
        </p>
        <p>
          <strong>能押中多少，先用往年验证。</strong>按考频选题的部分可以用同一套方法回测：只用前一年及以前的数据选题，去对下一年的真题。对 2024、2025、2026 三年真题，模拟卷中分别有 54%、59%、52% 的题目，其考点在当年真题中直接出现（三年平均约 55%）；按章节口径为 94%～98%。我们也试过更偏重近一两年的权重，回测命中率反而下降——每年都有不少考点是从更早的年份「回炉」的。考试每年从 800 多个考点中考到约 180～230 个（含次要考点），没有任何一套题能全部押中，把做错的考点补掉才是这套卷的用法。
        </p>
        <p>
          做完想系统补考点：<Link href="/guide/kaodian-shuju">考点分布数据</Link>列出了反复被考的核心考点，<Link href="/guide/zhenti-chongkao">真题重考率</Link>解释了为什么倒序刷近三年真题最划算，<Link href="/guide/xinzheng-redian">2027 新政押题</Link>补上新标准、新指南。
        </p>
        <p className="src-note">
          本卷为彩虹刷题自命题模拟题，非官方真题；考点统计基于考生回忆版真题（中国营养学会不公布官方真题），考试范围以官方考纲为准。分数仅用于自我估计，不构成任何合格判定。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
