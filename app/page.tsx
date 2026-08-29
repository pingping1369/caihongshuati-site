import Link from "next/link";
import QuestionCard, { Sample } from "@/components/QuestionCard";
import WxCta from "@/components/WxCta";
import siteData from "@/data/site-data.json";

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
      {/* 英雄区 */}
      <section className="wrap hero">
        <div>
          <h1>
            注册营养师真题，<br />
            <span className="hl">一图一题</span>，学得进去
          </h1>
          <p className="lede">
            彩虹题伴是一个微信小程序：历年真题逐题配白板图解，刷题计划按你的考试日期和记忆曲线自动排——每天打开，直接开始。
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
              <b className="num">2017-2025</b>
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
          <img className="mascot" src="/img/mascot.png" alt="彩虹题伴吉祥物：彩虹小人" />
          <img className="sticker s1" src="/img/food-broccoli.png" alt="" />
          <img className="sticker s2" src="/img/food-carrot.png" alt="" />
          <img className="sticker s3" src="/img/food-milk.png" alt="" />
          <img className="sticker s4" src="/img/food-tomato.png" alt="" />
        </div>
      </section>

      {/* 产品特性：图文交替 + 设备框 */}
      <section className="sec wrap">
        <div className="sec-h">
          <h2>它怎么帮你备考</h2>
        </div>
        <p className="sec-sub">四件事，每件都替你省一类决策。</p>

        <div className="feat">
          <div className="feat-txt">
            <span className="kicker">今日学习</span>
            <h3>
              打开就知道<em>今天做什么</em>
            </h3>
            <p>
              不用自己规划进度。每天一个学习队列，复习、薄弱点、新题自动配比；做完打卡，食材贴纸落袋——连着学，看得见。
            </p>
            <ul className="feat-points">
              <li>到期复习优先，错过的账自动顺延，不滚雪球</li>
              <li>教练一句话直说差距，不绕弯</li>
              <li>有精力就加练，没精力明天见</li>
            </ul>
          </div>
          <div className="feat-img">
            <Phone src="/img/screens/03-home.png" alt="彩虹题伴首页：今日学习队列与连学周历" />
          </div>
        </div>

        <div className="feat rev">
          <div className="feat-txt">
            <span className="kicker green">图解考点</span>
            <h3>
              每个考点，<em>一张图讲透</em>
            </h3>
            <p>
              {siteData.totalKps} 个考点全部图文详解：白板手绘风把分类、机制、数值画成一张图；先给你一句回忆提问，想一想再看答案——这是记忆科学里最省力的学法。
            </p>
            <ul className="feat-points">
              <li>考点页直连挂载真题，看完就练</li>
              <li>常考点单独标出，考前重点一目了然</li>
            </ul>
          </div>
          <figure className="kp-demo">
            <img
              src="/img/kp-demo/nutrition-classification.jpg"
              alt="考点「营养素的分类与功能」的白板图解：六大营养素分类与宏量微量划分"
              loading="lazy"
            />
            <figcaption>考点「营养素的分类与功能」· 小程序内实图</figcaption>
          </figure>
        </div>

        <div className="feat">
          <div className="feat-txt">
            <span className="kicker orange">备考计划</span>
            <h3>
              定好考试日，<em>计划自己排</em>
            </h3>
            <p>
              填上考试日期和目标分，每日题量自动算出来；题量预告一直推演到考试日，改了目标立刻重排。时间紧，还能压缩范围，移出冷门考点集中拿大分。
            </p>
            <ul className="feat-points">
              <li>间隔重复排期：该复习的那天自动出现</li>
              <li>断几天不清零，回来接着走</li>
            </ul>
          </div>
          <div className="feat-img">
            <Phone src="/img/screens/12-plan.png" alt="彩虹题伴备考计划：每日题量自动计算与题量预告" />
          </div>
        </div>

        <div className="feat rev">
          <div className="feat-txt">
            <span className="kicker amber">考纲大纲</span>
            <h3>
              考纲结构，<em>一屏看清</em>
            </h3>
            <p>
              四大模块、章节、考点逐层下钻，每层都标着你练到哪了。哪块薄弱、哪块已经稳了，颜色直接告诉你。
            </p>
            <ul className="feat-points">
              <li>模块占考纲比重标注，力气花在分值上</li>
              <li>任意考点点进去就是图解详解</li>
            </ul>
          </div>
          <div className="feat-img">
            <Phone src="/img/screens/13-graph-l1.png" alt="彩虹题伴大纲页：四大模块与学习进度" />
          </div>
        </div>
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
        </p>
      </section>

      {/* 报考指南入口 */}
      <section className="sec wrap">
        <div className="sec-h">
          <h2>报考信息，一次说清</h2>
        </div>
        <p className="sec-sub">整理自官方与公开资料，标注更新时间，以官方最新通知为准。</p>
        <div className="guide-links">
          <Link className="guide-link" href="/guide/zhuce">
            <b>注册营养师报考指南</b>
            <span>报考条件 · 考试安排 · 报名方式 · 证书注册</span>
          </Link>
          <Link className="guide-link" href="/guide/tiku-pingce">
            <b>刷题工具怎么选</b>
            <span>题库纯度 · 真题年份 · 解析 · 图解 · 收费，四维对比</span>
          </Link>
          <Link className="guide-link" href="/guide/gongying">
            <b>公共营养师报考指南</b>
            <span>等级划分 · 各级条件 · 费用区间 · 防坑要点</span>
          </Link>
          <Link className="guide-link" href="/guide/duibi">
            <b>两个证书怎么选</b>
            <span>注册营养师 vs 公共营养师，逐项对比</span>
          </Link>
          <Link className="guide-link" href="/guide/beikao">
            <b>考试内容与备考规划</b>
            <span>科目题型 · 备考周期 · 复习方法</span>
          </Link>
        </div>
      </section>

      <WxCta />
    </main>
  );
}
