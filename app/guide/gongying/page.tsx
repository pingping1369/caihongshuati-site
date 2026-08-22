import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";

export const metadata: Metadata = {
  title: "公共营养师报考指南：等级、条件、费用与防坑",
  description:
    "公共营养师职业技能等级证书报考指南：证书性质、四级/三级/二级报考条件、报名方式与费用区间、真假证书辨别方法。更新于 2026 年 8 月。",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "公共营养师报考指南：等级、条件、费用与防坑",
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
        <h1>公共营养师报考指南</h1>
        <p className="meta">更新于 2026-08-22 · 以各地人社部门与评价机构官方发布为准</p>

        <p>
          公共营养师现在的形态是<strong>职业技能等级证书</strong>：2016 年国家统考取消后，改由人社部门备案的
          <strong>第三方评价机构</strong>组织认定。正规证书能在国家技能人才评价证书全国联网系统查到——这一条是辨别真假的硬标准。
        </p>

        <h2>等级划分</h2>
        <p>
          职业技能等级从五级到一级，目前普遍开放报考的是<strong>四级（中级工）、三级（高级工）、二级（技师）</strong>。零基础从四级考起。
        </p>

        <h2>各等级报考条件（常见口径）</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>等级</th>
                <th>常见报考条件（满足其一）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>四级</td>
                <td>高中/中专学历 + 3 年相关工作；或相关专业中专应届毕业生</td>
              </tr>
              <tr>
                <td>三级</td>
                <td>
                  持四级证 + 2 年相关工作；或大专及以上相关专业（含应届）；非相关专业需毕业证 + 2 年相关工作
                </td>
              </tr>
              <tr>
                <td>二级</td>
                <td>持三级证 + 相关工作 1-3 年（按专业相关性）；或持医师等资格满 3 年</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="notice">
          各评价机构执行口径存在差异（尤其是「相关职业」的认定范围），以你报名的评价机构公示条件为准。
        </div>

        <h2>报名方式与费用</h2>
        <ul>
          <li>
            <strong>不接受个人直接报名</strong>——必须通过人社备案的评价机构或其合作培训机构统一报考；
          </li>
          <li>
            总费用（培训+考试+证书）公开区间大致为：四级约 2000-3000 元、三级约 1800-3500 元、二级约
            3000-5500 元，因机构与课程差异较大；
          </li>
          <li>符合条件的持证人可按当地政策申请职业技能提升补贴。</li>
        </ul>

        <h2>考试形式</h2>
        <ul>
          <li>通常为线上机考，分「理论知识」与「专业技能」两科，均 60 分合格；</li>
          <li>内容侧重营养学基础、食物营养、膳食指导与配餐——相比注册营养师更重应用。</li>
        </ul>

        <h2>防坑清单</h2>
        <ul>
          <li>
            <strong>查得到才是真的</strong>：拿证后在国家技能人才评价证书联网查询系统（zscx.osta.org.cn /
            jndj.osta.org.cn）能查到，才是人社序列证书；
          </li>
          <li>宣传「免培训直接拿证」「包过」「内部通道」的，一律是骗局；</li>
          <li>报名前核实机构：有人社备案资质 + 办学许可证，在当地人社部门可查；</li>
          <li>ACI「国际注册营养师」等洋证书在国内不被认可，别花冤枉钱。</li>
        </ul>

        <h2>下一步</h2>
        <p>
          还在纠结考哪个证？看<Link href="/guide/duibi">注册营养师 vs 公共营养师对比</Link>。 决定报考了就从真题开始——
          <Link href="/questions">做几道样题</Link>感受一下。
        </p>

        <p className="src-note">
          本页信息综合自人社部技能人才评价系统、中国营养学会及公开报考资料，整理时点
          2026-08-22。各地执行细则不一，以当地人社部门与评价机构公示为准。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
