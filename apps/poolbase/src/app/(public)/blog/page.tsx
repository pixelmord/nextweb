import PostListPage from '@/components/content/PostListPage';
import { Blog } from '@/lib/mdx-sources';

export default async function BlogPage() {
  const posts = await Blog.getAllMdxNodes();

  return <PostListPage posts={posts} title="Writing" description="Note to myself: You should write more often!" />;
}
