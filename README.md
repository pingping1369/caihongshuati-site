# 彩虹题伴官网

微信小程序「彩虹题伴」（注册营养师真题图解题库）的官方网站。

- 线上：https://caihongshuati-site.vercel.app （自定义域名 caihongshuati.com 待绑定）
- 仓库：https://github.com/pingping1369/caihongshuati-site

## 这个站是干嘛的

小程序在微信生态内是封闭的，百度和大多数 AI 助手抓不到。这个站是它在开放网络上的**可索引替身**：
产品介绍 + 报考指南支柱页 + 真题样题，目标是被百度收录、被 AI 助手引用，把搜索流量导进小程序。

增长专项的完整计划见主仓库 `注册营养师/增长专项/`。

## 技术栈

Next.js 15 App Router，全站 SSG（13 路由全部静态预渲染，首载 JS ~106KB），Vercel 部署。
无数据库、无后端、无鉴权——纯内容站，改完 push 即自动部署。

## 目录

```
app/            页面（首页/样题/指南/FAQ/关于/moni/2026 模拟卷 + sitemap.ts + robots.ts）
components/     QuestionCard（可交互样题卡）、MockExam（模拟卷答题器，一题一屏、答一题看一题、做完出分）、WxCta（转化区）
data/           site-data.json —— 题库规模与样题，由主仓库脚本导出
                mock-2026.json —— 2026 模拟卷 100 题（自命题，不在小程序题库内；考点按九年真题考频选出）
public/img/     吉祥物、食材贴纸、产品截图（均来自主仓库 images/ 与 automation/screenshots/）
public/llms.txt AI 检索用的站点说明
```

## 内容红线

- **不放任何考点配图**：图解是核心资产，存在微信云存储，官网一律不引用；
- **不出现售卖**：定位免费信息服务，为个人 ICP 备案留门（个人备案不得经营性内容）；
- **报考信息标注更新日期**，且声明以官方发布为准——政策会变，过期比没有更伤信任；
- 不承诺通过率、不写「包过/必过」。

## 视觉

沿用小程序的「蓝田」设计语言（事实源：主仓库 `zhifa-miniprogram/DESIGN.md`）——
蓝底盘渐变、白卡大圆角软投影、卡标题蓝竖条、主蓝 #1188FF、墨蓝正文 #172445、数字用 Menlo。
产品截图用 Apple 式设备框包装，图文交替排布。

## 更新数据

题库规模或样题需要更新时，在主仓库 `zhifa-miniprogram/` 下重新导出 `data/site-data.json` 即可
（样题筛选规则：老年份、单选四项、无案例组、题干精炼、解析充实，且排除法规时效敏感题）。

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # 构建校验
```

## 环境变量（可选）

- `NEXT_PUBLIC_SITE_URL`：站点绝对地址，影响 sitemap/robots/OG（默认 https://caihongshuati.com）
- `NEXT_PUBLIC_GA_ID`：Google Analytics 4 衡量 ID，不填则不注入埋点
