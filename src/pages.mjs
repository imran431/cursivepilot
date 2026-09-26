import { site, toolCards } from './config.mjs';

const cards = () => toolCards.map((card) => `
<article class="tool-card"><span class="badge">${card.badge}</span><h3><a href="${card.href}">${card.title}</a></h3><p>${card.description}</p></article>`).join('');

const faqHtml = (items=[]) => `<div class="faq">${items.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;
const crumbs = (label, href) => [{href:'/',label:'Home'},{href,label}];

const home = {
  path:'/',
  fontQuery:'family=Great+Vibes',
  title:`Free Cursive Generator & Handwriting Tools | ${site.name}`,
  description:'Create copyable cursive text, cursive-font styles, handwriting pages, calligraphy, signatures and printable handwriting worksheets in your browser.',
  content:`<section class="hero"><div class="shell hero-grid"><div><span class="eyebrow">Free browser-based writing tools</span><h1>Cursive, handwriting and calligraphy — without the clutter.</h1><p class="lede">Create copyable cursive text, realistic handwriting-style pages, calligraphy artwork, signature previews and printable practice sheets. The core tools run in your browser and do not require an account.</p><div class="hero-actions"><a class="button button-primary" href="/cursive-generator/">Open Cursive Generator</a><a class="button button-secondary" href="/handwriting-generator/">Create Handwriting</a></div></div><div class="hero-art" aria-hidden="true"><div class="paper-stack"><div class="paper-sheet"></div><div class="paper-sheet"></div><div class="paper-sheet"><div class="script-demo">Write beautifully.</div><div class="script-sub">One focused toolkit for cursive, handwriting, calligraphy and practice.</div></div></div></div></div></section>
  <section class="section section-soft"><div class="shell"><div class="section-head"><h2>Choose what you want to make</h2><p>Each tool solves a closely related writing task while keeping the site focused on one topic.</p></div><div class="tool-grid">${cards()}</div></div></section>
  <section class="section"><div class="shell content-grid"><article class="article"><h2>Copyable cursive, handwriting images and worksheets are different outputs</h2><p>Copyable cursive uses Unicode characters and remains text. Handwriting and calligraphy tools render exact visuals to a canvas for image export. Worksheets add guide rows for printable practice.</p><h2>Built for fast browser-side use</h2><p>The primary conversion and rendering work happens in your browser. This keeps the generators fast and avoids sending every phrase to a remote AI service.</p><h2>Use decorative text carefully</h2><p>Fancy Unicode can be useful for names, captions and short display text, but normal text is better for essential information and accessibility.</p></article><aside class="aside-card"><h2>Explore</h2><a href="/cursive-generator/">Cursive generator</a><a href="/handwriting-generator/">Handwriting generator</a><a href="/calligraphy-generator/">Calligraphy generator</a></aside></div></section>`
};

const cursiveFaq=[
 ['What is a cursive generator?','It converts ordinary letters into script-like Unicode characters that can be copied and pasted as text.'],
 ['Can I copy the result?','Yes. The main cursive styles remain Unicode text, although appearance can vary by device.'],
 ['Is this a downloadable font file?','No. The copyable output is Unicode text rather than a TTF or OTF font.']
];
const cursive={
 path:'/cursive-generator/',type:'tool',script:'/assets/unicode.js',
 title:`Cursive Generator – Copy & Paste Cursive Text | ${site.name}`,
 description:'Free cursive generator and cursive font generator for copy-and-paste script text. Search styles, save favorites and copy instantly.',
 features:['Copyable Unicode cursive text','Searchable style library','Favorite styles stored locally','One-click copy','Shareable links','Browser-side conversion'],
 breadcrumbs:crumbs('Cursive Generator','/cursive-generator/'),faqs:cursiveFaq,
 content:`<section class="tool-shell"><div class="shell"><div class="tool-intro"><span class="eyebrow">Copyable Unicode text</span><h1>Cursive Generator</h1><p class="lede">Turn normal text into copy-and-paste cursive styles for names, bios, captions and messages. Search the style library, save favorites on this device and copy any result in one click.</p></div><div class="tool-panel" data-unicode-tool><div class="tool-panel-head"><h2>Convert text to cursive</h2><span class="privacy-note">● Runs in your browser</span></div><div class="tool-body"><div class="field"><label for="cursive-input">Your text</label><textarea id="cursive-input" data-input maxlength="500">Write beautifully</textarea><div class="control-row"><span class="helper" data-counter>0 / 500</span><button class="button button-secondary button-small" type="button" data-example>Example</button><button class="button button-secondary button-small" type="button" data-clear>Clear</button><button class="button button-ghost button-small" type="button" data-share>Copy share link</button></div></div><div class="style-toolbar"><div class="field"><label for="style-search">Search styles</label><input id="style-search" data-style-search type="text" placeholder="Try cursive, gothic, modern…"></div><div class="field"><label for="style-category">Category</label><select id="style-category" data-style-category><option>All</option><option>Cursive</option><option>Classic</option><option>Modern</option><option>Gothic</option><option>Decorative</option></select></div><label class="favorite-filter"><input type="checkbox" data-favorites-only> Favorites only</label></div><div class="style-summary"><span data-style-count></span><span>Favorites stay only in this browser.</span></div><p class="status" data-status aria-live="polite"></p><div class="unicode-results" data-results></div></div></div></div></section>
 <section class="section section-soft"><div class="shell"><div class="section-head"><h2>Static cursive examples</h2><p>These examples are normal crawlable page text, so you can compare plain text with several Unicode styles even before the interactive generator loads.</p></div><div class="example-grid"><div class="example-card"><strong>Plain</strong><span>Cursive Pilot</span></div><div class="example-card"><strong>Script</strong><span>𝒞𝓊𝓇𝓈𝒾𝓋ℯ 𝒫𝒾𝓁ℴ𝓉</span></div><div class="example-card"><strong>Bold Script</strong><span>𝓒𝓾𝓻𝓼𝓲𝓿𝓮 𝓟𝓲𝓵𝓸𝓽</span></div><div class="example-card"><strong>Italic</strong><span>𝐶𝑢𝑟𝑠𝑖𝑣𝑒 𝑃𝑖𝑙𝑜𝑡</span></div></div></div></section>
 <section class="section"><div class="shell content-grid"><article class="article"><h2>What a cursive text generator actually changes</h2><p>CursivePilot works as a cursive font generator for copy-and-paste text by replacing many ordinary Latin letters with visually similar Unicode characters. The output remains text, not an uploaded image.</p><p>The appearance is controlled by the receiving device and its fonts, so the same Unicode string can look slightly different on another phone, browser or app. If exact visual appearance matters, use the <a href="/handwriting-generator/">handwriting generator</a> or <a href="/calligraphy-generator/">calligraphy generator</a> and export an image instead.</p><h2>Choose a style by purpose, not just appearance</h2><p>Script and bold-script styles are the closest match to what most people mean by cursive text. Italic and modern styles are cleaner. Gothic, circled and fullwidth styles are more decorative and may be less readable. Essential information should stay in ordinary characters.</p><h2>Will cursive text work in every app?</h2><p>No generator can guarantee identical support everywhere. Use our <a href="/cursive-text-compatibility/">Cursive Text Compatibility Lab</a> to create a test string, then paste it into the actual app and device you care about.</p><h2>Unicode cursive vs. a real script font</h2><p>Unicode text is best when copyability matters. A real font changes how normal characters are drawn. Our <a href="/guides/unicode-cursive-vs-fonts/">Unicode cursive vs. script fonts guide</a> explains the tradeoffs.</p><h2>FAQ</h2>${faqHtml(cursiveFaq)}</article><aside class="aside-card"><h2>Related tools</h2><a href="/cursive-text-compatibility/">Compatibility Lab</a><a href="/handwriting-generator/">Handwriting generator</a><a href="/calligraphy-generator/">Calligraphy generator</a><a href="/signature-generator/">Signature generator</a></aside></div></section>`
};

const handwritingFaq=[
 ['What does the handwriting generator create?','It renders typed text onto a handwriting-style page using selectable script fonts, spacing and paper settings.'],
 ['Can I download it?','Yes. Download the first page as PNG or use Print / Save PDF for all pages.'],
 ['Does it clone real handwriting?','No. This version uses script fonts and natural variation rather than copying a person’s biometric handwriting.']
];
const handwriting={
 path:'/handwriting-generator/',type:'tool',script:'/assets/handwriting.js',
 fontQuery:'family=Caveat:wght@400..700&family=Dancing+Script:wght@400..700&family=Homemade+Apple&family=Kalam:wght@300;400;700&family=Patrick+Hand&family=Satisfy',
 title:`Handwriting Generator – Text to Handwriting PNG & PDF | ${site.name}`,
 description:'Turn typed text into a handwriting-style page. Choose script, ink, paper and spacing, then download PNG or save as PDF.',
 features:['Text to handwriting-style page','Multiple script styles','Paper and ink controls','PNG download','Print/PDF workflow'],
 breadcrumbs:crumbs('Handwriting Generator','/handwriting-generator/'),faqs:handwritingFaq,
 content:`<section class="tool-shell"><div class="shell"><div class="tool-intro"><span class="eyebrow">Text to handwriting</span><h1>Handwriting Generator</h1><p class="lede">Turn typed text into a handwriting-style page, customize the appearance and export it.</p></div><div class="tool-panel" data-handwriting-tool><div class="tool-panel-head"><h2>Create a handwriting page</h2><span class="privacy-note">● Rendering happens locally</span></div><div class="tool-body"><div class="canvas-layout"><div class="settings-panel">
 <div class="field field-full"><label for="hw-text">Text</label><textarea id="hw-text" data-text maxlength="6000">Dear friend,

