import { canvasToBlob, debounce, downloadBlob, loadFont, setStatus, track } from './common.js';
import { createCanvas, wrapText } from './canvas-engine.js';

const BASE_WIDTH = 1200;
const MIN_HEIGHT = 630;
const MAX_HEIGHT = 4096;
const SIDE_PADDING = 140;
const VERTICAL_PADDING = 90;

function lineMetrics(ctx, line, size) {
  const metrics = ctx.measureText(line || 'Mg');
  const ascent = metrics.actualBoundingBoxAscent || size * 0.82;
  const descent = metrics.actualBoundingBoxDescent || size * 0.26;
  return { ascent, descent, height: Math.max(size, ascent + descent) };
}

function buildLayout(ctx, value, size) {
  const maxWidth = BASE_WIDTH - SIDE_PADDING * 2;
  const lines = wrapText(ctx, value || 'Beautiful words', maxWidth);
  const gap = Math.max(12, size * 0.18);
  const rows = lines.map((line) => ({ line, ...lineMetrics(ctx, line, size) }));
  const contentHeight = rows.reduce(
    (sum, row, index) => sum + row.height + (index < rows.length - 1 ? gap : 0),
    0,
  );
  const requiredHeight = Math.max(MIN_HEIGHT, Math.ceil(VERTICAL_PADDING * 2 + contentHeight));
  return { lines, rows, gap, contentHeight, requiredHeight };
}

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
  let canvas = null;

  async function render() {
    const family = font.value;
    const size = Number(fontSize.value);
    const value = text.value || 'Beautiful words';
    await loadFont(family, size);

    const probe = createCanvas(1, 1);
    const probeCtx = probe.getContext('2d');
    probeCtx.font = `${size}px "${family}", "Segoe Script", cursive`;
    const layout = buildLayout(probeCtx, value, size);

    if (layout.requiredHeight > MAX_HEIGHT) {
      canvas = null;
      download.disabled = true;
      preview.innerHTML = '<div class="empty-state"><strong>This text is too tall at the selected size.</strong><span>Reduce Text size or remove some manual line breaks. No input has been discarded.</span></div>';
      setStatus(status, `At ${size}px this text needs about ${layout.requiredHeight}px of canvas height; the safe limit is ${MAX_HEIGHT}px.`, 'error');
      return;
    }

    canvas = createCanvas(BASE_WIDTH, layout.requiredHeight);
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
    ctx.textBaseline = 'alphabetic';

    let y = (canvas.height - layout.contentHeight) / 2;
    for (const row of layout.rows) {
      const baseline = y + row.ascent;
      if (row.line) ctx.fillText(row.line, canvas.width / 2, baseline);
      y += row.height + layout.gap;
    }

    preview.innerHTML = '';
    preview.append(canvas);
    download.disabled = false;
    const expanded = canvas.height > MIN_HEIGHT
      ? ` Canvas expanded to ${canvas.width} × ${canvas.height}px to preserve the selected ${size}px text size.`
      : '';
    setStatus(status, `Preview updated with all ${layout.lines.length} visual line${layout.lines.length === 1 ? '' : 's'}.${expanded}`, 'success');
  }

  const rerender = debounce(render, 100);
  [text, fontSize, ink, bg, transparent].forEach((el) => el.addEventListener('input', rerender));
  font.addEventListener('change', render);

  download.addEventListener('click', async () => {
    if (!canvas) await render();
    if (!canvas) return;
    const blob = await canvasToBlob(canvas);
    downloadBlob(blob, 'calligraphy.png');
    setStatus(status, 'PNG downloaded from the complete preview.', 'success');
    track('tool_download', { tool: 'calligraphy_generator', format: 'png' });
  });

  render();
  track('tool_view', { tool: 'calligraphy_generator' });
}
