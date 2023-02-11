import Link from 'next/link';
import { FiTag } from 'react-icons/fi';
import { formatDate } from 'utils';

export default function PostTeaser({ post }) {
  return (
    <article className="prose dark:prose-invert flex flex-col mb-8">
      {post?.frontMatter.dateCreated && (
        <p className="text-xs m-0 uppercase opacity-75">{formatDate(post?.frontMatter.dateCreated)}</p>
      )}
      <Link href={post?.url as string}>
        <h2 className="mb-1 mt-0">{post?.frontMatter.title}</h2>
      </Link>

      {post?.frontMatter.summary && <p className="mt-0">{post?.frontMatter.summary}</p>}
      {!!post?.frontMatter.tags && (
        <p className="mt-0 text-xs">
          {post?.frontMatter.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-primary-400/20 px-2 rounded mr-3">
              <FiTag className="inline-block mr-1 text-accent-500" />
              {tag}
            </span>
          ))}
        </p>
      )}
    </article>
  );
}
