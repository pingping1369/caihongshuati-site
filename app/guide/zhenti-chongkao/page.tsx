import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";

export const metadata: Metadata = {
  title: "注册营养师真题重考率有多高？2017-2025 数据：八成的题考老考点",
  description:
    "逐年统计 1735 道回忆版真题：当年题目的考点在往年考过的比例，从 2018 年的 33% 一路升到 2025 年的 86.5%，近三年合计 80.9%。刷真题为什么划算、从哪年刷起，用数据说话。",
};

/* 口径：当年题目的主考点在往年真题中作为主考点出现过，即计为「重考」。
   分母为已完成考点标注的 1720 题（15 题标注迁移中未计入）。2017 为起始年无往年可比，不列。 */

const RATES = [
  { y: "2018", v: 33.3 },
  { y: "2019", v: 50.5 },
  { y: "2020", v: 53.3 },
  { y: "2021", v: 70.4 },
  { y: "2022", v: 73.0 },
  { y: "2023", v: 74.9 },
  { y: "2024", v: 81.2 },
  { y: "2025", v: 86.5 },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "注册营养师真题重考率有多高？2017-2025 数据",
  dateModified: "2026-09-02",
  author: { "@type": "Organization", name: "彩虹题伴" },
  about: "注册营养师考试真题重考率统计与刷题策略",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "注册营养师考试刷历年真题有用吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "有用，且可以量化：按 2017-2025 回忆版真题逐题统计，近三年（2023-2025）80.9% 的题目，其考点在往年真题中考过；2025 年这一比例达到 86.5%。命题围绕一个相对固定的核心考点池反复出题，刷真题本质上是在提前遍历这个池子。",
      },
    },
    {
      "@type": "Question",
      name: "考过的原题还会原样再考吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "很少。重复的是「考点」而不是「原题」——同一个考点每年会换题干、换问法、换选项再考。所以背题库答案没用，换个问法就错；有效的做法是通过真题把考点本身理解透，做错时回到考点把这一块补全。",
      },
    },
    {
      "@type": "Question",
      name: "注册营养师真题应该从哪年开始刷？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "建议倒序：先把最近三年（2023-2025）刷透——按近三场考试实测，只刷前三年能覆盖下一场约 62% 题目的考点，前五年约 74%，九年全部约 81%，边际递减明显；再往前扩展到 2020-2022，更早年份查漏补缺。做错的题不要只对答案，顺着题目挂载的考点把整块知识补掉，效率最高。",
      },
    },
  ],
};

