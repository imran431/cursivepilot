import './build.mjs';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const errors = [];
const warnings = [];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(p)); else out.push(p);
  }
  return out;
}

const files = await walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const titles = new Map();
const canonicals = new Set();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(dist, file);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (!title) errors.push(`${relative}: missing title`);
  if (!desc) errors.push(`${relative}: missing meta description`);
  if (!canonical) errors.push(`${relative}: missing canonical`);
  if (h1Count !== 1) errors.push(`${relative}: expected 1 h1, found ${h1Count}`);
  if (title) {
    if (titles.has(title)) errors.push(`${relative}: duplicate title with ${titles.get(title)}`);
    titles.set(title, relative);
  }
  if (canonical) {
    if (canonicals.has(canonical)) errors.push(`${relative}: duplicate canonical ${canonical}`);
    canonicals.add(canonical);
  }
  const refs = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1].split('#')[0].split('?')[0]).filter(Boolean);
  for (const href of refs) {
    if (href === '/sitemap.xml') continue;
    let target;
    if (href === '/') target = path.join(dist, 'index.html');
    else if (href.endsWith('/')) target = path.join(dist, href.replace(/^\//,''), 'index.html');
    else target = path.join(dist, href.replace(/^\//,''));
    const match = files.some((f) => f === target || f === `${target}.html`);
    if (!match) errors.push(`${relative}: broken internal resource ${href}`);
  }
}

const robots = await readFile(path.join(dist,'robots.txt'),'utf8');
if (!robots.includes('OAI-SearchBot')) errors.push('robots.txt missing OAI-SearchBot');
if (!robots.includes('Sitemap:')) errors.push('robots.txt missing sitemap');
const sitemap = await readFile(path.join(dist,'sitemap.xml'),'utf8');
if (!sitemap.includes('<urlset')) errors.push('sitemap.xml invalid');\nif (sitemap.includes('/thanks/')) errors.push('sitemap.xml must not include noindex /thanks/');

const unicode = await readFile(path.join(root,'src','client','unicode.js'),'utf8');
for (const label of ['script','bold-script','fraktur','double','sans','mono','fullwidth','circled']) {
  if (!unicode.includes(`id: '${label}'`)) errors.push(`unicode.js missing style ${label}`);
}

const config = await readFile(path.join(root,'src','config.mjs'),'utf8');
if (!process.env.CONTACT_EMAIL) warnings.push('CONTACT_EMAIL is not set; Netlify Forms still works but no support email will be displayed.');

if (errors.length) {
  console.error('\nCHECK FAILED');
  errors.forEach((e) => console.error(`- ${e}`));
  process.exitCode = 1;
} else {
  console.log(`SEO/build checks passed: ${htmlFiles.length} HTML files, unique titles/canonicals, internal links resolved.`);
}
warnings.forEach((w) => console.warn(`Warning: ${w}`));
