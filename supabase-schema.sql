create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  nickname text not null,
  created_at timestamp with time zone default now()
);

create table if not exists responses (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  trust int not null check (trust between 1 and 10),
  attractive int not null check (attractive between 1 and 10),
  reliable int not null check (reliable between 1 and 10),
  success int not null check (success between 1 and 10),
  overrated text not null check (overrated in ('sottovalutato','sopravvalutato')),
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;
alter table responses enable row level security;

create policy "Public profiles read" on profiles for select using (true);
create policy "Public profiles insert" on profiles for insert with check (true);
create policy "Public responses read" on responses for select using (true);
create policy "Public responses insert" on responses for insert with check (true);