A handwritten note can make a simple message feel more personal.</textarea></div>
 <div class="field"><label for="hw-font">Style</label><select id="hw-font" data-font><option>Dancing Script</option><option>Caveat</option><option>Kalam</option><option>Patrick Hand</option><option>Homemade Apple</option><option>Satisfy</option></select></div>
 <div class="field"><label for="hw-paper">Paper</label><select id="hw-paper" data-paper><option value="notebook">Notebook</option><option value="lined">Lined</option><option value="warm">Warm paper</option><option value="plain">Plain</option><option value="grid">Grid</option></select></div>
 <div class="field"><label for="hw-page">Page size</label><select id="hw-page" data-page-size><option value="a4">A4</option><option value="letter">US Letter</option></select></div>
 <div class="field"><label for="hw-ink">Ink color</label><input id="hw-ink" data-ink type="color" value="#173765"></div>
 <div class="field"><label for="hw-size">Font size</label><input id="hw-size" data-font-size type="range" min="24" max="54" value="34"></div>
 <div class="field"><label for="hw-line">Line height</label><input id="hw-line" data-line-height type="range" min="38" max="74" value="52"></div>
 <div class="field"><label for="hw-var">Natural variation</label><input id="hw-var" data-variation type="range" min="0" max="1" step="0.05" value="0.45"></div>
 <div class="control-row field-full"><button class="button button-primary" type="button" data-download-png>Download PNG</button><button class="button button-secondary" type="button" data-print>Print / Save PDF</button></div><p class="status field-full" data-status></p></div>
 <div><div class="preview-stage" data-preview></div><p class="preview-caption" data-preview-caption></p></div></div></div></div></div></section>
 <section class="section"><div class="shell content-grid"><article class="article"><h2>Text to handwriting for visual output</h2><p>This tool is useful when you care about paper, ink, spacing and the exact appearance of the result. The output is rendered as an image instead of copyable Unicode.</p><h2>What it does not do</h2><p>It does not identify or imitate a specific person’s handwriting. Review every generated page before using it.</p><h2>FAQ</h2>${faqHtml(handwritingFaq)}</article><aside class="aside-card"><h2>Related</h2><a href="/cursive-generator/">Copyable cursive</a><a href="/handwriting-worksheet-generator/">Worksheets</a></aside></div></section>`
};

const calligraphyFaq=[
 ['Can I create a transparent PNG?','Yes. Enable transparent background before downloading.'],
 ['Is calligraphy output copyable text?','No. The calligraphy preview is rendered as an image so its exact visual style is preserved.']
];
const calligraphy={
 path:'/calligraphy-generator/',type:'tool',script:'/assets/calligraphy.js',
 fontQuery:'family=Allura&family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Pacifico&family=Sacramento&family=Satisfy',
 title:`Calligraphy Generator – Create & Download Calligraphy PNG | ${site.name}`,
 description:'Create calligraphy-style lettering online and download a PNG with a solid or transparent background.',
 features:['Multiple script fonts','Ink and background controls','Transparent PNG export','Browser-side rendering'],
 breadcrumbs:crumbs('Calligraphy Generator','/calligraphy-generator/'),faqs:calligraphyFaq,
 content:`<section class="tool-shell"><div class="shell"><div class="tool-intro"><span class="eyebrow">Visual lettering</span><h1>Calligraphy Generator</h1><p class="lede">Create elegant calligraphy-style lettering for names, invitations, quotes and design mockups.</p></div><div class="tool-panel" data-calligraphy-tool><div class="tool-panel-head"><h2>Design your calligraphy</h2><span class="privacy-note">● Runs in your browser</span></div><div class="tool-body"><div class="canvas-layout"><div class="settings-panel">
 <div class="field field-full"><label for="cal-text">Text</label><textarea id="cal-text" data-text maxlength="400">Beautiful words</textarea></div>
 <div class="field"><label for="cal-font">Style</label><select id="cal-font" data-font><option>Great Vibes</option><option>Allura</option><option>Sacramento</option><option>Satisfy</option><option>Pacifico</option><option>Dancing Script</option></select></div>
 <div class="field"><label for="cal-size">Text size</label><input id="cal-size" data-font-size type="range" min="54" max="160" value="104"></div>
 <div class="field"><label for="cal-ink">Ink</label><input id="cal-ink" data-ink type="color" value="#17382f"></div>
 <div class="field"><label for="cal-bg">Background</label><input id="cal-bg" data-bg type="color" value="#fffdf8"></div>
 <label class="field"><span class="label">Transparent background</span><input data-transparent type="checkbox"></label>
 <div class="control-row field-full"><button class="button button-primary" type="button" data-download>Download PNG</button></div><p class="status field-full" data-status></p></div>
 <div><div class="preview-stage" data-preview></div><p class="preview-caption">Transparent export works well for design overlays.</p></div></div></div></div></div></section>
 <section class="section"><div class="shell content-grid"><article class="article"><h2>Calligraphy for names and visual designs</h2><p>Use this tool when you need a consistent script appearance instead of copyable Unicode text.</p><h2>FAQ</h2>${faqHtml(calligraphyFaq)}</article><aside class="aside-card"><h2>Related</h2><a href="/cursive-generator/">Cursive text</a><a href="/signature-generator/">Signature generator</a></aside></div></section>`
};

const signatureFaq=[
 ['Does this create a legal signature?','It creates a visual signature-style name preview. It does not determine legal validity.'],
 ['Can I download a transparent PNG?','Yes. The exported canvas uses a transparent background.']
];
const signature={
 path:'/signature-generator/',type:'tool',script:'/assets/signature.js',
 fontQuery:'family=Allura&family=Great+Vibes&family=Sacramento&family=Satisfy',
 title:`Cursive Signature & Name Generator – Transparent PNG | ${site.name}`,
 description:'Preview your name in cursive signature styles, change the ink and download a transparent PNG.',
 features:['Cursive name previews','Multiple script fonts','Ink color control','Underline flourish','Transparent PNG export'],
 breadcrumbs:crumbs('Signature Generator','/signature-generator/'),faqs:signatureFaq,
 content:`<section class="tool-shell"><div class="shell"><div class="tool-intro"><span class="eyebrow">Names & signature-style lettering</span><h1>Cursive Signature & Name Generator</h1><p class="lede">Enter a name, compare script styles and download a transparent signature-style PNG.</p></div><div class="tool-panel" data-signature-tool><div class="tool-panel-head"><h2>Preview your name</h2><span class="privacy-note">● Rendered locally</span></div><div class="tool-body">
 <div class="input-grid"><div class="field field-full"><label for="sig-name">Name</label><input id="sig-name" data-name type="text" maxlength="60" value="Alex Morgan"></div><div class="field"><label for="sig-ink">Ink</label><input id="sig-ink" data-ink type="color" value="#17382f"></div><label class="field"><span class="label">Add underline flourish</span><input data-underline type="checkbox" checked></label></div>
 <div class="signature-grid">
 <button class="signature-card" type="button" data-signature-card data-font="Great Vibes"><span class="signature-name" data-card-name style="font-family:'Great Vibes',cursive"></span><span class="signature-meta">Great Vibes</span></button>
 <button class="signature-card" type="button" data-signature-card data-font="Allura"><span class="signature-name" data-card-name style="font-family:Allura,cursive"></span><span class="signature-meta">Allura</span></button>
 <button class="signature-card" type="button" data-signature-card data-font="Sacramento"><span class="signature-name" data-card-name style="font-family:Sacramento,cursive"></span><span class="signature-meta">Sacramento</span></button>
 <button class="signature-card" type="button" data-signature-card data-font="Satisfy"><span class="signature-name" data-card-name style="font-family:Satisfy,cursive"></span><span class="signature-meta">Satisfy</span></button>
 </div><div class="preview-stage" data-preview style="min-height:250px;margin-top:18px"></div><div class="control-row" style="margin-top:14px"><button class="button button-primary" type="button" data-download>Download transparent PNG</button></div><p class="status" data-status></p></div></div></div></section>
 <section class="section"><div class="shell content-grid"><article class="article"><h2>A cursive name generator with image export</h2><p>Preview how a name looks in flowing script before using it in a personal design, invitation or profile image.</p><h2>Important limit</h2><p>The output is a visual asset and does not verify identity, consent or legal validity.</p><h2>FAQ</h2>${faqHtml(signatureFaq)}</article><aside class="aside-card"><h2>Related</h2><a href="/calligraphy-generator/">Calligraphy</a><a href="/cursive-generator/">Cursive text</a></aside></div></section>`
};

const worksheetFaq=[
 ['Can I make my own practice sheet?','Yes. Enter one phrase per line and choose cursive or print plus trace, copy or mixed mode.'],
 ['Can I save worksheets as PDF?','Use Print / Save PDF for all generated pages.']
];
const worksheet={
 path:'/handwriting-worksheet-generator/',type:'tool',script:'/assets/worksheet.js',
 fontQuery:'family=Dancing+Script:wght@400..700&family=Patrick+Hand',
 title:`Handwriting Worksheet Generator – Cursive & Tracing Sheets | ${site.name}`,
 description:'Create printable handwriting practice worksheets from your own words. Choose cursive or print and save as PNG or PDF.',
 features:['Custom phrases','Cursive or print','Trace, copy and mixed modes','Guide lines','A4 and US Letter','PNG and print/PDF'],
 breadcrumbs:crumbs('Worksheet Generator','/handwriting-worksheet-generator/'),faqs:worksheetFaq,
 content:`<section class="tool-shell"><div class="shell"><div class="tool-intro"><span class="eyebrow">Printable practice</span><h1>Handwriting Worksheet Generator</h1><p class="lede">Create practice sheets from your own names, words or sentences.</p></div><div class="tool-panel" data-worksheet-tool><div class="tool-panel-head"><h2>Build a practice worksheet</h2><span class="privacy-note">● Runs locally</span></div><div class="tool-body"><div class="canvas-layout"><div class="settings-panel">
 <div class="field field-full"><label for="ws-title">Worksheet title</label><input id="ws-title" data-title type="text" maxlength="50" value="Handwriting Practice"></div>
 <div class="field field-full"><label for="ws-text">Practice text — one item per line</label><textarea id="ws-text" data-text>My name is Alex
