import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const clean = (value: unknown, max: number) =>
  String(value ?? "").trim().slice(0, max);

function readKeyMap(name: string): Record<string, string> {
  try {
    return JSON.parse(Deno.env.get(name) ?? "{}");
  } catch {
    return {};
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const suppliedKey = req.headers.get("apikey") ?? "";
  const publishableKeys = Object.values(readKeyMap("SUPABASE_PUBLISHABLE_KEYS"));
  const legacyAnon = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const allowedPublicKeys = new Set([...publishableKeys, legacyAnon].filter(Boolean));

  if (!allowedPublicKeys.has(suppliedKey)) {
    return json(401, { error: "Invalid project key" });
  }

  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  if (clean(input.website, 200)) {
    return json(200, { ok: true });
  }

  const email = clean(input.email, 200);
  const message = clean(input.message, 4000);
  const page = clean(input.page, 250);

  if (message.length < 10) {
    return json(400, { error: "Message is too short" });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: "Invalid email" });
  }

  const supabaseUrl = (Deno.env.get("SUPABASE_URL") ?? "").replace(/\/$/, "");
  const secretKeys = readKeyMap("SUPABASE_SECRET_KEYS");
  const newSecret = secretKeys.default ?? "";
  const legacyServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const adminKey = newSecret || legacyServiceRole;

  if (!supabaseUrl || !adminKey) {
    console.error("Supabase admin environment is unavailable");
    return json(503, { error: "Storage is not configured" });
  }

  const headers: Record<string, string> = {
    apikey: adminKey,
    "content-type": "application/json",
    prefer: "return=minimal",
  };

  if (!adminKey.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${adminKey}`;
  }

  const insert = await fetch(`${supabaseUrl}/rest/v1/feedback`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: email || null,
      message,
      page: page || null,
    }),
  });

  if (!insert.ok) {
    console.error("Feedback insert failed", insert.status, await insert.text());
    return json(502, { error: "Could not store feedback" });
  }

  return json(200, { ok: true });
});
