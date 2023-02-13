import { BaseFrontmatterSchema, createSource } from 'mdx';

import { RecipeSchema } from '@/types';

export const Recipes = createSource({
  contentPath: 'src/content/recipes',
  basePath: '/recipes',
  sortBy: 'dateCreated',
  sortOrder: 'desc',
  frontMatter: BaseFrontmatterSchema.merge(RecipeSchema),
});
