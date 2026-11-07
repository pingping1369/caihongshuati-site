import Link from "next/link";
import QuestionCard, { Sample } from "@/components/QuestionCard";
import WxCta from "@/components/WxCta";
import siteData from "@/data/site-data.json";
import { exams } from "@/lib/site-nav";

export const metadata = { alternates: { canonical: "/" } };

const samples = siteData.samples as Sample[];

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* 英雄区：用途 + 三种刷法，口径同 产品运营/产品资料/产品价值与特色清单.md */}
      <section className="wrap hero">
        <div>
          <h1>
            会刷真题，<br />
            <span className="hl">事半功倍</span>
          </h1>
          <p className="lede">
            彩虹刷题是注册营养师备考的微信小程序，收录近十年注册营养师真题，每道题都关联考点并配有图解。设好目标分数，就能每天自动安排要刷的题和要复习的内容；也可以在大纲页挑常考的考点先刷，或按年份整卷模考。
          </p>
          <div className="stats">
            <div className="stat">
              <b className="num">{siteData.totalQuestions}</b>
              <span>历年真题</span>
            </div>
            <div className="stat">
              <b className="num">{siteData.totalKps}</b>
              <span>图解考点</span>
            </div>
            <div className="stat">
              <b className="num">2017-2026</b>
              <span>覆盖年份</span>
            </div>
          </div>
          <div className="cta-row">
            <a className="btn" href="#try">先做两道题试试 ›</a>
            <Link className="btn ghost" href="/guide/zhuce">
              报考指南
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <img className="mascot" src="/img/mascot.png" alt="彩虹刷题吉祥物：彩虹小人" />
          <img className="sticker s1" src="/img/food-broccoli.png" alt="" />
          <img className="sticker s2" src="/img/food-carrot.png" alt="" />
          <img className="sticker s3" src="/img/food-milk.png" alt="" />
          <img className="sticker s4" src="/img/food-tomato.png" alt="" />
        </div>
      </section>

      {/* 三种刷题方式 */}
      <section className="sec wrap">
        <div className="sec-h">
          <h2>三种刷题方式</h2>
        </div>
        <p className="sec-sub">
          彩虹刷题收录 2017—2026 年注册营养师考试真题（考生回忆版），逐题人工校订并配有解析。围绕这十年真题，有三种练习方式，按自己的备考需要选。
        </p>
        <div className="guide-links three">
          <div className="guide-link static">
            <b>智能刷题</b>
            <span>设好目标分数，优先刷高频考点的真题。每天刷什么、学过的什么时候复习，都自动安排。</span>
          </div>
          <div className="guide-link static">
            <b>按大纲刷真题</b>
            <span>所有真题都关联到考试大纲的考点。在大纲页按真题数量筛选，先练真题多的高频考点。</span>
          </div>
          <div className="guide-link static">
            <b>真题模拟考试</b>
            <span>选择 2017—2026 年的真题试卷模拟考试，交卷后回看答卷、成绩和错题。</span>
          </div>
        </div>
      </section>

      {/* 产品特色：图文交替 + 设备框 */}
      <section className="sec wrap">
        <div className="sec-h">
          <h2>彩虹刷题的特色</h2>
        </div>

        <div className="feat">
          <div className="feat-txt">
            <span className="kicker">智能刷题</span>
            <h3>
              每天刷什么、什么时候复习，<em>自动安排</em>
            </h3>
            <p>
              根据目标分数，优先选择高频考点及对应真题，再结合考试日期、考点掌握情况和遗忘曲线安排每日任务，让学习与复习衔接起来，帮助记牢学过的知识。
            </p>
            <ul className="feat-points">
              <li>按遗忘曲线安排复习，快忘的考点自动回来</li>
              <li>小程序随时打开就刷，零碎时间也能学</li>
            </ul>
          </div>
          <div className="feat-img">
            <Phone src="/img/screens/03-home.png" alt="彩虹刷题首页：今日自动安排的刷题与复习任务" />
          </div>
        </div>

        <div className="feat rev">
          <div className="feat-txt">
            <span className="kicker amber">按大纲刷真题</span>
            <h3>
              先练<em>真题多的高频考点</em>
            </h3>
            <p>
              每道真题都关联到考试大纲的考点。在大纲页按关联真题数量筛选，优先练习真题最多的高频考点，再按需要扩展到其他考点。
            </p>
          </div>
          <div className="feat-img">
            <Phone src="/img/screens/13-graph-l1.png" alt="彩虹刷题大纲页：按模块、章节、考点逐层查看" />
          </div>
        </div>

        <div className="feat">
          <div className="feat-txt">
            <span className="kicker green">题目全部关联考点</span>
            <h3>
              不只记答案，<em>弄懂题目背后的知识</em>
            </h3>
            <p>
              刷题时可以直接打开对应考点，查阅相关知识、概念区别和适用条件，再练这个考点的其他真题，帮助理解、记忆和举一反三。
            </p>
          </div>
          <div className="feat-img">
            <Phone src="/img/screens/15-wiki.png" alt="彩虹刷题考点页：考点讲解与练习这个考点的真题" />
          </div>
        </div>

        <div className="feat rev">
          <div className="feat-txt">
            <span className="kicker orange">图解</span>
            <h3>
              真题解析和考点都有图解，<em>看起来更轻松</em>
            </h3>
            <p>
              所有真题解析和考点讲解都配有图解，把题目的判断依据、容易混淆的概念和必要的计算步骤直观呈现，减轻阅读大段文字的负担，帮助记忆。
            </p>
          </div>
          <div className="feat-img">
            <figure className="kp-demo">
            <img
              src="/img/kp-demo/q2017-1-jiexi.jpg"
              alt="2017年真题「人体能量消耗测定方法」的解析图解：四种测定方法逐项画图对比与错误选项指认"
              loading="lazy"
            />
            <figcaption>2017 年真题的解析图 · 小程序内实图</figcaption>
          </figure>
          </div>
        </div>
      </section>

      {/* 两门考试各一个小程序：给搜索与 AI 一个明确的对应关系 */}
      <section className="sec wrap">
        <div className="sec-h">
          <h2>两门考试，两个小程序</h2>
        </div>
        <p className="sec-sub">微信里搜「彩虹刷题」，两个都能找到。</p>
        <div className="guide-links">
          <Link className="guide-link" href="/guide/tiku-pingce">
            <b>彩虹刷题-图解注册营养题库</b>
            <span>
              2017-2026 年真题 {siteData.totalQuestions} 道 · {siteData.totalKps} 个图解考点 · 智能刷题、按大纲刷、真题模考
            </span>
          </Link>
          <Link className="guide-link" href="/gongying-tiku">
            <b>彩虹刷题-公共营养师三级</b>
            <span>
              {siteData.pn.sessions} 场真题 {siteData.pn.totalQuestions} 道 · 理论知识 + 专业技能两科 · {siteData.pn.totalKps} 个考点
            </span>
          </Link>
        </div>
        <p className="sec-sub" style={{ marginTop: 16 }}>
          新用户都送 30 天会员，到期后可在小程序内按天数开通。
        </p>
      </section>

      {/* 样题体验 */}
      <section className="sec wrap" id="try">
        <div className="sec-h">
          <h2>先做两道真题试试</h2>
        </div>
        <p className="sec-sub">
          {samples[0]?.year} 年真题原题。点选项直接作答，判色和解析与小程序里一致。
        </p>
        <div className="qgrid">
          {samples.slice(0, 2).map((q) => (
            <QuestionCard key={q.id} q={q} />
          ))}
        </div>
        <p style={{ marginTop: 20 }}>
          <Link href="/questions">再来 6 道，覆盖四大模块 ›</Link>
          <span style={{ margin: "0 12px", color: "var(--faint)" }}>|</span>
          <Link href="/moni/2027">2027 模拟卷：100 题，答一道看一道解析 ›</Link>
        </p>
      </section>

      {/* 两门考试的资料入口：分组与文案来自 lib/site-nav.ts */}
      {exams.map((ex) => (
        <section className="sec wrap" key={ex.key}>
          <div className="sec-h">
            <h2>{ex.name}备考资料</h2>
          </div>
          <p className="sec-sub">
            整理自官方与公开资料，数据来自本站题库逐题标注，标注更新时间。<Link href={ex.hub}>全部{ex.name}资料 ›</Link>
          </p>
          <div className="guide-links">
            {ex.groups
              .flatMap((g) => g.pages)
              .filter((p) => p.href.startsWith("/guide/"))
              .map((p) => (
                <Link key={p.href} className="guide-link" href={p.href}>
                  <b>{ex.name}{p.label}</b>
                  <span>{p.desc}</span>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <WxCta />
    </main>
  );
}
