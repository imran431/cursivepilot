import { hashString, seededRandom } from './common.js';

export const PAGE_SIZES = {
  a4: { width: 794, height: 1123, label: 'A4' },
  letter: { width: 816, height: 1056, label: 'US Letter' },
};

export function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function drawPaper(ctx, width, height, style = 'notebook', lineHeight = 48, margin = 72) {
  ctx.save();
  ctx.fillStyle = style === 'warm' ? '#fffaf0' : '#fffefb';
  ctx.fillRect(0, 0, width, height);

  if (style === 'lined' || style === 'notebook') {
    ctx.strokeStyle = style === 'notebook' ? '#c8dced' : '#d9ddd9';
    ctx.lineWidth = 1;
    for (let y = margin + lineHeight * .35; y < height - margin / 2; y += lineHeight) {
      ctx.beginPath();
      ctx.moveTo(margin * .55, y);
      ctx.lineTo(width - margin * .55, y);
      ctx.stroke();
    }
    if (style === 'notebook') {
      ctx.strokeStyle = '#e7a0a0';
      ctx.beginPath();
      ctx.moveTo(margin, margin * .45);
      ctx.lineTo(margin, height - margin * .45);
      ctx.stroke();
    }
  }

  if (style === 'grid') {
    ctx.strokeStyle = '#e2e6e2';
    ctx.lineWidth = 1;
    const step = Math.max(24, lineHeight * .6);
    for (let x = margin * .5; x < width - margin * .5; x += step) {
      ctx.beginPath(); ctx.moveTo(x, margin * .4); ctx.lineTo(x, height - margin * .4); ctx.stroke();
    }
    for (let y = margin * .4; y < height - margin * .4; y += step) {
      ctx.beginPath(); ctx.moveTo(margin * .5, y); ctx.lineTo(width - margin * .5, y); ctx.stroke();
    }
  }
  ctx.restore();
}

function graphemes(value) {
  const text = String(value);
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)]
      .map((part) => part.segment);
  }
  return [...text];
}

export function measureTextWidth(ctx, value) {
  const metrics = ctx.measureText(String(value));
  const visualWidth = (metrics.actualBoundingBoxLeft || 0) + (metrics.actualBoundingBoxRight || 0);
  return Math.max(metrics.width || 0, visualWidth || 0);
}

function splitOverwideToken(ctx, token, maxWidth) {
  const parts = [];
  let current = '';
  for (const char of graphemes(token)) {
    const test = current + char;
    if (current && measureTextWidth(ctx, test) > maxWidth) {
      parts.push(current);
      current = char;
    } else {
      current = test;
    }
  }
  if (current) parts.push(current);
  return parts.length ? parts : [''];
}

function wrapParagraph(ctx, paragraph, maxWidth) {
  if (paragraph === '') return [''];
  const words = paragraph.trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  for (const word of words) {
    if (measureTextWidth(ctx, word) > maxWidth) {
      if (line) {
        lines.push(line);
        line = '';
      }
      const parts = splitOverwideToken(ctx, word, maxWidth);
      lines.push(...parts.slice(0, -1));
      line = parts[parts.length - 1] || '';
      continue;
    }
    const test = line ? `${line} ${word}` : word;
    if (line && measureTextWidth(ctx, test) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line || !lines.length) lines.push(line);
  return lines;
}

export function wrapText(ctx, text, maxWidth) {
  return String(text)
    .replace(/\r/g, '')
    .split('\n')
    .flatMap((paragraph) => wrapParagraph(ctx, paragraph, maxWidth));
}

function drawNaturalLine(ctx, line, x, y, options, random) {
  const { variation = 0.25, ink = '#173765' } = options;
  let cursor = x;
  ctx.fillStyle = ink;
  ctx.textBaseline = 'alphabetic';

  for (const run of line.match(/\s+|\S+/g) || []) {
    const width = ctx.measureText(run).width;
    if (/^\s+$/.test(run)) {
      cursor += width;
      continue;
    }
    const jitterX = (random() - .5) * 1.5 * variation;
    const jitterY = (random() - .5) * 3.2 * variation;
    const angle = (random() - .5) * 0.018 * variation;
    const alpha = 0.9 + random() * .1;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cursor + jitterX, y + jitterY);
    ctx.rotate(angle);
    ctx.fillText(run, 0, 0);
    ctx.restore();
    cursor += width;
  }
}

export function renderHandwritingPages({
  text,
  fontFamily = 'Dancing Script',
  fontSize = 34,
  lineHeight = 52,
  ink = '#173765',
  paper = 'notebook',
  pageSize = 'a4',
  variation = .45,
  margin = 78,
  maxPages = 48,
}) {
  const size = PAGE_SIZES[pageSize] || PAGE_SIZES.a4;
  const probe = createCanvas(size.width, size.height);
  const probeCtx = probe.getContext('2d');
  probeCtx.font = `${fontSize}px "${fontFamily}", "Segoe Script", cursive`;
  const lines = wrapText(probeCtx, text, size.width - margin * 2);
  const linesPerPage = Math.max(1, Math.floor((size.height - margin * 2) / lineHeight));
  const pages = [];
  const totalPages = Math.ceil(lines.length / linesPerPage) || 1;
  const renderedPages = Math.min(maxPages, totalPages);
  const seed = hashString(`${text}|${fontFamily}|${fontSize}|${variation}`);
  const random = seededRandom(seed);

  for (let pageIndex = 0; pageIndex < renderedPages; pageIndex += 1) {
    const canvas = createCanvas(size.width, size.height);
    const ctx = canvas.getContext('2d');
    drawPaper(ctx, size.width, size.height, paper, lineHeight, margin);
    ctx.font = `${fontSize}px "${fontFamily}", "Segoe Script", cursive`;
    ctx.textBaseline = 'alphabetic';
    const start = pageIndex * linesPerPage;
    const end = Math.min(lines.length, start + linesPerPage);
    let y = margin + fontSize;
    for (let i = start; i < end; i += 1) {
      drawNaturalLine(ctx, lines[i], margin + 12, y, { variation, ink }, random);
      y += lineHeight;
    }
    pages.push(canvas);
  }
  pages.totalPages = totalPages;
  pages.truncated = totalPages > renderedPages;
  pages.maxPages = maxPages;
  return pages;
}

export function openPrintWindow(canvases, title = 'Print') {
  const win = window.open('', '_blank');
  if (!win) return false;
  const images = canvases.map((canvas) => `<img src="${canvas.toDataURL('image/png')}" alt="Generated page">`).join('');
  win.document.write(`<!doctype html><html><head><title>${title}</title><style>
    @page{margin:0}body{margin:0;background:#eee}img{display:block;width:100%;height:auto;page-break-after:always;background:#fff}img:last-child{page-break-after:auto}@media print{body{background:#fff}}
  </style></head><body>${images}<script>window.onload=()=>setTimeout(()=>window.print(),250)<\/script></body></html>`);
  win.document.close();
  return true;
}
