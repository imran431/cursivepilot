import { site, toolCards } from './config.mjs';

const cards = () => toolCards.map((card) => `
<article class="tool-card"><span class="badge">${card.badge}</span><h3><a href="${card.href}">${card.title}</a></h3><p>${card.description}</p></article>`).join('');

const faqHtml = (items=[]) => `<div class="faq">${items.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;
const crumbs = (label, href) => [{href:'/',label:'Home'},{href,label}];

const home = {
  path:'/',
  fontQuery:'family=Great+Vibes',
  title:`Free Cursive Generator & Handwriting Tools | ${site.name}`,
  description:'Create copyable cursive text, handwriting pages, calligraphy, signatures and printable handwriting worksheets in your browser.',
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
 description:'Free cursive generator for copy-and-paste script text. Type once, compare styles and copy instantly.',
 features:['Copyable Unicode cursive text','Multiple decorative styles','One-click copy','Shareable links','Browser-side conversion'],
 breadcrumbs:crumbs('Cursive Generator','/cursive-generator/'),faqs:cursiveFaq,
 content:`<section class="tool-shell"><div class="shell"><div class="tool-intro"><span class="eyebrow">Copyable Unicode text</span><h1>Cursive Generator</h1><p class="lede">Turn normal text into copy-and-paste cursive styles for names, bios, captions and messages.</p></div><div class="tool-panel" data-unicode-tool><div class="tool-panel-head"><h2>Convert text to cursive</h2><span class="privacy-note">● Runs in your browser</span></div><div class="tool-body"><div class="field"><label for="cursive-input">Your text</label><textarea id="cursive-input" data-input maxlength="500">Write beautifully</textarea><div class="control-row"><span class="helper" data-counter>0 / 500</span><button class="button button-secondary button-small" type="button" data-example>Example</button><button class="button button-secondary button-small" type="button" data-clear>Clear</button><button class="button button-ghost button-small" type="button" data-share>Copy share link</button></div></div><p class="status" data-status aria-live="polite"></p><div class="unicode-results" data-results></div></div></div></div></section>
 <section class="section"><div class="shell content-grid"><article class="article"><h2>How the cursive generator works</h2><p>The tool maps plain letters to Unicode script and decorative character sets. Because the result is text rather than a screenshot, you can copy and paste it into many compatible apps.</p><h2>Cursive Unicode vs. a real script font</h2><p>Unicode is best when copyability matters. If exact visual appearance matters more, use the <a href="/handwriting-generator/">handwriting generator</a> or <a href="/calligraphy-generator/">calligraphy generator</a>.</p><h2>FAQ</h2>${faqHtml(cursiveFaq)}</article><aside class="aside-card"><h2>Related tools</h2><a href="/handwriting-generator/">Handwriting generator</a><a href="/calligraphy-generator/">Calligraphy generator</a><a href="/signature-generator/">Signature generator</a></aside></div></section>`
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
 path:'/guides/unicode-cursive-vs-fonts/',type:'guide',
 title:`Unicode Cursive vs. Script Fonts: What Changes When You Copy Text? | ${site.name}`,
 description:'Understand the difference between copyable Unicode cursive, web fonts and rendered handwriting images.',
 breadcrumbs:crumbs('Unicode Cursive vs Fonts','/guides/unicode-cursive-vs-fonts/'),
 content:`<section class="section"><div class="shell content-grid"><article class="article"><span class="eyebrow">Practical guide</span><h1>Unicode cursive vs. script fonts</h1><p class="lede">They may look similar, but they behave differently after you copy, paste, export or share them.</p><h2>Unicode cursive</h2><p>Copyable cursive tools substitute ordinary characters with script-like Unicode characters. The receiving device still controls the exact glyph appearance.</p><h2>Script fonts</h2><p>A script font styles ordinary text visually. To preserve that exact look, export it as an image or use the same font in the destination application.</p><h2>Accessibility</h2><p>Decorative Unicode can be harder for assistive technology and search systems to interpret, so keep essential information in normal text.</p></article><aside class="aside-card"><h2>Try the tools</h2><a href="/cursive-generator/">Cursive generator</a><a href="/handwriting-generator/">Handwriting generator</a></aside></div></section>`
};

const guidePractice={
 path:'/guides/how-to-practice-cursive/',type:'guide',
 title:`How to Practice Cursive: A Simple Printable Routine | ${site.name}`,
 description:'A simple routine using trace, copy and independent writing practice with custom worksheets.',
 breadcrumbs:crumbs('How to Practice Cursive','/guides/how-to-practice-cursive/'),
 content:`<section class="section"><div class="shell content-grid"><article class="article"><span class="eyebrow">Practice guide</span><h1>How to practice cursive with short, focused worksheets</h1><p class="lede">Keep sessions short and focus on one small target at a time.</p><h2>A simple routine</h2><ol><li>Choose a name, letter join or short sentence.</li><li>Trace the model slowly.</li><li>Copy it while looking at the model.</li><li>Write it once without tracing.</li><li>Compare spacing and legibility.</li></ol><h2>Create a custom sheet</h2><p>Use the <a href="/handwriting-worksheet-generator/">worksheet generator</a> for trace, copy and mixed practice.</p></article><aside class="aside-card"><h2>Related</h2><a href="/cursive-alphabet/">Cursive alphabet</a><a href="/handwriting-worksheet-generator/">Worksheet generator</a></aside></div></section>`
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
 content:`<section class="section"><div class="shell"><span class="eyebrow">About the project</span><h1>A focused writing-tool site</h1><p class="lede">${site.name} is built around one narrow job family: turning typed words into useful script, handwriting and practice outputs.</p><h2>Why stay focused?</h2><p>Visitors can move naturally from copyable cursive to image exports, signatures and printable worksheets without entering an unrelated tool directory.</p><h2>Editorial approach</h2><p>We explain what each tool actually does, including limitations, rather than relying on vague AI marketing language.</p></div></section>`
};

const privacy={
 path:'/privacy/',title:`Privacy Policy | ${site.name}`,
 description:`Privacy information for ${site.name}, including browser-side processing, web font requests and contact form data.`,
 breadcrumbs:crumbs('Privacy','/privacy/'),
 content:`<section class="section"><div class="shell"><h1>Privacy Policy</h1><p class="lede">Update this starter policy before public launch to match your final analytics, advertising and legal requirements.</p><h2>Generator input</h2><p>The included generators process their main input in the browser and do not send generator text to a model API.</p><h2>Contact form</h2><p>If you submit the contact form, the form fields are sent to Netlify Forms so the site owner can receive and review the message.</p><h2>Analytics and advertising</h2><p>No Google Analytics or advertising tag is installed by default. If you add one, update this policy and implement any required consent controls.</p></div></section>`
};

const terms={
 path:'/terms/',title:`Terms of Use | ${site.name}`,
 description:`Starter terms for using ${site.name}'s cursive, handwriting, calligraphy, signature and worksheet tools.`,
 breadcrumbs:crumbs('Terms','/terms/'),
 content:`<section class="section"><div class="shell"><h1>Terms of Use</h1><p class="lede">These are starter terms and should be reviewed before commercial launch.</p><h2>Permitted use</h2><p>Use the tools for lawful personal, educational and design purposes.</p><h2>No identity verification</h2><p>Signature-style and handwriting outputs do not verify identity, consent or legal validity.</p><h2>Compatibility</h2><p>Browser, font and Unicode support can vary, so review final output before relying on it.</p></div></section>`
};

