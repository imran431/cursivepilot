# CursivePilot

A zero-dependency, static-first starter for a focused cursive/handwriting tools site. It is designed for **GitHub + Netlify + Supabase** and is intentionally crawlable without a JavaScript-only app shell.

## What is included

- Cursive generator (copyable Unicode)
- Handwriting page generator (PNG + Print/Save PDF)
- Calligraphy PNG generator
- Cursive name/signature PNG generator
- Printable handwriting worksheet generator
- Cursive alphabet reference
- Two supporting educational guides
- SEO titles/descriptions/canonicals, sitemap and robots.txt
- SoftwareApplication + breadcrumb + visible-FAQ JSON-LD
- OAI-SearchBot allow rule for ChatGPT Search eligibility
- Optional `llms.txt` site map (not a Google ranking requirement)
- Netlify contact function + Supabase schema
- Google Ads/GTM-friendly `dataLayer` events without installing tracking by default
- GitHub Actions build/SEO check

## 1. Run locally in VS Code

Requirements: Node.js 20 or newer.

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:8888
```

There are no npm dependencies, so `npm install` is not required for the included build. The simple local server does not emulate Netlify Functions, so the contact form backend will not work in this mode. The generators themselves work normally.

To run the Netlify Function locally later, install/use the Netlify CLI and run `netlify dev`.

## 2. Before launch: change the brand and domain

Edit:

```text
src/config.mjs
```

`CursivePilot` is a working project name, not a promise that a matching domain or trademark is available. Check the name/domain before commercial launch.

Set these environment variables in Netlify:

```text
SITE_URL=https://your-real-domain.com
CONTACT_EMAIL=support@your-real-domain.com
GOOGLE_SITE_VERIFICATION=optional-search-console-token
BING_SITE_VERIFICATION=optional-bing-token
GTM_ID=optional-GTM-XXXXXXX
```

`SITE_URL` is important because the build uses it for canonical URLs, the sitemap and `llms.txt` links.

## 3. Set up Supabase (only needed for contact form storage)

Create a Supabase project, then run:

```text
supabase/schema.sql
```

in the Supabase SQL Editor.

Add these server-side environment variables in Netlify:

```text
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

**Never put the service-role key in browser JavaScript, GitHub source or a `PUBLIC_` environment variable.** The included function reads it only on the server.

The core generators deliberately do not require Supabase. That keeps the main user flow faster, cheaper and more private.

## 4. Deploy from GitHub to Netlify

1. Create a GitHub repository and commit this folder.
2. In Netlify choose **Add new site -> Import an existing project**.
3. Connect the GitHub repository.
4. `netlify.toml` already defines:
   - build command: `npm run build`
   - publish directory: `dist`
   - functions directory: `netlify/functions`
5. Add the environment variables above.
6. Deploy.

## 5. Search setup after the site is live

- Verify the final domain in Google Search Console.
- Submit `/sitemap.xml`.
- Test the key tool URLs with URL Inspection.
- Validate structured data with Google's Rich Results Test.
- Check PageSpeed Insights/Core Web Vitals.
- Verify `/robots.txt` is reachable publicly.
- If you use a CDN/WAF rule in front of Netlify later, make sure it does not block Googlebot, AdsBot-Google or OAI-SearchBot.

OpenAI says OAI-SearchBot controls eligibility for automatic ChatGPT Search crawling. GPTBot is independent and concerns model training. If you do not want training crawling, you can change the GPTBot section in `scripts/build.mjs` to `Disallow: /` while continuing to allow OAI-SearchBot.

## 6. Google Ads / analytics setup

The starter does **not** install tracking or advertising scripts by default. If you set a valid `GTM_ID`, the build injects the standard Google Tag Manager container. Only enable it after your privacy/consent setup is appropriate for the countries you serve. The tools emit events to `window.dataLayer`:

```text
tool_view
tool_copy
tool_download
tool_share
feedback_submit
```

Recommended next step is to add Google Tag Manager after your consent/privacy setup is ready, then map the useful events to GA4/Google Ads conversions.

Suggested conversions:

- `tool_copy` for the cursive generator
- `tool_download` for handwriting/calligraphy/signature/worksheet tools

Send each ad group to its matching tool page instead of the homepage.

## 7. Important wording rule: do not falsely call the starter “AI”

This included version uses Unicode conversion and browser-side font/canvas rendering. It does **not** contain a machine-learning handwriting model. The site copy therefore does not claim it is an AI handwriting clone.

If you later add a real AI model, describe exactly what it does and update the privacy policy, terms, infrastructure and costs accordingly.

## 8. Web fonts

The visual tools use Google Fonts from the browser. The actual text rendering is local, but the browser still requests font files from Google. If you need a different privacy profile, replace those font families with system fonts or self-hosted fonts that you are licensed to use. Do not distribute third-party font files without checking their licenses.

## 9. Build quality check

Run:

```bash
npm run check
```

It rebuilds the site and checks basic SEO/build invariants: unique titles/canonicals, one H1 per page, internal link targets, sitemap presence and OAI-SearchBot in robots.txt.

## Research notes

Read:

- `SEO-RESEARCH.md`
- `CONTENT-PLAN.md`

They explain the keyword clustering, competitor gap, Google Ads landing-page approach, Google AI Search guidance and ChatGPT Search eligibility logic used to build the starter.
