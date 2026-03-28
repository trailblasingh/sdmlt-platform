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

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  level text not null,
  topic text not null
);

alter table public.topics add column if not exists level text;
alter table public.topics add column if not exists topic text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'topics_level_topic_key'
  ) THEN
    ALTER TABLE public.topics ADD CONSTRAINT topics_level_topic_key UNIQUE (level, topic);
  END IF;
END$$;

insert into public.topics (level, topic) values
  ('foundations', 'Decision Sources'),
  ('foundations', 'Logic Types'),
  ('foundations', 'Statements & Assumptions'),
  ('foundations', 'Cognitive Biases'),
  ('problem-solving', 'Problem Framing (GAI)'),
  ('problem-solving', 'Structured Solving'),
  ('problem-solving', 'Data Interpretation'),
  ('problem-solving', 'Reasoning Patterns'),
  ('decision-frameworks', 'Decision Trees'),
  ('decision-frameworks', 'Expected Value'),
  ('decision-frameworks', 'Risk (Known vs Unknown)'),
  ('decision-frameworks', 'Personal Finance Logic'),
  ('case-studies', 'Case Orientation'),
  ('case-studies', 'Case Structuring'),
  ('case-studies', 'Data & Insight'),
  ('case-studies', 'Integrated Cases')
on conflict (level, topic) do nothing;

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  level text not null,
  topic text not null,
  completed boolean default true,
  created_at timestamptz default now()
);

alter table public.progress add column if not exists user_id uuid;
alter table public.progress add column if not exists level text;
alter table public.progress add column if not exists topic text;
alter table public.progress add column if not exists completed boolean default true;
alter table public.progress add column if not exists created_at timestamptz default now();

update public.progress
set completed = true
where completed is null;

alter table public.progress drop constraint if exists progress_level_check;
alter table public.progress drop constraint if exists progress_user_id_level_key;
alter table public.progress drop constraint if exists unique_progress_user_level_topic;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_progress_user_level_topic'
  ) THEN
    ALTER TABLE public.progress ADD CONSTRAINT unique_progress_user_level_topic UNIQUE (user_id, level, topic);
  END IF;
END$$;

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  level text not null,
  issued_at timestamptz default now(),
  unique(user_id, level)
);

alter table public.certificates add column if not exists user_id uuid;
alter table public.certificates add column if not exists level text;
alter table public.certificates add column if not exists issued_at timestamptz default now();

alter table public.certificates drop constraint if exists certificates_level_check;

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

create or replace function public.check_and_issue_certificate(p_user uuid, p_level text)
returns void as $$
declare
  total_topics int;
  completed_topics int;
begin
  select count(*) into total_topics
  from public.topics
  where level = p_level;

  select count(*) into completed_topics
  from public.progress
  where user_id = p_user
    and level = p_level
    and completed = true;

  if total_topics > 0 and total_topics = completed_topics then
    insert into public.certificates (user_id, level)
    values (p_user, p_level)
    on conflict (user_id, level) do nothing;
  end if;
end;
$$ language plpgsql;

create or replace function public.trigger_certificate()
returns trigger as $$
begin
  perform public.check_and_issue_certificate(new.user_id, new.level);
  return new;
end;
$$ language plpgsql;

drop trigger if exists progress_certificate_trigger on public.progress;
create trigger progress_certificate_trigger
after insert or update on public.progress
for each row
execute function public.trigger_certificate();

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
