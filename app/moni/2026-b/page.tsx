import type { Metadata } from "next";
import Link from "next/link";
import MockExam, { MockData } from "@/components/MockExam";
import WxCta from "@/components/WxCta";
import paper from "@/data/mock-2026-b.json";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://caihongshuati.com";

const data: MockData = {
  meta: {
    total: paper.questions.length,
    singles: paper.questions.length,
    cases: 0,
    updated: paper.version,
    examDate: "2026-09-13",
    minutes: 90,
  },
  questions: paper.questions.map((question, index) => ({
    n: index + 1,
    subj: question.module,
    kp: question.topic,
    chapter: question.module,
    years: (question.trend.match(/\d{4}/g) || []).map(Number),
    caseId: null,
    background: null,
    stem: question.stem,
    ops: question.options,
    ans: question.answer,
    why: question.explanation,
    diff: "medium" as const,
  })),
};

export const metadata: Metadata = {
  title: "2026 注册营养师预测卷 B｜100题逐题解析",
  description:
    "2026 注册营养师预测卷 B：根据 2017—2025 年历年真题、重点加权最近三年独立命题。100 道单选，答一道立即展示答案与解析，完成后生成模拟分数。",
  alternates: { canonical: "/moni/2026-b" },
  openGraph: {
    title: "2026 注册营养师预测卷 B",
    description: "100 道独立命题，逐题判题与解析，完成后生成模拟成绩。",
    url: `${SITE}/moni/2026-b`,
    type: "website",
  },
};

const quizJsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: paper.title,
  about: "注册营养师水平评价考试备考",
  educationalLevel: "专业资格考试备考",
  numberOfQuestions: paper.questions.length,
  dateModified: paper.version,
  isAccessibleForFree: true,
  provider: {
    "@type": "Organization",
    name: "彩虹题伴",
    url: SITE,
  },
};

export default function PredictionPaperBPage() {
  return (
    <main className="sec wrap mk-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
      />
      <div className="mk-hero">
        <span className="kicker">2026 预测卷 B</span>
        <h1>2026 注册营养师考试预测卷 B</h1>
        <p className="lede">
          {data.meta.total} 道单选题，按历年真题考频独立命制，最近三年权重最高。答一题看一题解析，做完出模拟分。
        </p>
        <p className="meta">
          更新于 {data.meta.updated} · 考试日 {data.meta.examDate} · 建议用时 {data.meta.minutes} 分钟
        </p>
      </div>

      <MockExam data={data} storageKey="caihong-moni-2026-b-v2" />

      <div className="card article mk-method">
        <h2>这套题是怎么出的</h2>
        <p>
          <strong>考点从历年数据里来。</strong>本卷基于 2017—2025 年现存题库的 1,659 道有效真题重新统计，重点加权 2023—2025 年考题，再按近三年模块比例分配为：个体和群体营养管理 40 题、食物与营养 39 题、公共营养和营养教育 16 题、餐饮管理 5 题。
        </p>
        <p>
          <strong>题目是独立命制的。</strong>同一考点会更换病例、数字和问法，训练的是知识迁移，不复刻真题句子；法规与指南题按现行版本复核，基础科学题保留跨年稳定知识。
        </p>
        <p>
          <strong>预测的是考点，不是假装知道原题。</strong>没有任何模拟卷能承诺命中率，模拟分只用于定位复习缺口。做完后可结合<Link href="/guide/kaodian-shuju">考点分布数据</Link>和<Link href="/guide/zhenti-chongkao">真题重考率</Link>安排下一轮复习。
        </p>
        <p className="src-note">
          本卷为彩虹题伴独立命题的预测练习，非官方真题，不进入小程序题库；考试范围以官方考纲为准，分数不构成任何合格判定。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
