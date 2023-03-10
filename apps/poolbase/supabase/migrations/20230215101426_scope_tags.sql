create table "public"."resource_tag" (
  "id" uuid not null,
  "created_at" timestamp with time zone default now(),
  "resource_id" uuid,
  "tag_id" uuid
);
alter table "public"."resource_tag" enable row level security;
create table "public"."scope_tag" (
  "id" uuid not null,
  "created_at" timestamp with time zone default now(),
  "scope_id" uuid,
  "tag_id" uuid
);
alter table "public"."scope_tag" enable row level security;
create table "public"."scopes" (
  "id" uuid not null,
  "created_at" timestamp with time zone default now(),
  "updated_at" timestamp with time zone default now(),
  "title" text,
  "image_url" text,
  "image_storage_path" text,
  "uid" uuid default auth.uid()
);
alter table "public"."scopes" enable row level security;
create table "public"."tags" (
  "id" uuid not null,
  "created_at" timestamp with time zone default now(),
  "updated_at" timestamp with time zone default now(),
  "title" text,
  "image_url" text,
  "image_storage_path" text,
  "uid" uuid default auth.uid()
);
alter table "public"."tags" enable row level security;
alter table "public"."profiles" drop column "updated_at";
alter table "public"."profiles"
add column "avatar_storage_path" text;
CREATE UNIQUE INDEX resource_tag_pkey ON public.resource_tag USING btree (id);
CREATE UNIQUE INDEX scope_tag_pkey ON public.scope_tag USING btree (id);
CREATE UNIQUE INDEX scopes_pkey ON public.scopes USING btree (id);
CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);
alter table "public"."resource_tag"
add constraint "resource_tag_pkey" PRIMARY KEY using index "resource_tag_pkey";
alter table "public"."scope_tag"
add constraint "scope_tag_pkey" PRIMARY KEY using index "scope_tag_pkey";
alter table "public"."scopes"
add constraint "scopes_pkey" PRIMARY KEY using index "scopes_pkey";
alter table "public"."tags"
add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";
alter table "public"."resource_tag"
add constraint "resource_tag_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES resources(id) not valid;
alter table "public"."resource_tag" validate constraint "resource_tag_resource_id_fkey";
alter table "public"."resource_tag"
add constraint "resource_tag_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) not valid;
alter table "public"."resource_tag" validate constraint "resource_tag_tag_id_fkey";
alter table "public"."scope_tag"
add constraint "scope_tag_scope_id_fkey" FOREIGN KEY (scope_id) REFERENCES scopes(id) not valid;
alter table "public"."scope_tag" validate constraint "scope_tag_scope_id_fkey";
alter table "public"."scope_tag"
add constraint "scope_tag_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) not valid;
alter table "public"."scope_tag" validate constraint "scope_tag_tag_id_fkey";
alter table "public"."scopes"
add constraint "scopes_uid_fkey" FOREIGN KEY (uid) REFERENCES auth.users(id) not valid;
alter table "public"."scopes" validate constraint "scopes_uid_fkey";
alter table "public"."tags"
add constraint "tags_uid_fkey" FOREIGN KEY (uid) REFERENCES auth.users(id) not valid;
alter table "public"."tags" validate constraint "tags_uid_fkey";