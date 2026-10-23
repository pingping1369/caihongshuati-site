import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import geo from "@/data/geo-stats.json";

/* 数据：主仓库 产品运营/官网/AI选题数据-20261023/stats.js 导出的 data/geo-stats.json。
   口径：考点重复＝本场题目的主考点在往届出现过；原题重复＝题干（及选项）规范化后与往届完全相同。 */

const pn = geo.pn;
const tested = pn.sessions.filter((s) => s.priorSessions > 0);
const last4 = tested.slice(-4);
const kpMin = Math.min(...last4.map((s) => s.kpRepeatPct as number));
const kpMax = Math.max(...last4.map((s) => s.kpRepeatPct as number));
const stemMaxPct = Math.max(...tested.map((s) => s.stemRepeatPct as number));
const fullMax = Math.max(...tested.map((s) => s.fullRepeat as number));
const win = (n: number | string) => pn.windowCover.find((w) => w.window === n)?.avgPct;

export const metadata: Metadata = {
  alternates: { canonical: "/guide/gongying-chongfulv" },
  title: "公共营养师真题重复率高吗？只背题库能过吗？12 场真题统计",
  description: `按 2024 年 3 月至 2026 年 9 月 12 场公共营养师三级全国统考回忆版真题 ${pn.totalQuestions} 道统计：近四场 ${kpMin}%—${kpMax}% 的题考的是往届考过的考点，但与往届完全相同的原题每场最多 ${fullMax} 道。重复的是考点，不是原题。`,
};

