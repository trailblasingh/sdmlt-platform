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

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  level text not null,
  case_name text not null,
  short_description text
);

alter table public.cases add column if not exists level text;
alter table public.cases add column if not exists case_name text;
alter table public.cases add column if not exists short_description text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'cases_case_name_key'
  ) THEN
    ALTER TABLE public.cases ADD CONSTRAINT cases_case_name_key UNIQUE (case_name);
  END IF;
END$$;

insert into public.cases (level, case_name, short_description) values
  (
    'case-studies',
    'Eastern Europe Casket Works',
    'A family-owned casket maker must decide whether to automate production in a declining market with aging labor, capital constraints, and irreversible investment risk.'
  ),
  (
    'case-studies',
    'AmeriGlow',
    'A business with strong operating metrics must decide whether local efficiency is masking a deeper strategic weakness in capital allocation, inventory, and value creation.'
  )
on conflict (case_name) do update
set level = excluded.level,
    short_description = excluded.short_description;

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  level text not null,
  case_name text not null,
  prompt text not null,
  options jsonb not null default '[]'::jsonb,
  correct_index integer not null,
  analysis text
);

alter table public.questions add column if not exists level text;
alter table public.questions add column if not exists case_name text;
alter table public.questions add column if not exists prompt text;
alter table public.questions add column if not exists options jsonb not null default '[]'::jsonb;
alter table public.questions add column if not exists correct_index integer;
alter table public.questions add column if not exists analysis text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'questions_case_prompt_key'
  ) THEN
    ALTER TABLE public.questions ADD CONSTRAINT questions_case_prompt_key UNIQUE (case_name, prompt);
  END IF;
END$$;

insert into public.questions (level, case_name, prompt, options, correct_index, analysis) values
  (
    'case-studies',
    'Eastern Europe Casket Works',
    'In the Eastern Europe Casket Works setup, which statement is the core decision rather than just a symptom?',
    '["Veteran artisans are aging", "The market is steadily declining", "Whether to invest significantly in automation or maintain the status quo", "Production is still highly manual"]'::jsonb,
    2,
    'The real case decision is automation versus status quo. The other points are context and constraints that shape the decision, not the decision itself.'
  ),
  (
    'case-studies',
    'Eastern Europe Casket Works',
    'Which item is most clearly a case constraint in this topic?',
    '["Capital availability", "MECE thinking", "Expected value formula", "Cherry-picking"]'::jsonb,
    0,
    'Capital availability is a hard operating constraint in the case. The other options are tools or errors in reasoning, not business constraints.'
  ),
  (
    'case-studies',
    'Eastern Europe Casket Works',
    'Which structure is most consistent with this framework''s MECE approach to the automation case?',
    '["One long list mixing finance, people, technology, and market issues randomly", "Separate buckets for market conditions, financial impact, risk, and flexibility", "A structure based only on what the owner worries about most today", "A structure that repeats labor cost under every branch"]'::jsonb,
    1,
    'A strong case structure separates the problem into clean, non-overlapping buckets. Market conditions, economics, risk, and flexibility provide a disciplined lens for the decision.'
  ),
  (
    'case-studies',
    'Eastern Europe Casket Works',
    'Which statement best reflects bottleneck analysis in a business case?',
    '["Treat every issue as equally limiting", "Identify the specific constraint that most limits performance before optimizing around it", "Assume the first visible problem is the real bottleneck", "Start with implementation before diagnosis"]'::jsonb,
    1,
    'Bottleneck analysis looks for the limiting factor that most constrains the outcome. That is the highest-leverage place to focus the case.'
  ),
  (
    'case-studies',
    'Eastern Europe Casket Works',
    'Why does this framework conclude that delaying automation was the strongest decision for Eastern Europe Casket Works?',
    '["Because automation never creates value", "Because preserving flexibility had higher value under volatility and irreversibility", "Because labor costs were already irrelevant", "Because competitors had stopped investing"]'::jsonb,
    1,
    'The case shows the value of optionality under uncertainty. Delaying protected the business from locking into an irreversible investment before the environment became clearer.'
  ),
  (
    'case-studies',
    'Eastern Europe Casket Works',
    'Which change would most likely reverse the decision to delay?',
    '["Demand remains unstable and labor stays cheap", "The cost of automation falls and market demand becomes stable and predictable", "Management becomes impatient with ambiguity", "The company focuses only on DCF without flexibility"]'::jsonb,
    1,
    'If uncertainty falls and automation economics improve, the value of waiting drops. That is the kind of condition that can legitimately change the recommendation.'
  ),
  (
    'case-studies',
    'AmeriGlow',
    'What is the central warning from the AmeriGlow case?',
    '["Operational efficiency should always dominate strategy", "A single optimized metric can hide broader value destruction", "Inventory should always be maximized to avoid stockouts", "Demand shifts matter less than procurement scale"]'::jsonb,
    1,
    'AmeriGlow warns against mistaking local efficiency for strategic health. A business can optimize one metric while quietly weakening its overall economics and flexibility.'
  ),
  (
    'case-studies',
    'AmeriGlow',
    'When using estimation logic or a risk-return cutoff in this case, what matters most?',
    '["Using one precise number without showing assumptions", "Linking the estimate to constraints, scenarios, and decision consequences", "Avoiding all qualitative judgment", "Treating market size as separate from the decision itself"]'::jsonb,
    1,
    'The point of estimation in a case is not just precision. It is to clarify assumptions, compare scenarios, and improve the decision itself.'
  )
on conflict (case_name, prompt) do update
set level = excluded.level,
    options = excluded.options,
    correct_index = excluded.correct_index,
    analysis = excluded.analysis;

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
  certificate_id text,
  unique(user_id, level)
);

alter table public.certificates add column if not exists user_id uuid;
alter table public.certificates add column if not exists level text;
alter table public.certificates add column if not exists issued_at timestamptz default now();
alter table public.certificates add column if not exists certificate_id text;

alter table public.certificates drop constraint if exists certificates_level_check;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_certificate_id'
  ) THEN
    ALTER TABLE public.certificates ADD CONSTRAINT unique_certificate_id UNIQUE (certificate_id);
  END IF;
END$$;

create or replace function public.generate_certificate_id(p_level text)
returns text as $$
declare
  level_code text;
  random_code text;
begin
  level_code := case p_level
    when 'foundations' then 'L1'
    when 'problem-solving' then 'L2'
    when 'decision-frameworks' then 'L3'
    when 'case-studies' then 'L4'
    else 'LX'
  end;

  random_code := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 5));

  return 'SDMLT-' || level_code || '-' || extract(year from now())::text || '-' || random_code;
end;
$$ language plpgsql;

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
    insert into public.certificates (user_id, level, certificate_id)
    values (p_user, p_level, public.generate_certificate_id(p_level))
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
