import { Pages } from 'src/lib/mdx-sources';

import PostListPage from '@/components/content/PostListPage';

export default async function CodeRecipesPage() {
  const posts = await Pages.getAllMdxNodes();

  return <PostListPage posts={posts} title="Pages" />;
}
