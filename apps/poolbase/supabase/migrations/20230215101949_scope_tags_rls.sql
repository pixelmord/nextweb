create policy "auth_full" on "public"."resource_tag" as permissive for all to authenticated using (true) with check (true);
create policy "auth_full" on "public"."scope_tag" as permissive for all to authenticated using (true) with check (true);
create policy "auth_full" on "public"."scopes" as permissive for all to authenticated using (true) with check (true);
create policy "auth_full" on "public"."tags" as permissive for all to authenticated using (true) with check (true);