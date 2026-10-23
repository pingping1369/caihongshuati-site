import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";

export const metadata: Metadata = {
  alternates: { canonical: "/guide/duibi" },
  title: "注册营养师和公共营养师的区别：一张表看懂怎么选",
  description:
    "注册营养师与公共营养师（三级）逐项对比：两者都由中国营养学会组织，学历门槛、工作年限、报名方式、考试次数与形式不同，帮你判断该考哪个。",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "注册营养师和公共营养师的区别：一张表看懂怎么选",
  dateModified: pageUpdates["/guide/duibi"],
  author: { "@type": "Organization", name: "彩虹刷题" },
};

export default function Page() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="card">
        <h1>注册营养师和公共营养师，考哪个？</h1>
        <p className="meta">更新于 {pageUpdates["/guide/duibi"]} · 客观对比，两证详情见各自指南页</p>

        <p>
          两个证书都由<strong>中国营养学会</strong>组织：注册营养师是水平评价类认证，公共营养师是职业能力评价，分四级、三级、二级。
          下面拿注册营养师和多数人报考的公共营养师三级对比。
        </p>

        <h2>逐项对比</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>维度</th>
                <th>注册营养师</th>
                <th>公共营养师（三级）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>证书</td>
                <td>注册营养师，注册有效期 5 年</td>
                <td>《公共营养师职业能力评价证书》，学会教育培训中心颁发</td>
              </tr>
              <tr>
                <td>学历门槛</td>
                <td>全日制本科及以上，须有学位证</td>
                <td>大专相关专业可直接报；非相关专业需三级培训结业；中专、高职或无学历需先有四级证</td>
              </tr>
              <tr>
                <td>工作年限</td>
                <td>相关专业毕业后满 1 年，非相关专业满 5 年</td>
                <td>大专及中专相关专业不要求（含应届）；无学历者四级证 + 2 年</td>
              </tr>
              <tr>
                <td>报名方式</td>
                <td>个人在注册营养师官网报名，需先完成规定学时</td>
                <td>经备案机构集体报名，不接受个人报名</td>
              </tr>
              <tr>
                <td>一年几次</td>
                <td>1–2 次</td>
                <td>4 次（3、6、9、12 月）</td>
              </tr>
              <tr>
                <td>考试形式</td>
                <td>线下机考，单选为主，历年约 200 题、180 分钟</td>
                <td>机考，理论知识 90 分钟 + 专业技能 60 分钟，单选和多选，两科均 60 分合格</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>怎么选</h2>
        <ul>
          <li>
            <strong>全日制本科、有学位证</strong>，打算做医院营养科等临床方向——看
            <Link href="/guide/zhuce">注册营养师报考指南</Link>；
          </li>
          <li>
            <strong>大专学历，或想先拿一个证入行</strong>——看
            <Link href="/guide/gongying">公共营养师报考指南</Link>，大专相关专业可以直接报三级；
          </li>
          <li>两个证分别报考，持有公共营养师证书不改变注册营养师的学历和年限要求。</li>
        </ul>

        <h2>考什么</h2>
        <p>
          注册营养师的考点分布见<Link href="/guide/kaodian-shuju">注册营养师考试重点</Link>；
          公共营养师三级的题型分值和内容分布见<Link href="/guide/gongying-kaoshenme">公共营养师三级考什么</Link>。
        </p>

        <h2>选好了就开始</h2>
        <p>
          注册营养师可以先<Link href="/questions">做几道真题样题</Link>，再看<Link href="/guide/beikao">备考规划</Link>；
          公共营养师三级可以先看<Link href="/guide/gongying-gaopin">三级高频考点</Link>。
        </p>

        <p className="src-note">
          注册营养师一栏见本站<Link href="/guide/zhuce">注册营养师报考指南</Link>；公共营养师一栏依据中国营养学会 2026 年度公共营养师职业能力评价考试通知的公开转载。整理时点 2026-10-23，以中国营养学会当年通知为准。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
