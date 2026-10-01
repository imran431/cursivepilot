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

  const ordered = [...styleDefs].sort((a,b) =>
    a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );

  styleSelect.innerHTML = '';
  let lastCategory = '';
  let currentGroup = null;
  for (const style of ordered) {
    if (style.category !== lastCategory) {
      currentGroup = document.createElement('optgroup');
      currentGroup.label = style.category;
      styleSelect.append(currentGroup);
      lastCategory = style.category;
    }
    const option = document.createElement('option');
    option.value = style.id;
    option.textContent = style.name;
    currentGroup.append(option);
  }

  styleSelect.value = styleDefs.some((s)=>s.id==='script') ? 'script' : styleDefs[0]?.id || '';

  function render() {
    const style = styleDefs.find((item) => item.id === styleSelect.value) || styleDefs[0];
    const value = input.value.slice(0, 180) || 'CursivePilot test';
    const converted = style ? convert(value, style) : value;
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
  track('tool_view', { tool: 'compatibility_lab', styles: styleDefs.length });
}
