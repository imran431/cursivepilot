# CursivePilot

CursivePilot is a static-first cursive and handwriting tools site built for GitHub + Netlify.

## Included tools

- Cursive Generator
- Handwriting Generator
- Calligraphy Generator
- Cursive Signature / Name Generator
- Handwriting Worksheet Generator
- Cursive alphabet reference
- SEO-focused supporting guides

The core tools run in the visitor's browser using JavaScript, Unicode and Canvas. No database is required for V1.

## Run locally

Requires Node.js 20+.

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:8888
```

There are no npm dependencies.

## Production configuration

Set these in Netlify:

```text
SITE_URL=https://your-real-domain.com
CONTACT_EMAIL=support@your-real-domain.com
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
GTM_ID=
```

The contact page uses Netlify Forms, so no separate database or server function is needed.

## Deploy

1. Connect this repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set `SITE_URL` to the final production domain.
5. Deploy.

## Search setup

After the final domain is live:

- Verify Google Search Console.
- Submit `/sitemap.xml`.
- Inspect the main tool URLs.
- Test structured data.
- Check mobile performance.
- Confirm `/robots.txt` allows Googlebot and OAI-SearchBot.

## Analytics

The tools emit browser events such as:

- `tool_view`
- `tool_copy`
- `tool_download`
- `tool_share`

These can later be mapped through Google Tag Manager.

## Important product wording

The current version does not use a machine-learning handwriting model. Do not market the browser-side font/canvas renderer as AI unless a genuine AI feature is added later.

## Project notes

See:

- `SEO-RESEARCH.md`
- `CONTENT-PLAN.md`
- `DEPLOY-CHECKLIST.md`