const contact={
 path:'/contact/',title:`Contact ${site.name}`,
 description:`Contact ${site.name} with a bug report, compatibility issue or feature suggestion.`,
 breadcrumbs:crumbs('Contact','/contact/'),
 content:`<section class="section"><div class="shell contact-grid"><div><span class="eyebrow">Contact</span><h1>Tell us what should work better</h1><p class="lede">Send a concise bug report or feature suggestion.</p><p>Support email: <strong>${site.email}</strong></p></div><form class="form-card" name="contact" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="website"><input type="hidden" name="form-name" value="contact"><div class="honeypot" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><div class="field"><label for="contact-email">Email (optional)</label><input id="contact-email" name="email" type="email" maxlength="200"></div><div class="field" style="margin-top:14px"><label for="contact-message">Message</label><textarea id="contact-message" name="message" minlength="10" maxlength="4000" required></textarea></div><button class="button button-primary" style="margin-top:14px" type="submit">Send message</button><p class="helper">This form is handled by Netlify Forms. No account is required.</p></form></div></section>`
};

const thanks={
 path:'/thanks/',title:`Message Sent | ${site.name}`,
 description:'Thanks for contacting CursivePilot.',
 noindex:true,
 breadcrumbs:crumbs('Message Sent','/thanks/'),
 content:`<section class="section"><div class="shell"><span class="eyebrow">Message sent</span><h1>Thanks for the feedback.</h1><p class="lede">Your message was submitted successfully.</p><div class="hero-actions"><a class="button button-primary" href="/cursive-generator/">Back to Cursive Generator</a><a class="button button-secondary" href="/">Home</a></div></div></section>`
};

export const pages=[home,cursive,handwriting,calligraphy,signature,worksheet,alphabet,guideUnicode,guidePractice,howItWorks,about,privacy,terms,contact,thanks];
