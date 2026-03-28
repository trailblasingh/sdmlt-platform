create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  level text,
  payment_id text,
  status text default 'paid',
  created_at timestamptz default now()
);

alter table public.purchases add column if not exists user_id uuid;
alter table public.purchases add column if not exists level text;
alter table public.purchases add column if not exists payment_id text;
alter table public.purchases add column if not exists status text default 'paid';
alter table public.purchases add column if not exists created_at timestamptz default now();

alter table public.purchases drop constraint if exists purchases_level_check;
alter table public.purchases
add constraint purchases_level_check
check (level in (
  'problem-solving',
  'decision-frameworks',
  'case-studies'
));

update public.purchases
set status = 'paid'
where status is null;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_level'
  ) THEN
    ALTER TABLE public.purchases ADD CONSTRAINT unique_user_level UNIQUE (user_id, level);
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_payment_id'
  ) THEN
    ALTER TABLE public.purchases ADD CONSTRAINT unique_payment_id UNIQUE (payment_id);
  END IF;
END$$;

create index if not exists idx_purchases_user_id on public.purchases(user_id);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  level text not null check (level in ('foundations', 'problem-solving', 'decision-frameworks', 'case-studies')),
  completed_topics jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique(user_id, level)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  level text not null check (level in ('foundations', 'problem-solving', 'decision-frameworks', 'case-studies')),
  issued_at timestamptz not null default timezone('utc', now()),
  unique(user_id, level)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do update
  set email = excluded.email,
      name = coalesce(excluded.name, public.users.name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists progress_set_updated_at on public.progress;
create trigger progress_set_updated_at
  before update on public.progress
  for each row execute procedure public.set_updated_at();

alter table public.users enable row level security;
alter table public.purchases enable row level security;
alter table public.progress enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "users_select_own" on public.users;
create policy "users_select_own" on public.users for select using (auth.uid() = id);

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own" on public.users for insert with check (auth.uid() = id);

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own" on public.users for update using (auth.uid() = id);

drop policy if exists "purchases_select_own" on public.purchases;
create policy "purchases_select_own" on public.purchases for select using (auth.uid() = user_id);

drop policy if exists "purchases_insert_own" on public.purchases;
create policy "purchases_insert_own" on public.purchases for insert with check (auth.uid() = user_id);

drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own" on public.progress for select using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own" on public.progress for insert with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own" on public.progress for update using (auth.uid() = user_id);

drop policy if exists "certificates_select_own" on public.certificates;
create policy "certificates_select_own" on public.certificates for select using (auth.uid() = user_id);

drop policy if exists "certificates_insert_own" on public.certificates;
create policy "certificates_insert_own" on public.certificates for insert with check (auth.uid() = user_id);

drop policy if exists "certificates_update_own" on public.certificates;
create policy "certificates_update_own" on public.certificates for update using (auth.uid() = user_id);
