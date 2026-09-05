import pageUpdates from "@/data/page-updates.json";
import type { Metadata } from "next";
import Link from "next/link";
import WxCta from "@/components/WxCta";

export const metadata: Metadata = {
  alternates: { canonical: "/guide/zhuce" },
  title: "注册营养师报考指南：条件、时间、报名入口",
  description:
    "注册营养师（中国营养学会 CDR）报考条件、考试时间安排、报名方式与费用、证书注册与继续教育要求，信息更新于 2026 年 8 月，以官方通知为准。",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "注册营养师报考指南：条件、时间、报名入口",
  dateModified: pageUpdates["/guide/zhuce"],
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
        <h1>注册营养师报考指南</h1>
        <p className="meta">更新于 {pageUpdates["/guide/zhuce"]} · 报考政策以中国营养学会官方发布为准</p>

        <p>
          注册营养师（Registered Dietitian，简称 RD）是<strong>中国营养学会</strong>
          设立的水平评价类认证，是国内营养行业认可度最高的证书，医院营养科等临床岗位普遍以它为门槛。同体系还有一个门槛较低的
          <strong>注册营养技师</strong>（DTR）。
        </p>

        <h2>报考条件</h2>
        <p>
          <strong>注册营养师：</strong>本科及以上学历且<strong>必须有学位证</strong>——
        </p>
        <ul>
          <li>营养及相关专业（营养学、食品科学、医学等）：毕业后从业满 1 年；</li>
          <li>非相关专业：毕业后从业满 5 年；</li>
          <li>硕士、博士研究生：就读年限可计入从业年限；</li>
          <li>目前只认可全日制学历，网络教育、成人高考等暂不认定。</li>
        </ul>
        <p>
          <strong>注册营养技师：</strong>专科及以上学历即可报考，课程偏食品营养方向。取得后从事营养相关工作满
          5 年并完成规定课程学分，可再报注册营养师。
        </p>
        <div className="notice">
          报考条件每年可能微调（如相关专业目录、学时要求），报名前务必核对当年官方报考通知原文。
        </div>

        <h2>考试时间与形式</h2>
        <ul>
          <li>每年组织 1-2 次统一考试，具体日期见中国营养学会当年通知；</li>
          <li>形式为线下机考，以单项选择题为主，历年公开资料口径约 200 题、180 分钟（以当年考务通知为准）；</li>
          <li>2026 年的考试日期、报名截止时间与准考证安排，请核对中国营养学会当年官方通知；本页的通用报考信息不能替代年度通知。</li>
        </ul>

        <h2>报名方式与费用</h2>
        <ul>
          <li>
            报名入口为中国营养学会注册营养师官网{" "}
            <a href="https://www.crdietitian.org/" rel="nofollow noopener" target="_blank">
              crdietitian.org
            </a>
            ，个人可在线报名（这一点与公共营养师不同——后者必须通过机构）；
          </li>
          <li>报名前需按要求完成规定的课程学时；</li>
          <li>报名与培训整体费用大约在千元级，因课程渠道不同差异较大，以官方与授权课程方公示为准。</li>
        </ul>

        <h2>证书注册与继续教育</h2>
        <ul>
          <li>证书注册有效期 5 年；</li>
          <li>
            延续注册需要继续教育学分：注册营养师每周期不少于 50 学分，注册营养技师不少于 30
            学分，可通过课程、学术会议、培训等获得。
          </li>
        </ul>

        <h2>官方信息渠道</h2>
        <ul>
          <li>注册营养师官网：crdietitian.org（报名系统与官方 FAQ）</li>
          <li>中国营养学会：cnsoc.org</li>
          <li>中国营养学会教育培训：cnsedu.net</li>
        </ul>

        <h2>下一步</h2>
        <p>
          确认自己符合条件后，备考核心就是<strong>历年真题</strong>——题型、考点分布、出题习惯都在真题里。
          <Link href="/questions">先做几道真题样题</Link>感受难度，或看
          <Link href="/guide/beikao">备考规划指南</Link>。
        </p>

        <p className="src-note">
          本页信息综合自中国营养学会官网（crdietitian.org、cnsoc.org）及公开报考资料，整理时点
          2026-08-22。政策如有更新，以官方最新通知为准；发现过时信息欢迎在小程序内反馈。
        </p>
      </div>
      <WxCta />
    </main>
  );
}
