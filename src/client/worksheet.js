import { canvasToBlob, debounce, downloadBlob, loadFont, setStatus, track } from './common.js';
import { createCanvas, openPrintWindow, PAGE_SIZES } from './canvas-engine.js';

function drawGuides(ctx, x, y, width, rowHeight) {
  const top = y;
  const mid = y + rowHeight * .48;
  const base = y + rowHeight * .76;
  const bottom = y + rowHeight;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#aebed0';
  [top, base, bottom].forEach((lineY) => {
    ctx.beginPath(); ctx.moveTo(x, lineY); ctx.lineTo(x + width, lineY); ctx.stroke();
  });
  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = '#c8d3df';
  ctx.beginPath(); ctx.moveTo(x, mid); ctx.lineTo(x + width, mid); ctx.stroke();
  ctx.restore();
  return { top, mid, base, bottom };
}

function fitText(ctx, text, maxWidth, startingSize, fontFamily) {
  let size = startingSize;
  while (size > 22) {
    ctx.font = `${size}px "${fontFamily}", cursive`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

function renderWorksheetPages({ phrases, script, mode, pageSize, title }) {
  const size = PAGE_SIZES[pageSize] || PAGE_SIZES.letter;
  const fontFamily = script === 'print' ? 'Patrick Hand' : 'Dancing Script';
  const pageItems = 4;
  const pages = [];
  const chunks = [];
  for (let i = 0; i < phrases.length; i += pageItems) chunks.push(phrases.slice(i, i + pageItems));
  if (!chunks.length) chunks.push(['Practice makes progress']);

  chunks.slice(0, 10).forEach((chunk, pageIndex) => {
    const canvas = createCanvas(size.width, size.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size.width, size.height);
    ctx.fillStyle = '#17231f';
    ctx.font = '700 28px Arial, sans-serif';
    ctx.fillText(title || 'Handwriting Practice', 64, 58);
    ctx.font = '14px Arial, sans-serif';
    ctx.fillStyle = '#6a756f';
    ctx.fillText(`Name: ______________________________    Date: ________________    Page ${pageIndex + 1}`, 64, 88);

    let y = 122;
    chunk.forEach((phrase) => {
      const blockHeight = 210;
      const rowHeight = 54;
      const x = 64;
      const width = size.width - 128;
      ctx.fillStyle = '#40524a';
      ctx.font = '600 13px Arial, sans-serif';
      ctx.fillText(phrase, x, y + 13);
      const rows = [y + 28, y + 84, y + 140];
      rows.forEach((rowY) => drawGuides(ctx, x, rowY, width, rowHeight));
      const fontSize = fitText(ctx, phrase, width - 18, 42, fontFamily);
      ctx.font = `${fontSize}px "${fontFamily}", cursive`;
      ctx.textBaseline = 'alphabetic';
      const baselineOffset = rowHeight * .73;

      if (mode === 'trace') {
        ctx.fillStyle = 'rgba(31, 92, 77, .24)';
        rows.forEach((rowY) => ctx.fillText(phrase, x + 8, rowY + baselineOffset, width - 12));
      } else if (mode === 'copy') {
        ctx.fillStyle = '#214f43';
        ctx.fillText(phrase, x + 8, rows[0] + baselineOffset, width - 12);
      } else {
        ctx.fillStyle = 'rgba(31, 92, 77, .22)';
        ctx.fillText(phrase, x + 8, rows[0] + baselineOffset, width - 12);
        ctx.fillStyle = '#214f43';
        ctx.fillText(phrase, x + 8, rows[1] + baselineOffset, width - 12);
      }
      y += blockHeight;
    });
    ctx.fillStyle = '#7b8781';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('Generated in your browser. Review the page before printing.', 64, size.height - 30);
    pages.push(canvas);
  });
  return pages;
}

const root = document.querySelector('[data-worksheet-tool]');
if (root) {
  const text = root.querySelector('[data-text]');
  const script = root.querySelector('[data-script]');
  const mode = root.querySelector('[data-mode]');
  const pageSize = root.querySelector('[data-page-size]');
  const title = root.querySelector('[data-title]');
  const preview = root.querySelector('[data-preview]');
  const caption = root.querySelector('[data-preview-caption]');
  const png = root.querySelector('[data-download-png]');
  const print = root.querySelector('[data-print]');
  const status = root.querySelector('[data-status]');
  let pages = [];

  async function render() {
    const fontFamily = script.value === 'print' ? 'Patrick Hand' : 'Dancing Script';
    await loadFont(fontFamily, 42);
    const phrases = text.value.split('\n').map((x) => x.trim()).filter(Boolean).slice(0, 24);
    pages = renderWorksheetPages({ phrases, script: script.value, mode: mode.value, pageSize: pageSize.value, title: title.value.slice(0, 50) });
    preview.innerHTML = '';
    preview.append(pages[0]);
    caption.textContent = pages.length > 1 ? `Previewing page 1 of ${pages.length}. Print / Save PDF includes all pages.` : 'One printable worksheet page.';
    setStatus(status, 'Worksheet preview updated.', 'success');
  }

  const rerender = debounce(render, 120);
  [text, script, mode, pageSize, title].forEach((el) => el.addEventListener('input', rerender));

  png.addEventListener('click', async () => {
    if (!pages.length) await render();
    const blob = await canvasToBlob(pages[0]);
    downloadBlob(blob, 'handwriting-worksheet.png');
    setStatus(status, 'PNG downloaded. Use Print / Save PDF for all pages.', 'success');
    track('tool_download', { tool: 'handwriting_worksheet_generator', format: 'png' });
  });
  print.addEventListener('click', async () => {
    if (!pages.length) await render();
    const ok = openPrintWindow(pages, 'Handwriting worksheet');
    setStatus(status, ok ? 'Print dialog opened. Choose “Save as PDF” to create a PDF.' : 'Your browser blocked the print window.', ok ? 'success' : 'error');
    track('tool_download', { tool: 'handwriting_worksheet_generator', format: 'print_pdf' });
  });

  render();
  track('tool_view', { tool: 'handwriting_worksheet_generator' });
}
