import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import geo from "@/data/geo-stats.json";

/* 数据：geo-stats.json。高频＝主考点在 12 场中出现的场次数；只列考点名称与章节，不放考点正文。 */

const pn = geo.pn;
const [c6, c8, c10] = pn.hiCover;
const every = pn.topKps.filter((r) => r.sessions === pn.sessions.length);
const once = (pn.kpSessionHistogram as Record<string, number>)["1"];

export const metadata: Metadata = {
  alternates: { canonical: "/guide/gongying-gaopin" },
  title: "公共营养师三级高频考点有哪些？12 场真题统计的必考考点清单",
  description: `按 2024 年 3 月至 2026 年 9 月 12 场公共营养师三级全国统考回忆版真题统计：${c6.kps} 个考点在 6 场及以上出现，覆盖约 ${c6.questionPct}% 的题目；${every.map((r) => r.t).join("、")}场场都考。附完整清单与所在教材章节。`,
};

const faqs = [
  {
    q: "公共营养师三级必考考点有哪些？",
    a: `按 12 场真题统计，每场都考到的是${every.map((r) => `「${r.t}」`).join("")}；出现 10 场及以上的有 ${c10.kps} 个考点，出现 6 场及以上的有 ${c6.kps} 个，这 ${c6.kps} 个考点覆盖了约 ${c6.questionPct}% 的题目。`,
  },
  {
    q: "公共营养师三级重点先学哪些？",
    a: `先学 12 场里出现 6 场及以上的 ${c6.kps} 个考点，它们约占全部题目的 ${c6.questionPct}%；其中膳食结构分析与评价、24 小时回顾法场场都考，7 岁以下儿童生长评价、记账法等出现 10 场及以上，体格测量、孕期营养等也在半数以上场次出现。`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "公共营养师三级高频考点有哪些？12 场真题统计",
  dateModified: pageUpdates["/guide/gongying-gaopin"],
  author: { "@type": "Organization", name: "彩虹刷题" },
  about: "公共营养师三级考试高频考点统计",
};

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="card">
        <h1>公共营养师三级高频考点有哪些？</h1>
        <p className="meta">
          更新于 {pageUpdates["/guide/gongying-gaopin"]} · 基于 12 场中国营养学会公共营养师（三级）全国统考回忆版真题 {pn.totalQuestions} 道的逐题考点标注
        </p>

        <p>
          我们把 12 场真题的每道题都标注到考点上，统计每个考点出现在几场考试里。结论：
          <strong>{c6.kps} 个考点在 6 场及以上出现过，覆盖了约 {c6.questionPct}% 的题目</strong>；
          {every.map((r) => `「${r.t}」`).join("和")}<strong>场场都考</strong>。
        </p>

        <div className="bignum-row">
          <div className="bignum">
            <b>{c6.kps} 个</b>
            <span>出现 6 场及以上的考点，约占全部题目 {c6.questionPct}%</span>
          </div>
          <div className="bignum">
            <b>{c10.kps} 个</b>
            <span>出现 10 场及以上的考点，约占 {c10.questionPct}%</span>
          </div>
        </div>

        <h2>考点出现的集中程度</h2>
        <ul>
          <li>两本教材整理出的 {pn.totalKps} 个考点里，12 场真题考到过的有 {pn.kpsTested} 个；</li>
          <li>只考过 1 场的有 {once} 个，出现 8 场及以上的有 {c8.kps} 个（约占题目 {c8.questionPct}%）；</li>
          <li>题目明显向少数考点集中：先把高频考点学会，再扩展到其他考点，投入产出最高。</li>
        </ul>

        <h2>高频考点清单（出现 6 场及以上）</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>考点</th>
                <th>教材 · 章</th>
                <th>出现场次</th>
                <th>题数</th>
              </tr>
            </thead>
            <tbody>
              {pn.topKps.map((r) => (
                <tr key={r.id}>
                  <td>{r.t}</td>
                  <td>
                    《{r.book}》· {r.chapter}
                  </td>
                  <td>
                    {r.sessions} / {pn.sessions.length}
                  </td>
                  <td>{r.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="chart-note">
          口径：每题按主考点计；「出现场次」为该考点在 12 场（2024 年 3 月—2026 年 9 月，含 2026 年 8 月补考）中出现的场数，「题数」为这些场次里以它为主考点的题目总数。
          《基础知识》指《公共营养师（基础知识）》，《三级》指《公共营养师（三级）》。统计日期 {geo.generated}。
        </p>

        <h2>从清单里能看出什么</h2>
        <ul>
          <li>
            <strong>膳食调查是重中之重</strong>：24 小时回顾法、称重记账法、记账法、膳食结构分析、能量的营养素来源计算都在前列；
          </li>
          <li>
            <strong>人群营养年年考</strong>：孕期营养与体重监测、婴儿与学龄前儿童、乳母、老年人，基本每类人群都有考点进入清单；
          </li>
          <li>
            <strong>职业守则、营养教育、社区营养</strong>这类偏记忆的内容出现也很稳定。
          </li>
        </ul>

        <h2>怎么用这份清单</h2>
        <p>
          按清单顺序，每个考点先读教材对应章节，再做这个考点的历年真题。为什么不建议只背题，见
          <Link href="/guide/gongying-chongfulv">真题重复率统计</Link>；两科题型和分值见
          <Link href="/guide/gongying-kaoshenme">三级考什么</Link>。
        </p>
        <p>
          在小程序「<Link href="/gongying-tiku">彩虹刷题-公共营养师三级</Link>」的大纲页，可以按真题数筛选考点，点进考点看讲解、做这个考点的真题，并看到它哪几场考过。
        </p>

        <p className="src-note">回忆版真题来自考后公开整理的资料，不是官方发布的试卷。新一场真题收录后会更新统计。</p>
      </div>
    </main>
  );
}
