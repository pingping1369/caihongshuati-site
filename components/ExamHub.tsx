import Link from "next/link";
import { exams, common, type NavExam } from "@/lib/site-nav";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://caihongshuati.com";

/* 考试入口页：列出一门考试的全部页面，按「报考 / 考什么 / …」分组；附 CollectionPage 结构化数据。 */
export default function ExamHub({ exam, title, intro, updated }: { exam: NavExam["key"]; title: string; intro: React.ReactNode; updated: string }) {
  const ex = exams.find((e) => e.key === exam)!;
  const other = exams.find((e) => e.key !== exam)!;
  const pages = ex.groups.flatMap((g) => g.pages);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url: new URL(ex.hub, SITE).href,
    dateModified: updated,
    about: ex.name,
    publisher: { "@id": `${SITE}/#org` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: pages.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.label, url: new URL(p.href, SITE).href })),
    },
  };
  return (
    <main className="sec wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="sec-h">
        <h1>{title}</h1>
      </div>
      <p className="sec-sub">{intro}</p>
      {ex.groups.map((g) => (
        <section key={g.title} className="hub-group">
          <h2>{g.title}</h2>
          <div className="guide-links">
            {g.pages.map((p) => (
              <Link key={p.href} className="guide-link" href={p.href}>
                <b>{p.label}</b>
                <span>{p.desc}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <section className="hub-group">
        <h2>相关</h2>
        <div className="guide-links">
          <Link className="guide-link" href={other.hub}>
            <b>{other.name}备考资料</b>
            <span>{other.name}的报考、考试内容与真题统计</span>
          </Link>
          {common
            .filter((p) => p.href.startsWith("/guide/"))
            .map((p) => (
              <Link key={p.href} className="guide-link" href={p.href}>
                <b>{p.label}</b>
                <span>{p.desc}</span>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
