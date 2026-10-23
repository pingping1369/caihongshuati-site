import type { Metadata } from "next";
import ExamHub from "@/components/ExamHub";
import pageUpdates from "@/data/page-updates.json";
import siteData from "@/data/site-data.json";

export const metadata: Metadata = {
  alternates: { canonical: "/gongying-yingyangshi" },
  title: "公共营养师备考资料：报考指南、三级考什么、高频考点与真题重复率",
  description: `本站全部公共营养师页面汇总：等级与报考条件，中国营养学会公共营养师（三级）的题型分值与考试内容，基于 ${siteData.pn.sessions} 场 ${siteData.pn.totalQuestions} 道回忆版真题的高频考点与重复率统计，以及公共营养师三级刷题小程序。`,
};

export default function Page() {
  return (
    <ExamHub
      exam="pn"
      title="公共营养师备考资料"
      updated={pageUpdates["/gongying-yingyangshi"]}
      intro={`报考信息、三级考试内容，以及基于${siteData.pn.range} ${siteData.pn.sessions} 场 ${siteData.pn.totalQuestions} 道回忆版真题逐题标注的统计数据，都在这里。`}
    />
  );
}
