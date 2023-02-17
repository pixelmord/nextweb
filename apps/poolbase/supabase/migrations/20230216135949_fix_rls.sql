drop policy "Enable insert for authenticated users only" on "public"."resource_user";

alter table "public"."profiles" add column "updated_at" timestamp with time zone default now();

create policy "authenticated users only"
on "public"."resource_user"
as permissive
for all
to authenticated
using (true)
with check (true);



