import { copyText, setStatus, track } from './common.js';

const UPPER = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const LOWER = [...'abcdefghijklmnopqrstuvwxyz'];
const DIGITS = [...'0123456789'];

const mapStyle = ({ upper = [], lower = [], digits = [], space, transform }) => ({ upper, lower, digits, space, transform });
const combine = (text, mark) => [...text].map((ch) => /\s/.test(ch) ? ch : `${ch}${mark}`).join('');
const surround = (text, left, right = left) => `${left}${text}${right}`;
const spaced = (text, separator = ' ') => [...text].map((ch) => ch === ' ' ? separator.repeat(2) : ch).join(separator);
const squared = (text, start) => [...text].map((ch) => {
  const up = ch.toUpperCase();
  const i = UPPER.indexOf(up);
  return i >= 0 ? String.fromCodePoint(start + i) : ch;
}).join('');

const SMALL_CAPS = {
  a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',
  n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'
};
const smallCaps = (text) => [...text].map((ch) => SMALL_CAPS[ch.toLowerCase()] || ch).join('');

const baseStyles = {
  script: mapStyle({
    upper:[...'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'],
    lower:[...'𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏']
  }),
  boldScript: mapStyle({
    upper:[...'𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'],
    lower:[...'𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃']
  }),
  italic: mapStyle({
    upper:[...'𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'],
    lower:[...'𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧']
  }),
  boldItalic: mapStyle({
    upper:[...'𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'],
    lower:[...'𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛']
  })
};

function mapped(text, style) {
  const upperMap = new Map(UPPER.map((ch, i) => [ch, style.upper?.[i] ?? ch]));
  const lowerMap = new Map(LOWER.map((ch, i) => [ch, style.lower?.[i] ?? ch]));
  const digitMap = new Map(DIGITS.map((ch, i) => [ch, style.digits?.[i] ?? ch]));
  return [...text].map((ch) => {
    if (upperMap.has(ch)) return upperMap.get(ch);
    if (lowerMap.has(ch)) return lowerMap.get(ch);
    if (digitMap.has(ch)) return digitMap.get(ch);
    if (ch === ' ' && style.space) return style.space;
    return ch;
  }).join('');
}

