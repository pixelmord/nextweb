alter table "auth"."users"
alter column "phone"
set data type character varying(15) using "phone"::character varying(15);
alter table "auth"."users"
alter column "phone_change"
set data type character varying(15) using "phone_change"::character varying(15);
alter table "public"."profiles"
alter column "username"
set not null;
alter table "public"."scopes"
alter column "id"
set default uuid_generate_v4();
set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $function$ begin
insert into public.profiles (id, full_name, avatar_url)
values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
return new;
end;
$function$;
CREATE OR REPLACE FUNCTION public.insert_resource_user() RETURNS trigger LANGUAGE plpgsql AS $function$ begin
INSERT into resource_user (resource_id, user_id)
values (new.id, new.creator);
RETURN NEW;
END $function$;