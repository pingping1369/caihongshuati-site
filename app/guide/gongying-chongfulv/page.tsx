import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import geo from "@/data/geo-stats.json";
import sim from "@/data/pn-similar.json";
import { RepeatTrend, WindowBars } from "@/components/PnRepeatCharts";

/* 数据：
   - 考点重复、窗口覆盖：geo-stats.json（主仓库 产品运营/官网/AI选题数据-20261023/stats.js）；
   - 相似题：pn-similar.json（主仓库 公共营养师/相似题/similar-groups.json 经 similar-stats.js 统计）。
   口径：考点重复＝本场题目的主考点在往届出现过；相似题＝题干相同或近似且选项相同或相近（含正反问、答案不同、反过来问），由多个模型分别判定、单票人工复核。 */

const pn = geo.pn;
const tested = pn.sessions.filter((s) => s.priorSessions > 0);
const last4 = tested.slice(-4);
const kpMin = Math.min(...last4.map((s) => s.kpRepeatPct as number));
const kpMax = Math.max(...last4.map((s) => s.kpRepeatPct as number));
const simBy = Object.fromEntries(sim.sessions.map((s) => [s.session, s]));
const simLast4 = last4.map((s) => simBy[s.session]);
const simMin = Math.min(...simLast4.map((s) => s.vsAllPct as number));
const simMax = Math.max(...simLast4.map((s) => s.vsAllPct as number));
const p4Min = Math.min(...simLast4.map((s) => s.vsPrev4Pct as number));
const p4Max = Math.max(...simLast4.map((s) => s.vsPrev4Pct as number));
const win = (n: number | string) => pn.windowCover.find((w) => w.window === n)?.avgPct as number;
const short = (s: string) => `${s.slice(0, 2)}.${s.slice(2)}`;

export const metadata: Metadata = {
  alternates: { canonical: "/guide/gongying-chongfulv" },
  title: "公共营养师真题重复率高吗？要刷几场？12 场真题统计",
  description: `按 2024 年 3 月至 2026 年 9 月 12 场公共营养师三级全国统考回忆版真题 ${pn.totalQuestions} 道统计：近四场 ${kpMin}%—${kpMax}% 的题考的是往届考过的考点；全库 ${sim.wholeBank.pct}% 的题在其他场次有相似题，近四场每场 ${simMin}%—${simMax}% 的题在往届有相似题。`,
};

