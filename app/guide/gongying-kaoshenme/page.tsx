import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import geo from "@/data/geo-stats.json";

/* 考试规则：中国营养学会公共营养师（三级）职业能力评价全国统考（用户 2026-10-07 提供的计分规则，PN-miniprogram 按此计分）。
   分值分布：geo-stats.json，按题分×主考点所在教材章节。 */

const pn = geo.pn;
const sum = (f: (s: (typeof pn.sessions)[number]) => number) => pn.sessions.reduce((a, s) => a + f(s), 0);
const thSingle = sum((s) => s.theory.single), thMulti = sum((s) => s.theory.multi);
const skSingle = sum((s) => s.skill.single), skMulti = sum((s) => s.skill.multi);
const pctOf = (a: number, b: number) => Math.round((1000 * a) / b) / 10;
const short = (c: string) => c.replace("《公共营养师（基础知识）》", "《基础知识》").replace("《公共营养师（三级）》", "《三级》");
const bookPct = (rows: { book: string; pct: number }[], b: string) => rows.find((r) => r.book.includes(b))?.pct;

export const metadata: Metadata = {
  alternates: { canonical: "/guide/gongying-kaoshenme" },
  title: "公共营养师三级考什么？题型、题量、分值、及格线与考试内容分布",
  description:
    "中国营养学会公共营养师（三级）考理论知识、专业技能两科：理论 70 道单选（1 分）+15 道多选（2 分），技能 25 道案例小题每题 4 分，两科各 60 分及格，全场 150 分钟。附 12 场真题的教材章节分值分布。",
};

