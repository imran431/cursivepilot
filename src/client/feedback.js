import { setStatus, track } from './common.js';

const form = document.querySelector('[data-feedback-form]');
if (form) {
  const status = form.querySelector('[data-status]');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    setStatus(status, 'Sending…');
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: String(data.email || ''),
          message: String(data.message || ''),
          website: String(data.website || ''),
          page: location.pathname,
        }),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus(status, 'Thanks — your message was sent.', 'success');
      track('feedback_submit', { page: location.pathname });
    } catch {
      setStatus(status, 'Could not send the form. Check the Supabase environment variables in Netlify, or email us directly.', 'error');
    } finally {
      button.disabled = false;
    }
  });
}
