import { notFound } from 'next/navigation';
import { Recipes } from 'src/lib/mdx-sources';

import PostDetail from '@/components/content/PostDetail';

type PageParams = {
  slug: string[];
};

type PostPageProps = {
  params: PageParams;
};
export async function generateStaticParams(): Promise<PageParams[]> {
  const files = await Recipes.getMdxFiles();

  return files?.map((file) => ({
    slug: file.slug.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await Recipes.getMdxNode(params?.slug?.join('/'));
  if (!post) {
    notFound();
  }
  return <PostDetail post={post} />;
}

export async function generateMetadata({ params }) {
  const post = await Recipes.getMdxNode(params?.slug?.join('/'));
  return { title: `Kochrezept: ${post.frontMatter.title}` };
}