export const styleDefs = [
  { id:'script', name:'Script Cursive', category:'Cursive', tags:['handwriting','elegant','script'], ...baseStyles.script },
  { id:'bold-script', name:'Bold Script', category:'Cursive', tags:['handwriting','thick','script'], ...baseStyles.boldScript },
  { id:'italic', name:'Italic', category:'Cursive', tags:['slanted','classic'], ...baseStyles.italic },
  { id:'bold-italic', name:'Bold Italic', category:'Cursive', tags:['slanted','strong'], ...baseStyles.boldItalic },

  { id:'bold', name:'Bold Serif', category:'Classic', tags:['serif','strong'],
    upper:[...'𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'],
    lower:[...'𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'], digits:[...'𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗'] },
  { id:'double', name:'Double Struck', category:'Classic', tags:['blackboard','outline'],
    upper:[...'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'],
    lower:[...'𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'], digits:[...'𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'] },

  { id:'sans', name:'Sans Serif', category:'Modern', tags:['clean','simple'],
    upper:[...'𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹'],
    lower:[...'𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓'] },
  { id:'sans-bold', name:'Sans Bold', category:'Modern', tags:['clean','strong'],
    upper:[...'𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'],
    lower:[...'𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'] },
  { id:'sans-italic', name:'Sans Italic', category:'Modern', tags:['clean','slanted'],
    upper:[...'𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡'],
    lower:[...'𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'] },
  { id:'sans-bold-italic', name:'Sans Bold Italic', category:'Modern', tags:['clean','slanted','strong'],
    upper:[...'𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕'],
    lower:[...'𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'] },
  { id:'mono', name:'Monospace', category:'Modern', tags:['typewriter','code'],
    upper:[...'𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉'],
    lower:[...'𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣'] },
  { id:'small-caps', name:'Small Caps', category:'Modern', tags:['compact','caps'], transform: smallCaps },

  { id:'fraktur', name:'Gothic Fraktur', category:'Gothic', tags:['blackletter','medieval'],
    upper:[...'𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'],
    lower:[...'𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'] },
  { id:'bold-fraktur', name:'Bold Gothic', category:'Gothic', tags:['blackletter','heavy'],
    upper:[...'𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅'],
    lower:[...'𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'] },

  { id:'fullwidth', name:'Fullwidth', category:'Enclosed & Wide', tags:['wide','aesthetic'],
    upper:[...'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'],
    lower:[...'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'], digits:[...'０１２３４５６７８９'], space:'　' },
  { id:'circled', name:'Circled', category:'Enclosed & Wide', tags:['bubble','round'],
    upper:[...'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'],
    lower:[...'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'], digits:[...'⓪①②③④⑤⑥⑦⑧⑨'] },
  { id:'parenthesized', name:'Parenthesized', category:'Enclosed & Wide', tags:['brackets','enclosed'],
    upper:[...'⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵'],
    lower:[...'⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵'] },
  { id:'squared', name:'Squared Letters', category:'Enclosed & Wide', tags:['box','square'], transform:(text)=>squared(text,0x1F130) },
  { id:'negative-squared', name:'Dark Squared Letters', category:'Enclosed & Wide', tags:['box','dark','emoji'], transform:(text)=>squared(text,0x1F170) },
  { id:'spaced', name:'Spaced Letters', category:'Enclosed & Wide', tags:['wide','spacing'], transform:(text)=>spaced(text,' ') },
  { id:'wide-spaced', name:'Wide Spaced', category:'Enclosed & Wide', tags:['wide','spacing'], transform:(text)=>spaced(text,' ') },

  { id:'underline', name:'Underline', category:'Text Effects', tags:['line','under'], transform:(text)=>combine(text,'\u0332') },
  { id:'double-underline', name:'Double Underline', category:'Text Effects', tags:['line','under'], transform:(text)=>combine(text,'\u0333') },
  { id:'overline', name:'Overline', category:'Text Effects', tags:['line','over'], transform:(text)=>combine(text,'\u0305') },
  { id:'double-overline', name:'Double Overline', category:'Text Effects', tags:['line','over'], transform:(text)=>combine(text,'\u033F') },
  { id:'strike', name:'Strikethrough', category:'Text Effects', tags:['strike','cross'], transform:(text)=>combine(text,'\u0336') },
  { id:'slash', name:'Slashed', category:'Text Effects', tags:['slash','cross'], transform:(text)=>combine(text,'\u0337') },
  { id:'tilde', name:'Wavy Overlay', category:'Text Effects', tags:['wave','tilde'], transform:(text)=>combine(text,'\u0334') },
  { id:'dot-below', name:'Dotted Below', category:'Text Effects', tags:['dot','below'], transform:(text)=>combine(text,'\u0323') },
  { id:'dot-above', name:'Dotted Above', category:'Text Effects', tags:['dot','above'], transform:(text)=>combine(text,'\u0307') },

  { id:'script-underline', name:'Script Underline', category:'Cursive Effects', tags:['cursive','underline','script'], transform:(text)=>combine(mapped(text,baseStyles.script),'\u0332') },
  { id:'script-overline', name:'Script Overline', category:'Cursive Effects', tags:['cursive','overline','script'], transform:(text)=>combine(mapped(text,baseStyles.script),'\u0305') },
  { id:'script-strike', name:'Script Strike', category:'Cursive Effects', tags:['cursive','strike','script'], transform:(text)=>combine(mapped(text,baseStyles.script),'\u0336') },
  { id:'bold-script-underline', name:'Bold Script Underline', category:'Cursive Effects', tags:['cursive','bold','underline'], transform:(text)=>combine(mapped(text,baseStyles.boldScript),'\u0332') },
  { id:'bold-script-strike', name:'Bold Script Strike', category:'Cursive Effects', tags:['cursive','bold','strike'], transform:(text)=>combine(mapped(text,baseStyles.boldScript),'\u0336') },

  { id:'bracketed', name:'Bracketed', category:'Decorative', tags:['brackets','frame'], transform:(text)=>surround(text,'【','】') },
  { id:'angle', name:'Angle Frame', category:'Decorative', tags:['angle','frame'], transform:(text)=>surround(text,'〈','〉') },
  { id:'stars', name:'Star Frame', category:'Decorative', tags:['star','sparkle'], transform:(text)=>surround(text,'✦ ',' ✦') },
  { id:'sparkles', name:'Sparkle Frame', category:'Decorative', tags:['sparkle','cute'], transform:(text)=>surround(text,'✨ ',' ✨') },
  { id:'hearts', name:'Heart Frame', category:'Decorative', tags:['heart','love'], transform:(text)=>surround(text,'♡ ',' ♡') },
  { id:'dots', name:'Dot Separated', category:'Decorative', tags:['dots','separator'], transform:(text)=>[...text].map(ch=>ch===' ' ? '   ' : ch).join('·') },
  { id:'bullet-separated', name:'Bullet Separated', category:'Decorative', tags:['bullet','separator'], transform:(text)=>[...text].map(ch=>ch===' ' ? '   ' : ch).join('•') },
  { id:'diamond-separated', name:'Diamond Separated', category:'Decorative', tags:['diamond','separator'], transform:(text)=>[...text].map(ch=>ch===' ' ? '   ' : ch).join('◇') },
  { id:'dash-separated', name:'Dash Separated', category:'Decorative', tags:['dash','separator'], transform:(text)=>[...text].map(ch=>ch===' ' ? '   ' : ch).join('—') },
  { id:'wave-separated', name:'Wave Separated', category:'Decorative', tags:['wave','separator'], transform:(text)=>[...text].map(ch=>ch===' ' ? '   ' : ch).join('〜') },
  { id:'curly-frame', name:'Curly Frame', category:'Decorative', tags:['curly','frame'], transform:(text)=>surround(text,'❴ ',' ❵') },
  { id:'double-angle-frame', name:'Double Angle Frame', category:'Decorative', tags:['angle','frame'], transform:(text)=>surround(text,'《 ',' 》') },
  { id:'corner-frame', name:'Corner Frame', category:'Decorative', tags:['corner','frame'], transform:(text)=>surround(text,'「 ',' 」') },
  { id:'white-corner-frame', name:'White Corner Frame', category:'Decorative', tags:['corner','frame'], transform:(text)=>surround(text,'『 ',' 』') },
  { id:'flower-frame', name:'Flower Frame', category:'Decorative', tags:['flower','cute'], transform:(text)=>surround(text,'✿ ',' ✿') },
  { id:'arrow-frame', name:'Arrow Frame', category:'Decorative', tags:['arrow','frame'], transform:(text)=>surround(text,'➜ ',' ➜') },
  { id:'music-frame', name:'Music Frame', category:'Decorative', tags:['music','notes'], transform:(text)=>surround(text,'♫ ',' ♫') },
  { id:'crown-frame', name:'Crown Frame', category:'Decorative', tags:['crown','royal'], transform:(text)=>surround(text,'♛ ',' ♛') },
  { id:'script-spaced', name:'Spaced Script', category:'Cursive Effects', tags:['cursive','spacing'], transform:(text)=>spaced(mapped(text,baseStyles.script),' ') },
  { id:'bold-script-spaced', name:'Spaced Bold Script', category:'Cursive Effects', tags:['cursive','bold','spacing'], transform:(text)=>spaced(mapped(text,baseStyles.boldScript),' ') },
  { id:'italic-spaced', name:'Spaced Italic', category:'Cursive Effects', tags:['italic','spacing'], transform:(text)=>spaced(mapped(text,baseStyles.italic),' ') }
];

