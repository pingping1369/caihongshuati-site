import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";

export const metadata: Metadata = {
  title: "注册营养师只剩 10 天怎么冲刺？数据版攻略，一文说清",
  description:
    "考前只剩 10 天的务实方案：先说清 10 天能做到什么、该放弃什么，再给一天一步的冲刺表。取舍全部基于 1735 道真题实测：只刷近三年能覆盖下一场约六成题的考点，46 个核心考点再补 26%。",
};

/* 数据口径同 /guide/kaodian-shuju、/guide/zhenti-chongkao：
   1735 道 2017-2025 回忆版真题 × 732 考点逐题标注（2026-09 统计）。
   冲刺页专用数字：近三年 593 题中 46 个核心考点覆盖 154 题=26.0%；近三年餐饮管理 31 题=5.2%。 */

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "注册营养师只剩 10 天怎么冲刺？数据版攻略",
  dateModified: "2026-09-03",
  author: { "@type": "Organization", name: "彩虹题伴" },
  about: "注册营养师考试考前10天冲刺计划",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "注册营养师只剩 10 天备考还来得及吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "从零开始来不及——这门考试知识面宽、医学味重，10 天学不完一轮。但如果此前看过书或有专业底子，10 天足够把「可预测的分」拿稳：按 2017-2025 真题实测，只刷考前最近三年的真题，就能覆盖下一场约六成题目的考点（近三场均值 61.8%）；再加上 46 个年年考核心考点（覆盖近三年 26% 的题）补老高频。冲刺的正确目标不是学完，而是把这部分高确定性的分守住。",
      },
    },
    {
      "@type": "Question",
      name: "冲刺期该刷哪几年真题？要刷完九年吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "不用刷完九年，也刷不完。按近三场考试实测：只刷前 1 年覆盖约 32% 的考点，前 3 年约 62%，前 5 年约 74%——3 年（约 590 题）是 10 天吃得下、覆盖又过六成的性价比拐点。刷的方式比数量重要：每道错题都要点开对应考点把整块知识补掉，而不是只对答案。有余力再往前扩 2021-2022。",
      },
    },
    {
      "@type": "Question",
      name: "考前 10 天最不该做什么？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "三件事：一是从头看书——教材一轮就要一个月，10 天摊薄等于什么都没记住；二是背题库答案——重复的是考点不是原题，问法一换就错；三是狂刷机构模拟题——模拟题的考点分布和真实命题差别很大，冲刺期的每一小时都该花在真题和真题背后的考点上。",
      },
    },
  ],
};

