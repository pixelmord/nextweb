import { Recipes } from 'src/lib/mdx-sources';

import meta from '@/config/meta';

import DefaultHeadTags from '../../DefaultHeadTags';

export default async function Head({ params }) {
  const post = await Recipes.getMdxNode(params?.slug?.join('/'));
  return (
    <>
      <DefaultHeadTags overrides={{ title: `Kochrezept: ${post.frontMatter.title} | ${meta.title}` }} />
    </>
  );
}
