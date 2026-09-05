import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";

export const metadata: Metadata = {
  alternates: { canonical: "/guide/kaodian-shuju" },
  title: "注册营养师考点分布数据统计（2017-2025）：模块占比与高频考点",
  description:
    "基于 1735 道回忆版真题 × 732 个考点的逐题标注统计：四大模块题量占比、章节热度 TOP10、高频考点排行。46 个年年考的核心考点覆盖了 24% 的题目。",
};

/* 数据口径：彩虹题伴题库 2017-2025 回忆版真题 1735 道，逐题人工标注考点（2026-09-02 统计）。
   模块占比按题目所属科目；章节热度按主考点归属章节；高频考点按挂载题数（含次要挂载）。 */

const MODULES = [
  { name: "个体和群体营养管理", n: 772, pct: 44.5, color: "#07b095" },
  { name: "食物与营养", n: 609, pct: 35.1, color: "#1188ff" },
  { name: "公共营养和营养教育", n: 250, pct: 14.4, color: "#f59e0b" },
  { name: "餐饮管理", n: 104, pct: 6.0, color: "#f85b2b" },
];

const CHAPTERS = [
  { name: "维生素", mod: 1, n: 94 },
  { name: "矿物质", mod: 1, n: 93 },
  { name: "其他疾病的营养治疗", mod: 0, n: 75 },
  { name: "各类常见食物及营养特点", mod: 1, n: 73 },
  { name: "代谢性疾病膳食和营养治疗", mod: 0, n: 70 },
  { name: "生物化学", mod: 0, n: 62 },
  { name: "食品污染及其预防", mod: 1, n: 61 },
  { name: "孕妇与乳母", mod: 0, n: 57 },
  { name: "生理学", mod: 0, n: 52 },
  { name: "消化系统疾病营养治疗", mod: 0, n: 52 },
];

const TOP_KPS = [
  { t: "食物中毒", c: "食源性疾病及其预防", y: 8, n: 22 },
  { t: "慢性肾脏病分期与营养治疗", c: "泌尿系统疾病营养治疗", y: 7, n: 17 },
  { t: "植物化学物", c: "水与其他膳食成分", y: 9, n: 15 },
  { t: "食物营养测定方法", c: "食物的营养学评价", y: 8, n: 14 },
  { t: "婴幼儿辅食与进食", c: "婴幼儿", y: 7, n: 14 },
  { t: "膳食调查方法", c: "营养调查", y: 8, n: 13 },
  { t: "维生素A的功能与缺乏过量", c: "维生素", y: 7, n: 13 },
  { t: "维生素B1的功能、缺乏与评价", c: "维生素", y: 7, n: 12 },
  { t: "食品安全风险分析与控制", c: "食品安全风险评估", y: 6, n: 12 },
  { t: "痛风与高尿酸血症", c: "代谢性疾病膳食和营养治疗", y: 6, n: 12 },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "注册营养师考点分布数据统计（2017-2025）：模块占比与高频考点",
  dateModified: pageUpdates["/guide/kaodian-shuju"],
  author: { "@type": "Organization", name: "彩虹题伴" },
  about: "注册营养师考试考点分布与高频考点数据统计",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "注册营养师考试哪个模块题目最多？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "按 2017-2025 共 1735 道回忆版真题统计：个体和群体营养管理占 44.5%（题量最大，疾病营养治疗、生理生化都在这个模块），食物与营养占 35.1%，公共营养和营养教育占 14.4%，餐饮管理仅 6.0%。复习力气应优先花在前两个模块。",
      },
    },
    {
      "@type": "Question",
      name: "注册营养师考试的高频考点有哪些？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "9 年真题统计中，被 6 个及以上年份考过的核心考点共 46 个，覆盖了全部题目的 24%。排前面的有：食物中毒（8 年 22 题）、慢性肾脏病分期与营养治疗（7 年 17 题）、植物化学物（9 年全考、15 题）、食物营养测定方法、膳食调查方法、维生素A/维生素B1 等。",
      },
    },
    {
      "@type": "Question",
      name: "注册营养师考点分布每年变化大吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "模块结构相当稳定：四大模块的占比逐年只有小幅波动，且近三年 80.9% 的题目考的是往年考过的考点。变化主要出现在具体细分考点上，每年会有少量新考点进入，但核心考点池高度重复。",
      },
    },
  ],
};

