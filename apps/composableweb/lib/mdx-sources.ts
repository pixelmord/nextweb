import * as z from "zod"
import { createSource } from "mdx"

export const Writing = createSource({
  contentPath: "content/blog",
  basePath: "/writing",
  sortBy: "date",
  sortOrder: "desc",
  frontMatter: z.object({
    title: z.string(),
    createdAt: z.string(),
    publishedAt: z.string(),
    excerpt: z.string().optional(),
    draft: z.boolean()
  }),
})
