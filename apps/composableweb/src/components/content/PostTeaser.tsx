import Link from 'next/link';
import { formatDate } from 'utils';

export default function PostTeaser({ post }) {
  return (
    <article className="flex flex-col space-y-4">
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
  );
}
