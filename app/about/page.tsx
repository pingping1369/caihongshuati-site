import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于本站",
  description: "彩虹题伴官网：站点定位、内容方法与联系方式。",
};

export default function AboutPage() {
  return (
    <main className="sec wrap article" style={{ margin: "0 auto" }}>
      <div className="card">
        <h1>关于本站</h1>
        <p className="meta">caihongshuati.com · 彩虹题伴官方网站</p>
        <p>
          这里是微信小程序「彩虹题伴」的官网。小程序为注册营养师考试提供历年真题、图解考点与自动排期的刷题计划；本站提供产品介绍、
          <Link href="/questions">真题样题体验</Link>与
          <Link href="/guide/zhuce">报考信息整理</Link>。
        </p>
        <h2>内容方法</h2>
        <ul>
          <li>报考政策类内容综合官方渠道与公开资料整理，每页标注更新日期，官方通知一律优先于本站内容；</li>
          <li>真题与解析经人工校订，旧年份题目涉及标准更新的会对照现行标准订正；</li>
          <li>发现任何错误或过时信息，欢迎在小程序内的反馈入口告诉我们，会持续修正。</li>
        </ul>
        <h2>免责声明</h2>
        <p>
          本站为免费信息服务，不提供培训、代报名或任何付费服务，也不对报考结果作任何承诺。报考条件、考试安排等以中国营养学会及各地人社部门官方发布为准。
        </p>
      </div>
    </main>
  );
}