const faqs = [
  {
    q: "公共营养师真题重复率高吗？",
    a: `考点重复率高，原题重复率低。按 12 场公共营养师三级全国统考回忆版真题统计，近四场 ${kpMin}%—${kpMax}% 的题目考的是往届考过的考点；题干与往届相同的题每场不超过 ${stemMaxPct}%，题干和选项都完全相同的原题每场最多 ${fullMax} 道。`,
  },
  {
    q: "公共营养师只背题库能过吗？",
    a: "只背答案风险很大。往届原题在新一场里很少原样出现，同一个考点会换题干、换选项再考。题库的作用是帮你找到常考的考点并把它学会，做错时应回到考点和教材，而不是记住这道题选什么。",
  },
  {
    q: "公共营养师真题要刷几场？",
    a: `按近四场实测，只刷上一场能覆盖下一场约 ${win(1)}% 题目的考点，刷最近四场（一年）约 ${win(4)}%，最近八场（两年）约 ${win(8)}%，刷完全部往届约 ${win("all")}%。建议至少刷近两年八场，再按时间补更早的场次。`,
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
  headline: "公共营养师真题重复率高吗？只背题库能过吗？",
  dateModified: pageUpdates["/guide/gongying-chongfulv"],
  author: { "@type": "Organization", name: "彩虹刷题" },
  about: "公共营养师三级考试真题重复率统计",
};

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="card">
        <h1>公共营养师真题重复率高吗？只背题库能过吗？</h1>
        <p className="meta">
          更新于 {pageUpdates["/guide/gongying-chongfulv"]} · 基于 12 场中国营养学会公共营养师（三级）全国统考回忆版真题 {pn.totalQuestions} 道的逐题考点标注
        </p>

        <p>
          <strong>考点重复率高，原题重复率低。</strong>我们把 2024 年 3 月到 2026 年 9 月的 12 场三级统考回忆版真题逐题标注到考点后统计：
          近四场里，<strong>{kpMin}%—{kpMax}% 的题考的是往届考过的考点</strong>；但题干和选项都与往届完全相同的原题，
          <strong>每场最多 {fullMax} 道</strong>，只看题干相同的也不超过 {stemMaxPct}%。
        </p>
        <p>所以「背完一套题就稳」站不住。更有效的做法是用真题找到常考的考点，把考点学会。</p>

        <div className="bignum-row">
          <div className="bignum">
            <b>{kpMin}%—{kpMax}%</b>
            <span>近四场题目中，考点在往届考过的比例</span>
          </div>
          <div className="bignum">
            <b>≤ {fullMax} 道</b>
            <span>每场与往届题干、选项完全相同的原题</span>
          </div>
        </div>

        <h2>逐场数据</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>场次</th>
                <th>收录题量</th>
                <th>考点在往届考过</th>
                <th>题干与往届相同</th>
                <th>题干+选项完全相同</th>
              </tr>
            </thead>
            <tbody>
              {pn.sessions.map((s) => (
                <tr key={s.session}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    20{s.session.slice(0, 2)}.{s.session.slice(2)}
                    {s.session === "2608" ? " 补考" : ""}
                  </td>
                  <td>{s.n}</td>
                  <td>{s.priorSessions ? `${s.kpRepeatPct}%` : "—"}</td>
                  <td>{s.priorSessions ? `${s.stemRepeat} 道` : "—"}</td>
                  <td>{s.priorSessions ? `${s.fullRepeat} 道` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="chart-note">
          口径：每题按主考点计；「往届」指本场之前收录的所有场次，第一场无可比对象。题干、选项比较时去掉标点和空格。
          回忆版各家措辞不完全一致，原题重复可能被略微低估，但不会改变「考点多、原题少」的结论。前几场可比的往届少，考点重复率偏低属正常。
        </p>

        <h2>只刷最近几场够吗？</h2>
        <p>更实用的问题是：只刷最近 N 场，能覆盖下一场多少题目的考点。用最近四场分别当「下一场」实测取均值：</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>只刷最近</th>
                <th>覆盖下一场题目考点的比例</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1 场</td><td>{win(1)}%</td></tr>
              <tr><td>2 场</td><td>{win(2)}%</td></tr>
              <tr><td>4 场（约一年）</td><td>{win(4)}%</td></tr>
              <tr><td>8 场（约两年）</td><td>{win(8)}%</td></tr>
              <tr><td>全部往届</td><td>{win("all")}%</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          从一场到一年，覆盖率提升明显；刷到两年八场后，再往前加场次增加很少。时间有限时，先把近两年八场刷透，比只刷一两场可靠得多。
        </p>

        <h2>「重复率 89%」「几百道母题」怎么理解</h2>
        <p>
          网上常见的「重复率八九成」，和我们统计的<strong>考点</strong>重复率接近：大部分题确实在考往届考过的内容。
          但这不等于原题会再考一遍。同一个考点常换一种问法：换数据、换人群、换个角度问。
          如果所谓「母题」是按考点整理、讲清道理的题，刷它有用；如果只是记答案，遇到换问法的题就容易错。
        </p>

        <h2>怎么用真题备考</h2>
        <ol>
          <li><strong>先刷近两年八场</strong>，再按时间往前补；</li>
          <li><strong>做错时回到考点</strong>：看这一题考的是哪个知识点，把这块内容读懂，再做同一考点的其他真题；</li>
          <li>
            <strong>两本教材都要看</strong>：理论知识卷约七成分值出自《公共营养师（基础知识）》，三成出自《公共营养师（三级）》；
            专业技能卷反过来。详见<Link href="/guide/gongying-kaoshenme">三级考什么、题型分值</Link>；
          </li>
          <li>
            <strong>先学高频考点</strong>：12 场里出现过 6 场及以上的考点有 {pn.hiCover[0].kps} 个，覆盖了约 {pn.hiCover[0].questionPct}% 的题目，
            清单见<Link href="/guide/gongying-gaopin">三级高频考点</Link>。
          </li>
        </ol>

        <h2>本页数据从哪来</h2>
        <p>
          统计用的是彩虹刷题整理的 12 场公共营养师三级全国统考回忆版真题，每道题都人工校订并标注到对应考点。
          这些题也可以在小程序「<Link href="/gongying-tiku">彩虹刷题-公共营养师三级</Link>」里按场次刷，做题时能直接打开对应考点，并看到这个考点哪几场考过。
        </p>

        <p className="src-note">
          回忆版真题来自考后公开整理的资料，不是官方发布的试卷。统计日期 {geo.generated}，新一场真题收录后会更新。考试安排以中国营养学会及报名机构通知为准。
        </p>
      </div>
    </main>
  );
}
