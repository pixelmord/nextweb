import Link from 'next/link';
import { Recipes } from 'src/lib/mdx-sources';
import { H1, H2 } from 'ui';
import { formatDate } from 'utils';

export default async function BlogPage() {
  const posts = await Recipes.getAllMdxNodes();

  return (
    <div className="container mx-auto max-w-3xl px-6 py-12 xl:px-8">
      <H1>Recipes</H1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">I love cooking</p>
      <hr className="mt-6 border-slate-500 py-6 dark:border-slate-800" />
      {posts.map((post) => (
        <article key={post?.slug} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Link href={post?.url as string}>
              <H2 className="max-w-[90%]">{post?.frontMatter.title}</H2>
            </Link>
            {post?.frontMatter.createdAt && (
              <p className="text-sm text-slate-600 dark:text-gray-300">{formatDate(post?.frontMatter.createdAt)}</p>
            )}
          </div>
          {post?.frontMatter.summary && (
            <p className="text-slate-600 dark:text-gray-300">{post?.frontMatter.summary}</p>
          )}
          <hr className="mt-6 border-slate-500 py-6 dark:border-slate-800" />
        </article>
      ))}
    </div>
  );
}
