'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import React, { useEffect } from 'react';

export function MdxContent({ source }: { source: MDXRemoteProps }) {
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, []);
  if (!isClient) {
    return null;
  }
  return <MDXRemote {...source} lazy />;
}
