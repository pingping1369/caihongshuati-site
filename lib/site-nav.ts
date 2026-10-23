/* 全站信息架构的唯一来源：顶导航、页脚网站地图、面包屑、两个考试入口页都读这里。
   新增页面时登记到对应考试的分组；不属于任何一门考试的放 common。 */

export type NavPage = { href: string; label: string; desc: string };
export type NavGroup = { title: string; pages: NavPage[] };
export type NavExam = { key: "rd" | "pn"; name: string; hub: string; groups: NavGroup[] };

export const exams: NavExam[] = [
  {
    key: "rd",
    name: "注册营养师",
    hub: "/zhuce-yingyangshi",
    groups: [
      {
        title: "报考",
        pages: [{ href: "/guide/zhuce", label: "报考指南", desc: "报考条件、考试安排、报名入口与证书注册" }],
      },
      {
        title: "考什么",
        pages: [
          { href: "/guide/beikao", label: "考试内容与备考规划", desc: "科目题型、备考周期、复习方法" },
          { href: "/guide/kaodian-shuju", label: "考试重点与考点分布", desc: "1850 道真题逐题标注：模块占比、章节热度、高频考点" },
          { href: "/guide/zhenti-chongkao", label: "真题重考率", desc: "逐年统计：近年约八成的题考的是往年考过的考点" },
        ],
      },
      {
        title: "冲刺与押题",
        pages: [
          { href: "/guide/10tian-chongci", label: "考前 10 天冲刺", desc: "按考点数据取舍，附逐日冲刺表" },
          { href: "/guide/xinzheng-redian", label: "2027 新政押题", desc: "18 个新政考点，每个配一道原创预测题" },
        ],
      },
      {
        title: "在线练习",
        pages: [
          { href: "/questions", label: "真题样题", desc: "8 道历年真题在线试做，带解析" },
          { href: "/moni/2027", label: "2027 模拟卷", desc: "100 道原创模拟题，答一题看一题解析" },
        ],
      },
      {
        title: "刷题小程序",
        pages: [{ href: "/", label: "彩虹刷题-图解注册营养题库", desc: "2017-2026 年真题 1850 道、864 个图解考点" }],
      },
    ],
  },
  {
    key: "pn",
    name: "公共营养师",
    hub: "/gongying-yingyangshi",
    groups: [
      {
        title: "报考",
        pages: [{ href: "/guide/gongying", label: "报考指南", desc: "中国营养学会三级：报考条件、集体报名、一年四次、考试形式与证书" }],
      },
      {
        title: "考什么",
        pages: [
          { href: "/guide/gongying-kaoshenme", label: "三级考什么", desc: "两科题型、题量、分值、及格线与教材章节分布" },
          { href: "/guide/gongying-gaopin", label: "三级高频考点", desc: "12 场真题统计：61 个考点覆盖近一半题目" },
          { href: "/guide/gongying-chongfulv", label: "真题重复率", desc: "考点重复近九成，约三成题在其他场次有相似题" },
        ],
      },
      {
        title: "刷题小程序",
        pages: [{ href: "/gongying-tiku", label: "彩虹刷题-公共营养师三级", desc: "12 场真题 1304 道、435 个考点知识页" }],
      },
    ],
  },
];

export const common: NavPage[] = [
  { href: "/guide/duibi", label: "注册营养师和公共营养师怎么选", desc: "两个证书都由中国营养学会组织，门槛与考法逐项对比" },
  { href: "/guide/tiku-pingce", label: "刷题小程序怎么选", desc: "看五点：真题核对、答案准确、关联考点、看得懂、记得住" },
  { href: "/faq", label: "常见问题", desc: "产品与报考常见问题" },
  { href: "/about", label: "关于本站", desc: "本站与彩虹刷题的说明" },
];

/** 某个路径的面包屑：首页 › 考试入口页 › 当前页（不属于考试的页只有首页 › 当前页）。首页返回空。 */
export function crumbsFor(path: string): { href: string; label: string }[] {
  if (path === "/") return [];
  const home = { href: "/", label: "首页" };
  for (const ex of exams) {
    const hub = { href: ex.hub, label: ex.name };
    if (path === ex.hub) return [home, hub];
    for (const g of ex.groups)
      for (const p of g.pages) if (p.href === path && p.href !== "/") return [home, hub, { href: p.href, label: p.label }];
  }
  const c = common.find((p) => p.href === path);
  return c ? [home, { href: c.href, label: c.label }] : [];
}