Practice makes progress
Write slowly and clearly
The quick brown fox</textarea></div>
 <div class="field"><label for="ws-script">Writing style</label><select id="ws-script" data-script><option value="cursive">Cursive</option><option value="print">Print</option></select></div>
 <div class="field"><label for="ws-mode">Practice mode</label><select id="ws-mode" data-mode><option value="mixed">Trace + copy</option><option value="trace">Trace</option><option value="copy">Copy</option></select></div>
 <div class="field"><label for="ws-page">Page size</label><select id="ws-page" data-page-size><option value="letter">US Letter</option><option value="a4">A4</option></select></div>
 <div class="control-row field-full"><button class="button button-primary" type="button" data-download-png>Download page 1 PNG</button><button class="button button-secondary" type="button" data-print>Print / Save PDF</button></div><p class="status field-full" data-status></p></div>
 <div><div class="preview-stage" data-preview></div><p class="preview-caption" data-preview-caption></p></div></div></div></div></div></section>
 <section class="section"><div class="shell content-grid"><article class="article"><h2>Custom handwriting practice</h2><p>Create trace, copy or mixed practice rows from the exact words a learner needs.</p><h2>Printing tips</h2><p>Use Print / Save PDF, choose the correct page size and review the printer preview before printing.</p><h2>FAQ</h2>${faqHtml(worksheetFaq)}</article><aside class="aside-card"><h2>Related</h2><a href="/cursive-alphabet/">Cursive alphabet</a><a href="/guides/how-to-practice-cursive/">Practice guide</a></aside></div></section>`
};

const alphabetLetters=[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((letter)=>`<div class="alpha-card"><div class="alpha-script">${letter}${letter.toLowerCase()}</div><div class="alpha-plain">${letter} ${letter.toLowerCase()}</div></div>`).join('');
const alphabet={
 path:'/cursive-alphabet/',fontQuery:'family=Dancing+Script:wght@400..700',
 title:`Cursive Alphabet A–Z – Uppercase & Lowercase Reference | ${site.name}`,
 description:'See the cursive alphabet A to Z in uppercase and lowercase and create printable practice worksheets.',
 breadcrumbs:crumbs('Cursive Alphabet','/cursive-alphabet/'),
 content:`<section class="section"><div class="shell"><div class="tool-intro"><span class="eyebrow">A–Z reference</span><h1>Cursive Alphabet</h1><p class="lede">A quick uppercase and lowercase script reference. Letterforms vary by handwriting method and font.</p></div><div class="alpha-grid">${alphabetLetters}</div></div></section><section class="section section-soft"><div class="shell"><h2>Practice letters in words</h2><p>After reviewing individual forms, try a name in the <a href="/cursive-generator/">cursive generator</a> or make a <a href="/handwriting-worksheet-generator/">practice worksheet</a>.</p></div></section>`
};

const guideUnicode={
 path:'/guides/unicode-cursive-vs-fonts/',type:'guide',published:'2026-09-27',modified:'2026-09-27',
 title:`Unicode Cursive vs. Script Fonts: What Changes When You Copy Text? | ${site.name}`,
 description:'Understand the difference between copyable Unicode cursive, script fonts and rendered handwriting images, including compatibility and accessibility tradeoffs.',
 breadcrumbs:crumbs('Unicode Cursive vs Fonts','/guides/unicode-cursive-vs-fonts/'),
 content:`<section class="section"><div class="shell content-grid"><article class="article"><span class="eyebrow">Practical guide</span><h1>Unicode cursive vs. script fonts</h1><p class="lede">They can look similar on screen, but they behave differently when you copy, paste, search, edit or export them.</p><p class="article-meta">Published and reviewed by CursivePilot Editorial · September 27, 2026</p><h2>The short version</h2><table><thead><tr><th>Method</th><th>What is stored</th><th>Best for</th></tr></thead><tbody><tr><td>Unicode cursive</td><td>Special Unicode characters</td><td>Copy-and-paste display text</td></tr><tr><td>Script font</td><td>Normal letters + font choice</td><td>Designs and webpages</td></tr><tr><td>Rendered image</td><td>Pixels</td><td>Preserving an exact visual appearance</td></tr></tbody></table><h2>What Unicode cursive is</h2><p>A Unicode cursive generator substitutes many ordinary Latin letters with characters from Unicode blocks that include mathematical script, italic and other styled alphabets. The result is still text.</p><h2>Why the same text can look different</h2><p>Unicode defines characters, but the operating system or app still chooses the font used to draw them. A different fallback font can change stroke shape, spacing or weight, and missing glyphs can appear as boxes.</p><h2>How script fonts differ</h2><p>A script font keeps ordinary text characters and changes only the visual glyph design. Exact appearance is preserved only where that font is available, so PNG or PDF export is safer when appearance must not change.</p><h2>Accessibility and search</h2><p>Decorative Unicode can reduce readability and may be announced unexpectedly by assistive technologies. Search, moderation and username systems can also treat visually similar Unicode differently from ordinary letters. Keep important information in normal text.</p><h2>How to test compatibility</h2><ol><li>Create a short sample in the <a href="/cursive-generator/">Cursive Generator</a>.</li><li>Open the real destination app.</li><li>Paste the sample into the exact field you plan to use.</li><li>Check for missing glyphs, broken spacing and readability.</li><li>If support is poor, use a simpler style or an exported image.</li></ol><p>Our <a href="/cursive-text-compatibility/">Compatibility Lab</a> makes this process quicker without pretending one browser preview can certify every platform.</p><h2>When to choose each format</h2><p>Choose Unicode when copyability matters, a script font when you control the design environment, and an image when you need the same visual result everywhere.</p></article><aside class="aside-card"><h2>Try the tools</h2><a href="/cursive-generator/">Cursive generator</a><a href="/cursive-text-compatibility/">Compatibility Lab</a><a href="/handwriting-generator/">Handwriting generator</a></aside></div></section>`
};

const guidePractice={
 path:'/guides/how-to-practice-cursive/',type:'guide',
 title:`How to Practice Cursive: A Simple Printable Routine | ${site.name}`,
 description:'A simple routine using trace, copy and independent writing practice with custom worksheets.',
 breadcrumbs:crumbs('How to Practice Cursive','/guides/how-to-practice-cursive/'),
 content:`<section class="section"><div class="shell content-grid"><article class="article"><span class="eyebrow">Practice guide</span><h1>How to practice cursive with short, focused worksheets</h1><p class="lede">Keep sessions short and focus on one small target at a time.</p><h2>A simple routine</h2><ol><li>Choose a name, letter join or short sentence.</li><li>Trace the model slowly.</li><li>Copy it while looking at the model.</li><li>Write it once without tracing.</li><li>Compare spacing and legibility.</li></ol><h2>Create a custom sheet</h2><p>Use the <a href="/handwriting-worksheet-generator/">worksheet generator</a> for trace, copy and mixed practice.</p></article><aside class="aside-card"><h2>Related</h2><a href="/cursive-alphabet/">Cursive alphabet</a><a href="/handwriting-worksheet-generator/">Worksheet generator</a></aside></div></section>`
};

const compatibility={
 path:'/cursive-text-compatibility/',type:'tool',script:'/assets/compatibility.js',
 title:`Cursive Text Compatibility Lab – Test Unicode Styles | ${site.name}`,
 description:'Create a cursive Unicode test string, preview common layout sizes, then copy it into the real app or device you need to verify.',
 features:['Unicode test string','Multiple cursive styles','Copy for real-device testing','Browser preview layouts','No account required'],
 breadcrumbs:crumbs('Cursive Text Compatibility Lab','/cursive-text-compatibility/'),
 content:`<section class="tool-shell"><div class="shell"><div class="tool-intro"><span class="eyebrow">Real-world copy/paste testing</span><h1>Cursive Text Compatibility Lab</h1><p class="lede">A browser preview cannot certify every social app or phone. This lab gives you a repeatable test string so you can paste the exact Unicode into the real destination and check it yourself.</p></div><div class="tool-panel" data-compatibility-lab><div class="tool-panel-head"><h2>Create a compatibility test</h2><span class="privacy-note">● Runs in your browser</span></div><div class="tool-body"><div class="input-grid"><div class="field"><label for="compat-text">Test text</label><input id="compat-text" data-compat-input type="text" maxlength="180" value="CursivePilot test"></div><div class="field"><label for="compat-style">Style</label><select id="compat-style" data-compat-style></select></div></div><div class="compat-output" data-compat-output></div><div class="control-row"><button class="button button-primary" type="button" data-compat-copy>Copy test text</button></div><p class="status" data-status aria-live="polite"></p><h3>Layout previews</h3><p class="helper">These cards simulate layout size only. They do not claim to reproduce another platform's font engine.</p><div class="preview-grid"><div class="platform-preview"><strong>Short profile line</strong><span data-preview-text></span></div><div class="platform-preview"><strong>Caption line</strong><span data-preview-text></span></div><div class="platform-preview"><strong>Chat message</strong><span data-preview-text></span></div><div class="platform-preview"><strong>Display name</strong><span data-preview-text></span></div></div></div></div></div></section><section class="section"><div class="shell content-grid"><article class="article"><h2>Why compatibility has to be tested in the real destination</h2><p>Copyable cursive is Unicode text. Final glyphs are selected by the fonts and rules available on the receiving operating system, browser or app.</p><h2>A reliable test method</h2><ol><li>Use a sample containing uppercase, lowercase, numbers and punctuation.</li><li>Copy the generated string.</li><li>Paste it into the exact field and app you plan to use.</li><li>Check another device if your audience uses multiple platforms.</li><li>If any glyph fails, try Script, Italic or ordinary text.</li></ol><h2>What we do not claim</h2><p>CursivePilot does not publish “100% compatible” badges for third-party apps without direct evidence. Platform support can change independently of this site.</p></article><aside class="aside-card"><h2>Related</h2><a href="/cursive-generator/">Cursive generator</a><a href="/guides/unicode-cursive-vs-fonts/">Unicode vs fonts guide</a></aside></div></section>`
};