const faqs = [
  {
    q: "公共营养师三级考几科？题型是什么？",
    a: "考理论知识和专业技能两科，在同一场考试里一起作答，全场 150 分钟（参考分配理论 90 分钟、技能 60 分钟）。理论知识为 70 道单选（每题 1 分）+15 道多选（每题 2 分），共 100 分；专业技能为 25 道小题，分在 4—5 个案例里，每题 4 分，共 100 分，单选和多选都有。",
  },
  {
    q: "公共营养师三级多少分及格？",
    a: "两科分开计分，各 100 分，都达到 60 分才算通过。多选题错选、漏选都不得分。",
  },
  {
    q: "公共营养师三级考试内容出自哪本教材？",
    a: `按 12 场真题统计，理论知识卷约 ${bookPct(pn.chapters.theoryByBook, "基础知识")}% 的分值出自《公共营养师（基础知识）》，约 ${bookPct(pn.chapters.theoryByBook, "三级")}% 出自《公共营养师（三级）》；专业技能卷约 ${bookPct(pn.chapters.skillByBook, "三级")}% 出自《公共营养师（三级）》，约 ${bookPct(pn.chapters.skillByBook, "基础知识")}% 出自《基础知识》。两本都要学。`,
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
  headline: "公共营养师三级考什么？题型、题量、分值、及格线",
  dateModified: pageUpdates["/guide/gongying-kaoshenme"],
  author: { "@type": "Organization", name: "彩虹刷题" },
  about: "中国营养学会公共营养师三级考试题型与内容分布",
};

function ChapterTable({ rows }: { rows: { chapter: string; pct: number }[] }) {
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            <th>教材 · 章</th>
            <th>占本卷分值</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 10).map((r) => (
            <tr key={r.chapter}>
              <td>{short(r.chapter)}</td>
              <td>{r.pct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="card">
        <h1>公共营养师三级考什么？题型、题量、分值、及格线</h1>
        <p className="meta">
          更新于 {pageUpdates["/guide/gongying-kaoshenme"]} · 适用于中国营养学会公共营养师（三级）职业能力评价全国统考 · 内容分布基于 12 场回忆版真题
        </p>

        <p>
          <strong>考两科：理论知识和专业技能，同一场考试里一起作答，全场 150 分钟。</strong>
          两科各 100 分、分开计分，<strong>都达到 60 分才算通过</strong>。
        </p>

        <h2>题型、题量与分值</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>科目</th>
                <th>题型与题量</th>
                <th>分值</th>
                <th>参考用时</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>理论知识</td>
                <td>70 道单选 + 15 道多选</td>
                <td>单选每题 1 分，多选每题 2 分，共 100 分</td>
                <td>约 90 分钟</td>
              </tr>
              <tr>
                <td>专业技能</td>
                <td>25 道小题，分在 4—5 个案例里，单选、多选都有</td>
                <td>每题 4 分，共 100 分</td>
                <td>约 60 分钟</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>多选题错选、漏选都不得分，必须全对；</li>
          <li>150 分钟两科共用，时间分配不强制，最后一起提交；</li>
          <li>收录的场次中，个别场次理论卷为 60 道单选 + 20 道多选，同样合计 100 分。</li>
        </ul>

        <h2>两科有什么不同</h2>
        <p>
          按 12 场真题统计：理论知识卷多选题约占 {pctOf(thMulti, thSingle + thMulti)}%；专业技能卷多选题约占
          {" "}{pctOf(skMulti, skSingle + skMulti)}%，比理论卷高得多。技能卷每题 4 分，又以案例形式出现，一个案例里错几题，失分就很明显。
          技能卷里分值最多的一章是「{short(pn.chapters.skill[0].chapter)}」，约占 {pn.chapters.skill[0].pct}%，
          涉及膳食调查数据的计算和评价，需要动手算。
        </p>

        <h2>考试内容出自哪本教材</h2>
        <p>
          两科并不是一本书对一科。按题目分值统计：
        </p>
        <ul>
          <li>
            理论知识卷：约 <strong>{bookPct(pn.chapters.theoryByBook, "基础知识")}%</strong> 出自《公共营养师（基础知识）》，约
            {" "}<strong>{bookPct(pn.chapters.theoryByBook, "三级")}%</strong> 出自《公共营养师（三级）》；
          </li>
          <li>
            专业技能卷：约 <strong>{bookPct(pn.chapters.skillByBook, "三级")}%</strong> 出自《公共营养师（三级）》，约
            {" "}<strong>{bookPct(pn.chapters.skillByBook, "基础知识")}%</strong> 出自《基础知识》（多是孕妇、乳母、幼儿、老年人等人群营养和慢性病预防）。
          </li>
        </ul>
        <p>
          另外，题目常用到《中国居民膳食营养素参考摄入量（2023 版）》和《中国居民膳食指南（2022）》中的数值和建议，这两份资料与教材配合看。
        </p>

        <h3>理论知识卷：分值最多的 10 章</h3>
        <ChapterTable rows={pn.chapters.theory} />
        <h3>专业技能卷：分值最多的 10 章</h3>
        <ChapterTable rows={pn.chapters.skill} />
        <p className="chart-note">
          口径：每道题按主考点所在的教材章节计入，分值按题分（理论单选 1、多选 2，技能每题 4）。12 场回忆版真题，统计日期 {geo.generated}。
        </p>

        <h2>考试一年有几次</h2>
        <p>
          我们收录的近两年真题，考试安排在每年 3 月、6 月、9 月、12 月，2026 年 8 月另有一次补考。每场的具体日期、报名截止时间和报名方式，以中国营养学会及报名机构当年的通知为准。
        </p>

        <h2>怎么开始准备</h2>
        <ul>
          <li>先看<Link href="/guide/gongying-gaopin">三级高频考点</Link>，知道哪些内容几乎每场都考；</li>
          <li>再按场刷真题，做错的回到考点和教材补，详见<Link href="/guide/gongying-chongfulv">真题重复率与刷题场次</Link>；</li>
          <li>
            12 场真题可以在「<Link href="/gongying-tiku">彩虹刷题-公共营养师三级</Link>」小程序里按场刷，也能按两科同场模考，交卷后分科出分。
          </li>
        </ul>

        <p className="src-note">
          公共营养师另有人社部门备案机构组织的职业技能等级认定，命题和安排与本页不同，见<Link href="/guide/gongying">公共营养师报考指南</Link>。
          计分规则与考试安排如有调整，以中国营养学会当年通知为准。
        </p>
      </div>
    </main>
  );
}
