import type { Metadata } from "next";
import QuestionCard, { Sample } from "@/components/QuestionCard";
import WxCta from "@/components/WxCta";
import siteData from "@/data/site-data.json";

export const metadata: Metadata = {
  title: "注册营养师真题样题在线练习",
  description:
    "8 道注册营养师历年真题在线试做，覆盖食物与营养、个体和群体营养管理、公共营养和营养教育、餐饮管理四大模块，附解析节选。",
};

const samples = siteData.samples as Sample[];

export default function QuestionsPage() {
  return (
    <main>
      <section className="sec wrap">
        <div className="sec-h">
          <h2>真题样题体验</h2>
        </div>
        <p className="sec-sub">
          {samples.length} 道历年真题原题，覆盖四大模块。点选项作答，对错判色与解析节选和小程序一致——完整题库共{" "}
          {siteData.totalQuestions} 道（2017-2025）。
        </p>
        <div className="qgrid">
          {samples.map((q) => (
            <QuestionCard key={q.id} q={q} />
          ))}
        </div>
      </section>
      <WxCta />
    </main>
  );
}
