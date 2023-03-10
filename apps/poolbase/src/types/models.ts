import * as zod from 'zod';

export const ResourceSchema = zod.object({
  id: zod.string(),
  url: zod.string().url().min(1),
  creator: zod.string(),
  title: zod.string().optional(),
  status: zod.string().nullable(),
  meta_keywords: zod.array(zod.string()).nullable().optional(),
  meta_description: zod.string().nullable().optional(),
  meta_title: zod.string().nullable().optional(),
  meta_author: zod.string().nullable().optional(),
  meta_publisher: zod.string().nullable().optional(),
  main_text: zod.string().nullable().optional(),
  meta_icon_url: zod.string().nullable().optional(),
  main_image_url: zod.string().nullable().optional(),
  screenshot_full_url: zod.string().optional(),
  screenshot_storage_path: zod.string().optional(),
  created_at: zod.string().nullable().optional(),
  provider: zod.string().nullable().optional(),
  provider_channel: zod.string().nullable().optional(),
  processed: zod.string().array().nullable().optional(),
});

export type ResourceData = zod.infer<typeof ResourceSchema>;

export const UserProfileSchema = zod.object({
  id: zod.string(),
  updated_at: zod.string().optional(),
  created_at: zod.string().optional(),
  username: zod.string().min(1).max(255).nullable().optional(),
  full_name: zod.string().min(1).max(255).nullable().optional(),
  avatar_url: zod.string().url().nullable().optional(),
  avatar_storage_path: zod.string().nullable().optional(),
  website: zod.string().url().nullable().optional(),
});

export type UserProfileData = zod.infer<typeof UserProfileSchema>;

export const IntegrationSchema = zod.object({
  display_name: zod.string().min(1).max(255),
  provider: zod.string().min(1).max(255),
  api_username: zod.string().min(1).max(255),
  access_token: zod.string().min(1),
});

export type IntegrationData = zod.infer<typeof IntegrationSchema>;
