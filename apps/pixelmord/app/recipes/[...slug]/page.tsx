import { Recipes } from '@/lib/mdx-sources';
import { MdxContent } from 'ui/src/MdxContent';
import { formatDate } from '@/lib/utils';
import { H1 } from 'ui';

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

  return (
    <article className="mx-auto max-w-2xl py-12">
      <div className="flex flex-col space-y-2">
        <H1>{post.frontMatter.title}</H1>
        {post.frontMatter.createdAt && (
          <p className="text-sm text-slate-600">{formatDate(post.frontMatter.createdAt)}</p>
        )}
      </div>
      <hr className="my-6" />
      <div className="prose max-w-none">
        <MdxContent source={post.mdx} />
      </div>
    </article>
  );
}
