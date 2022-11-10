import * as z from 'zod';
import { createSource } from 'mdx';

export const Blog = createSource({
  contentPath: 'content/blog',
  basePath: '/blog',
  sortBy: 'date',
  sortOrder: 'desc',
  frontMatter: z.object({
    title: z.string(),
    createdAt: z.string(),
    publishedAt: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
  }),
});
