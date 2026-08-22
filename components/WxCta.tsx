/* 转化区：全站唯一的大色块（蓝田「一页一个大色块」判词）。
   小程序码素材到位后在此处补图，当前以搜索步骤引导为主。 */
export default function WxCta() {
  return (
    <section className="sec wrap">
      <div className="cta-band">
        <div>
          <h2>现在就开始刷题</h2>
          <p>免费使用，无需下载安装——打开微信就能开始。</p>
          <div className="wx-steps">
            <span>1. 打开微信</span>
            <span>2. 顶部搜索框搜索</span>
            <span>
              3. 「<b>彩虹题伴</b>」
            </span>
          </div>
        </div>
        <img src="/img/mascot.png" alt="彩虹题伴吉祥物彩虹小人" className="mascot-sm" />
      </div>
    </section>
  );
}
