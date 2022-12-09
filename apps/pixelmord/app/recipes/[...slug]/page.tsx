import { Recipes } from '@/lib/mdx-sources';
import { MdxContent } from 'ui/client-only';
import { H1 } from 'ui';
import { Container } from '@/components/Container';
import { formatDate } from 'utils';

// TODO: Properly type this file once the following fix lands.
// @see https://github.com/vercel/next.js/pull/42019
interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
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
