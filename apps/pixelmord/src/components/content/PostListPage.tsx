import PostTeaser from '@/components/content/PostTeaser';

import { Container } from '../Container';

export default function PostListPage({ posts, title, description = '' }) {
  return (
    <Container className="prose dark:prose-invert py-12">
      <h1 className="my-0">{title}</h1>
      {description.length && <p className="mt-4">{description}</p>}
      <hr className="mt-3 mb-6 dark:border-base-600 border-2" />
      {posts.map((post) => (
        <PostTeaser key={post?.slug} post={post} />
      ))}
    </Container>
  );
}
