import { CodeRecipes } from 'src/lib/mdx-sources';

import PostDetail from '@/components/content/PostDetail';

// TODO: Properly type this file once the following fix lands.
// @see https://github.com/vercel/next.js/pull/42019
interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const files = await CodeRecipes.getMdxFiles();

  return files?.map((file) => ({
    slug: file.slug.split('/'),
  }));
}

export default async function CodeRecipePage({ params }: PostPageProps) {
  const post = await CodeRecipes.getMdxNode(params?.slug?.join('/'));
  if (!post) return null;
  return <PostDetail post={post} />;
}
