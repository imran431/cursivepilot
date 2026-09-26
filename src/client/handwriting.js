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
  const pngButton = root.querySelector('[data-download-png]');
  const printButton = root.querySelector('[data-print]');
  const status = root.querySelector('[data-status]');
  let pages = [];

  async function render() {
    const fontName = font.value;
    await loadFont(fontName, Number(fontSize.value));
    pages = renderHandwritingPages({
      text: text.value.slice(0, 6000) || 'Write something here to preview your handwriting page.',
      fontFamily: fontName,
      fontSize: Number(fontSize.value),
      lineHeight: Number(lineHeight.value),
      ink: ink.value,
      paper: paper.value,
      pageSize: pageSize.value,
      variation: Number(variation.value),
    });
    preview.innerHTML = '';
    preview.append(pages[0]);
    caption.textContent = pages.length > 1 ? `Previewing page 1 of ${pages.length}. Print / Save PDF includes every page.` : 'One generated page.';
    setStatus(status, 'Preview updated.', 'success');
  }

  const renderDebounced = debounce(render, 120);
  [text, fontSize, lineHeight, ink, paper, pageSize, variation].forEach((el) => el.addEventListener('input', renderDebounced));
  font.addEventListener('change', render);

  pngButton.addEventListener('click', async () => {
    if (!pages.length) await render();
    const blob = await canvasToBlob(pages[0]);
    downloadBlob(blob, 'handwriting-page.png');
    setStatus(status, 'PNG downloaded. For multiple pages, use Print / Save PDF.', 'success');
    track('tool_download', { tool: 'handwriting_generator', format: 'png' });
  });

  printButton.addEventListener('click', async () => {
    if (!pages.length) await render();
    const ok = openPrintWindow(pages, 'Handwriting pages');
    setStatus(status, ok ? 'Print dialog opened. Choose “Save as PDF” for a PDF file.' : 'Your browser blocked the print window.', ok ? 'success' : 'error');
    track('tool_download', { tool: 'handwriting_generator', format: 'print_pdf' });
  });

  render();
  track('tool_view', { tool: 'handwriting_generator' });
}
