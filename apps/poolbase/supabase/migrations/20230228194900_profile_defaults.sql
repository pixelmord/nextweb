alter table "public"."profiles"
alter column "avatar_storage_path"
set default ''::text;
alter table "public"."profiles"
alter column "username"
set default ''::text;