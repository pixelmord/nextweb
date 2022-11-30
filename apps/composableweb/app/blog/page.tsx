import { H1 } from 'ui';

import Link from 'next/link';

import { Blog } from '@/lib/mdx-sources';
import { formatDate } from 'utils';

export default async function BlogPage() {
  const posts = await Blog.getAllMdxNodes();

  return (
    <div className="prose container mx-auto max-w-3xl px-6 py-12 xl:px-8">
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Blog</h1>
      <p className="mt-4 text-gray-700">A blog built using MDX content .</p>
      <hr className="mt-6 py-6" />
      {posts.map((post) => (
        <article key={post?.slug} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Link href={post?.url as string}>
              <h2 className="max-w-[90%] text-2xl font-bold leading-normal sm:text-3xl md:text-3xl">
                {post?.frontMatter.title}
              </h2>
            </Link>
            {post?.frontMatter.createdAt && (
              <p className="text-sm text-slate-600">{formatDate(post?.frontMatter.createdAt)}</p>
            )}
          </div>
          {post?.frontMatter.summary && <p className="text-slate-600">{post?.frontMatter.summary}</p>}
          <hr className="mt-6 py-6" />
        </article>
      ))}
    </div>
  );
}
