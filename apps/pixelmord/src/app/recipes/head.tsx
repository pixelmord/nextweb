import DefaultHeadTags from '@/app/DefaultHeadTags';
import meta from '@/config/meta';

export default function Head() {
  return <DefaultHeadTags overrides={{ title: `Kochrezepte | ${meta.title}` }} />;
}
