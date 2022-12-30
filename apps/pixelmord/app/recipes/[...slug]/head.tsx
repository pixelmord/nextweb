import { Recipes } from '@/lib/mdx-sources';

import DefaultHeadTags from '../../DefaultHeadTags';

export default async function Head({ params }) {
  // console.log(params?.slug?.join('/'));
  // try {
  //   const post = await Recipes.getMdxNode(params?.slug?.join('/'));
  // } catch (e) {
  //   console.log(e);
  // }

  // // if (!post) return null;
  return (
    <>
      <DefaultHeadTags />
      <title>Pixelmord - Recipe </title>
      <meta name="description" content="Project tools for the future" />
    </>
  );
}
