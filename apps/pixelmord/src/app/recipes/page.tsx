import { Metadata } from 'next';
import { Recipes } from 'src/lib/mdx-sources';

import PostListPage from '@/components/content/PostListPage';

export default async function BlogPage() {
  const posts = await Recipes.getAllMdxNodes();

  return (
    <PostListPage
      posts={posts}
      title="Rezepte"
      description="Kochen ist eine meiner großen Leidenschaften schon seit ich klein war"
    />
  );
}

export const metadata: Metadata = {
  title: 'Kochrezepte',
};
