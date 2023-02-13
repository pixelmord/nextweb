import { BaseFrontmatterSchema, createSource } from 'mdx';
import * as z from 'zod';

export const Blog = createSource({
  contentPath: 'src/content/blog',
  basePath: '/blog',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: BaseFrontmatterSchema,
});

export const CodeRecipes = createSource({
  contentPath: 'src/content/code-recipes',
  basePath: '/code-recipes',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: BaseFrontmatterSchema,
});

export const Knowhow = createSource({
  contentPath: 'src/content/knowhow',
  basePath: '/knowhow',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: BaseFrontmatterSchema,
});
export const Pages = createSource({
  contentPath: 'src/content/pages',
  basePath: '/pages',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: BaseFrontmatterSchema,
});
