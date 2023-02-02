'use client';

import { MdxContent } from 'mdx/MdxContent';
import { formatDate } from 'utils';

export default function PostDetail({ post }) {
  return (
    <article className="mx-auto max-w-2xl py-12">
      <div className="flex flex-col space-y-2">
        <h1 className="max-w-[90%] text-4xl font-bold leading-normal">{post.frontMatter.title}</h1>
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
