import { H1 } from 'ui';
import fetchLocalFile from 'utils/fetch-local-file';

import Section from '@/components/blocks/Section';
import { SectionBlockData } from '@/types';

export default async function Home() {
  const { blocks } = await fetchLocalFile<{ blocks: SectionBlockData[] }>(`src/data/home.en.json`);
  return (
    <div className="-mx-3 lg:-mx-8">
      {blocks.map((block, index) => (
        <Section key={index} data={block} />
      ))}
    </div>
  );
}
