import * as z from 'zod';
import { createSource } from 'mdx';

export const Recipes = createSource({
  contentPath: 'content/recipes',
  basePath: '/recipes',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    createdAt: z.string(),
    publishedAt: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
    ingredients: z.string().array().optional().nullable(),
    tags: z.string().array().optional().nullable(),
    preparationTime: z.number().optional().nullable(),
    difficulty: z.string().optional().nullable(),
    coverImage: z.string().optional().nullable(),
  }),
});
