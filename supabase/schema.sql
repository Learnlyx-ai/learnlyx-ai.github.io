create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text,
  role text not null default 'learner',
  created_at timestamptz not null default now(),
  progress jsonb not null default '{"completedQuizzes": [], "quizStars": {}}'::jsonb,
  subscription jsonb not null default '{"isActive": false, "plan": "ai-teacher-pro", "amountUsdPerMonth": 10, "startedAt": null, "renewsAt": null}'::jsonb
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null,
  rating integer not null check (rating between 1 and 5),
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.reviews enable row level security;

create policy "Users can view their own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Anyone can view reviews"
on public.reviews
for select
using (true);

create policy "Authenticated users can insert reviews"
on public.reviews
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own reviews"
on public.reviews
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own reviews"
on public.reviews
for delete
using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
