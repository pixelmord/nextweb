import PostTeaser from '@/components/content/PostTeaser';

export default function PostListPage({ posts, title, description }) {
  return (
    <div className="prose dark:prose-invert container mx-auto max-w-3xl px-6 py-12 xl:px-8">
      <h1 className="my-0">{title}</h1>
      {description.length && <p className="mt-4">{description}</p>}
      <hr className="mt-3 mb-6 dark:border-base-600 border-2" />
      {posts.map((post) => (
        <PostTeaser key={post?.slug} post={post} />
      ))}
    </div>
  );
}