function RateChart() {
  const W = 720;
  const H = 250;
  const baseY = 212;
  const scale = 1.7; // 100% -> 170px
  const colW = 44;
  const gap = (W - 60 - RATES.length * colW) / (RATES.length - 1);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto", display: "block", margin: "18px 0 4px" }}
      role="img"
      aria-label="2018 至 2025 年逐年重考率柱状图，从 33.3% 升至 86.5%"
    >
      {[25, 50, 75].map((g) => (
        <g key={g}>
          <line
            x1={40}
            x2={W - 10}
            y1={baseY - g * scale}
            y2={baseY - g * scale}
            stroke="#e8edf6"
            strokeDasharray="4 4"
          />
          <text x={34} y={baseY - g * scale + 4} fontSize="11" fill="#8a93a8" textAnchor="end">
            {g}%
          </text>
        </g>
      ))}
      {RATES.map((r, i) => {
        const x = 50 + i * (colW + gap);
        const h = r.v * scale;
        const last = i === RATES.length - 1;
        return (
          <g key={r.y}>
            <rect
              x={x}
              y={baseY - h}
              width={colW}
              height={h}
              rx={6}
              fill={last ? "#087efd" : "#1188ff"}
              opacity={last ? 1 : 0.82}
            />
            <text
              x={x + colW / 2}
              y={baseY - h - 8}
              fontSize="13"
              fontWeight={last ? 700 : 600}
              fill="#172445"
              textAnchor="middle"
            >
              {r.v}%
            </text>
            <text x={x + colW / 2} y={baseY + 20} fontSize="12" fill="#8a93a8" textAnchor="middle">
              {r.y}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

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
        <h1>注册营养师真题重考率：八成的题，考的是老考点</h1>
        <p className="meta">
          更新于 2026-09-02 · 基于彩虹题伴题库 2017-2025 共 1735 道回忆版真题的逐题考点标注
        </p>

        <p>
          「刷真题到底有没有用」是每届考生都会问的问题。经验贴的回答通常是「有用，信我」；
          这一页给出可复算的数字。我们把九年回忆版真题逐题标注考点后，统计了一个指标——
          <strong>重考率：当年题目的考点，在往年真题里被考过的比例</strong>。
        </p>

        <h2>逐年重考率：一路爬到 86.5%</h2>
        <RateChart />
        <p className="chart-note">
          口径：当年题目的主考点在往年真题中出现过即计为重考；2017 为起始年无往年可比，不列。
          早期年份偏低有统计原因——可对比的「往年」还很少。
        </p>
        <div className="bignum-row">
          <div className="bignum">
            <b>80.9%</b>
            <span>近三年（2023-2025）合计：592 题中 479 题考的是往年考过的考点</span>
          </div>
          <div className="bignum">
            <b>86.5%</b>
            <span>2025 年单年重考率，九年最高</span>
          </div>
        </div>
        <p>
          趋势非常清楚：随着年份累积，<strong>命题越来越难跳出既有的核心考点池</strong>。
          对备考者这意味着：手上有九年真题，等于提前看过了下一场考试约八成题目要考的考点。
        </p>

        <h2>但要先说清：重复的是考点，不是原题</h2>
        <p>
          这 80.9% <strong>不是「原题重复率」</strong>。同一个考点每年会换题干、换场景、换问法再考——
          比如同样考「慢性肾脏病的营养治疗」，今年问蛋白质摄入量的计算，明年改成给个病例问膳食方案。
          所以<strong>背题库答案没有用，换个问法就懵</strong>；真题的正确用法是把每道题背后的考点理解透。
          这也是为什么只给答案不讲考点的题库，刷完提升有限。
        </p>

        <h2>那要刷几年才够？窗口覆盖率</h2>
        <p>
          上面的 80.9% 是「手上有九年全部真题」时的上限。多数人刷不完九年——
          所以更实用的问题是：<strong>只刷最近 N 年，能覆盖下一场多少考点</strong>？
          按近三场考试（2023-2025）实测：
        </p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>只刷最近</th>
                <th>覆盖下一场考点的比例（近三场均值）</th>
                <th>大致题量</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1 年</td><td>31.9%</td><td>约 200 题</td></tr>
              <tr><td><strong>3 年</strong></td><td><strong>61.8%</strong>（单年 55.9%~65%）</td><td>约 590 题</td></tr>
              <tr><td>5 年</td><td>74.3%</td><td>约 990 题</td></tr>
              <tr><td>9 年全部</td><td>80.9%</td><td>1735 题</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          边际递减很明显：<strong>3 年之后，每多刷两年只多覆盖约 6-12 个百分点，题量却翻着涨</strong>。
          时间充裕就往前多刷；时间紧，三年是性价比拐点，缺口用高频考点名单补。
        </p>

        <h2>数据推出来的刷题策略</h2>
        <ul>
          <li>
            <strong>倒序刷：近三年优先。</strong>只刷 2023-2025 就能覆盖下一场约六成题的考点（61.8%），
            先刷透，再往前扩到 2020-2022，更早年份查漏补缺。
          </li>
          <li>
            <strong>错题要连考点一起补。</strong>做错一道，说明这个考点没掌握——而下一场八成的题就落在往年考过的这批考点上。
            只对答案是把最值钱的信号扔掉了。
          </li>
          <li>
            <strong>高频考点单独过一遍。</strong>46 个「年年考」核心考点覆盖了 24% 的题量，
            名单和分布见<Link href="/guide/kaodian-shuju">《考点分布数据统计》</Link>。
          </li>
          <li>
            <strong>只剩十天的极限情况</strong>，按
            <Link href="/guide/10tian-chongci">《考前 10 天冲刺攻略》</Link>的日程直接执行。
          </li>
        </ul>

        <h2>彩虹题伴是什么</h2>
        <p>
          <strong>彩虹题伴</strong>是一个注册营养师备考的<strong>微信小程序</strong>
          （微信顶部搜索「彩虹题伴」即可打开，无需下载 App）。本页统计的底层数据全部在小程序内：
          2017-2025 共 1735 道回忆版真题逐题带解析和图解，<strong>每道题挂着它考的考点</strong>——
          做错一道，点开考点连整块知识一起吃透；复习计划按记忆曲线自动排期，<strong>目前限时免费</strong>。
        </p>
        <p>
          想先感受下，可以<Link href="/questions">在线做几道历年真题样题</Link>，或看
          <Link href="/guide/kaodian-shuju">考点分布数据</Link>与
          <Link href="/guide/beikao">备考规划方法</Link>。
        </p>

        <p className="src-note">
          统计口径：基于考生回忆版真题（中国营养学会不公布官方真题），重考率按已完成考点标注的 1720
          题计算（15 题标注迁移中未计入）；题目与考点的对应为人工标注，存在少量编辑判断。
          本页仅展示汇总统计，完整数据以小程序内为准；考试范围以官方考纲为准。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
