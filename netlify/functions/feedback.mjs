const json = (statusCode, body) => ({
  statusCode,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  body: JSON.stringify(body),
});

const clean = (value, max) => String(value ?? '').trim().slice(0, max);

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  let input;
  try { input = JSON.parse(event.body || '{}'); }
  catch { return json(400, { error: 'Invalid JSON' }); }

  // Honeypot: return success without storing obvious bot submissions.
  if (clean(input.website, 200)) return json(200, { ok: true });

  const email = clean(input.email, 200);
  const message = clean(input.message, 4000);
  const page = clean(input.page, 250);
  if (message.length < 10) return json(400, { error: 'Message is too short' });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: 'Invalid email' });

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return json(503, { error: 'Feedback storage is not configured' });

  const response = await fetch(`${supabaseUrl}/rest/v1/feedback`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      authorization: `Bearer ${serviceKey}`,
      'content-type': 'application/json',
      prefer: 'return=minimal',
    },
    body: JSON.stringify({ email: email || null, message, page: page || null }),
  });

  if (!response.ok) {
    console.error('Supabase feedback insert failed', response.status, await response.text());
    return json(502, { error: 'Could not store feedback' });
  }
  return json(200, { ok: true });
}
