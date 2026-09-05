import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";
import siteData from "@/data/site-data.json";

export const metadata: Metadata = {
  alternates: { canonical: "/guide/beikao" },
  title: "营养师考试考什么？科目题型与备考规划",
  description:
    "注册营养师与公共营养师考试科目、题型说明，以及一套按记忆规律设计的备考方法：真题为纲、图解记忆、间隔重复、错题闭环。",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "营养师考试考什么？科目题型与备考规划",
  dateModified: pageUpdates["/guide/beikao"],
  author: { "@type": "Organization", name: "彩虹题伴" },
};

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="card">
        <h1>营养师考试考什么？怎么备考？</h1>
        <p className="meta">更新于 {pageUpdates["/guide/beikao"]} · 考务细节以当年官方考务通知为准</p>

        <h2>考什么</h2>
        <p>
          <strong>注册营养师</strong>：单场线下机考，单项选择题为主（历年公开口径约 200 题、180
          分钟）。内容覆盖营养学基础、食物营养、人群营养、临床营养、公共营养等，知识面广、医学味重，还有整段案例带出的连环题。
        </p>
        <p>
          <strong>公共营养师</strong>：线上机考，「理论知识」+「专业技能」两科，均 60
          分合格。侧重膳食指导、营养配餐、食品卫生等应用能力。
        </p>
        <p>
          从历年真题看，注册营养师考点集中在四大块：<strong>食物与营养、个体和群体营养管理、公共营养和营养教育、餐饮管理</strong>
          ——这也是彩虹题伴大纲的四大模块。
        </p>

        <h2>备考方法：四条经得起检验的原则</h2>
        <h3>1. 真题为纲</h3>
        <p>
          出题习惯、考点分布、数值考法全在真题里。教材是查证工具，真题才是复习地图——先做题暴露盲区，再回头补考点，效率远高于通读教材。
        </p>
        <h3>2. 图解记忆</h3>
        <p>
          营养学大量内容是分类、数值和流程（DRIs 各项指标、各类食物营养特点、代谢路径），纯文字背不牢。把结构画成一张图，记忆负担会明显下降——彩虹题伴把
          {siteData.totalKps} 个考点逐个画成了白板图解。
        </p>
        <h3>3. 间隔重复</h3>
        <p>
          今天会的题两周后一半会忘。对抗遗忘唯一可靠的办法是间隔复习：在将忘未忘的时间点重做。手工安排几乎不可能，交给算法排期即可——每天打开，该复习的自动出现。
        </p>
        <h3>4. 错题闭环</h3>
        <p>
          错题是你独有的复习清单。错过的题要在短间隔内重做到连续做对为止，尤其是「当时很确定却错了」的题——那是最危险的知识漏洞。
        </p>

        <h2>备考周期参考</h2>
        <ul>
          <li>公共营养师：普遍 2-3 个月；</li>
          <li>注册营养师：知识量大，建议 3-6 个月起，在职备考适当拉长；</li>
          <li>无论周期长短，最后 2-4 周留给模拟考与错题清算。</li>
        </ul>

        <h2>注册营养师复习资料与在线练习</h2>
        <ul>
          <li>确定复习重点：<Link href="/guide/kaodian-shuju">2017-2025 考点分布与高频考点</Link>。</li>
          <li>决定先刷哪年：<Link href="/guide/zhenti-chongkao">真题重考率与近三年覆盖率</Link>。</li>
          <li>考前查漏：<Link href="/guide/10tian-chongci">10 天冲刺安排</Link>、<Link href="/guide/xinzheng-redian">2026 新政预测题</Link>。</li>
          <li>整卷练习：<Link href="/moni/2026">模拟卷 A</Link>、<Link href="/moni/2026-b">预测卷 B</Link>（均为自命题，不是官方试卷）。</li>
        </ul>

        <h2>把方法变成日常</h2>
        <p>
          上面四条原则，正是彩虹题伴的产品设计：{siteData.totalQuestions} 道历年真题 +{" "}
          {siteData.totalKps} 个图解考点 + 记忆曲线自动排期 + 错题自动回炉。
          <Link href="/questions">先做几道样题</Link>，或微信搜「彩虹题伴」直接开始。
        </p>

        <p className="src-note">
          考务信息综合自官方渠道与公开资料，整理时点 2026-08-22；备考方法部分为基于记忆科学（测试效应、间隔效应）的通用建议。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