function Bars({
  rows,
  max,
  unit,
}: {
  rows: { label: string; n: number; pct?: number; color: string }[];
  max: number;
  unit: string;
}) {
  return (
    <div className="cbar">
      {rows.map((r) => (
        <div className="cbar-row" key={r.label}>
          <span className="cbar-label">{r.label}</span>
          <span className="cbar-track">
            <span
              className="cbar-fill"
              style={{ display: "block", width: `${(100 * r.n) / max}%`, background: r.color }}
            />
          </span>
          <span className="cbar-val">
            {r.n} {unit}
            {r.pct != null ? ` · ${r.pct}%` : ""}
          </span>
        </div>
      ))}
    </div>
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
        <h1>注册营养师考点分布数据（2017-2025）：题都出在哪？</h1>
        <p className="meta">
          更新于 {pageUpdates["/guide/kaodian-shuju"]} · 基于彩虹题伴题库 1735 道回忆版真题 × 732 个考点的逐题标注统计
        </p>

        <p>
          备考最常见的迷茫是「书这么厚，力气往哪使」。网上的经验贴大多凭感觉；这一页用数据回答——
          我们把 <strong>2017-2025 九年、共 1735 道回忆版真题</strong>逐题人工标注到 732
          个考点上，然后统计每道题出自哪个模块、哪一章、哪个考点。以下是统计结果。
        </p>

        <h2>四大模块题量占比：近八成的题出自前两个模块</h2>
        <Bars
          rows={MODULES.map((m) => ({ label: m.name, n: m.n, pct: m.pct, color: m.color }))}
          max={772}
          unit="题"
        />
        <p className="chart-note">按题目所属科目统计，2017-2025 共 1735 题。</p>
        <p>
          <strong>个体和群体营养管理是第一大头（44.5%）</strong>——各类疾病的膳食营养治疗、生理学、生物化学、
          孕产妇婴幼儿等人群营养都归在这里；加上食物与营养（35.1%），
          <strong>两个模块合计约八成题量</strong>。餐饮管理只有 6%，投入应该和分值成比例。
        </p>

        <h2>章节热度 TOP10：维生素 + 矿物质就有 187 题</h2>
        <Bars
          rows={CHAPTERS.map((c) => ({
            label: c.name,
            n: c.n,
            color: MODULES[c.mod].color,
          }))}
          max={94}
          unit="题"
        />
        <p className="chart-note">
          按主考点归属章节统计（条形颜色对应上图模块）。完整章节数据不在此页展开。
        </p>
        <p>
          <strong>「维生素」和「矿物质」两章合计 187 题</strong>，接近九年总题量的 11%——每年稳定出
          20 题上下，是性价比最高的两章。疾病营养治疗类章节（代谢病、消化系统、肾病等）分散在多个章，
          加总后体量与之相当，但知识点更零碎。
        </p>

        <h2>考点被考的年份分布：46 个考点年年被翻牌</h2>
        <div className="segbar">
          <div style={{ width: "6.8%", background: "#1188ff", color: "#fff" }}>46</div>
          <div style={{ width: "17.8%", background: "#5fa9ff", color: "#fff" }}>120</div>
          <div style={{ width: "38.7%", background: "#a9cfff", color: "#173a63" }}>261</div>
          <div style={{ width: "36.7%", background: "#e3eefb", color: "#5b6982" }}>248</div>
        </div>
        <p className="seglegend">
          <span>
            <i style={{ background: "#1188ff" }} />被 6-9 个年份考过：46 个
          </span>
          <span>
            <i style={{ background: "#5fa9ff" }} />4-5 个年份：120 个
          </span>
          <span>
            <i style={{ background: "#a9cfff" }} />2-3 个年份：261 个
          </span>
          <span>
            <i style={{ background: "#e3eefb" }} />仅 1 个年份：248 个
          </span>
        </p>
        <div className="bignum-row">
          <div className="bignum">
            <b>675 / 732</b>
            <span>九年里被真题考过的考点数</span>
          </div>
          <div className="bignum">
            <b>24%</b>
            <span>46 个「年年考」核心考点覆盖的题量占比</span>
          </div>
        </div>
        <p>
          732 个考点里，<strong>675 个在九年真题中被考过</strong>。更值得注意的是头部集中度：
          被 6 个以上年份反复考的核心考点只有 46 个（约占考点总数的 6%），
          却覆盖了 <strong>24% 的题目</strong>。把这几十个考点吃透，等于锁定了约四分之一的题。
        </p>

        <h2>高频考点 TOP10（节选）</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>考点</th>
                <th>所在章</th>
                <th>被考年份数</th>
                <th>关联题数</th>
              </tr>
            </thead>
            <tbody>
              {TOP_KPS.map((k) => (
                <tr key={k.t}>
                  <td>
                    <strong>{k.t}</strong>
                  </td>
                  <td>{k.c}</td>
                  <td>{k.y} / 9 年</td>
                  <td>{k.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="chart-note">
          按关联题数排序，仅节选前 10 个；「植物化学物」是唯一一个九年全被考过的考点。
          完整高频榜单、以及每个考点具体挂着哪些真题，在彩虹题伴小程序内按大纲逐层可查。
        </p>

        <h2>这份数据怎么用</h2>
        <ul>
          <li>
            <strong>按占比分配复习时间</strong>：个体和群体营养管理 + 食物与营养 ≈ 八成题量，
            维生素、矿物质两章优先啃。
          </li>
          <li>
            <strong>先扫「年年考」名单</strong>：46 个核心考点覆盖约 1/4 的题，
            考前一个月先保证这批全会。
          </li>
          <li>
            <strong>配合重考率数据刷真题</strong>：近三年 80.9% 的题考的是往年考过的考点——
            为什么刷真题划算、从哪年刷起，见
            <Link href="/guide/zhenti-chongkao">《真题重考率数据》</Link>。
          </li>
          <li>
            <strong>时间只剩十天？</strong>直接按
            <Link href="/guide/10tian-chongci">《考前 10 天冲刺攻略》</Link>执行，
            取舍和日程都替你排好了。
          </li>
        </ul>

        <h2>彩虹题伴是什么</h2>
        <p>
          <strong>彩虹题伴</strong>是一个注册营养师备考的<strong>微信小程序</strong>
          （微信顶部搜索「彩虹题伴」即可打开，无需下载 App）：上面这份统计的底层数据——
          2017-2025 共 1735 道回忆版真题、732 个图解考点、每道题与考点的关联——全部在小程序内可用，
          并按考试日期和记忆曲线自动排每日刷题计划，<strong>目前限时免费</strong>。
        </p>
        <p>
          想先感受下，可以<Link href="/questions">在线做几道历年真题样题</Link>，或看
          <Link href="/guide/beikao">备考规划方法</Link>与<Link href="/guide/tiku-pingce">刷题工具怎么选</Link>。
        </p>

        <p className="src-note">
          统计口径：基于考生回忆版真题（中国营养学会不公布官方真题），题目与考点的对应关系为人工标注，
          存在少量编辑判断；比例为四舍五入。本页仅展示汇总统计与部分明细，完整数据以小程序内为准；
          考试范围以官方考纲为准。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
