import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";

export const metadata: Metadata = {
  title: "注册营养师和公共营养师的区别：一张表看懂怎么选",
  description:
    "注册营养师（CDR）与公共营养师（职业技能等级证书）逐项对比：学历门槛、考试难度、费用、认可度、适用人群，帮你判断该考哪个。",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "注册营养师和公共营养师的区别：一张表看懂怎么选",
  dateModified: "2026-08-22",
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
        <h1>注册营养师和公共营养师，考哪个？</h1>
        <p className="meta">更新于 2026-08-22 · 客观对比，两证详情见各自指南页</p>

        <p>
          这是营养师考证问题里被问得最多的一个。两个证不是同一体系：一个是行业学会的水平评价认证，一个是人社序列的职业技能等级证书。逐项对比如下。
        </p>

        <h2>逐项对比</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>维度</th>
                <th>注册营养师（CDR）</th>
                <th>公共营养师（技能等级）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>颁发方</td>
                <td>中国营养学会</td>
                <td>人社备案的第三方评价机构</td>
              </tr>
              <tr>
                <td>学历门槛</td>
                <td>本科 + 学位证（全日制）</td>
                <td>中专/高中起，门槛灵活</td>
              </tr>
              <tr>
                <td>工作年限</td>
                <td>相关专业 1 年 / 非相关 5 年</td>
                <td>四级最低 3 年相关工作或相关专业应届</td>
              </tr>
              <tr>
                <td>报名方式</td>
                <td>官网个人报名</td>
                <td>必须经评价/培训机构</td>
              </tr>
              <tr>
                <td>考试形式</td>
                <td>线下机考，单选为主</td>
                <td>线上机考，理论 + 技能两科</td>
              </tr>
              <tr>
                <td>难度</td>
                <td>高（医学味重，公开资料通过率约一到三成）</td>
                <td>中低（四级通过率较高）</td>
              </tr>
              <tr>
                <td>费用量级</td>
                <td>约千元级</td>
                <td>约 2000-5500 元（含培训，按等级）</td>
              </tr>
              <tr>
                <td>行业认可</td>
                <td>行业内最高，临床营养岗位门槛</td>
                <td>应用型岗位广泛认可，可申请技能补贴</td>
              </tr>
              <tr>
                <td>证书维护</td>
                <td>5 年注册期 + 继续教育学分</td>
                <td>一般无有效期要求</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>怎么选：三句话</h2>
        <ul>
          <li>
            <strong>有全日制本科（尤其医学/食品/营养相关）</strong>，想走临床营养、追求含金量——考
            <Link href="/guide/zhuce">注册营养师</Link>；
          </li>
          <li>
            <strong>学历不够本科、或想快速入行</strong>做膳食指导、社区健康、餐饮配餐——从
            <Link href="/guide/gongying">公共营养师四级</Link>考起；
          </li>
          <li>
            <strong>两个都够条件</strong>：认可度是硬差距，优先注册营养师；公共营养师可作为过渡或补充。
          </li>
        </ul>

        <div className="notice">
          注意：两证不互通——公共营养师证书不能直接「升级」成注册营养师，后者按自己的学历与从业年限要求重新报考。
        </div>

        <h2>选好了就开始</h2>
        <p>
          无论考哪个，营养学基础知识高度重合，真题都是最高效的抓手。
          <Link href="/questions">先做几道真题样题</Link>，或直接看
          <Link href="/guide/beikao">备考规划</Link>。
        </p>

        <p className="src-note">
          对比综合自两证官方渠道与公开资料，整理时点 2026-08-22。通过率为公开资料汇总口径，官方未发布统一数据，仅供参考。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
