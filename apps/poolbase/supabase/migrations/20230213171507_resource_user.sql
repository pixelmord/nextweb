create table "public"."resource_user" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "user_id" uuid,
    "resource_id" uuid
);


alter table "public"."resource_user" enable row level security;

CREATE UNIQUE INDEX resource_user_pkey ON public.resource_user USING btree (id);

alter table "public"."resource_user" add constraint "resource_user_pkey" PRIMARY KEY using index "resource_user_pkey";

alter table "public"."resource_user" add constraint "resource_user_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES resources(id) not valid;

alter table "public"."resource_user" validate constraint "resource_user_resource_id_fkey";

alter table "public"."resource_user" add constraint "resource_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."resource_user" validate constraint "resource_user_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_resource_user()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  INSERT into resource_user
     (resource_id, user_id)
      values (new.id, new.creator);
  RETURN NEW;
END $function$
;

create policy "Enable insert for authenticated users only"
on "public"."resource_user"
as permissive
for all
to authenticated
with check (true);


CREATE TRIGGER insert_resource_user_after_resource_inserted AFTER INSERT ON public.resources FOR EACH ROW EXECUTE FUNCTION insert_resource_user();


create policy "full access 128fyud_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'resources'::text));


create policy "full access 128fyud_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'resources'::text));


create policy "full access 128fyud_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'resources'::text));


create policy "full access 128fyud_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'resources'::text));


create policy "full access 1oj01fe_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'avatars'::text));


create policy "full access 1oj01fe_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'avatars'::text));


create policy "full access 1oj01fe_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'avatars'::text));


create policy "full access 1oj01fe_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'avatars'::text));