const howItWorks={
 path:'/how-it-works/',title:`How ${site.name} Works – Privacy, Output Types & Limits`,
 description:`Learn how ${site.name} creates copyable cursive, handwriting, calligraphy, signatures and worksheets.`,
 breadcrumbs:crumbs('How It Works','/how-it-works/'),
 content:`<section class="section"><div class="shell content-grid"><article class="article"><span class="eyebrow">Transparent by design</span><h1>How the tools work</h1><p class="lede">The site separates copyable Unicode from rendered visual lettering so you know exactly what output you are creating.</p><h2>Browser-side processing</h2><p>Cursive conversion uses JavaScript character mapping. Handwriting, calligraphy, signature and worksheet tools draw onto HTML canvas elements.</p><h2>Web fonts</h2><p>Visual tools may request font files from Google Fonts. You can replace them with self-hosted or system fonts if your deployment requires it.</p><h2>About AI claims</h2><p>This version does not claim to clone real handwriting with AI. If a machine-learning feature is added later, describe exactly what it does.</p><h2>Stored data</h2><p>The generators themselves do not require an account or database. If you submit the optional contact form, Netlify Forms processes that submission for the site owner.</p></article><aside class="aside-card"><h2>Policies</h2><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></aside></div></section>`
};

const about={
 path:'/about/',title:`About ${site.name} – Focused Cursive & Handwriting Tools`,
 description:`${site.name} is a focused collection of browser-based cursive, handwriting, calligraphy, signature and worksheet tools.`,
 breadcrumbs:crumbs('About','/about/'),
 content:`<section class="section"><div class="shell content-grid"><article class="article"><span class="eyebrow">About the project</span><h1>An independent writing-tool project</h1><p class="lede">${site.name} focuses on one job family: turning typed words into useful script, handwriting and practice outputs without forcing an account.</p><h2>Editorial approach</h2><p>We explain what each tool actually does, including limitations. We do not label simple Unicode conversion or font rendering as AI, and we avoid claiming compatibility with third-party platforms unless it can be verified.</p><h2>How pages are reviewed</h2><p>Tool instructions and technical guides are reviewed for consistency with the implementation. Search-facing content is written to answer the user's task rather than to create near-duplicate keyword pages.</p><h2>Current review</h2><p>Site content and SEO implementation were reviewed by CursivePilot Editorial on September 27, 2026.</p></article><aside class="aside-card"><h2>Transparency</h2><a href="/how-it-works/">How it works</a><a href="/cursive-text-compatibility/">Compatibility Lab</a><a href="/privacy/">Privacy</a></aside></div></section>`
};