const faqs = [
  {
    q: "公共营养师真题重复率高吗？",
    a: `考点重复率很高，相似题有一定比例。按 12 场公共营养师三级全国统考回忆版真题统计，近四场 ${kpMin}%—${kpMax}% 的题考的是往届考过的考点；题干和选项相同或相近的相似题，全库约占 ${sim.wholeBank.pct}%，近四场每场有 ${simMin}%—${simMax}% 的题在往届出现过相似题。`,
  },
  {
    q: "公共营养师只刷近一年的真题够吗？",
    a: `考点覆盖还可以，相似题不够。只刷最近四场（约一年），能覆盖下一场约 ${win(4)}% 题目的考点；但近四场里，与前四场相似的题只有 ${p4Min}%—${p4Max}%，相似题更多来自更早的场次。建议把能找到的历年真题都刷一遍。`,
  },
  {
    q: "公共营养师真题要刷几场？",
    a: `只刷上一场能覆盖下一场约 ${win(1)}% 题目的考点，刷最近四场约 ${win(4)}%，最近八场约 ${win(8)}%，刷完全部往届约 ${win("all")}%。`,
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
  headline: "公共营养师真题重复率高吗？要刷几场？",
  dateModified: pageUpdates["/guide/gongying-chongfulv"],
  author: { "@type": "Organization", name: "彩虹刷题" },
  about: "公共营养师三级考试真题重复率统计",
};

const trend = tested.map((s) => ({
  label: short(s.session),
  kp: s.kpRepeatPct as number,
  sim: simBy[s.session].vsAllPct as number,
  simN: simBy[s.session].vsAll as number,
  n: s.n,
}));
const simLo = Math.min(...trend.slice(2).map((t) => t.sim)); // 2024 年 12 月起
const simHi = Math.max(...trend.slice(2).map((t) => t.sim));

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="card">
        <h1>公共营养师真题重复率高吗？要刷几场？</h1>
        <p className="meta">
          更新于 {pageUpdates["/guide/gongying-chongfulv"]} · 基于 12 场中国营养学会公共营养师（三级）全国统考回忆版真题 {pn.totalQuestions} 道的逐题标注
        </p>

        <p>
          <strong>考点重复率很高，相似题有一定比例。</strong>我们把 2024 年 3 月到 2026 年 9 月的 12 场三级统考回忆版真题逐题标注考点，并逐题比对题干和选项，统计出两个数：
        </p>
        <ul>
          <li>
            <strong>考点重复</strong>：近四场 {kpMin}%—{kpMax}% 的题，考的是往届考过的考点；
          </li>
          <li>
            <strong>相似题</strong>：题干和选项相同或相近的题，全库约占 {sim.wholeBank.pct}%；近四场每场有 {simMin}%—{simMax}% 的题在往届出现过相似题。
          </li>
        </ul>

        <div className="bignum-row">
          <div className="bignum">
            <b>{kpMin}%—{kpMax}%</b>
            <span>近四场题目中，考点在往届考过的比例</span>
          </div>
          <div className="bignum">
            <b>{sim.wholeBank.pct}%</b>
            <span>全库 {sim.wholeBank.total} 道题中，在其他场次有相似题的（{sim.wholeBank.questions} 道）</span>
          </div>
        </div>

        <h2>逐场变化</h2>
        <RepeatTrend
          points={trend}
          label={`逐场折线图：考点在往届考过的比例从 ${trend[0].kp}% 升到近四场的 ${kpMin}%—${kpMax}%；2024 年 12 月起在往届有相似题的比例在 ${simLo}%—${simHi}% 之间。`}
        />
        <p className="chart-note">
          每场都和它之前的所有场次比较。前几场可比较的往届少，比例偏低是正常的；从 2024 年底起，考点重复稳定在八成左右或以上；相似题各场在 {simLo}%—{simHi}% 之间起伏。
        </p>

        <h2>什么样的题算「相似题」</h2>
        <p>只看题干和选项，满足下面任意一条就算：</p>
        <ul>
          <li>题干相同或只是措辞不同，选项基本一致（顺序不同也算）；</li>
          <li>题干相同或近似，正确选项相同，干扰选项至少有一个相同或相近；</li>
          <li>题干、选项基本一致，但一题问「正确的是」、另一题问「错误的是」；</li>
          <li>同一个对应关系反过来问，例如「维生素 B2 缺乏的症状是」与「哪种维生素缺乏会引起口角炎」。</li>
        </ul>
        <p>
          例如 2024 年 3 月的「老年人的蛋白质代谢描述正确的是」和 2025 年 12 月的「老年人容易出现」，选项都是正氮平衡、负氮平衡、零氮平衡，算相似题；
          只考同一个知识点、但问的内容和选项都不同的题，不算。判定由多个模型分别完成，意见不一致的题逐对人工复核。
        </p>

        <h2>只刷近一年够吗？</h2>
        <p>
          看考点，近一年的真题覆盖面不错（见下图）；看相似题，就不够了。近四场里，在<strong>全部往届</strong>有相似题的占 {simMin}%—{simMax}%，
          但只和<strong>前四场</strong>比，只有 {p4Min}%—{p4Max}%。也就是说，近年再出现的相似题，更多来自一年以前的场次。
        </p>

        <h2>只刷最近几场，能覆盖多少考点</h2>
        <WindowBars
          rows={[
            { label: "最近 1 场", v: win(1) },
            { label: "最近 2 场", v: win(2) },
            { label: "最近 4 场", v: win(4) },
            { label: "最近 8 场", v: win(8) },
            { label: "全部往届", v: win("all") },
          ]}
        />
        <p className="chart-note">用最近四场分别当作「下一场」，计算它的题目考点在前 N 场出现过的比例，取四场平均。</p>
        <p>从一场到一年，覆盖率提升明显；刷到两年八场后，再往前加场次，考点覆盖增加很少，但还能多遇到一些相似题。</p>

        <h2>怎么用真题备考</h2>
        <ol>
          <li><strong>历年真题都刷一遍</strong>：近两年的重点刷，更早的场次也要看，相似题有不少来自一年以前；</li>
          <li><strong>做错时回到考点</strong>：多数题考的是老考点，但只有一部分是相似题，把考点学会，换了问法也能答；</li>
          <li>
            <strong>两本教材都要看</strong>：理论知识卷约七成分值出自《公共营养师（基础知识）》，专业技能卷约七成出自《公共营养师（三级）》，详见
            <Link href="/guide/gongying-kaoshenme">三级考什么、题型分值</Link>；
          </li>
          <li>
            <strong>先学高频考点</strong>：12 场里出现过 6 场及以上的考点有 {pn.hiCover[0].kps} 个，覆盖约 {pn.hiCover[0].questionPct}% 的题目，清单见
            <Link href="/guide/gongying-gaopin">三级高频考点</Link>。
          </li>
        </ol>

        <h2>逐场数据</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>场次</th>
                <th>题量</th>
                <th>考点往届考过</th>
                <th>往届有相似题</th>
                <th>前四场有相似题</th>
              </tr>
            </thead>
            <tbody>
              {pn.sessions.map((s) => {
                const m = simBy[s.session];
                return (
                  <tr key={s.session}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      20{short(s.session)}
                      {s.session === "2608" ? " 补考" : ""}
                    </td>
                    <td>{s.n}</td>
                    <td>{s.priorSessions ? `${s.kpRepeatPct}%` : "—"}</td>
                    <td>{m.vsAll === null ? "—" : `${m.vsAllPct}%`}</td>
                    <td>{m.vsPrev4 === null ? "—" : `${m.vsPrev4Pct}%`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="chart-note">
          「往届」指本场之前收录的所有场次；「前四场」只和紧挨着的前 4 场比。第一场无可比对象。考点按每题的主考点计。统计日期 {sim.generated}。
        </p>

        <h2>本页数据从哪来</h2>
        <p>
          统计用的是彩虹刷题整理的 12 场公共营养师三级全国统考回忆版真题，每道题都人工校订并标注到对应考点。
          这些题也可以在小程序「<Link href="/gongying-tiku">彩虹刷题-公共营养师三级</Link>」里按场次刷，做题时能直接打开对应考点，并看到这个考点哪几场考过。
        </p>

        <p className="src-note">
          回忆版真题来自考后公开整理的资料，不是官方发布的试卷；题库从 2024 年 3 月开始收录，更早的场次没有参与比较。新一场真题收录后会更新统计。
        </p>
      </div>
    </main>
  );
}
