import { Container } from 'ui';
import fetchLocalFile from 'utils/fetch-local-file';

import Section from '@/components/blocks/Section';
import { SectionBlockData } from '@/types';

export default async function Home() {
  const { blocks } = await fetchLocalFile<{ blocks: SectionBlockData[] }>(`src/data/home.en.json`);
  return (
    <Container hspace="full">
      {blocks.map((block, index) => (
        <Section key={index} data={block} />
      ))}
    </Container>
  );
}
