import { copyText, setStatus, track } from './common.js';

const PLAIN_UPPER = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const PLAIN_LOWER = [...'abcdefghijklmnopqrstuvwxyz'];
const PLAIN_DIGITS = [...'0123456789'];

export const styleDefs = [
  { id:'script', name:'Script Cursive', category:'Cursive', upper:[...'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'], lower:[...'𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'] },
  { id:'bold-script', name:'Bold Script', category:'Cursive', upper:[...'𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'], lower:[...'𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'] },
  { id:'italic', name:'Italic', category:'Cursive', upper:[...'𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'], lower:[...'𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'] },
  { id:'bold-italic', name:'Bold Italic', category:'Cursive', upper:[...'𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'], lower:[...'𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'] },
  { id:'bold', name:'Bold Serif', category:'Classic', upper:[...'𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'], lower:[...'𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'], digits:[...'𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗'] },
  { id:'fraktur', name:'Gothic Fraktur', category:'Gothic', upper:[...'𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'], lower:[...'𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'] },
  { id:'bold-fraktur', name:'Bold Gothic', category:'Gothic', upper:[...'𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅'], lower:[...'𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'] },
  { id:'double', name:'Double Struck', category:'Decorative', upper:[...'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'], lower:[...'𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'], digits:[...'𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'] },
  { id:'sans', name:'Sans Serif', category:'Modern', upper:[...'𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹'], lower:[...'𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓'] },
  { id:'sans-bold', name:'Sans Bold', category:'Modern', upper:[...'𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'], lower:[...'𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'] },
  { id:'sans-italic', name:'Sans Italic', category:'Modern', upper:[...'𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡'], lower:[...'𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'] },
  { id:'sans-bold-italic', name:'Sans Bold Italic', category:'Modern', upper:[...'𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕'], lower:[...'𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'] },
  { id:'mono', name:'Monospace', category:'Modern', upper:[...'𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉'], lower:[...'𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣'] },
  { id:'fullwidth', name:'Fullwidth', category:'Decorative', upper:[...'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'], lower:[...'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'], digits:[...'０１２３４５６７８９'], space:'　' },
  { id:'circled', name:'Circled', category:'Decorative', upper:[...'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'], lower:[...'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'], digits:[...'⓪①②③④⑤⑥⑦⑧⑨'] }
];

export function convert(text, style) {
  const upperMap = new Map(PLAIN_UPPER.map((ch, i) => [ch, style.upper?.[i] ?? ch]));
  const lowerMap = new Map(PLAIN_LOWER.map((ch, i) => [ch, style.lower?.[i] ?? ch]));
  const digitMap = new Map(PLAIN_DIGITS.map((ch, i) => [ch, style.digits?.[i] ?? ch]));
  return [...text].map((ch) => {
    if (upperMap.has(ch)) return upperMap.get(ch);
    if (lowerMap.has(ch)) return lowerMap.get(ch);
    if (digitMap.has(ch)) return digitMap.get(ch);
    if (ch === ' ' && style.space) return style.space;
    return ch;
  }).join('');
}

const root = document.querySelector('[data-unicode-tool]');
if (root) {
  const input = root.querySelector('[data-input]');
  const results = root.querySelector('[data-results]');
  const clear = root.querySelector('[data-clear]');
  const example = root.querySelector('[data-example]');
  const share = root.querySelector('[data-share]');
  const status = root.querySelector('[data-status]');
  const counter = root.querySelector('[data-counter]');
  const search = root.querySelector('[data-style-search]');
  const category = root.querySelector('[data-style-category]');
  const count = root.querySelector('[data-style-count]');
  const favoritesOnly = root.querySelector('[data-favorites-only]');
  const storageKey = 'cursivepilot:favorites:v1';
  let favorites = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));

  const params = new URLSearchParams(location.search);
  if (params.get('text')) input.value = params.get('text').slice(0, 500);

  const saveFavorites = () => localStorage.setItem(storageKey, JSON.stringify([...favorites]));

  function filteredStyles() {
    const needle = (search?.value || '').trim().toLowerCase();
    const selected = category?.value || 'All';
    return styleDefs.filter((style) => {
      const matchesText = !needle || style.name.toLowerCase().includes(needle) || style.category.toLowerCase().includes(needle);
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
    if (count) count.textContent = `${visible.length} style${visible.length === 1 ? '' : 's'} shown`;

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
        const wasFavorite = favorites.has(style.id);
        if (wasFavorite) favorites.delete(style.id); else favorites.add(style.id);
        saveFavorites();
        track('style_favorite', { tool: 'cursive_generator', style: style.id, active: !wasFavorite });
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
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = 'No styles match those filters.';
      results.append(empty);
    }
  }

  input.addEventListener('input', render);
  search?.addEventListener('input', render);
  category?.addEventListener('change', render);
  favoritesOnly?.addEventListener('change', render);
  clear.addEventListener('click', () => { input.value = ''; render(); input.focus(); });
  example.addEventListener('click', () => { input.value = 'Write beautifully'; render(); input.focus(); });
  share.addEventListener('click', async () => {
    const url = new URL(location.href);
    if (input.value.trim()) url.searchParams.set('text', input.value.trim().slice(0, 180));
    else url.searchParams.delete('text');
    const ok = await copyText(url.toString());
    setStatus(status, ok ? 'Share link copied.' : 'Could not copy the link.', ok ? 'success' : 'error');
    track('tool_share', { tool: 'cursive_generator' });
  });

  render();
  track('tool_view', { tool: 'cursive_generator' });
}