const privacy={
 path:'/privacy/',title:`Privacy Policy | ${site.name}`,
 description:`Privacy information for ${site.name}, including browser-side processing, web font requests and contact form data.`,
 breadcrumbs:crumbs('Privacy','/privacy/'),
 content:`<section class="section"><div class="shell content-grid"><article class="article"><h1>Privacy Policy</h1><p class="lede">CursivePilot is designed so the core writing tools work without an account or database.</p><p class="article-meta">Effective September 27, 2026</p><h2>Generator input</h2><p>Text entered into the generators is processed in your browser by the site's JavaScript and canvas code. The current version does not send generator text to a handwriting model or CursivePilot database.</p><h2>Favorite styles</h2><p>If you favorite a cursive style, that preference is stored in your browser's local storage and is not synced to an account.</p><h2>Web fonts</h2><p>Some visual tools load font resources from Google Fonts. Your browser may connect to Google's font services to retrieve those files.</p><h2>Contact form</h2><p>If you submit the contact form, the information you enter is processed by Netlify Forms so the site owner can receive and review the message.</p><h2>Hosting and technical logs</h2><p>The site is hosted on Netlify, whose infrastructure may process routine request information needed to deliver and secure the site.</p><h2>Analytics and advertising</h2><p>No analytics or advertising tag is enabled by the source code unless a valid Google Tag Manager ID is configured for deployment.</p></article><aside class="aside-card"><h2>Related</h2><a href="/how-it-works/">How it works</a><a href="/terms/">Terms</a><a href="/contact/">Contact</a></aside></div></section>`
};

