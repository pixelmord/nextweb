import PostTeaser from '@/components/content/PostTeaser';

export default function PostListPage({ posts, title, description }) {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-12 xl:px-8">
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h1>
      {description.length && <p className="mt-4 text-gray-700">{description}</p>}
      <hr className="mt-6 py-6" />
      {posts.map((post) => (
        <PostTeaser key={post?.slug} post={post} />
      ))}
    </div>
  );
}
