// Default is a dry run. Only --submit sends requests; no automatic daily resubmission.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const site = new URL('https://caihongshuati.com');
const args = process.argv.slice(2);
const engine = args.find(x => x.startsWith('--engine='))?.slice(9) || 'indexnow';
assert.ok(['indexnow', 'baidu'].includes(engine), 'engine must be indexnow or baidu');
const known = JSON.parse(readFileSync(`${root}data/page-updates.json`, 'utf8'));
const requested = args.filter(x => x.startsWith('--url=')).map(x => x.slice(6));
const urls = [...new Set((requested.length ? requested : Object.keys(known)).map(path => {
  const url = new URL(path, site);
  assert.equal(url.origin, site.origin, 'only production host may be submitted');
  assert.ok(known[url.pathname] && !url.search && !url.hash, 'only registered canonical pages');
  return url.href;
}))];
console.log(JSON.stringify({ engine, dryRun: !args.includes('--submit'), urls }, null, 2));
if (!args.includes('--submit')) process.exit(0);
for (const url of urls) {
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${url} must be live before submission`);
  const html = await response.text();
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  assert.ok(canonical, `${url} missing live canonical; deploy first`);
  assert.equal(new URL(canonical).href, url, `${url} live canonical mismatch; deploy first`);
}
let endpoint, body, headers;
if (engine === 'indexnow') {
  const keyFile = readdirSync(`${root}public`).find(x => /^[a-f0-9]{32}\.txt$/.test(x));
  assert.ok(keyFile, 'IndexNow verification file missing');
  const key = readFileSync(`${root}public/${keyFile}`, 'utf8').trim();
  assert.equal(keyFile, `${key}.txt`, 'IndexNow file must match key');
  const keyLocation = new URL(keyFile, site).href;
  const check = await fetch(keyLocation, { signal: AbortSignal.timeout(30000) });
  assert.equal(check.status, 200, 'deploy key before submitting');
  assert.equal((await check.text()).trim(), key, 'live key mismatch');
  endpoint = 'https://www.bing.com/indexnow';
  body = JSON.stringify({ host: site.host, key, keyLocation, urlList: urls });
  headers = { 'Content-Type': 'application/json; charset=utf-8' };
} else {
  const token = process.env.BAIDU_PUSH_TOKEN;
  assert.ok(token, 'set BAIDU_PUSH_TOKEN privately; never commit it');
  endpoint = `https://data.zz.baidu.com/urls?site=${encodeURIComponent(site.href)}&token=${encodeURIComponent(token)}`;
  body = urls.join('\n');
  headers = { 'Content-Type': 'text/plain; charset=utf-8' };
}
try {
  const response = await fetch(endpoint, { method: 'POST', headers, body, signal: AbortSignal.timeout(30000) });
  const raw = await response.text();
  // Do not log request URL, token, or verification key.
  const receipt = engine === 'baidu' ? JSON.parse(raw) : undefined;
  console.log(JSON.stringify({ engine, httpStatus: response.status, submittedCount: urls.length, receipt, meaning: 'received/accepted is not indexed' }, null, 2));
  assert.ok(response.ok, 'submission rejected');
  if (receipt) assert.equal(receipt.success, urls.length, 'Baidu did not accept every URL; inspect quota/receipt');
} catch (error) {
  console.error(`Submission failed: ${error.name}. Inspect the sanitized receipt above; do not automatically retry.`);
  process.exitCode = 1;
}
