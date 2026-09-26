# Launch Checklist

## Brand and legal
- [ ] Check the final brand/domain/trademark before launch.
- [ ] Replace `CursivePilot` if needed in `src/config.mjs`.
- [ ] Set a real `CONTACT_EMAIL`.
- [ ] Review Privacy and Terms for the countries you serve.
- [ ] If adding analytics/ads, implement required consent before enabling GTM.

## Netlify
- [ ] Set `SITE_URL` to the final HTTPS domain.
- [ ] Add Supabase variables only if using the contact form.
- [ ] Add `GTM_ID` only when tracking/consent is ready.
- [ ] Confirm the custom domain is primary and HTTPS works.
- [ ] Confirm `/robots.txt` and `/sitemap.xml` return HTTP 200.

## Google Search
- [ ] Verify Search Console.
- [ ] Submit `/sitemap.xml`.
- [ ] Inspect the five main tool URLs.
- [ ] Run Rich Results Test on a tool page.
- [ ] Run PageSpeed Insights on mobile and desktop.
- [ ] Check that canonical URLs use the production domain.

## ChatGPT Search eligibility
- [ ] Confirm `OAI-SearchBot` is allowed in `/robots.txt`.
- [ ] If adding a WAF/CDN later, allow OpenAI's published searchbot IP ranges.
- [ ] Keep public explanatory content crawlable and visible as text.
- [ ] Do not expect or promise placement; search inclusion/ranking is not guaranteed.

## Google Ads
- [ ] Send each keyword theme to its matching tool page.
- [ ] Do not use misleading “AI” claims unless an actual AI feature exists.
- [ ] Test every final URL with Google Ads landing-page tools.
- [ ] Ensure the ad and final URL use the same domain.
- [ ] Track meaningful actions (`tool_copy`, `tool_download`) rather than only pageviews.
- [ ] Avoid intrusive popups/interstitials around the core tool.

## Product QA
- [ ] Test Chrome, Edge, Safari and Firefox.
- [ ] Test iPhone/Android viewport sizes.
- [ ] Test Unicode copy/paste in the platforms you mention publicly.
- [ ] Test PNG downloads.
- [ ] Test Print/Save PDF for A4 and US Letter.
- [ ] Confirm contact-form submissions reach Supabase.
