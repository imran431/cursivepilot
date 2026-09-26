import { setStatus, track } from './common.js';

const SUPABASE_URL = 'https://vrmvagmoeeadhfyelkbv.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_HbfH4p6CmbeeXY27LHJ9eA_-_XzsY-a';

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
      const response = await fetch(`${SUPABASE_URL}/functions/v1/feedback`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          email: String(data.email || ''),
          message: String(data.message || ''),
          website: String(data.website || ''),
          page: location.pathname,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || 'Request failed');
      }

      form.reset();
      setStatus(status, 'Thanks — your message was sent.', 'success');
      track('feedback_submit', { page: location.pathname });
    } catch (error) {
      console.error(error);
      setStatus(status, 'Could not send the form. Please try again.', 'error');
    } finally {
      button.disabled = false;
    }
  });
}
