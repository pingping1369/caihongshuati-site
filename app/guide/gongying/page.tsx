import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";

/* 依据：中国营养学会《2026 年度公共营养师职业能力评价考试通知》的公开转载（广州本地宝 2026-10-21，环球网校引述考试形式与合格标准）；
   考试月份、两科结构与本站 12 场真题一致。学会官网 cnsedu.net 2026-10-23 无法访问，未能直接核对原文。 */

export const metadata: Metadata = {
  alternates: { canonical: "/guide/gongying" },
  title: "中国营养学会公共营养师报考指南：三级报考条件、报名方式、考试时间",
  description:
    "中国营养学会公共营养师职业能力评价（三级）报考指南：各级开考月份、三级报考条件、集体报名方式、考试形式与合格标准、证书与查询。依据 2026 年度考试通知整理。",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "中国营养学会公共营养师报考指南",
  dateModified: pageUpdates["/guide/gongying"],
  author: { "@type": "Organization", name: "彩虹刷题" },
  about: "中国营养学会公共营养师职业能力评价",
};

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="card">
        <h1>中国营养学会公共营养师报考指南</h1>
        <p className="meta">更新于 {pageUpdates["/guide/gongying"]} · 依据 2026 年度公共营养师职业能力评价考试通知整理，以中国营养学会当年通知为准</p>

        <p>
          本页说的公共营养师，是<strong>中国营养学会</strong>组织的公共营养师职业能力评价，通过后由中国营养学会教育培训中心颁发
          <strong>《公共营养师职业能力评价证书》</strong>。评价分四级、三级、二级，下面以多数人报考的<strong>三级</strong>为主。
        </p>

        <h2>一年考几次</h2>
        <p>每年 3 月、6 月、9 月、12 月各组织一次全国统考：</p>
        <ul>
          <li>3 月、9 月：二级、三级、四级（二级的综合评审时间与形式另行通知）；</li>
          <li>6 月、12 月：三级、四级。</li>
        </ul>

        <h2>三级报考条件</h2>
        <p>遵守法律法规、恪守职业道德、具有完全民事行为能力，并满足下面任意一条：</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>学历</th>
                <th>要求</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>大专及以上，相关专业</td>
                <td>可直接报考，含在校应届毕业生</td>
              </tr>
              <tr>
                <td>大专及以上，非相关专业</td>
                <td>完成规定学时的三级（高级工）正规培训，取得结业证书</td>
              </tr>
              <tr>
                <td>中专或高职，相关专业</td>
                <td>持公共营养师四级证书，含在校应届生</td>
              </tr>
              <tr>
                <td>无学历</td>
                <td>持公共营养师四级证书，加 2 年相关工作证明</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          四级：中专相关专业毕业可直接报考；无学历者需年满 18 周岁、有 3 年以上相关工作证明，并完成规定学时的四级正规培训、取得结业证书。
        </p>

        <h2>怎么报名</h2>
        <ul>
          <li>
            <strong>集体组织报名，不接受个人报名</strong>：通过中国营养学会备案的机构报名；
          </li>
          <li>需要提交电子版材料：一寸证件照、身份证件、毕业证，需要工作证明的另交工作证明；</li>
          <li>通知未列考试费用，报名费用由机构收取、各家不同，交费前问清包含哪些项目。</li>
        </ul>

        <h2>考试形式与合格标准</h2>
        <ul>
          <li>机考，两科同场：理论知识 90 分钟、专业技能 60 分钟，合计 150 分钟；</li>
          <li>两科各 100 分，题型为单项选择题和多项选择题；</li>
          <li>两科均达到 60 分及以上为合格；</li>
          <li>考点设在全国约 33 个城市，按报名情况调整，以准考证为准。</li>
        </ul>
        <p>
          两科各考多少题、每题几分、内容出自哪本教材，见
          <Link href="/guide/gongying-kaoshenme">公共营养师三级考什么</Link>。
        </p>

        <h2>证书与查询</h2>
        <p>
          证书为《公共营养师职业能力评价证书》，由中国营养学会教育培训中心颁发，可在中国营养学会教育培训中心的系统（cnsedu.net）查询。
        </p>

        <h2>备考</h2>
        <ul>
          <li>
            先看<Link href="/guide/gongying-gaopin">三级高频考点</Link>：12 场真题里，出现 6 场及以上的考点覆盖了近一半题目；
          </li>
          <li>
            再刷历年真题：近四场八成以上的题考的是往届考过的考点，详见<Link href="/guide/gongying-chongfulv">真题重复率</Link>；
          </li>
          <li>
            12 场真题可以在小程序「<Link href="/gongying-tiku">彩虹刷题-公共营养师三级</Link>」里按场刷、按两科同场模考。
          </li>
        </ul>

        <p className="src-note">
          本页依据中国营养学会 2026 年度公共营养师职业能力评价考试通知的公开转载整理，整理时点 2026-10-23。报考条件与安排每年可能调整，以中国营养学会及其教育培训中心（cnsedu.net）当年通知为准。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
