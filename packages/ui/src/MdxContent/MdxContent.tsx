'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';

export function MdxContent({ source }: { source: MDXRemoteProps }) {
  return <MDXRemote {...source} />;
}
