-- LoveNote Valentine App - Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- valentines table
create table public.valentines (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id text not null default 'classic_romance',
  recipient_name text not null default '',
  sender_name text not null default '',
  messages jsonb not null default '[]'::jsonb,
  ask_style text not null default 'sincere',
  music_url text,
  status text not null default 'draft',
  is_published boolean not null default false,
  share_link text,
  qr_code_url text,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- valentine_photos table
create table public.valentine_photos (
  id uuid not null default gen_random_uuid() primary key,
  valentine_id uuid not null references public.valentines(id) on delete cascade,
  storage_path text not null,
  public_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- valentine_responses table
create table public.valentine_responses (
  id uuid not null default gen_random_uuid() primary key,
  valentine_id uuid not null references public.valentines(id) on delete cascade,
  answer text not null,
  ip_hash text,
  responded_at timestamptz not null default now(),
  constraint one_response_per_valentine unique (valentine_id)
);

-- payments table
create table public.payments (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  valentine_id uuid not null references public.valentines(id) on delete cascade,
  stripe_session_id text,
  stripe_payment_intent_id text,
  amount_cents int not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Indexes
create index valentines_user_id_idx on valentines(user_id);
create index valentines_status_idx on valentines(status);
create index valentine_photos_valentine_id_idx on valentine_photos(valentine_id);
create index valentine_photos_sort_order_idx on valentine_photos(valentine_id, sort_order);
create index valentine_responses_valentine_id_idx on valentine_responses(valentine_id);
create index payments_valentine_id_idx on payments(valentine_id);
create index payments_stripe_session_id_idx on payments(stripe_session_id);

-- RLS
alter table public.valentines enable row level security;
alter table public.valentine_photos enable row level security;
alter table public.valentine_responses enable row level security;
alter table public.payments enable row level security;

-- Sender can CRUD own valentines
create policy "Users manage own valentines"
  on valentines for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Published valentines readable by anyone (receiver link)
create policy "Published valentines are public"
  on valentines for select to anon
  using (is_published = true and status = 'published');

-- Photos follow valentine ownership
create policy "Users manage own valentine photos"
  on valentine_photos for all to authenticated
  using (valentine_id in (select id from valentines where user_id = auth.uid()))
  with check (valentine_id in (select id from valentines where user_id = auth.uid()));

-- Published valentine photos are public
create policy "Published valentine photos are public"
  on valentine_photos for select to anon
  using (valentine_id in (select id from valentines where is_published = true));

-- Anyone can insert a response to a published valentine (receiver)
create policy "Anyone can respond to published valentine"
  on valentine_responses for insert to anon
  with check (valentine_id in (select id from valentines where is_published = true));

-- Sender can read responses
create policy "Sender can view responses"
  on valentine_responses for select to authenticated
  using (valentine_id in (select id from valentines where user_id = auth.uid()));

-- Users manage own payments
create policy "Users view own payments"
  on payments for select to authenticated
  using (auth.uid() = user_id);

-- Storage bucket for photos
insert into storage.buckets (id, name, public) values ('valentine-photos', 'valentine-photos', true);

-- Storage RLS: users upload to their own folder
create policy "Users upload own photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'valentine-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Public read for published photos"
  on storage.objects for select to public
  using (bucket_id = 'valentine-photos');

create policy "Users delete own photos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'valentine-photos' and auth.uid()::text = (storage.foldername(name))[1]);