const PLAN = [
  {
    d: "第 1-2 天",
    t: "把 46 个「年年考」核心考点过一遍",
    body: "每天 23 个。这批考点覆盖了近三年 26% 的题，是全库确定性最高的资产。过的标准不是「眼熟」，是能合上资料复述出分类和数值。",
  },
  {
    d: "第 3-7 天",
    t: "倒序刷近三年真题：2025 → 2024 → 2023",
    body: "三年约 590 题，每天 120 题左右。核心动作：做错一道，点开它挂的考点，把整块补掉——错题是最值钱的信号，只对答案等于把信号扔了。",
  },
  {
    d: "第 8 天",
    t: "维生素 + 矿物质两章收口",
    body: "两章合计 187 题、约占总题量 11%，全是分类和数值，最适合考前集中记。把前几天这两章的错题重做一遍，数值表过最后一轮。",
  },
  {
    d: "第 9 天",
    t: "错题全量回炉 + 计算题专项",
    body: "近三年错题从头再做；能量需要量、DRIs 应用、食物成分换算这类计算题单独过——步骤熟了就是送分，不熟就是整段连环题崩掉。",
  },
  {
    d: "第 10 天",
    t: "一场全真模拟，然后停",
    body: "按考试节奏（约 200 题 / 180 分钟）完整做一场，练的是配速和体力，不是再学新东西。做完只看错题考点，晚上早睡——考场状态值好几分。",
  },
];

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="card">
        <h1>只剩 10 天：注册营养师冲刺攻略，一文说清</h1>
        <p className="meta">
          更新于 2026-09-03 · 取舍依据来自 1735 道回忆版真题 × 732 个考点的逐题标注统计
        </p>

        <p>
          先把话说实：<strong>10 天从零开始，来不及</strong>——这门考试知识面宽、医学味重，
          教材一轮就要一个月。但如果你此前看过书、或者本身有营养/医学底子，
          10 天足够做成一件事：<strong>把可预测的分拿稳</strong>。这份攻略不讲鸡汤，
          每一条取舍背后都是数字。
        </p>

        <h2>为什么 10 天有救：三个数字</h2>
        <div className="bignum-row">
          <div className="bignum">
            <b>61.8%</b>
            <span>只刷近三年真题，能覆盖下一场约六成题的考点（近三场考试实测均值）</span>
          </div>
          <div className="bignum">
            <b>26%</b>
            <span>46 个「年年考」核心考点，覆盖近三年题量的比例</span>
          </div>
          <div className="bignum">
            <b>5.2%</b>
            <span>餐饮管理模块近三年占比——可以战略性少投入</span>
          </div>
        </div>
        <p>
          注意口径：这里没有拿「九年全部积累」的覆盖率来撑场面——10 天刷不完九年。
          下面是按<strong>你实际刷得动的年数</strong>算的账（近三场考试实测均值）：
        </p>
        <div className="cbar">
          {[
            { label: "只刷前 1 年", v: 31.9, note: "约 200 题" },
            { label: "只刷前 3 年", v: 61.8, note: "约 590 题 ← 本方案" },
            { label: "只刷前 5 年", v: 74.3, note: "约 990 题" },
            { label: "九年全部", v: 80.9, note: "1735 题" },
          ].map((r) => (
            <div className="cbar-row" key={r.label}>
              <span className="cbar-label">{r.label}</span>
              <span className="cbar-track">
                <span
                  className="cbar-fill"
                  style={{
                    display: "block",
                    width: `${r.v}%`,
                    background: r.label === "只刷前 3 年" ? "#1188ff" : "#a9cfff",
                  }}
                />
              </span>
              <span className="cbar-val" style={{ flexBasis: 150 }}>
                {r.v}% · {r.note}
              </span>
            </div>
          ))}
        </div>
        <p className="chart-note">
          「覆盖」指当年题目的主考点在所刷年份里出现过；完整口径见
          <Link href="/guide/zhenti-chongkao">《真题重考率》</Link>。
        </p>
        <p>
          看出拐点了吗：<strong>3 年是 10 天吃得下的量（约 590 题），能锁定约六成考点</strong>；
          再往后每多刷两年只涨约 12 个点，题量却接近翻倍——时间不够时，三年就是性价比最高的选择。
          三年窗口照不到的老高频，靠第 1-2 天的 <strong>46 个核心考点名单</strong>补回来——
          它们是从九年数据里提炼的，不受窗口限制。
        </p>

        <h2>先定取舍：这四样直接放弃</h2>
        <ul>
          <li>
            <strong>从头看书。</strong>10 天摊一本教材，每页都只剩印象，等于什么都没记住。
            书只在补错题考点时翻。
          </li>
          <li>
            <strong>餐饮管理深挖。</strong>近三年只占 5.2%，把它压到最低优先级，
            真题带到多少算多少。
          </li>
          <li>
            <strong>长尾冷门考点。</strong>九年里只被考过一次的考点有 248 个，
            单个再考概率低，不主动追。
          </li>
          <li>
            <strong>机构模拟题海。</strong>模拟题的考点分布和真实命题差别很大——
            冲刺期每一小时都该花在真题上。
          </li>
        </ul>

        <h2>10 天日程表</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>时间</th>
                <th>做什么</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.map((p) => (
                <tr key={p.d}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <strong>{p.d}</strong>
                  </td>
                  <td>
                    <strong>{p.t}</strong>
                    <br />
                    {p.body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="segbar">
          <div style={{ width: "20%", background: "#1188ff", color: "#fff" }}>核心考点</div>
          <div style={{ width: "50%", background: "#07b095", color: "#fff" }}>近三年真题</div>
          <div style={{ width: "10%", background: "#f59e0b", color: "#fff" }}>两章收口</div>
          <div style={{ width: "10%", background: "#f85b2b", color: "#fff" }}>回炉</div>
          <div style={{ width: "10%", background: "#5b6982", color: "#fff" }}>模拟</div>
        </div>
        <p className="chart-note">
          10 天时间分配：一半时间给近三年真题——它是重考率最高、信号最密的材料。
        </p>

        <h2>冲刺期怎么刷题才不白刷</h2>
        <ul>
          <li>
            <strong>错题必须连考点一起补。</strong>做错说明这个考点没掌握——而下一场六成以上的题，就落在你正在刷的这批考点上。
            只记「这题选 C」，考场上换个问法照样错——重复的是考点，不是原题。
          </li>
          <li>
            <strong>先看图再抠字。</strong>营养学大量是分类、数值、流程，冲刺期没时间反复读大段文字，
            一张结构图先把框架立住，细节往框架里填，记得快忘得慢。
          </li>
          <li>
            <strong>新政题单独扫一遍。</strong>过去两年的新指南新标准几乎必考（历年如此），
            17 道按新政出的预测题半小时能做完，见<Link href="/guide/xinzheng-redian">《2026 新政押题》</Link>。
          </li>
          <li>
            <strong>高频考点名单在手边。</strong>46 个核心考点是哪些、各模块题量怎么分布，见
            <Link href="/guide/kaodian-shuju">《考点分布数据》</Link>，考前最后两天照着名单查漏。
          </li>
        </ul>

        <h2>用彩虹题伴执行这份计划</h2>
        <p>
          <strong>彩虹题伴</strong>是一个注册营养师备考的<strong>微信小程序</strong>
          （微信顶部搜索「彩虹题伴」即可打开，无需下载 App），这份计划里的每一步它都有现成工具：
          2017-2025 共 1735 道回忆版真题逐题带图解解析、<strong>每道题挂着它考的考点</strong>
          （错题点开就能连考点一起补）、732 个考点每个配一张白板图解（先看图再抠字）、
          填上考试日期自动排每日任务，<strong>时间紧还能压缩范围、移出冷门考点集中拿大分</strong>。
          目前限时免费。
        </p>
        <p>
          想先感受下，可以<Link href="/questions">在线做几道历年真题样题</Link>；时间充裕的备考路线看
          <Link href="/guide/beikao">备考规划方法</Link>。
        </p>

        <p className="src-note">
          统计口径：基于考生回忆版真题（中国营养学会不公布官方真题），题目与考点的对应为人工标注；
          「约 200 题 / 180 分钟」为历年公开口径，考试安排以官方通知为准。本页为备考方法整理，
          不构成通过承诺；知识基础因人而异，请按自身情况调整节奏。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
