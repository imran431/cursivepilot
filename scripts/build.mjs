import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from '../src/pages.mjs';
import { renderPage } from '../src/template.mjs';
import { site } from '../src/config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');
const rawBase = process.env.SITE_URL || process.env.URL || 'http://localhost:8888';
const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const today = new Date().toISOString().slice(0, 10);

const targetFor = (route) => route === '/'
  ? path.join(dist, 'index.html')
  : path.join(dist, route.replace(/^\//, ''), 'index.html');

async function copyIfExists(from, to) {
  try {
    await cp(from, to, { recursive: true });
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });

await cp(path.join(root, 'src', 'styles.css'), path.join(dist, 'assets', 'styles.css'));
await cp(path.join(root, 'src', 'client'), path.join(dist, 'assets'), { recursive: true });
await copyIfExists(path.join(root, 'public'), dist);

for (const page of pages) {
  const target = targetFor(page.path);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, renderPage({ baseUrl, ...page }), 'utf8');
}

const notFound = renderPage({
  baseUrl,
  path: '/404.html',
  title: `Page Not Found | ${site.name}`,
  description: 'The requested page could not be found.',
  noindex: true,
  content: `<section class="section"><div class="shell"><span class="eyebrow">404</span><h1>That page is not here.</h1><p class="lede">Try one of the focused writing tools instead.</p><div class="hero-actions"><a class="button button-primary" href="/cursive-generator/">Cursive Generator</a><a class="button button-secondary" href="/">Home</a></div></div></section>`,
});
await writeFile(path.join(dist, '404.html'), notFound, 'utf8');

const sitemapUrls = pages.map((page) => `  <url>\n    <loc>${new URL(page.path, baseUrl).toString()}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n');
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`, 'utf8');

await writeFile(path.join(dist, 'robots.txt'), `# Search engines
User-agent: Googlebot
Allow: /

User-agent: AdsBot-Google
Allow: /

# ChatGPT Search eligibility is controlled by OAI-SearchBot.
User-agent: OAI-SearchBot
Allow: /

# GPTBot is independent from ChatGPT Search. Change to Disallow: / if desired.
User-agent: GPTBot
Allow: /

User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', baseUrl).toString()}
`, 'utf8');

// Optional machine-readable summary. Google says no special AI text file is required for AI Search features.
const llmLines = [
  `# ${site.name}`,
  '',
  `> ${site.description}`,
  '',
  '## Core tools',
  ...pages.filter((p) => p.type === 'tool').map((p) => `- [${p.title.split(' | ')[0]}](${new URL(p.path, baseUrl).toString()}): ${p.description}`),
  '',
  '## Reference pages',
  `- [How it works](${new URL('/how-it-works/', baseUrl).toString()}): Explains output types, browser-side processing and limits.`,
  `- [Unicode cursive vs. script fonts](${new URL('/guides/unicode-cursive-vs-fonts/', baseUrl).toString()}): Explains copyable Unicode versus rendered type.`,
  `- [About](${new URL('/about/', baseUrl).toString()}): Site scope and editorial approach.`,
  '',
  'The site distinguishes copyable Unicode text from rendered handwriting or calligraphy images. The included version does not claim to clone a specific person\'s handwriting with AI.',
  '',
];
await writeFile(path.join(dist, 'llms.txt'), llmLines.join('\n'), 'utf8');

console.log(`Built ${pages.length} pages into ${dist}`);
console.log(`Canonical base: ${baseUrl}`);
