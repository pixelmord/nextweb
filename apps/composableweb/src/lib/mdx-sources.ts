import * as z from 'zod';
import { createSource } from 'mdx';

export const Blog = createSource({
  contentPath: 'content/blog',
  basePath: '/blog',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    createdAt: z.string(),
    publishedAt: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
  }),
});

export const CodeRecipes = createSource({
  contentPath: 'content/code-recipes',
  basePath: '/code-recipes',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    createdAt: z.string(),
    publishedAt: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
  }),
});

export const Knowhow = createSource({
  contentPath: 'content/knowhow',
  basePath: '/knowhow',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    createdAt: z.string(),
    publishedAt: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
  }),
});
export const Pages = createSource({
  contentPath: 'content/pages',
  basePath: '/pages',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    createdAt: z.string(),
    publishedAt: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
  }),
});
