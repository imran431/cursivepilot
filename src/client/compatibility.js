import { copyText, setStatus, track } from './common.js';
import { convert, styleDefs } from './unicode.js';

const root = document.querySelector('[data-compatibility-lab]');
if (root) {
  const input = root.querySelector('[data-compat-input]');
  const styleSelect = root.querySelector('[data-compat-style]');
  const output = root.querySelector('[data-compat-output]');
  const copy = root.querySelector('[data-compat-copy]');
  const status = root.querySelector('[data-status]');
  const previews = [...root.querySelectorAll('[data-preview-text]')];

  styleDefs
    .filter((style) => ['script','bold-script','italic','bold-italic','sans-italic','fraktur','double'].includes(style.id))
    .forEach((style) => {
      const option = document.createElement('option');
      option.value = style.id;
      option.textContent = style.name;
      styleSelect.append(option);
    });

  function render() {
    const style = styleDefs.find((item) => item.id === styleSelect.value) || styleDefs[0];
    const value = input.value.slice(0, 180) || 'CursivePilot test';
    const converted = convert(value, style);
    output.textContent = converted;
    previews.forEach((node) => { node.textContent = converted; });
  }

  input.addEventListener('input', render);
  styleSelect.addEventListener('change', render);
  copy.addEventListener('click', async () => {
    const ok = await copyText(output.textContent || '');
    setStatus(status, ok ? 'Test text copied. Paste it into the real app or device you want to check.' : 'Copy failed.', ok ? 'success' : 'error');
    track('tool_copy', { tool: 'compatibility_lab', style: styleSelect.value });
  });

  render();
  track('tool_view', { tool: 'compatibility_lab' });
}
