import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const updates = JSON.parse(readFileSync(`${root}data/page-updates.json`, 'utf8'));
const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://caihongshuati.com');
const arg = process.argv.find(x => x.startsWith('--base='));
const base = arg?.slice(7);
const sourceOnly = process.argv.includes('--source');
const routes = [];
function walk(dir, route = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(`${dir}/${entry.name}`, `${route}/${entry.name}`);
    else if (entry.name === 'page.tsx') routes.push(route || '/');
  }
}
walk(`${root}app`);
assert.deepEqual(Object.keys(updates).sort(), routes.sort(), '每个页面必须登记到 page-updates.json，不能漏出 sitemap');
for (const [route, date] of Object.entries(updates)) {
  assert.match(date, /^\d{4}-\d{2}-\d{2}$/, `${route} 日期格式`);
  const parsed = new Date(`${date}T00:00:00Z`);
  assert.equal(parsed.toISOString().slice(0, 10), date, `${route} 日期无效`);
  assert.ok(date <= new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' }), `${route} 不能标记未来更新`);
  const source = readFileSync(`${root}app${route === '/' ? '' : route}/page.tsx`, 'utf8');
  assert.ok(source.includes(`canonical: "${route}"`), `${route} 缺自己的 canonical`);
}
if (sourceOnly) {
  console.log(`SEO source PASS: ${routes.length} routes / dates / canonical declarations`);
  process.exit(0);
}

const get = async path => {
  if (!base) {
    const name = path === '/' ? 'index.html' : path === '/sitemap.xml' ? 'sitemap.xml.body' : path === '/robots.txt' ? 'robots.txt.body' : `${path.slice(1)}.html`;
    return readFileSync(`${root}.next/server/app/${name}`, 'utf8');
  }
  const response = await fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path} HTTP status`);
  assert.ok(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${path} X-Robots-Tag`);
  return response.text();
};
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(x => [x[1], x[2]]));
const sitemap = await get('/sitemap.xml');
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, xml]) => ({
  url: xml.match(/<loc>(.*?)<\/loc>/)?.[1], date: xml.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.slice(0, 10),
}));
assert.equal(entries.length, routes.length, 'sitemap URL count');
assert.equal(new Set(entries.map(x => x.url)).size, routes.length, 'sitemap duplicate URLs');
for (const entry of entries) {
  const url = new URL(entry.url);
  assert.equal(url.origin, site.origin, 'sitemap host');
  assert.equal(entry.date, updates[url.pathname], `${url.pathname} sitemap lastmod`);
}
assert.ok((await get('/robots.txt')).includes(`Sitemap: ${site.origin}/sitemap.xml`), 'robots sitemap declaration');
const graph = new Map();
const titles = new Set();
for (const route of routes) {
  const html = await get(route);
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(x => attrs(x[0]));
  const canonical = links.filter(x => x.rel === 'canonical');
  assert.equal(canonical.length, 1, `${route} canonical count`);
  assert.equal(new URL(canonical[0].href).href, new URL(route, site).href, `${route} canonical URL`);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(x => attrs(x[0]));
  assert.ok(metas.find(x => x.name === 'description' && x.content?.length > 10), `${route} description`);
  assert.ok(!metas.some(x => /^(robots|googlebot)$/i.test(x.name || '') && /noindex/i.test(x.content || '')), `${route} noindex`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${route} missing/duplicate title`);
  titles.add(title);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route} H1 count`);
  for (const [, json] of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const schema = JSON.parse(json);
    if (schema.dateModified) assert.equal(schema.dateModified.slice(0, 10), updates[route], `${route} JSON-LD dateModified`);
  }
  graph.set(route, [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(x => new URL(x[1].replaceAll('&amp;', '&'), site)).filter(x => x.origin === site.origin).map(x => x.pathname));
  console.log(`PASS ${route} canonical / title / H1 / indexable / dates`);
}
const reached = new Set(['/']);
for (const route of reached) for (const next of graph.get(route) || []) if (graph.has(next)) reached.add(next);
assert.equal(reached.size, routes.length, '存在从首页无法通过 HTML 链接抵达的孤立页');
console.log(`SEO PASS: ${routes.length} pages, sitemap, robots, all reachable from homepage (${base || 'built HTML'})`);
