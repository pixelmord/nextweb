import { createSource } from 'mdx';
import * as z from 'zod';

export const Blog = createSource({
  contentPath: 'content/blog',
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
