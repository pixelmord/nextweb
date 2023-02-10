import { Knowhow } from 'src/lib/mdx-sources';

import PostListPage from '@/components/content/PostListPage';

export default async function CodeRecipesPage() {
  const posts = await Knowhow.getAllMdxNodes();

  return <PostListPage posts={posts} title="Know How" description="Random pieces of How Tos and Code Snippets" />;
}
