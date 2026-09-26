-- Run in Supabase SQL Editor.
-- The public website does not get direct INSERT access. Netlify Functions use the service role key server-side.
create extension if not exists pgcrypto;

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  email text,
  message text not null check (char_length(message) between 10 and 4000),
  page text,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- Intentionally no public policies. The service role used by the server-side Netlify Function bypasses RLS.
create index if not exists feedback_created_at_idx on public.feedback (created_at desc);
