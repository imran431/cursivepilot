import { canvasToBlob, debounce, downloadBlob, loadFont, setStatus, track } from './common.js';
import { createCanvas, wrapText } from './canvas-engine.js';

const root = document.querySelector('[data-calligraphy-tool]');
if (root) {
  const text = root.querySelector('[data-text]');
  const font = root.querySelector('[data-font]');
  const fontSize = root.querySelector('[data-font-size]');
  const ink = root.querySelector('[data-ink]');
  const bg = root.querySelector('[data-bg]');
  const transparent = root.querySelector('[data-transparent]');
  const preview = root.querySelector('[data-preview]');
  const download = root.querySelector('[data-download]');
  const status = root.querySelector('[data-status]');
  let canvas;

  async function render() {
    const family = font.value;
    const size = Number(fontSize.value);
    await loadFont(family, size);
    canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    if (!transparent.checked) {
      ctx.fillStyle = bg.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    ctx.font = `${size}px "${family}", "Segoe Script", cursive`;
    ctx.fillStyle = ink.value;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lines = wrapText(ctx, text.value.slice(0, 400) || 'Beautiful words', 960).slice(0, 5);
    const lineGap = size * 1.12;
    const total = (lines.length - 1) * lineGap;
    lines.forEach((line, i) => ctx.fillText(line, canvas.width / 2, canvas.height / 2 - total / 2 + i * lineGap));
    preview.innerHTML = '';
    preview.append(canvas);
    setStatus(status, 'Preview updated.', 'success');
  }

  const rerender = debounce(render, 100);
  [text, fontSize, ink, bg, transparent].forEach((el) => el.addEventListener('input', rerender));
  font.addEventListener('change', render);

  download.addEventListener('click', async () => {
    if (!canvas) await render();
    const blob = await canvasToBlob(canvas);
    downloadBlob(blob, 'calligraphy.png');
    setStatus(status, 'PNG downloaded.', 'success');
    track('tool_download', { tool: 'calligraphy_generator', format: 'png' });
  });

  render();
  track('tool_view', { tool: 'calligraphy_generator' });
}
