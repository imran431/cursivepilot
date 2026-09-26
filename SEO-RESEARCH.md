# SEO Research Notes

## Keyword cluster

The launch strategy focuses on one tightly related topic rather than a generic multi-tool directory.

Primary cluster:
- cursive generator — approximately 74,000 average monthly searches in the supplied Google Keyword Planner export
- cursive font generator — approximately 49,500 in related variants
- cursive text generator — approximately 18,100
- calligraphy generator — approximately 9,900
- signature handwriting generator — approximately 4,400
- handwriting worksheet generator — approximately 2,400
- handwriting generator — approximately 1,600
- text to handwriting — approximately 1,300

Important: Google Keyword Planner often groups close variants. Do not add near-identical keyword volumes together as if they were unique searches.

## Positioning

The site should be positioned around **cursive + handwriting + calligraphy + signatures + worksheets**, not around the narrower phrase “AI handwriting generator.”

The current version does not use a machine-learning handwriting model, so it should not make a misleading AI claim.

## Page mapping

- `/cursive-generator/` — primary cursive generator intent
- `/handwriting-generator/` — text-to-handwriting visual output
- `/calligraphy-generator/` — visual calligraphy image output
- `/signature-generator/` — cursive name / signature-style preview
- `/handwriting-worksheet-generator/` — printable practice intent
- `/cursive-alphabet/` — supporting topical reference
- guides — explanatory content that supports topical authority and internal linking

Avoid creating multiple near-duplicate pages for “cursive generator online,” “free cursive generator,” “generate cursive,” etc. One strong page should target the shared intent.

## Technical SEO

The build creates:
- static HTML pages
- unique titles and meta descriptions
- canonical URLs
- sitemap.xml
- robots.txt
- structured data for SoftwareApplication, Article, BreadcrumbList and visible FAQs
- crawlable explanatory text
- internal links between related tools

Set `SITE_URL` in Netlify before production deployment so canonical and sitemap URLs use the final HTTPS domain.

## ChatGPT / LLM search visibility

The site explicitly allows `OAI-SearchBot` in robots.txt. This only makes the site eligible for ChatGPT Search crawling; it does not guarantee inclusion, citation or recommendation.

Good LLM-search practice for this project:
- answer the user’s task directly on each page
- state exactly what the tool does and does not do
- keep important explanations in visible HTML text
- publish focused factual guides that can be cited
- avoid unsupported superlatives and fake reviews
- keep the public site crawlable

An optional `llms.txt` file is generated as a machine-readable map, but it is not treated as a Google ranking requirement.

## Google Ads landing-page approach

Each ad group should land on its matching tool:
- “cursive generator” -> `/cursive-generator/`
- “handwriting generator” -> `/handwriting-generator/`
- “calligraphy generator” -> `/calligraphy-generator/`
- “signature generator” -> `/signature-generator/`
- “handwriting worksheet generator” -> `/handwriting-worksheet-generator/`

The core tool should be usable without signup or popup friction.

Track meaningful actions such as:
- `tool_copy`
- `tool_download`
- `tool_share`

The browser scripts push these events to `window.dataLayer` so they can later be mapped in Google Tag Manager / GA4 / Google Ads.

## Backend recommendation

Use a static-first architecture:
- GitHub: source control
- Netlify: static hosting, builds and Netlify Forms
- Browser: all core generation logic

No database is required for V1.

## Launch order

1. Choose final brand and domain.
2. Set production environment variables.
3. Connect GitHub to Netlify.
4. Deploy.
5. Verify Search Console and submit sitemap.
6. Test each tool on mobile and desktop.
7. Add analytics/ads only after privacy and consent setup is ready.
8. Use Search Console query data to decide which supporting pages to expand next.
