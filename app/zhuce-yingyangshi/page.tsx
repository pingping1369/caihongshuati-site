import type { Metadata } from "next";
import ExamHub from "@/components/ExamHub";
import pageUpdates from "@/data/page-updates.json";
import siteData from "@/data/site-data.json";

export const metadata: Metadata = {
  alternates: { canonical: "/zhuce-yingyangshi" },
  title: "注册营养师备考资料：报考指南、考试重点、真题统计与在线练习",
  description: `本站全部注册营养师页面汇总：报考条件与时间，考试内容与备考规划，基于 2017-2026 年 ${siteData.totalQuestions} 道回忆版真题的考点分布与重考率统计，考前冲刺与新政押题，真题样题与 2027 模拟卷。`,
};

export default function Page() {
  return (
    <ExamHub
      exam="rd"
      title="注册营养师备考资料"
      updated={pageUpdates["/zhuce-yingyangshi"]}
      intro={`报考信息、考试内容，以及基于 2017-2026 年 ${siteData.totalQuestions} 道回忆版真题逐题标注的统计数据，都在这里。`}
    />
  );
}
