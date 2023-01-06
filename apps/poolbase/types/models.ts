import * as zod from 'zod';

export const ResourceSchema = zod.object({
  id: zod.string(),
  url: zod.string().url(),
  uid: zod.string(),
  title: zod.string().optional(),
  status: zod.string().nullable(),
  metaKeywords: zod.array(zod.string()).nullable().optional(),
  metaDescription: zod.string().nullable().optional(),
  metaTitle: zod.string().nullable().optional(),
  metaAuthor: zod.string().nullable().optional(),
  metaPublisher: zod.string().nullable().optional(),
  mainText: zod.string().nullable().optional(),
  metaIconUrl: zod.string().nullable().optional(),
  mainImageUrl: zod.string().nullable().optional(),
  screenshotFullUrl: zod.string().optional(),
  screenshotPreviewUrl: zod.string().optional(),
  processed: zod.object({
    html: zod.boolean().nullable().optional(),
  }),
});

export type ResourceData = zod.infer<typeof ResourceSchema>;

export const UserProfileSchema = zod.object({
  id: zod.string(),
  updated_at: zod.string().optional(),
  username: zod.string().min(1).max(255).nullable().optional(),
  public_email: zod.string().email().optional(),
  full_name: zod.string().min(1).max(255).nullable().optional(),
  avatar_url: zod.string().url().optional(),
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
