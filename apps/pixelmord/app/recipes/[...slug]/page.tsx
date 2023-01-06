import { MdxContent } from 'mdx/MdxContent';
import { H1 } from 'ui';
import { formatDate } from 'utils';

import { Container } from '@/components/Container';
import { Recipes } from '@/lib/mdx-sources';

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
  if (!post) return null;
  return (
    <Container className="prose dark:prose-invert py-12">
      <div className="flex flex-col space-y-2">
        <H1 className="max-w-[90%]">{post.frontMatter.title}</H1>
        {post.frontMatter.createdAt && <p className="text-sm ">{formatDate(post.frontMatter.createdAt)}</p>}
      </div>
      <hr className="my-6" />
      <div className="max-w-none">
        <MdxContent source={post.mdx} />
      </div>
    </Container>
  );
}
