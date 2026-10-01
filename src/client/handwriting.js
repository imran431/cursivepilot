import { canvasToBlob, debounce, downloadBlob, loadFont, setStatus, track } from './common.js';
import { openPrintWindow, renderHandwritingPages } from './canvas-engine.js';

const root = document.querySelector('[data-handwriting-tool]');
if (root) {
  const text = root.querySelector('[data-text]');
  const font = root.querySelector('[data-font]');
  const fontSize = root.querySelector('[data-font-size]');
  const lineHeight = root.querySelector('[data-line-height]');
  const ink = root.querySelector('[data-ink]');
  const paper = root.querySelector('[data-paper]');
  const pageSize = root.querySelector('[data-page-size]');
  const variation = root.querySelector('[data-variation]');
  const preview = root.querySelector('[data-preview]');
  const caption = root.querySelector('[data-preview-caption]');
  const indicator = root.querySelector('[data-page-indicator]');
  const prev = root.querySelector('[data-prev-page]');
  const next = root.querySelector('[data-next-page]');
  const pngButton = root.querySelector('[data-download-png]');
  const printButton = root.querySelector('[data-print]');
  const status = root.querySelector('[data-status]');
  let pages = [];
  let currentPage = 0;

  function showPage(index = currentPage) {
    if (!pages.length) return;
    currentPage = Math.max(0, Math.min(index, pages.length - 1));
    preview.innerHTML = '';
    preview.append(pages[currentPage]);

    const totalRequired = pages.totalPages || pages.length;
    indicator.textContent = pages.truncated
      ? `Page ${currentPage + 1} of ${pages.length} shown (${totalRequired} required)`
      : `Page ${currentPage + 1} of ${pages.length}`;
    prev.disabled = currentPage === 0;
    next.disabled = currentPage === pages.length - 1;

    caption.textContent = pages.truncated
      ? `This input requires ${totalRequired} pages, above the safe ${pages.maxPages}-page preview/export limit. Reduce the text, font size or line height so no accepted text is omitted from export.`
      : pages.length > 1
        ? `All accepted text is rendered across ${pages.length} pages. Print / Save PDF includes every page.`
        : 'One generated page.';
  }

  async function render() {
    const fontName = font.value;
    await loadFont(fontName, Number(fontSize.value));
    pages = renderHandwritingPages({
      text: text.value || 'Write something here to preview your handwriting page.',
      fontFamily: fontName,
      fontSize: Number(fontSize.value),
      lineHeight: Number(lineHeight.value),
      ink: ink.value,
      paper: paper.value,
      pageSize: pageSize.value,
      variation: Number(variation.value),
    });

    if (currentPage >= pages.length) currentPage = pages.length - 1;
    showPage(Math.max(0, currentPage));

    if (pages.truncated) {
      setStatus(status, `Page limit reached: ${pages.length} of ${pages.totalPages} required pages are rendered. Adjust the input/settings before exporting if you need every character.`, 'error');
    } else {
      setStatus(status, `Preview updated: ${pages.length} page${pages.length === 1 ? '' : 's'} generated.`, 'success');
    }
  }

  const renderDebounced = debounce(render, 120);
  [text, fontSize, lineHeight, ink, paper, pageSize, variation].forEach((el) => el.addEventListener('input', renderDebounced));
  font.addEventListener('change', render);
  prev.addEventListener('click', () => showPage(currentPage - 1));
  next.addEventListener('click', () => showPage(currentPage + 1));

  pngButton.addEventListener('click', async () => {
    if (!pages.length) await render();
    const blob = await canvasToBlob(pages[currentPage]);
    downloadBlob(blob, `handwriting-page-${currentPage + 1}.png`);
    const extra = pages.truncated ? ' The full input exceeds the safe page limit.' : '';
    setStatus(status, `Page ${currentPage + 1} PNG downloaded.${extra}`, pages.truncated ? 'error' : 'success');
    track('tool_download', { tool: 'handwriting_generator', format: 'png', page: currentPage + 1 });
  });

  printButton.addEventListener('click', async () => {
    if (!pages.length) await render();
    const ok = openPrintWindow(pages, 'Handwriting pages');
    const message = pages.truncated
      ? `Print dialog opened for the ${pages.length} rendered pages, but the input requires ${pages.totalPages}. Reduce the content/settings before saving if you need complete output.`
      : `Print dialog opened for all ${pages.length} pages. Choose “Save as PDF” for a PDF file.`;
    setStatus(status, ok ? message : 'Your browser blocked the print window.', ok && !pages.truncated ? 'success' : 'error');
    track('tool_download', { tool: 'handwriting_generator', format: 'print_pdf', pages: pages.length, truncated: Boolean(pages.truncated) });
  });

  render();
  track('tool_view', { tool: 'handwriting_generator' });
}
