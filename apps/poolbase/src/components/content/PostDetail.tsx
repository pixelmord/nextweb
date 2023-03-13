import { formatDate } from 'utils';

export default function PostDetail({ post }) {
  return (
    <article className="prose dark:prose-invert mx-auto max-w-4xl py-12 flex-grow">
      <div className="flex flex-col space-y-2">
        <h1 className="">{post.frontMatter.title}</h1>
        {post.frontMatter.dateCreated && <p className="text-sm ">{formatDate(post.frontMatter.dateCreated)}</p>}
      </div>
      <hr className="my-6" />
      <div className="">{post.content}</div>
    </article>
  );
}
