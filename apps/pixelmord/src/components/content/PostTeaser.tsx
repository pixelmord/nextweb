import Link from 'next/link';
import { formatDate } from 'utils';

export default function PostTeaser({ post }) {
  return (
    <article className="prose dark:prose-invert flex flex-col">
      <Link href={post?.url as string}>
        <h2 className="mb-1 mt-5">{post?.frontMatter.title}</h2>
      </Link>
      {post?.frontMatter.dateCreated && <p className="text-sm m-0">{formatDate(post?.frontMatter.dateCreated)}</p>}

      {post?.frontMatter.summary && <p className="mt-0">{post?.frontMatter.summary}</p>}
      <hr className="my-3 p-0" />
    </article>
  );
}
