import { createSource } from 'mdx';
import * as z from 'zod';

export const Blog = createSource({
  contentPath: 'src/content/blog',
  basePath: '/blog',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    dateCreated: z.string(),
    datePublished: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
  }),
});

export const CodeRecipes = createSource({
  contentPath: 'src/content/code-recipes',
  basePath: '/code-recipes',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    dateCreated: z.string(),
    datePublished: z.string(),
    summary: z.string().optional(),
    tags: z.string().optional().array().optional(),
    draft: z.boolean(),
  }),
});

export const Knowhow = createSource({
  contentPath: 'src/content/knowhow',
  basePath: '/knowhow',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    dateCreated: z.string(),
    datePublished: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
  }),
});
export const Pages = createSource({
  contentPath: 'src/content/pages',
  basePath: '/pages',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    dateCreated: z.string(),
    datePublished: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
  }),
});
