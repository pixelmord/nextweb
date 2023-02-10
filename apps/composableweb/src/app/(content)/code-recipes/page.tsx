import { CodeRecipes } from 'src/lib/mdx-sources';

import PostListPage from '@/components/content/PostListPage';

export default async function CodeRecipesPage() {
  const posts = await CodeRecipes.getAllMdxNodes();

  return <PostListPage posts={posts} title="Code Recipes" description="Guides and Code snippets that are useful" />;
}
