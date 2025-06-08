create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table posts enable row level security;

create policy "Users can view own posts" on posts
  for select using (auth.uid() = user_id);

create policy "Users can create own posts" on posts
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own posts" on posts
  for delete using (auth.uid() = user_id);
