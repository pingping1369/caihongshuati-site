# 彩虹题伴官网

微信小程序「彩虹题伴」（注册营养师真题图解题库）的官方网站。

- 线上：https://caihongshuati.com （www 和原 Vercel 域名重定向至主域）
- 仓库：https://github.com/pingping1369/caihongshuati-site

## 这个站是干嘛的

小程序在微信生态内是封闭的，百度和大多数 AI 助手抓不到。这个站是它在开放网络上的**可索引替身**：
产品介绍 + 报考指南支柱页 + 真题样题，目标是被百度收录、被 AI 助手引用，把搜索流量导进小程序。

增长专项的完整计划见主仓库 `注册营养师/增长专项/`。

## 技术栈

Next.js 15 App Router，全站 SSG（全部路由静态预渲染），Vercel 部署。
无数据库、无后端、无鉴权。当前发布使用 `vercel --prod --yes`；不要将 git push 当作已上线。

## 目录

```
app/            页面（首页/样题/指南/FAQ/关于/moni/2026 模拟卷 A、/moni/2026-b 预测卷 B + sitemap.ts + robots.ts）
components/     QuestionCard（可交互样题卡）、MockExam（模拟卷 A）、PredictionExamB（预测卷 B）、WxCta（转化区）
data/           site-data.json —— 题库规模与样题，由主仓库脚本导出
                mock-2026.json —— 2026 模拟卷 100 题（自命题，不在小程序题库内；考点按九年真题考频选出）
                mock-2026-b.json —— 预测卷 B 100 题（独立命题；最近三年加权；不进入小程序题库）
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

## 新页面收录与发布闸门

1. 新建页面时提供唯一标题、描述、H1 和 `metadata.alternates.canonical`（自身路径，不可都指向首页），并从相关页面添加普通 HTML 链接。
2. 在 `data/page-updates.json` 登记路径与真实内容更新时间。sitemap 从它生成，指南的 JSON-LD 与可见更新日期也读取它。只改样式/构建/规范 URL 不自动刷新内容日期；正文、统计或重要链接有实质更新才改。
3. `pnpm build` 自动检查路由遗漏、日期、规范 URL、可索引性、唯一标题、H1、JSON-LD 日期和首页可达性。构建失败不能部署。
4. `vercel --prod --yes`，再运行 `pnpm check:seo --base=https://caihongshuati.com`，必须检查生产域名，不提交预览地址。
5. 对本次新增/实质更新的页面提交，先 dry run，再加 `--submit`。无 URL 参数会选全站，只用于首次接入或确认的整站更新，不能每天重复推全站。

```bash
pnpm submit:indexnow --url=/guide/xinzheng-redian
pnpm submit:indexnow --url=/guide/xinzheng-redian --submit
# 百度 token 从站长后台读取，私下通过 BAIDU_PUSH_TOKEN 环境变量传入，禁止入库或打印。
pnpm submit:baidu --url=/guide/xinzheng-redian --submit
```

IndexNow 使用已部署的根目录验证文件；脚本先核验生产页面及 canonical，再发到 Bing 的 IndexNow 接口，由协议参与引擎共享。HTTP 200=已接收、202=接收待验证，不代表已索引。百度有每日配额，以返回的 success/remain 为准，不自动重试失败提交。

Google：在既有 GSC 资源重新提交更新的 sitemap，并对少量重点新页使用 URL 检查的“请求编入索引”。不要把普通内容页送 Google 的专用 Indexing API。Bing 也可重新提交 sitemap。每次把明确回执、URL 清单和未完成原因记录到主仓库 `增长专项/行动日志.md`；API token、账号 Cookie 不写入记录。

参考：[Google 请求重新抓取](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)、[IndexNow 协议](https://www.indexnow.org/documentation)。
