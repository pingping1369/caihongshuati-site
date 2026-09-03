import type { Metadata } from "next";
import Link from "next/link";
import PredictionExamB from "@/components/PredictionExamB";
import paper from "@/data/mock-2026-b.json";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://caihongshuati.com";

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
    <main className="pb-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
      />
      <div className="pb-wrap">
        <PredictionExamB questions={paper.questions} version={paper.version} />

        <section className="pb-method" aria-labelledby="pb-method-title">
          <p className="pb-overline">命题说明</p>
          <h2 id="pb-method-title">它预测的是考点，不是假装知道原题</h2>
          <div className="pb-method-grid">
            <p>
              题目从 2017—2025 年现存题库的 <strong>1,659 道有效真题</strong>重新统计，2023—2025 年
              588 道题权重最高。卷面按近三年模块比例取整：个体与群体营养管理 40 题、食物与营养 39 题、
              公共营养与营养教育 16 题、餐饮管理 5 题。
            </p>
            <p>
              同一考点可能换病例、数字和问法，所以本卷优先考迁移判断，不复刻真题句子。法规与指南题明确版本；
              基础科学题则保留跨年稳定知识。预测无法保证命中率，模拟分只用于定位复习缺口。
            </p>
          </div>
          <div className="pb-method-links">
            <Link href="/guide/kaodian-shuju">查看历年考点分布数据</Link>
            <Link href="/guide/zhenti-chongkao">理解真题考点重考率</Link>
            <a href="https://www.cnsoc.org/drpostand/" target="_blank" rel="noreferrer">
              中国居民 DRIs（2023版）↗
            </a>
            <a
              href="https://www.nhc.gov.cn/wjw/ylyjs/202412/b3d40e0141834897808ce6c9dce76a60.shtml"
              target="_blank"
              rel="noreferrer"
            >
              体重管理指导原则（2024年版）↗
            </a>
          </div>
          <p className="pb-method-date">独立命题与复核：2026-09-03 · 不进入小程序题库</p>
        </section>
      </div>
    </main>
  );
}
