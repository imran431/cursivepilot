import { canvasToBlob, downloadBlob, loadFont, setStatus, track } from './common.js';
import { createCanvas } from './canvas-engine.js';

const root = document.querySelector('[data-signature-tool]');
if (root) {
  const nameInput = root.querySelector('[data-name]');
  const cards = [...root.querySelectorAll('[data-signature-card]')];
  const ink = root.querySelector('[data-ink]');
  const underline = root.querySelector('[data-underline]');
  const preview = root.querySelector('[data-preview]');
  const download = root.querySelector('[data-download]');
  const status = root.querySelector('[data-status]');
  let selectedFont = cards[0]?.dataset.font || 'Great Vibes';
  let canvas;

  function refreshCards() {
    const name = nameInput.value.trim().slice(0, 60) || 'Alex Morgan';
    cards.forEach((card) => {
      card.querySelector('[data-card-name]').textContent = name;
      card.setAttribute('aria-selected', String(card.dataset.font === selectedFont));
    });
  }

  async function render() {
    const name = nameInput.value.trim().slice(0, 60) || 'Alex Morgan';
    await loadFont(selectedFont, 126);
    canvas = createCanvas(1200, 420);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `126px "${selectedFont}", "Segoe Script", cursive`;
    ctx.fillStyle = ink.value;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, canvas.width / 2, 200, 1040);
    if (underline.checked) {
      const width = Math.min(ctx.measureText(name).width, 940);
      ctx.strokeStyle = ink.value;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - width * .46, 285);
      ctx.quadraticCurveTo(canvas.width / 2, 310, canvas.width / 2 + width * .50, 274);
      ctx.stroke();
    }
    preview.innerHTML = '';
    preview.append(canvas);
    setStatus(status, 'Signature-style preview updated.', 'success');
  }

  nameInput.addEventListener('input', () => { refreshCards(); render(); });
  ink.addEventListener('input', render);
  underline.addEventListener('input', render);
  cards.forEach((card) => card.addEventListener('click', () => {
    selectedFont = card.dataset.font;
    refreshCards();
    render();
  }));

  download.addEventListener('click', async () => {
    if (!canvas) await render();
    const blob = await canvasToBlob(canvas);
    downloadBlob(blob, 'cursive-signature.png');
    setStatus(status, 'Transparent PNG downloaded.', 'success');
    track('tool_download', { tool: 'signature_generator', format: 'png', style: selectedFont });
  });

  refreshCards();
  render();
  track('tool_view', { tool: 'signature_generator' });
}