const terms={
 path:'/terms/',title:`Terms of Use | ${site.name}`,
 description:`Starter terms for using ${site.name}'s cursive, handwriting, calligraphy, signature and worksheet tools.`,
 breadcrumbs:crumbs('Terms','/terms/'),
 content:`<section class="section"><div class="shell content-grid"><article class="article"><h1>Terms of Use</h1><p class="lede">By using CursivePilot, you agree to use the tools lawfully and to review generated output before relying on it.</p><p class="article-meta">Effective September 27, 2026</p><h2>Permitted use</h2><p>You may use the tools for lawful personal, educational and design purposes. You are responsible for ensuring that your use complies with applicable rules and third-party rights.</p><h2>Signature-style output</h2><p>The signature generator creates decorative name lettering. It does not verify identity, consent, authorship or legal validity.</p><h2>Compatibility and availability</h2><p>Unicode rendering, browser behavior, fonts and third-party platforms can change. CursivePilot does not guarantee that every style will display identically everywhere.</p><h2>No warranty</h2><p>The tools are provided on an as-available basis. Review exports, print previews and copied text before using them in important work.</p><h2>Abuse</h2><p>Do not use the service to impersonate another person, misrepresent authorization, violate intellectual-property rights or support unlawful activity.</p></article><aside class="aside-card"><h2>Related</h2><a href="/privacy/">Privacy</a><a href="/how-it-works/">How it works</a><a href="/contact/">Contact</a></aside></div></section>`
};

