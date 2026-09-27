import { canvasToBlob, debounce, downloadBlob, loadFont, setStatus, track } from './common.js';
import { createCanvas, openPrintWindow, PAGE_SIZES } from './canvas-engine.js';

const CURSIVE_FONTS = ['Dancing Script', 'Caveat', 'Satisfy', 'Homemade Apple'];
const PRINT_FONTS = ['Patrick Hand', 'Kalam'];

function drawGuides(ctx, x, y, width, rowHeight) {
  const mid = y + rowHeight * 0.48;
  const base = y + rowHeight * 0.76;
  const bottom = y + rowHeight;

  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#aebed0';

  for (const lineY of [y, base, bottom]) {
    ctx.beginPath();
    ctx.moveTo(x, lineY);
    ctx.lineTo(x + width, lineY);
    ctx.stroke();
  }

  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = '#c8d3df';
  ctx.beginPath();
  ctx.moveTo(x, mid);
  ctx.lineTo(x + width, mid);
  ctx.stroke();
  ctx.restore();

  return { base };
}

function fitText(ctx, text, maxWidth, startingSize, fontFamily) {
  let size = startingSize;
  while (size > 20) {
    ctx.font = `${size}px "${fontFamily}", "Segoe Script", cursive`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function drawHeaderValue(ctx, label, value, x, y, lineWidth) {
  ctx.save();
  ctx.font = '13px Arial, sans-serif';
  ctx.fillStyle = '#6a756f';
  ctx.fillText(`${label}:`, x, y);

  const labelWidth = ctx.measureText(`${label}:`).width + 8;
  const start = x + labelWidth;
  ctx.strokeStyle = '#98a59f';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(start, y + 4);
  ctx.lineTo(x + lineWidth, y + 4);
  ctx.stroke();

  if (value) {
    ctx.fillStyle = '#283a32';
    ctx.font = '600 13px Arial, sans-serif';
    ctx.fillText(value, start + 6, y - 1, Math.max(40, lineWidth - labelWidth - 10));
  }
  ctx.restore();
}

function renderWorksheetPages({
  phrases,
  writingType,
  fontFamily,
  mode,
  pageSize,
  title,
  studentName,
  date,
  rowsPerItem,
}) {
  const size = PAGE_SIZES[pageSize] || PAGE_SIZES.letter;
  const pages = [];
  const marginX = 64;
  const contentWidth = size.width - marginX * 2;
  const rowHeight = 48;
  const rowGap = 5;
  const labelHeight = 30;
  const blockGap = 18;
  const blockHeight = labelHeight + rowsPerItem * (rowHeight + rowGap) + blockGap;
  const contentTop = 128;
  const contentBottom = size.height - 48;
  const usableHeight = contentBottom - contentTop;
  const itemsPerPage = Math.max(1, Math.floor(usableHeight / blockHeight));

  const safePhrases = phrases.length ? phrases : ['Practice makes progress'];
  const chunks = [];
  for (let i = 0; i < safePhrases.length; i += itemsPerPage) {
    chunks.push(safePhrases.slice(i, i + itemsPerPage));
  }

  chunks.slice(0, 12).forEach((chunk, pageIndex) => {
    const canvas = createCanvas(size.width, size.height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size.width, size.height);

    ctx.fillStyle = '#17231f';
    ctx.font = '700 28px Arial, sans-serif';
    ctx.fillText(title || 'Handwriting Practice', marginX, 58, contentWidth);

    drawHeaderValue(ctx, 'Name', studentName, marginX, 88, 250);
    drawHeaderValue(ctx, 'Date', formatDate(date), marginX + 280, 88, 225);

    ctx.fillStyle = '#6a756f';
    ctx.font = '13px Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`Page ${pageIndex + 1} of ${chunks.length}`, size.width - marginX, 88);
    ctx.textAlign = 'left';

    let y = contentTop;

    chunk.forEach((phrase, itemIndex) => {
      const itemNumber = pageIndex * itemsPerPage + itemIndex + 1;

      ctx.fillStyle = '#40524a';
      ctx.font = '600 13px Arial, sans-serif';
      ctx.fillText(`${itemNumber}. ${phrase}`, marginX, y + 12, contentWidth);

      const phraseFontSize = fitText(ctx, phrase, contentWidth - 18, writingType === 'print' ? 34 : 38, fontFamily);
      ctx.font = `${phraseFontSize}px "${fontFamily}", "Segoe Script", cursive`;
      ctx.textBaseline = 'alphabetic';

      for (let rowIndex = 0; rowIndex < rowsPerItem; rowIndex += 1) {
        const rowY = y + labelHeight + rowIndex * (rowHeight + rowGap);
        const { base } = drawGuides(ctx, marginX, rowY, contentWidth, rowHeight);

        const shouldTrace =
          mode === 'trace' ||
          (mode === 'mixed' && rowIndex === 0);

        if (shouldTrace) {
          ctx.fillStyle = writingType === 'print'
            ? 'rgba(31, 92, 77, .22)'
            : 'rgba(31, 92, 77, .20)';
          ctx.fillText(phrase, marginX + 8, base - 3, contentWidth - 16);
        }
      }

      y += blockHeight;
    });

    ctx.fillStyle = '#7b8781';
    ctx.font = '11px Arial, sans-serif';
    ctx.fillText(
      mode === 'mixed'
        ? 'Trace the first row, then write independently on the blank rows.'
        : mode === 'trace'
          ? 'Trace each row slowly and focus on consistent spacing.'
          : 'Use the model above each group, then write on the blank rows.',
      marginX,
      size.height - 24,
      contentWidth,
    );

    pages.push(canvas);
  });

  return pages;
}

const root = document.querySelector('[data-worksheet-tool]');
if (root) {
  const title = root.querySelector('[data-title]');
  const studentName = root.querySelector('[data-student-name]');
  const date = root.querySelector('[data-date]');
  const text = root.querySelector('[data-text]');
  const writingType = root.querySelector('[data-script]');
  const font = root.querySelector('[data-font]');
  const mode = root.querySelector('[data-mode]');
  const rows = root.querySelector('[data-rows]');
  const pageSize = root.querySelector('[data-page-size]');
  const preview = root.querySelector('[data-preview]');
  const caption = root.querySelector('[data-preview-caption]');
  const indicator = root.querySelector('[data-page-indicator]');
  const prev = root.querySelector('[data-prev-page]');
  const next = root.querySelector('[data-next-page]');
  const png = root.querySelector('[data-download-png]');
  const print = root.querySelector('[data-print]');
  const status = root.querySelector('[data-status]');

  let pages = [];
  let currentPage = 0;
  let currentPhraseCount = 0;

  if (!date.value) {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    date.value = local.toISOString().slice(0, 10);
  }

  function populateFonts() {
    const options = writingType.value === 'print' ? PRINT_FONTS : CURSIVE_FONTS;
    const previous = font.value;
    font.innerHTML = options.map((name) => `<option value="${name}">${name}</option>`).join('');
    if (options.includes(previous)) font.value = previous;
  }

  function showPage(index = currentPage) {
    if (!pages.length) return;

    currentPage = Math.max(0, Math.min(index, pages.length - 1));
    preview.innerHTML = '';
    preview.append(pages[currentPage]);

    indicator.textContent = `Page ${currentPage + 1} of ${pages.length}`;
    prev.disabled = currentPage === 0;
    next.disabled = currentPage === pages.length - 1;

    caption.textContent = `${currentPhraseCount} practice item${currentPhraseCount === 1 ? '' : 's'} total. Print / Save PDF includes all ${pages.length} page${pages.length === 1 ? '' : 's'}.`;
  }

  async function render() {
    populateFonts();
    await loadFont(font.value, 42);

    const phrases = text.value
      .split('\n')
      .map((value) => value.trim())
      .filter(Boolean)
      .slice(0, 24);

    currentPhraseCount = phrases.length || 1;

    pages = renderWorksheetPages({
      phrases,
      writingType: writingType.value,
      fontFamily: font.value,
      mode: mode.value,
      pageSize: pageSize.value,
      title: title.value.trim().slice(0, 50),
      studentName: studentName.value.trim().slice(0, 60),
      date: date.value,
      rowsPerItem: Number(rows.value) || 3,
    });

    if (currentPage >= pages.length) currentPage = pages.length - 1;
    showPage(Math.max(0, currentPage));
    setStatus(status, 'Worksheet preview updated.', 'success');
  }

  const rerender = debounce(render, 120);

  [title, studentName, date, text, mode, rows, pageSize].forEach((el) => {
    el.addEventListener('input', rerender);
    el.addEventListener('change', rerender);
  });

  writingType.addEventListener('change', () => {
    populateFonts();
    currentPage = 0;
    render();
  });

  font.addEventListener('change', render);

  prev.addEventListener('click', () => showPage(currentPage - 1));
  next.addEventListener('click', () => showPage(currentPage + 1));

  png.addEventListener('click', async () => {
    if (!pages.length) await render();
    const blob = await canvasToBlob(pages[currentPage]);
    downloadBlob(blob, `handwriting-worksheet-page-${currentPage + 1}.png`);
    setStatus(status, `Page ${currentPage + 1} PNG downloaded.`, 'success');
    track('tool_download', {
      tool: 'handwriting_worksheet_generator',
      format: 'png',
      page: currentPage + 1,
    });
  });

  print.addEventListener('click', async () => {
    if (!pages.length) await render();
    const ok = openPrintWindow(pages, title.value.trim() || 'Handwriting worksheet');
    setStatus(
      status,
      ok
        ? 'Print dialog opened. Choose “Save as PDF” to save every worksheet page.'
        : 'Your browser blocked the print window.',
      ok ? 'success' : 'error',
    );
    track('tool_download', {
      tool: 'handwriting_worksheet_generator',
      format: 'print_pdf',
      pages: pages.length,
    });
  });

  populateFonts();
  render();
  track('tool_view', { tool: 'handwriting_worksheet_generator' });
}
