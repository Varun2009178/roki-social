
# Supabase Migration Guide

To support the transition from Mock JSON DB to Real Postgres DB, please execute the following SQL in your Supabase SQL Editor.

## 1. Create 'groups' Table
This table stores all squad data, members, and game state.

```sql
create table groups (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  code text unique,
  status text default 'pending', -- 'pending' | 'active'
  goal text,                     -- Weekly goal text
  deadline text,                 -- ISO String for member deadline
  members jsonb default '[]'::jsonb, -- Array of phone numbers e.g. ["+1555...", "+1444..."]
  weekly_progress jsonb default '{}'::jsonb -- Map of phone -> {verified: bool, last_seen: date}
);
```

## 2. Row Level Security (RLS)
For now, since we interact via Server Actions (backend), RLS can be permissive or disabled.
To enable public read (be careful):
```sql
alter table groups enable row level security;
create policy "Public Read" on groups for select using (true);
create policy "Public Insert" on groups for insert with check (true);
create policy "Public Update" on groups for update using (true);
```
*Note: For production, lock this down so only the API Key (Server Role) can write.*

## 3. Environment Variables
Ensure these are in your `.env.local` locally and Vercel Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_KEY]
CRON_SECRET=your_super_secret_token
```

## 4. Setup Cron Jobs (Daily Nudges & Rolling Recaps)
To handle daily accountability nudges and the rolling 7-day member recaps natively in Supabase:

1.  **Enable Extensions**:
    In your Supabase SQL Editor, run:
    ```sql
    create extension if not exists pg_cron;
    create extension if not exists "pg_net";
    ```

2.  **Schedule the Job**:
    Run this SQL to trigger the Roki Referee every day at 10:00 AM UTC (adjust to your preferred local morning time):
    ```sql
    select
      cron.schedule(
        'roki-daily-nudge',
        '0 10 * * *', -- Every day at 10:00 AM UTC
        $$
        select
          net.http_get(
            url:='https://your-app-domain.com/api/cron/deadline',
            headers:='{"Authorization": "Bearer your_super_secret_token"}'
          );
        $$
      );
    ```

3.  **Secure the Route**:
    Ensure the `CRON_SECRET` in your environment variables matches the token used in the SQL above.

*Note: Replace `https://your-app-domain.com` with your actual deployed URL.*