const contact={
 path:'/contact/',title:`Contact ${site.name}`,
 description:`Contact ${site.name} with a bug report, compatibility issue or feature suggestion.`,
 breadcrumbs:crumbs('Contact','/contact/'),
 content:`<section class="section"><div class="shell contact-grid"><div><span class="eyebrow">Contact</span><h1>Tell us what should work better</h1><p class="lede">Send a concise bug report or feature suggestion.</p>${site.email ? `<p>Support email: <strong>${site.email}</strong></p>` : ''}</div><form class="form-card" name="contact" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="website"><input type="hidden" name="form-name" value="contact"><div class="honeypot" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><div class="field"><label for="contact-email">Email (optional)</label><input id="contact-email" name="email" type="email" maxlength="200"></div><div class="field" style="margin-top:14px"><label for="contact-message">Message</label><textarea id="contact-message" name="message" minlength="10" maxlength="4000" required></textarea></div><button class="button button-primary" style="margin-top:14px" type="submit">Send message</button><p class="helper">This form is handled by Netlify Forms. No account is required.</p></form></div></section>`
};

const thanks={
 path:'/thanks/',title:`Message Sent | ${site.name}`,
 description:'Thanks for contacting CursivePilot.',
 noindex:true,
 breadcrumbs:crumbs('Message Sent','/thanks/'),
 content:`<section class="section"><div class="shell"><span class="eyebrow">Message sent</span><h1>Thanks for the feedback.</h1><p class="lede">Your message was submitted successfully.</p><div class="hero-actions"><a class="button button-primary" href="/cursive-generator/">Back to Cursive Generator</a><a class="button button-secondary" href="/">Home</a></div></div></section>`
};

export const pages=[home,cursive,handwriting,calligraphy,signature,worksheet,alphabet,guideUnicode,guidePractice,compatibility,howItWorks,about,privacy,terms,contact,thanks];
