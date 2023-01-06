import { MdxContent } from 'mdx/MdxContent';
import { H1 } from 'ui';
import { formatDate } from 'utils';

import { Blog } from '@/lib/mdx-sources';

// TODO: Properly type this file once the following fix lands.
// @see https://github.com/vercel/next.js/pull/42019
interface PostPageProps {
  post: any;
}

// export async function generateStaticParams() {
//   const files = await Blog.getMdxFiles();

//   return files?.map((file) => ({
//     slug: file.slug.split('/'),
//   }));
// }

export default function PostPage({ post }: PostPageProps) {
  //
  if (!post) return null;

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
export async function getStaticProps({ params }) {
  const post = await Blog.getMdxNode(params?.slug?.join('/'));
  return {
    props: { post },
  };
}
export async function getStaticPaths() {
  const files = await Blog.getMdxFiles();

  const paths = files?.map((file) => ({ params: { slug: file.slug.split('/') } }));

  return { paths, fallback: 'blocking' };
}