export function convert(text, style) {
  if (typeof style.transform === 'function') return style.transform(text);
  return mapped(text, style);
}

const root = document.querySelector('[data-unicode-tool]');
if (root) {
  const input = root.querySelector('[data-input]');
  const results = root.querySelector('[data-results]');
  const clear = root.querySelector('[data-clear]');
  const example = root.querySelector('[data-example]');
  const share = root.querySelector('[data-share]');
  const resetFilters = root.querySelector('[data-reset-filters]');
  const status = root.querySelector('[data-status]');
  const counter = root.querySelector('[data-counter]');
  const search = root.querySelector('[data-style-search]');
  const category = root.querySelector('[data-style-category]');
  const count = root.querySelector('[data-style-count]');
  const favoritesOnly = root.querySelector('[data-favorites-only]');
  const storageKey = 'cursivepilot:favorites:v2';

  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch {}
  let favorites = new Set(Array.isArray(saved) ? saved : []);

  const categories = ['All', ...new Set(styleDefs.map((style) => style.category))];
  category.innerHTML = categories.map((name) => `<option value="${name}">${name}</option>`).join('');

  const params = new URLSearchParams(location.search);
  if (params.get('text')) input.value = params.get('text').slice(0, 500);

  const saveFavorites = () => localStorage.setItem(storageKey, JSON.stringify([...favorites]));

  function filteredStyles() {
    const needle = (search?.value || '').trim().toLowerCase();
    const selected = category?.value || 'All';
    return styleDefs.filter((style) => {
      const haystack = [style.name, style.category, ...(style.tags || [])].join(' ').toLowerCase();
      const matchesText = !needle || haystack.includes(needle);
      const matchesCategory = selected === 'All' || style.category === selected;
      const matchesFavorite = !favoritesOnly?.checked || favorites.has(style.id);
      return matchesText && matchesCategory && matchesFavorite;
    });
  }

  function render() {
    const value = input.value.slice(0, 500);
    counter.textContent = `${value.length} / 500`;
    results.innerHTML = '';
    const visible = filteredStyles();
    if (count) count.textContent = `${visible.length} of ${styleDefs.length} styles`;

    visible.forEach((style) => {
      const output = convert(value || 'Write beautifully', style);
      const row = document.createElement('div');
      row.className = 'style-result';
      row.innerHTML = `<div class="style-meta"><div class="style-name"></div><div class="style-category"></div></div><div class="style-output"></div><div class="style-actions"><button type="button" class="favorite-button" aria-label="Favorite style"></button><button type="button" class="button button-secondary button-small">Copy</button></div>`;
      row.querySelector('.style-name').textContent = style.name;
      row.querySelector('.style-category').textContent = style.category;
      row.querySelector('.style-output').textContent = output;
      const favoriteButton = row.querySelector('.favorite-button');
      favoriteButton.textContent = favorites.has(style.id) ? '★' : '☆';
      favoriteButton.setAttribute('aria-pressed', String(favorites.has(style.id)));
      favoriteButton.addEventListener('click', () => {
        if (favorites.has(style.id)) favorites.delete(style.id); else favorites.add(style.id);
        saveFavorites();
        render();
      });
      row.querySelector('.button').addEventListener('click', async () => {
        const ok = await copyText(output);
        setStatus(status, ok ? `${style.name} copied.` : 'Copy failed. Select the text manually.', ok ? 'success' : 'error');
        track('tool_copy', { tool: 'cursive_generator', style: style.id });
      });
      results.append(row);
    });

    if (!visible.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = '<strong>No styles match these filters.</strong><span>Try clearing Favorites only, search text, or category.</span>';
      results.append(empty);
    }
  }

  input.addEventListener('input', render);
  search?.addEventListener('input', render);
  category?.addEventListener('change', render);
  favoritesOnly?.addEventListener('change', render);
  resetFilters?.addEventListener('click', () => {
    search.value = '';
    category.value = 'All';
    favoritesOnly.checked = false;
    render();
  });
  clear.addEventListener('click', () => { input.value = ''; render(); input.focus(); });
  example.addEventListener('click', () => { input.value = 'Write beautifully'; render(); input.focus(); });
  share.addEventListener('click', async () => {
    const url = new URL(location.href);
    if (input.value.trim()) url.searchParams.set('text', input.value.trim().slice(0, 180));
    else url.searchParams.delete('text');
    const ok = await copyText(url.toString());
    setStatus(status, ok ? 'Share link copied.' : 'Could not copy the link.', ok ? 'success' : 'error');
  });

  render();
  track('tool_view', { tool: 'cursive_generator', styles: styleDefs.length });
}
