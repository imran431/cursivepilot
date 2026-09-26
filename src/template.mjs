import { site, nav } from './config.mjs';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const cleanUrl = (base, path) => new URL(path, base.endsWith('/') ? base : `${base}/`).toString();

function navHtml(currentPath) {
  return nav.map((item) => {
    const active = currentPath === item.href;
    return `<a href="${item.href}"${active ? ' aria-current="page"' : ''}>${escapeHtml(item.label)}</a>`;
  }).join('');
}

function breadcrumbSchema(baseUrl, breadcrumbs = []) {
  if (!breadcrumbs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: cleanUrl(baseUrl, item.href),
    })),
  };
}

function pageSchemas({ baseUrl, path, title, description, type, features = [], breadcrumbs = [], faqs = [] }) {
  const url = cleanUrl(baseUrl, path);
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      url: cleanUrl(baseUrl, '/'),
      description: site.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: cleanUrl(baseUrl, '/'),
      description: site.description,
      inLanguage: site.language,
    },
  ];

  if (type === 'tool') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: title.split(' | ')[0],
      description,
      url,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript in a modern web browser',
      isAccessibleForFree: true,
      featureList: features,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@type': 'Organization',
        name: site.name,
        url: cleanUrl(baseUrl, '/'),
      },
    });
  }

  if (type === 'guide') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title.split(' | ')[0],
      description,
      mainEntityOfPage: url,
      inLanguage: site.language,
      author: {
        '@type': 'Organization',
        name: site.name,
      },
      publisher: {
        '@type': 'Organization',
        name: site.name,
      },
    });
  }

  if (faqs.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  const breadcrumb = breadcrumbSchema(baseUrl, breadcrumbs);
  if (breadcrumb) schemas.push(breadcrumb);
  return schemas;
}

function breadcrumbHtml(items = []) {
  if (!items.length) return '';
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${items.map((item, i) => {
    const last = i === items.length - 1;
    return last
      ? `<span aria-current="page">${escapeHtml(item.label)}</span>`
      : `<a href="${item.href}">${escapeHtml(item.label)}</a><span aria-hidden="true">/</span>`;
  }).join('')}</nav>`;
}

export function renderPage({
  baseUrl,
  path,
  title,
  description,
  content,
  type = 'page',
  features = [],
  breadcrumbs = [],
  script = '',
  noindex = false,
  faqs = [],
  fontQuery = '',
}) {
  const canonical = cleanUrl(baseUrl, path);
  const schemas = pageSchemas({ baseUrl, path, title, description, type, features, breadcrumbs, faqs });
  const googleVerify = process.env.GOOGLE_SITE_VERIFICATION || '';
  const bingVerify = process.env.BING_SITE_VERIFICATION || '';
  const gtmId = /^GTM-[A-Z0-9]+$/i.test(process.env.GTM_ID || '') ? process.env.GTM_ID : '';
  const gtmHead = gtmId ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>` : '';
  const gtmBody = gtmId ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : '';

  return `<!doctype html>
<html lang="${site.language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}">
  <meta name="theme-color" content="${site.themeColor}">
  ${googleVerify ? `<meta name="google-site-verification" content="${escapeHtml(googleVerify)}">` : ''}
  ${bingVerify ? `<meta name="msvalidate.01" content="${escapeHtml(bingVerify)}">` : ''}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${cleanUrl(baseUrl, '/og-card.png')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/site.webmanifest">
  ${fontQuery ? `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?${fontQuery}&display=swap" rel="stylesheet">` : ''}
  <link rel="stylesheet" href="/assets/styles.css">
  ${gtmHead}
  ${schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`).join('\n  ')}
</head>
<body>
  ${gtmBody}
  <a class="skip-link" href="#main">Skip to main content</a>
  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="/" aria-label="${site.name} home">
        <span class="brand-mark" aria-hidden="true">✒</span>
        <span>${site.name}</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu</button>
      <nav id="main-nav" class="main-nav" aria-label="Primary">${navHtml(path)}</nav>
    </div>
  </header>
  <main id="main">
    <div class="shell">${breadcrumbHtml(breadcrumbs)}</div>
    ${content}
  </main>
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div>
        <a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true">✒</span><span>${site.name}</span></a>
        <p>${site.tagline}</p>
      </div>
      <div>
        <h2>Tools</h2>
        <a href="/cursive-generator/">Cursive generator</a>
        <a href="/handwriting-generator/">Handwriting generator</a>
        <a href="/calligraphy-generator/">Calligraphy generator</a>
        <a href="/signature-generator/">Signature generator</a>
        <a href="/handwriting-worksheet-generator/">Worksheet generator</a>
      </div>
      <div>
        <h2>About</h2>
        <a href="/how-it-works/">How it works</a>
        <a href="/about/">About</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/contact/">Contact</a>
      </div>
    </div>
    <div class="shell footer-bottom"><span>© <span data-current-year></span> ${site.name}</span><span>Free browser-based writing tools.</span></div>
  </footer>
  <script type="module" src="/assets/site.js"></script>
  ${script ? `<script type="module" src="${script}"></script>` : ''}
</body>
</html>`;
}
